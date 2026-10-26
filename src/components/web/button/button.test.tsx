// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createRef } from "react";
import {
  afterEach,
  describe,
  expect,
  expectTypeOf,
  it,
  vi,
} from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { contrastRatio } from "../../../token/source/color";
import { semantic } from "../../../token/source/semantic";
import { ButtonNerux } from "./button";
import type { ButtonProps, ButtonSize, ButtonVariant } from "./button.types";
import { buttonColorVariants } from "./button.variants";

const variants: ButtonVariant[] = [
  "primary",
  "secondary",
  "tertiary",
  "outline",
  "ghost",
  "danger",
  "danger-soft",
];

const sizes: ButtonSize[] = ["sm", "md", "lg"];

const semanticCss = readFileSync(
  resolve(process.cwd(), "src/token/generated/semantic.css"),
  "utf8",
);

const canonicalTokens = new Set(
  [...semanticCss.matchAll(/(--nerux-[a-z0-9-]+)\s*:/g)].map(
    (match) => match[1],
  ),
);

function renderButton(props: ButtonProps = {}) {
  return render(
    <ButtonNerux {...props}>{props.children ?? "Guardar"}</ButtonNerux>,
  );
}

function getButton() {
  return screen.getByRole("button");
}

afterEach(() => {
  cleanup();
});

describe("contrato de tokens", () => {
  it("monta todas las variantes sobre las variables locales de HeroUI", () => {
    for (const variant of variants) {
      const { unmount } = renderButton({ variant, children: variant });
      const className = getButton().className;

      for (const local of [
        "--button-bg:",
        "--button-bg-hover:",
        "--button-bg-pressed:",
        "--button-fg:",
      ]) {
        expect(className, `${variant} no define ${local}`).toContain(local);
      }

      unmount();
    }
  });

  it("referencia exclusivamente tokens --nerux-*", () => {
    for (const variant of variants) {
      const { unmount } = renderButton({ variant });
      const className = getButton().className;
      const references = [...className.matchAll(/var\((--[a-z0-9-]+)\)/g)];

      expect(references.length, `${variant} sin referencias`).toBeGreaterThan(
        0,
      );

      for (const [, token] of references) {
        expect(token, `${variant} usa ${token}`).toMatch(/^--nerux-/);
        expect(token, `${variant} usa legacy --color-*`).not.toMatch(
          /^--color-/,
        );
      }

      expect(className, `${variant} hardcodea color`).not.toMatch(
        /#[0-9a-f]{3,8}\b/i,
      );

      unmount();
    }
  });

  it("solo referencia tokens declarados en el CSS generado", () => {
    for (const variant of variants) {
      const { unmount } = renderButton({ variant });
      const className = getButton().className;
      const references = [...className.matchAll(/var\((--nerux-[a-z0-9-]+)\)/g)];

      for (const [, token] of references) {
        expect(canonicalTokens.has(token), `${variant} -> ${token}`).toBe(true);
      }

      unmount();
    }
  });

  it("define un mapeo distinto para cada variante", () => {
    const classNames = new Set(
      variants.map((variant) => buttonColorVariants[variant]),
    );
    expect(classNames.size).toBe(variants.length);
  });
});

describe("navegación prohibida", () => {
  it("renderiza siempre un <button> nativo", () => {
    renderButton();
    expect(getButton().tagName).toBe("BUTTON");
    expect(document.querySelector("a")).toBeNull();
  });

  it("descarta href y atributos de enlace inyectados por cast", () => {
    const linkProps = {
      href: "/peligro",
      target: "_blank",
      rel: "noopener",
      download: "archivo.txt",
      hrefLang: "es",
      ping: "/rastreo",
      referrerPolicy: "no-referrer",
    } as unknown as ButtonProps;

    renderButton(linkProps);
    const button = getButton();

    expect(button.tagName).toBe("BUTTON");
    for (const attribute of [
      "href",
      "target",
      "rel",
      "download",
      "hreflang",
      "ping",
      "referrerpolicy",
    ]) {
      expect(button.hasAttribute(attribute), attribute).toBe(false);
    }
    expect(document.querySelector("a")).toBeNull();
  });

  it("descarta render inyectado por cast", () => {
    const withRender = {
      render: (props: Record<string, unknown>) => <a {...props} />,
    } as unknown as ButtonProps;

    renderButton(withRender);

    expect(getButton().tagName).toBe("BUTTON");
    expect(document.querySelector("a")).toBeNull();
  });

  it("no expone href ni render en el contrato de tipos", () => {
    expectTypeOf<ButtonProps>().not.toHaveProperty("href");
    expectTypeOf<ButtonProps>().not.toHaveProperty("target");
    expectTypeOf<ButtonProps>().not.toHaveProperty("rel");
    expectTypeOf<ButtonProps>().not.toHaveProperty("download");
    expectTypeOf<ButtonProps>().not.toHaveProperty("hrefLang");
    expectTypeOf<ButtonProps>().not.toHaveProperty("ping");
    expectTypeOf<ButtonProps>().not.toHaveProperty("referrerPolicy");
    expectTypeOf<ButtonProps>().not.toHaveProperty("render");
  });

  it("no expone la API retirada", () => {
    expectTypeOf<ButtonProps>().not.toHaveProperty("color");
    expectTypeOf<ButtonProps>().not.toHaveProperty("startIcon");
    expectTypeOf<ButtonProps>().not.toHaveProperty("endIcon");
    expectTypeOf<ButtonProps>().not.toHaveProperty("isPending");
  });
});

describe("ref y passthrough", () => {
  it("reenvía una ref de objeto al <button>", () => {
    const ref = createRef<HTMLButtonElement>();
    renderButton({ ref });

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toBe(getButton());
  });

  it("reenvía una ref de callback al <button>", () => {
    const callback = vi.fn();
    renderButton({ ref: callback });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0]).toBeInstanceOf(HTMLButtonElement);
    expect(callback.mock.calls[0][0]).toBe(getButton());
  });

  it("combina aria-label y className con las clases del DS", () => {
    renderButton({ "aria-label": "Guardar cambios", className: "mi-clase" });
    const button = getButton();

    expect(
      screen.getByRole("button", { name: "Guardar cambios" }),
    ).toBe(button);
    expect(button.className.split(" ")).toContain("mi-clase");
    expect(button.className).toContain("[--button-bg:");
  });

  it("usa type button por defecto y lo respeta cuando se indica", () => {
    renderButton();
    expect(getButton().getAttribute("type")).toBe("button");
    cleanup();

    renderButton({ type: "submit" });
    expect(getButton().getAttribute("type")).toBe("submit");
  });

  it("dispara onPress con click y teclado", () => {
    const onPress = vi.fn();
    renderButton({ onPress });
    const button = getButton();

    fireEvent.click(button);
    expect(onPress).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(button, { key: "Enter" });
    fireEvent.keyUp(button, { key: "Enter" });
    expect(onPress).toHaveBeenCalledTimes(2);

    fireEvent.keyDown(button, { key: " " });
    fireEvent.keyUp(button, { key: " " });
    expect(onPress).toHaveBeenCalledTimes(3);
  });

  it("propaga fullWidth e isIconOnly a HeroUI", () => {
    renderButton({ fullWidth: true, isIconOnly: true, "aria-label": "Agregar" });

    expect(getButton().className.split(" ")).toContain("button--full-width");
    expect(getButton().className.split(" ")).toContain("button--icon-only");
    expect(getButton().className).toContain("[--button-bg:");
  });
});

describe("estado de carga", () => {
  it("expone aria-busy, data-pending y un único spinner", () => {
    const { container } = renderButton({ isLoading: true });
    const button = getButton();

    expect(button.getAttribute("aria-busy")).toBe("true");
    expect(button.getAttribute("data-pending")).toBe("true");
    expect(container.querySelectorAll('[data-slot="spinner"]')).toHaveLength(1);
    expect(screen.getByRole("status")).toBeTruthy();
  });

  it("bloquea la interacción mientras carga", () => {
    const onPress = vi.fn();
    renderButton({ isLoading: true, onPress });

    fireEvent.click(getButton());
    fireEvent.keyDown(getButton(), { key: "Enter" });
    fireEvent.keyUp(getButton(), { key: "Enter" });

    expect(onPress).not.toHaveBeenCalled();
  });

  it("sustituye startContent y conserva children y endContent", () => {
    renderButton({
      isLoading: true,
      startContent: <span data-testid="start">inicio</span>,
      endContent: <span data-testid="end">fin</span>,
    });

    expect(screen.queryByTestId("start")).toBeNull();
    expect(screen.getByTestId("end")).toBeTruthy();
    expect(getButton().textContent).toContain("Guardar");
    expect(screen.getByRole("status")).toBeTruthy();
  });

  it("no emite spinner ni aria-busy sin carga", () => {
    const { container } = renderButton({ startContent: <span>inicio</span> });

    expect(getButton().hasAttribute("aria-busy")).toBe(false);
    expect(getButton().hasAttribute("data-pending")).toBe(false);
    expect(container.querySelectorAll('[data-slot="spinner"]')).toHaveLength(0);
    expect(screen.queryByRole("status")).toBeNull();
  });
});

describe("slots de contenido", () => {
  it("renderiza startContent, children y endContent en orden", () => {
    renderButton({
      startContent: <span data-testid="start">inicio</span>,
      endContent: <span data-testid="end">fin</span>,
    });

    const button = getButton();
    const start = screen.getByTestId("start");
    const end = screen.getByTestId("end");
    const text = [...button.childNodes].find(
      (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
    );

    expect(text?.textContent?.trim()).toBe("Guardar");
    expect(
      start.compareDocumentPosition(text as Node) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      end.compareDocumentPosition(text as Node) &
        Node.DOCUMENT_POSITION_PRECEDING,
    ).toBeTruthy();
  });

  it("renderiza únicamente children cuando no hay slots", () => {
    renderButton();
    expect(getButton().textContent).toBe("Guardar");
  });
});

describe("accesibilidad y estados", () => {
  it("expone rol de botón y nombre accesible desde el contenido", () => {
    renderButton();
    expect(screen.getByRole("button", { name: "Guardar" })).toBe(getButton());
  });

  it("no se activa cuando está deshabilitado", () => {
    const onPress = vi.fn();
    renderButton({ isDisabled: true, onPress });
    const button = getButton() as HTMLButtonElement;

    expect(button.disabled).toBe(true);
    fireEvent.click(button);
    fireEvent.keyDown(button, { key: "Enter" });
    fireEvent.keyUp(button, { key: "Enter" });

    expect(onPress).not.toHaveBeenCalled();
  });

  it("acepta los tres tamaños", () => {
    for (const size of sizes) {
      const { unmount } = renderButton({ size });
      expect(getButton().className.split(" ")).toContain(`button--${size}`);
      unmount();
    }
  });
});

describe("contraste", () => {
  it("registra el par sólido de danger en light y dark", () => {
    const pairs = semantic.contrastPairs.filter((pair) =>
      pair.label.startsWith("danger-solid"),
    );

    expect(pairs).toHaveLength(2);
    for (const pair of pairs) {
      const minimum = pair.minimum ?? 4.5;
      expect(contrastRatio(pair.foreground, pair.background)).toBeGreaterThanOrEqual(
        minimum,
      );
    }
  });
});
