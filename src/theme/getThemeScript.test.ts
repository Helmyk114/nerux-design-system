import { describe, expect, it } from "vitest";
import { getThemeScript } from "./getThemeScript";

interface FakeLink {
  rel: string;
  setAttribute: (name: string, value: string) => void;
  getAttribute: (name: string) => string | null;
  removeAttribute: (name: string) => void;
  remove: () => void;
}

interface FakeDomOptions {
  stored?: string | null;
  prefersDark?: boolean;
}

function createFakeDom({
  stored = null,
  prefersDark = false,
}: FakeDomOptions = {}) {
  const attributes = new Map<string, string>();
  const styles = new Map<string, string>();
  const links: FakeLink[] = [];

  const root = {
    setAttribute(name: string, value: string) {
      attributes.set(name, value);
    },
    getAttribute(name: string) {
      return attributes.get(name) ?? null;
    },
    style: {
      colorScheme: "",
      setProperty(name: string, value: string) {
        styles.set(name, value);
      },
    },
  };

  const document = {
    documentElement: root,
    head: {
      appendChild(element: FakeLink) {
        links.push(element);
      },
    },
    querySelector(selector: string) {
      if (selector === "html") return root;
      if (selector === 'link[data-nerux-favicon]') {
        return links[0] ?? null;
      }
      return null;
    },
    createElement() {
      const linkAttributes = new Map<string, string>();
      const link: FakeLink = {
        rel: "",
        setAttribute(name: string, value: string) {
          linkAttributes.set(name, value);
        },
        getAttribute(name: string) {
          return linkAttributes.get(name) ?? null;
        },
        removeAttribute(name: string) {
          linkAttributes.delete(name);
        },
        remove() {
          const index = links.indexOf(link);
          if (index >= 0) links.splice(index, 1);
        },
      };
      return link;
    },
  };

  const window = {
    localStorage: {
      getItem() {
        return stored;
      },
    },
    matchMedia() {
      return { matches: prefersDark };
    },
  };

  const execute = (script: string) => {
    const run = new Function("document", "window", script);
    run(
      document as unknown as Document,
      window as unknown as Window,
    );
  };

  return { attributes, styles, links, execute };
}

describe("getThemeScript", () => {
  it("applies the stored preference", () => {
    const dom = createFakeDom({ stored: "dark" });
    dom.execute(getThemeScript({ defaultTheme: "light" }));
    expect(dom.attributes.get("data-theme")).toBe("dark");
    expect(dom.attributes.get("data-brand")).toBe("nerux");
  });

  it("resolves system preferences", () => {
    const dom = createFakeDom({ prefersDark: true });
    dom.execute(getThemeScript({ defaultTheme: "system" }));
    expect(dom.attributes.get("data-theme")).toBe("dark");
  });

  it("ignores storage when persistence is disabled", () => {
    const dom = createFakeDom({ stored: "dark" });
    dom.execute(
      getThemeScript({ defaultTheme: "light", persist: false }),
    );
    expect(dom.attributes.get("data-theme")).toBe("light");
  });

  it("applies custom brand variables", () => {
    const dom = createFakeDom();
    dom.execute(
      getThemeScript({
        brand: {
          name: "ocean",
          primary: "#0ea5e9",
          foreground: "#001122",
        },
      }),
    );
    expect(dom.attributes.get("data-brand")).toBe("ocean");
    expect(dom.styles.get("--nerux-brand-base")).toBe("#0ea5e9");
    expect(dom.styles.get("--nerux-brand-foreground")).toBe("#001122");
  });

  it("creates the favicon link only once", () => {
    const dom = createFakeDom();
    const script = getThemeScript({
      brand: {
        name: "ocean",
        primary: "#0ea5e9",
        favicon: "/favicon.ico",
      },
    });
    dom.execute(script);
    dom.execute(script);
    expect(dom.links).toHaveLength(1);
    expect(dom.links[0]?.getAttribute("href")).toBe("/favicon.ico");
  });

  it("uses a custom target selector", () => {
    const targetAttributes = new Map<string, string>();
    const target = {
      setAttribute(name: string, value: string) {
        targetAttributes.set(name, value);
      },
      style: {
        colorScheme: "",
        setProperty() {
          return undefined;
        },
      },
    };
    const documentWithTarget = {
      documentElement: {},
      querySelector(selector: string) {
        return selector === "#app" ? target : null;
      },
      createElement() {
        throw new Error("not used");
      },
      head: { appendChild() { return undefined; } },
    };
    const windowWithStorage = {
      localStorage: { getItem: () => null },
      matchMedia: () => ({ matches: false }),
    };
    const run = new Function("document", "window", getThemeScript({
      targetSelector: "#app",
    }));
    run(
      documentWithTarget as unknown as Document,
      windowWithStorage as unknown as Window,
    );
    expect(targetAttributes.get("data-theme")).toBe("light");
    expect(targetAttributes.get("data-brand")).toBe("nerux");
  });
});
