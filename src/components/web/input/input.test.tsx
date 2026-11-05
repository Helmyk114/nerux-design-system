// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createRef } from "react";
import type { Ref } from "react";
import {
  afterEach,
  describe,
  expect,
  expectTypeOf,
  it,
  vi,
} from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { InputNerux } from "./input";
import type { InputProps, InputSize, InputVariant } from "./input.types";
import { inputSizeClasses, inputVariantClasses } from "./input.variants";

const variants: InputVariant[] = ["primary", "secondary"];
const sizes: InputSize[] = ["sm", "md", "lg"];

const semanticCss = readFileSync(
  resolve(process.cwd(), "src/token/generated/semantic.css"),
  "utf8",
);
const primitivesCss = readFileSync(
  resolve(process.cwd(), "src/token/generated/primitives.css"),
  "utf8",
);

const canonicalTokens = new Set(
  [...`${semanticCss}\n${primitivesCss}`.matchAll(/(--nerux-[a-z0-9-]+)\s*:/g)].map(
    (match) => match[1],
  ),
);

const localTokens = new Set([
  "--nerux-input-height",
  "--nerux-input-font",
]);

function renderInput(props: InputProps = {}) {
  return render(<InputNerux label="Correo electrónico" {...props} />);
}

function getInput(container: HTMLElement): HTMLInputElement {
  const input = container.querySelector("input");

  expect(input).toBeInstanceOf(HTMLInputElement);
  return input as HTMLInputElement;
}

function getField(container: HTMLElement): HTMLElement {
  const field = container.querySelector<HTMLElement>('[data-slot="textfield"]');

  expect(field).toBeTruthy();
  return field as HTMLElement;
}

function getGroup(container: HTMLElement): HTMLElement {
  const group = container.querySelector<HTMLElement>('[data-slot="input-group"]');

  expect(group).toBeTruthy();
  return group as HTMLElement;
}

function tokenReferences(className: string): string[] {
  return [...className.matchAll(/var\((--[a-z0-9-]+)\)/g)].map(
    (match) => match[1],
  );
}

afterEach(() => {
  cleanup();
});

describe("contrato de tipos", () => {
  it("acepta solo las variantes y tamaños documentados", () => {
    expectTypeOf<InputProps["variant"]>().toEqualTypeOf<
      InputVariant | undefined
    >();
    expectTypeOf<InputProps["size"]>().toEqualTypeOf<InputSize | undefined>();
    expectTypeOf<InputVariant>().toEqualTypeOf<"primary" | "secondary">();
    expectTypeOf<InputSize>().toEqualTypeOf<"sm" | "md" | "lg">();
  });

  it("reenvía la ref al input nativo", () => {
    expectTypeOf<InputProps["ref"]>().toEqualTypeOf<
      Ref<HTMLInputElement> | undefined
    >();
  });

  it("no expone la API obsoleta", () => {
    expectTypeOf<InputProps>().not.toHaveProperty("error");
    expectTypeOf<InputProps>().not.toHaveProperty("startIcon");
    expectTypeOf<InputProps>().not.toHaveProperty("endIcon");
    expectTypeOf<InputProps["disabled"]>().toBeUndefined();
  });

  it("declara los slots y mensajes como ReactNode", () => {
    const nodeProps: InputProps = {
      label: <span>Etiqueta</span>,
      description: <span>Ayuda</span>,
      errorMessage: <span>Error</span>,
      startContent: <span>inicio</span>,
      endContent: <span>fin</span>,
    };

    expect(nodeProps.label).toBeTruthy();
  });
});

describe("contrato de tokens", () => {
  it("alimenta las variables locales de HeroUI en ambas variantes", () => {
    for (const variant of variants) {
      const { container, unmount } = renderInput({ variant });
      const className = getField(container).className;

      for (const local of [
        "--field-background:",
        "--field-foreground:",
        "--field-placeholder:",
        "--field-border:",
        "--field-border-hover:",
        "--field-border-focus:",
        "--field-focus:",
        "--field-shadow:",
      ]) {
        expect(className, `${variant} no define ${local}`).toContain(local);
      }

      unmount();
    }
  });

  it("referencia exclusivamente tokens --nerux-* sin colores hardcodeados", () => {
    for (const variant of variants) {
      for (const size of sizes) {
        const { container, unmount } = renderInput({ variant, size });
        const className = getField(container).className;
        const references = tokenReferences(className);

        expect(references.length).toBeGreaterThan(0);

        for (const token of references) {
          expect(token, `${variant}/${size} usa ${token}`).toMatch(/^--nerux-/);
          expect(token, `${variant}/${size} usa legacy --color-*`).not.toMatch(
            /^--color-/,
          );
        }

        expect(className, `${variant}/${size} hardcodea color`).not.toMatch(
          /#[0-9a-f]{3,8}\b|rgb\(|hsl\(|oklch\(/i,
        );

        unmount();
      }
    }
  });

  it("solo referencia tokens declarados en el CSS generado", () => {
    for (const variant of variants) {
      for (const size of sizes) {
        const { container, unmount } = renderInput({ variant, size });
        const references = [
          ...tokenReferences(getField(container).className),
          ...tokenReferences(getGroup(container).className),
        ];

        for (const token of references) {
          if (localTokens.has(token)) continue;
          expect(canonicalTokens.has(token), `${variant}/${size} -> ${token}`).toBe(
            true,
          );
        }

        unmount();
      }
    }
  });

  it("declara en el grupo el borde, el peligro y el ancho de borde", () => {
    const { container } = renderInput({ errorMessage: "Error" });
    const groupClass = getGroup(container).className;
    const fieldClass = getField(container).className;

    expect(groupClass).toContain(
      "[--border-width-field:var(--nerux-border-width-default)]",
    );
    expect(groupClass).toContain(
      "[--color-field-border-invalid:var(--nerux-color-danger)]",
    );
    expect(groupClass).toContain("[--danger:var(--nerux-color-danger)]");
    expect(fieldClass).toContain(
      "[--danger:var(--nerux-color-danger-text)]",
    );
  });

  it("define un mapeo distinto para cada variante", () => {
    const classNames = new Set(
      variants.map((variant) => inputVariantClasses[variant]),
    );

    expect(classNames.size).toBe(variants.length);
  });

  it("define alturas y tipografías por tamaño", () => {
    const expected: Record<InputSize, [string, string]> = {
      sm: ["--nerux-spacing-8", "--nerux-font-size-sm"],
      md: ["--nerux-spacing-9", "--nerux-font-size-md"],
      lg: ["--nerux-spacing-10", "--nerux-font-size-lg"],
    };

    for (const size of sizes) {
      renderInput({ size });
      const className = getField(document.body).className;

      expect(className).toContain(
        `[--nerux-input-height:var(${expected[size][0]})]`,
      );
      expect(className).toContain(
        `[--nerux-input-font:var(${expected[size][1]})]`,
      );
      expect(inputSizeClasses[size]).toContain(expected[size][0]);

      cleanup();
    }
  });
});

describe("ref y passthrough", () => {
  it("reenvía una ref de objeto al <input>", () => {
    const ref = createRef<HTMLInputElement>();
    const { container } = renderInput({ ref });
    const input = getInput(container);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(input);
  });

  it("reenvía una ref de callback al <input>", () => {
    const callback = vi.fn();
    const { container } = renderInput({ ref: callback });
    const input = getInput(container);

    expect(callback).toHaveBeenCalled();
    expect(callback.mock.calls[0][0]).toBe(input);
  });

  it("refleja value, defaultValue y placeholder", () => {
    const { container, unmount } = renderInput({
      value: "fijo",
      onChange: () => {},
      placeholder: "tu@ejemplo.com",
    });
    let input = getInput(container);

    expect(input.value).toBe("fijo");
    expect(input.placeholder).toBe("tu@ejemplo.com");

    unmount();

    const second = renderInput({ defaultValue: "inicial" });
    input = getInput(second.container);
    expect(input.value).toBe("inicial");
  });

  it("aplica los atributos nativos al <input>", () => {
    const { container } = renderInput({
      name: "email",
      autoComplete: "email",
      inputMode: "email",
      pattern: ".+@.+",
      maxLength: 80,
      type: "email",
    });
    const input = getInput(container);

    expect(input.name).toBe("email");
    expect(input.getAttribute("autocomplete")).toBe("email");
    expect(input.getAttribute("inputmode")).toBe("email");
    expect(input.getAttribute("pattern")).toBe(".+@.+");
    expect(input.maxLength).toBe(80);
    expect(input.type).toBe("email");
  });

  it("dispara onChange con el evento nativo", () => {
    const onChange = vi.fn();
    const { container } = renderInput({ onChange });
    const input = getInput(container);

    fireEvent.change(input, { target: { value: "ada@nerux.design" } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].target).toBe(input);
    expect(onChange.mock.calls[0][0].target.value).toBe("ada@nerux.design");
  });

  it("reenvía eventos de teclado y foco al <input>", () => {
    const onKeyDown = vi.fn();
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const { container } = renderInput({ onKeyDown, onFocus, onBlur });
    const input = getInput(container);

    fireEvent.keyDown(input, { key: "Enter" });
    fireEvent.focus(input);
    fireEvent.blur(input);

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it("compone className personalizado en la raíz", () => {
    const { container } = renderInput({ className: "mi-clase" });

    expect(getField(container).className.split(" ")).toContain("mi-clase");
  });

  it("propaga fullWidth a HeroUI", () => {
    const { container } = renderInput({ fullWidth: true });

    expect(getField(container).className).toContain("textfield--full-width");
  });
});

describe("accesibilidad", () => {
  it("asocia la etiqueta con el input", () => {
    const { container } = renderInput({ label: "Correo electrónico" });
    const input = getInput(container);
    const label = screen.getByText("Correo electrónico", {
      selector: "label",
    });

    expect(input.id).toBeTruthy();
    expect(label.getAttribute("for")).toBe(input.id);
  });

  it("expone aria-invalid solo cuando el campo es inválido", () => {
    const { container, unmount } = renderInput();

    expect(getInput(container).hasAttribute("aria-invalid")).toBe(false);

    unmount();

    const invalid = renderInput({ errorMessage: "Correo inválido" });
    expect(getInput(invalid.container).getAttribute("aria-invalid")).toBe(
      "true",
    );
  });

  it("referencia la descripción desde aria-describedby", () => {
    const { container } = renderInput({ description: "Ayuda" });
    const input = getInput(container);
    const description = container.querySelector(
      '[data-slot="description"]',
    ) as HTMLElement;

    expect(description).toBeTruthy();
    expect(description.id).toBeTruthy();
    expect(input.getAttribute("aria-describedby")?.split(" ")).toContain(
      description.id,
    );
  });

  it("referencia el error desde aria-describedby", () => {
    const { container } = renderInput({ errorMessage: "Correo inválido" });
    const input = getInput(container);
    const error = container.querySelector(
      '[data-slot="field-error"]',
    ) as HTMLElement;

    expect(error).toBeTruthy();
    expect(error.id).toBeTruthy();
    expect(input.getAttribute("aria-describedby")?.split(" ")).toContain(
      error.id,
    );
  });

  it("mergea el aria-describedby del consumidor con descripción y error", () => {
    const { container } = renderInput({
      description: "Ayuda",
      errorMessage: "Correo inválido",
      "aria-describedby": "ayuda-externa",
    });
    const input = getInput(container);
    const describedBy = input.getAttribute("aria-describedby")?.split(" ") ?? [];
    const description = container.querySelector(
      '[data-slot="description"]',
    ) as HTMLElement;
    const error = container.querySelector(
      '[data-slot="field-error"]',
    ) as HTMLElement;

    expect(describedBy).toContain("ayuda-externa");
    expect(describedBy).toContain(description.id);
    expect(describedBy).toContain(error.id);
    expect(new Set(describedBy).size).toBe(describedBy.length);
  });

  it("propaga el estado requerido a la etiqueta y al input", () => {
    const { container } = renderInput({ isRequired: true });
    const input = getInput(container);
    const label = screen.getByText("Correo electrónico", {
      selector: "label",
    });

    expect(input.required).toBe(true);
    expect(label.className).toContain("label--required");
  });

  it("propaga el estado deshabilitado a HeroUI y al input", () => {
    const { container } = renderInput({ isDisabled: true });

    expect(getInput(container).disabled).toBe(true);
    expect(getGroup(container).getAttribute("data-disabled")).toBe("true");
  });

  it("propaga el estado de solo lectura al input", () => {
    const { container } = renderInput({ isReadOnly: true });

    expect(getInput(container).readOnly).toBe(true);
    expect(getGroup(container).getAttribute("data-readonly")).toBe("true");
  });
});

describe("descripción y error", () => {
  it("renderiza descripción y error simultáneamente", () => {
    const { container } = renderInput({
      description: "Ayuda",
      errorMessage: "Correo inválido",
    });

    expect(container.querySelector('[data-slot="description"]')).toBeTruthy();
    expect(container.querySelector('[data-slot="field-error"]')).toBeTruthy();
    expect(getInput(container).getAttribute("aria-invalid")).toBe("true");
  });

  it("no renderiza FieldError sin errorMessage", () => {
    const { container } = renderInput({ description: "Ayuda" });

    expect(container.querySelector('[data-slot="field-error"]')).toBeNull();
    expect(getInput(container).hasAttribute("aria-invalid")).toBe(false);
  });

  it("permite invalidez externa sin mensaje", () => {
    const { container } = renderInput({ isInvalid: true });

    expect(getInput(container).getAttribute("aria-invalid")).toBe("true");
    expect(container.querySelector('[data-slot="field-error"]')).toBeNull();
  });
});

describe("slots de contenido", () => {
  it("renderiza prefijo, input y sufijo en orden DOM", () => {
    const { container } = renderInput({
      startContent: <span data-testid="start">inicio</span>,
      endContent: <span data-testid="end">fin</span>,
    });
    const prefix = container.querySelector('[data-slot="input-group-prefix"]');
    const suffix = container.querySelector('[data-slot="input-group-suffix"]');
    const input = getInput(container);
    const start = screen.getByTestId("start");
    const end = screen.getByTestId("end");

    expect(prefix?.contains(start)).toBe(true);
    expect(suffix?.contains(end)).toBe(true);
    expect(
      start.compareDocumentPosition(input) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      input.compareDocumentPosition(end) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("no monta slots vacíos", () => {
    const { container } = renderInput();

    expect(
      container.querySelector('[data-slot="input-group-prefix"]'),
    ).toBeNull();
    expect(
      container.querySelector('[data-slot="input-group-suffix"]'),
    ).toBeNull();
  });
});

describe("toggle de contraseña", () => {
  it("inicia enmascarado con un control accesible", () => {
    const { container } = renderInput({ type: "password" });
    const input = getInput(container);
    const toggle = screen.getByRole("button", {
      name: "Mostrar contraseña",
    });

    expect(input.type).toBe("password");
    expect(toggle.getAttribute("type")).toBe("button");
    expect(toggle.getAttribute("aria-pressed")).toBe("false");
    expect(toggle.getAttribute("aria-controls")).toBe(input.id);
  });

  it("alterna entre texto y contraseña", () => {
    const { container } = renderInput({ type: "password" });
    const input = getInput(container);

    fireEvent.click(
      screen.getByRole("button", { name: "Mostrar contraseña" }),
    );

    expect(input.type).toBe("text");
    expect(
      screen.getByRole("button", { name: "Ocultar contraseña" }).getAttribute(
        "aria-pressed",
      ),
    ).toBe("true");

    fireEvent.click(
      screen.getByRole("button", { name: "Ocultar contraseña" }),
    );

    expect(input.type).toBe("password");
    expect(
      screen.getByRole("button", { name: "Mostrar contraseña" }).getAttribute(
        "aria-pressed",
      ),
    ).toBe("false");
  });

  it("no renderiza el control para otros tipos", () => {
    renderInput({ type: "email" });

    expect(screen.queryByRole("button")).toBeNull();
  });

  it("se deshabilita con el campo y se mantiene con isReadOnly", () => {
    const disabled = renderInput({ type: "password", isDisabled: true });
    const disabledToggle = screen.getByRole("button", {
      name: "Mostrar contraseña",
    }) as HTMLButtonElement;

    expect(disabledToggle.disabled).toBe(true);
    disabled.unmount();

    renderInput({ type: "password", isReadOnly: true });
    const readOnlyToggle = screen.getByRole("button", {
      name: "Mostrar contraseña",
    }) as HTMLButtonElement;

    expect(readOnlyToggle.disabled).toBe(false);
  });

  it("coloca el toggle después de endContent dentro del sufijo", () => {
    const { container } = renderInput({
      type: "password",
      endContent: <span data-testid="end">fin</span>,
    });
    const suffix = container.querySelector(
      '[data-slot="input-group-suffix"]',
    ) as HTMLElement;
    const end = screen.getByTestId("end");
    const toggle = screen.getByRole("button", {
      name: "Mostrar contraseña",
    });

    expect(suffix.contains(end)).toBe(true);
    expect(suffix.contains(toggle)).toBe(true);
    expect(
      end.compareDocumentPosition(toggle) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});

describe("purga de props obsoletas", () => {
  it("descarta error, startIcon, endIcon y disabled inyectados por cast", () => {
    const legacyProps = {
      error: "Error antiguo",
      startIcon: "IconCircle",
      endIcon: "IconAddressBook",
      disabled: true,
    } as unknown as InputProps;
    const { container } = renderInput(legacyProps);
    const input = getInput(container);

    expect(input.disabled).toBe(false);
    expect(input.hasAttribute("aria-invalid")).toBe(false);
    expect(container.querySelector('[data-slot="field-error"]')).toBeNull();
    expect(screen.queryByText("Error antiguo")).toBeNull();
    expect(container.querySelector("svg")).toBeNull();
    expect(container.innerHTML).not.toContain("IconCircle");
    expect(container.innerHTML).not.toContain("IconAddressBook");
  });

  it("no deriva la etiqueta de name ni de error", () => {
    const legacyProps = {
      name: "correo",
      error: "Error antiguo",
    } as unknown as InputProps;
    const { container } = renderInput({ ...legacyProps, label: undefined });

    expect(container.querySelector("label")).toBeNull();
  });
});

describe("defaults", () => {
  it("usa primary y md cuando no se indican", () => {
    const { container } = renderInput();
    const className = getField(container).className;

    expect(className).toContain(
      "[--field-background:var(--nerux-color-surface-default)]",
    );
    expect(className).toContain(
      "[--nerux-input-height:var(--nerux-spacing-9)]",
    );
    expect(className).toContain(
      "[--nerux-input-font:var(--nerux-font-size-md)]",
    );
  });

  it("aplica la clase de la variante y el tamaño indicados", () => {
    const { container } = renderInput({ variant: "secondary", size: "lg" });
    const className = getField(container).className;

    expect(className).toContain(
      "[--field-background:var(--nerux-color-surface-secondary)]",
    );
    expect(className).toContain(
      "[--nerux-input-height:var(--nerux-spacing-10)]",
    );
    expect(className).toContain(
      "[--nerux-input-font:var(--nerux-font-size-lg)]",
    );
  });
});
