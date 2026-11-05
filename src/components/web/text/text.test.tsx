// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createRef } from "react";
import { afterEach, describe, expect, expectTypeOf, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { TextNerux } from "./text";
import type {
  TextAlign,
  TextColor,
  TextProps,
  TextVariant,
  TextWeight,
} from "./text.types";
import {
  textAlignClasses,
  textColorClasses,
  textDefaultElement,
  textDefaultWeight,
  textModifierClasses,
  textVariantClasses,
  textWeightClasses,
} from "./text.variants";

const variants: TextVariant[] = [
  "display",
  "h1",
  "h2",
  "h3",
  "h4",
  "body-lg",
  "body-md",
  "body-sm",
  "caption",
  "overline",
];

const weights: TextWeight[] = ["regular", "medium", "semibold", "bold"];

const colors: TextColor[] = [
  "default",
  "secondary",
  "muted",
  "success",
  "warning",
  "danger",
  "brand",
  "inverse",
];

const aligns: TextAlign[] = ["left", "center", "right", "justify"];

const expectedColorTokens: Record<TextColor, string> = {
  default: "--nerux-color-text-default",
  secondary: "--nerux-color-text-secondary",
  muted: "--nerux-color-text-muted",
  success: "--nerux-color-success-text",
  warning: "--nerux-color-warning-text",
  danger: "--nerux-color-danger-text",
  brand: "--nerux-color-brand-text",
  inverse: "--nerux-color-text-inverse",
};

const generatedCss = [
  "primitives.css",
  "semantic.css",
  "brands.css",
  "aliases.css",
]
  .map((file) =>
    readFileSync(
      resolve(process.cwd(), "src/token/generated", file),
      "utf8",
    ),
  )
  .join("\n");

const canonicalTokens = new Set(
  [...generatedCss.matchAll(/(--nerux-[a-z0-9-]+)\s*:/g)].map(
    (match) => match[1],
  ),
);

const mapSources = [
  ...Object.values(textVariantClasses),
  ...Object.values(textWeightClasses),
  ...Object.values(textColorClasses),
  ...Object.values(textAlignClasses),
  textModifierClasses({
    truncate: true,
    noWrap: true,
    italic: true,
    uppercase: true,
  }),
].join(" ");

function renderText(props: Record<string, unknown> = {}) {
  return render(
    <TextNerux {...(props as TextProps)}>Texto</TextNerux>,
  );
}

function getRoot(container: HTMLElement): HTMLElement {
  const element = container.firstElementChild;

  expect(element).toBeInstanceOf(HTMLElement);
  return element as HTMLElement;
}

function countOccurrences(value: string, fragment: string): number {
  return value.split(fragment).length - 1;
}

afterEach(() => {
  cleanup();
  document.documentElement.removeAttribute("data-theme");
});

describe("TextNerux contrato de render", () => {
  it("renderiza un p con body-md, peso regular y color default por defecto", () => {
    const { container } = renderText();
    const element = getRoot(container);

    expect(element.tagName.toLowerCase()).toBe("p");
    expect(element.className).toContain(textVariantClasses["body-md"]);
    expect(element.className).toContain(textWeightClasses.regular);
    expect(element.className).toContain(
      `[color:var(${expectedColorTokens.default})]`,
    );
  });

  it("renderiza el tag por defecto y las clases de cada variante", () => {
    for (const variant of variants) {
      const { container, unmount } = renderText({ variant });
      const element = getRoot(container);

      expect(element.tagName.toLowerCase(), variant).toBe(
        textDefaultElement[variant],
      );
      expect(element.className, variant).toContain(
        textVariantClasses[variant],
      );
      expect(element.className, variant).toContain(
        textWeightClasses[textDefaultWeight[variant]],
      );

      unmount();
    }
  });

  it("aplica uppercase en la variante overline", () => {
    const { container } = renderText({ variant: "overline" });

    expect(getRoot(container).className).toContain(
      "[text-transform:uppercase]",
    );
  });
});

describe("TextNerux polimorfismo", () => {
  it("permite cambiar el tag sin perder la variante visual", () => {
    const { container } = renderText({ variant: "h3", as: "h2" });
    const element = getRoot(container);

    expect(element.tagName.toLowerCase()).toBe("h2");
    expect(element.className).toContain(textVariantClasses.h3);
  });

  it("infiere props nativas del elemento indicado por as", () => {
    render(
      <TextNerux as="a" href="/docs">
        Documentación
      </TextNerux>,
    );

    const link = screen.getByRole("link", { name: "Documentación" });

    expect(link.getAttribute("href")).toBe("/docs");
  });

  it("no filtra props propias al DOM", () => {
    const { container } = renderText({
      as: "a",
      href: "/docs",
      variant: "h3",
      size: "h2",
      weight: "bold",
      color: "brand",
      align: "center",
      truncate: true,
      italic: true,
      uppercase: true,
      noWrap: true,
    });
    const element = getRoot(container);

    for (const attribute of [
      "as",
      "variant",
      "size",
      "weight",
      "color",
      "align",
      "truncate",
      "italic",
      "uppercase",
      "nowrap",
    ]) {
      expect(element.hasAttribute(attribute), attribute).toBe(false);
    }
  });

  it("tipa href y ref según el elemento de as", () => {
    expectTypeOf<TextProps<"a">["href"]>().toEqualTypeOf<
      string | undefined
    >();

    const anchorRef: TextProps<"a">["ref"] =
      createRef<HTMLAnchorElement>();
    const paragraphRef: TextProps["ref"] =
      createRef<HTMLParagraphElement>();

    void anchorRef;
    void paragraphRef;
  });

  it("rechaza en compilación la API anterior", () => {
    function legacyVariant(): TextProps {
      // @ts-expect-error `title` ya no forma parte de la escala
      return { variant: "title" };
    }

    function legacyColor(): TextProps {
      // @ts-expect-error `error` ya no es un color semántico
      return { color: "error" };
    }

    void legacyVariant;
    void legacyColor;
  });
});

describe("TextNerux alias size", () => {
  it("usa size como alias de variant", () => {
    const { container } = renderText({ size: "h2" });
    const element = getRoot(container);

    expect(element.tagName.toLowerCase()).toBe("h2");
    expect(element.className).toContain(textVariantClasses.h2);
    expect(element.className).toContain(
      textWeightClasses[textDefaultWeight.h2],
    );
  });

  it("da precedencia a variant sobre size", () => {
    const { container } = renderText({ variant: "body-sm", size: "h1" });
    const element = getRoot(container);

    expect(element.tagName.toLowerCase()).toBe("p");
    expect(element.className).toContain(textVariantClasses["body-sm"]);
    expect(element.className).not.toContain(textVariantClasses.h1);
  });
});

describe("TextNerux pesos", () => {
  it("aplica el peso por defecto de la variante", () => {
    const { container } = renderText({ variant: "body-md" });
    const element = getRoot(container);

    expect(element.className).toContain(textWeightClasses.regular);
    expect(element.className).not.toContain(textWeightClasses.bold);
  });

  it("sobrescribe el peso sin duplicar clases de peso", () => {
    const { container } = renderText({ variant: "body-md", weight: "bold" });
    const element = getRoot(container);

    expect(element.className).toContain(textWeightClasses.bold);
    expect(element.className).not.toContain(textWeightClasses.regular);
    expect(countOccurrences(element.className, "font-weight:")).toBe(1);
  });

  it("cubre los cuatro pesos del contrato", () => {
    for (const weight of weights) {
      const { container, unmount } = renderText({ weight });
      const element = getRoot(container);

      expect(element.className, weight).toContain(textWeightClasses[weight]);
      expect(countOccurrences(element.className, "font-weight:")).toBe(1);

      unmount();
    }
  });
});

describe("TextNerux colores", () => {
  it("aplica el color default cuando se omite", () => {
    const { container } = renderText();

    expect(getRoot(container).className).toContain(
      `[color:var(${expectedColorTokens.default})]`,
    );
  });

  it("mapea cada color semántico a su token", () => {
    for (const color of colors) {
      const { container, unmount } = renderText({ color });
      const element = getRoot(container);

      expect(element.className, color).toContain(
        `[color:var(${expectedColorTokens[color]})]`,
      );
      expect(countOccurrences(element.className, "[color:")).toBe(1);

      unmount();
    }
  });

  it("resuelve el color por variable para responder al tema", () => {
    document.documentElement.setAttribute("data-theme", "dark");
    const { container } = renderText();

    expect(getRoot(container).className).toContain(
      `[color:var(${expectedColorTokens.default})]`,
    );
  });
});

describe("TextNerux alineación y modificadores", () => {
  it("aplica cada alineación", () => {
    for (const align of aligns) {
      const { container, unmount } = renderText({ align });
      const element = getRoot(container);

      expect(element.className, align).toContain(textAlignClasses[align]);

      unmount();
    }
  });

  it("trunca con elipsis y una sola declaración de nowrap", () => {
    const { container } = renderText({ truncate: true });
    const className = getRoot(container).className;

    expect(className).toContain("[display:block]");
    expect(className).toContain("[overflow:hidden]");
    expect(className).toContain("[text-overflow:ellipsis]");
    expect(countOccurrences(className, "white-space:nowrap")).toBe(1);
  });

  it("deduplica nowrap cuando truncate y noWrap coexisten", () => {
    const { container } = renderText({ truncate: true, noWrap: true });
    const className = getRoot(container).className;

    expect(countOccurrences(className, "white-space:nowrap")).toBe(1);
  });

  it("combina italic, uppercase y noWrap", () => {
    const { container } = renderText({
      italic: true,
      uppercase: true,
      noWrap: true,
    });
    const className = getRoot(container).className;

    expect(className).toContain("[font-style:italic]");
    expect(className).toContain("[text-transform:uppercase]");
    expect(className).toContain("[white-space:nowrap]");
  });

  it("no emite modificadores cuando están apagados", () => {
    const { container } = renderText({ variant: "body-md" });
    const className = getRoot(container).className;

    expect(className).not.toContain("[font-style:italic]");
    expect(className).not.toContain("[text-transform:uppercase]");
    expect(className).not.toContain("[white-space:nowrap]");
    expect(className).not.toContain("[overflow:hidden]");
  });
});

describe("TextNerux ref, passthrough y className", () => {
  it("reenvía el ref al nodo DOM renderizado", () => {
    const ref = createRef<HTMLParagraphElement>();

    render(<TextNerux ref={ref}>Texto</TextNerux>);

    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });

  it("reenvía el ref con el tipo del elemento indicado por as", () => {
    const ref = createRef<HTMLAnchorElement>();

    render(
      <TextNerux as="a" href="/docs" ref={ref}>
        Documentación
      </TextNerux>,
    );

    expect(ref.current?.tagName).toBe("A");
    expect(ref.current?.getAttribute("href")).toBe("/docs");
  });

  it("propaga id, role, aria, data y eventos", () => {
    const onClick = vi.fn();
    const { container } = renderText({
      id: "text-1",
      role: "note",
      "aria-label": "Nota",
      "aria-describedby": "text-1-description",
      "data-testid": "text",
      onClick,
    });
    const element = getRoot(container);

    expect(element.id).toBe("text-1");
    expect(element.getAttribute("role")).toBe("note");
    expect(element.getAttribute("aria-label")).toBe("Nota");
    expect(element.getAttribute("aria-describedby")).toBe(
      "text-1-description",
    );
    expect(element.getAttribute("data-testid")).toBe("text");

    fireEvent.click(element);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("compone className al final después de las clases del componente", () => {
    const { container } = renderText({
      variant: "body-md",
      weight: "bold",
      color: "danger",
      align: "center",
      truncate: true,
      className: "custom-class",
    });
    const element = getRoot(container);
    const classes = element.className.split(/\s+/);

    expect(classes.at(-1)).toBe("custom-class");
    expect(element.className).toContain(textVariantClasses["body-md"]);
    expect(element.className).toContain(textWeightClasses.bold);
    expect(element.className).toContain(
      `[color:var(${expectedColorTokens.danger})]`,
    );
    expect(element.className).toContain(textAlignClasses.center);
    expect(element.className).toContain("[text-overflow:ellipsis]");
  });
});

describe("TextNerux gobierno de tokens", () => {
  it("referencia únicamente tokens --nerux-* existentes", () => {
    const referencedTokens = [
      ...mapSources.matchAll(/var\((--nerux-[a-z0-9-]+)\)/g),
    ].map((match) => match[1]);

    expect(referencedTokens.length).toBeGreaterThan(0);

    for (const token of new Set(referencedTokens)) {
      expect(canonicalTokens.has(token), token).toBe(true);
    }
  });

  it("no declara tokens locales", () => {
    expect(mapSources).not.toMatch(/--nerux-(?:text|local)-/);
  });

  it("no usa utilidades tipográficas de Tailwind ni valores hardcodeados", () => {
    const forbiddenPatterns = [
      /\btext-(xs|sm|md|lg|xl|2xl|3xl|base|body|caption|title|subtitle)\b/,
      /\bfont-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)\b/,
      /\bleading-/,
      /\btracking-/,
      /\btext-(white|black|neutral|slate|gray|zinc|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d+/,
    ];

    for (const pattern of forbiddenPatterns) {
      expect(mapSources, pattern.source).not.toMatch(pattern);
    }

    expect(mapSources).not.toContain("#");
    expect(mapSources).not.toMatch(/\brgb\(/);
    expect(mapSources).not.toMatch(/\bhsl\(/);
  });
});
