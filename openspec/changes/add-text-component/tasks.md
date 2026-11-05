## 1. Tipos y contrato polimórfico

- [ ] 1.1 Crear `src/components/web/text/text.types.ts` con los unions `TextVariant` (10 valores), `TextWeight` (4), `TextColor` (8) y `TextAlign` (4).
- [ ] 1.2 Definir `TextOwnProps` con `as`, `variant`, `size`, `weight`, `color`, `align`, `truncate`, `italic`, `uppercase`, `noWrap` y `className`.
- [ ] 1.3 Definir `TextProps<T extends ElementType = "p">` combinando `TextOwnProps` con `Omit<ComponentPropsWithoutRef<T>, keyof TextOwnProps>` y `ref?: ComponentPropsWithRef<T>["ref"]`.
- [ ] 1.4 Exportar el tipo del mapa de tags por defecto (`TextDefaultElement`) y verificar que `pnpm exec tsc -p tsconfig.app.json --noEmit` compila sin errores.

## 2. Mapas de variantes sobre tokens

- [ ] 2.1 Crear `src/components/web/text/text.variants.ts` con `textDefaultElement` según el diseño (`display`/`h1` → `h1`, `h2`/`h3`/`h4`, `body-*` → `p`, `caption`/`overline` → `span`).
- [ ] 2.2 Agregar `textDefaultWeight` con el peso por defecto de cada variante (`display` bold; `h1`–`h4` semibold; `body-*`/`caption` regular; `overline` semibold).
- [ ] 2.3 Implementar `textVariantClasses` con tamaño, familia e interlineado por variante usando solo `var(--nerux-font-size-*)`, `var(--nerux-font-family-*)` y `var(--nerux-line-height-*)`; incluir `text-transform: uppercase` en `overline`.
- [ ] 2.4 Implementar `textWeightClasses`, `textColorClasses` y `textAlignClasses` mapeando cada valor a `var(--nerux-font-weight-*)`, `var(--nerux-color-*)`/`var(--nerux-brand-base)` y las propiedades `text-align` correspondientes.
- [ ] 2.5 Implementar las clases de modificadores (`truncate`, `noWrap`, `italic`, `uppercase`) como propiedades CSS explícitas, garantizando una sola declaración de `white-space: nowrap` cuando `truncate` y `noWrap` coexisten.
- [ ] 2.6 Revisar que ningún mapa contenga utilidades tipográficas de Tailwind, colores de paleta ni valores `#`, `rgb(` o `hsl(`.

## 3. Componente `TextNerux`

- [ ] 3.1 Crear `src/components/web/text/text.tsx` con la firma genérica `<T extends ElementType = "p">` y una implementación pura, sin hooks ni estado.
- [ ] 3.2 Resolver la variante efectiva con precedencia `variant ?? size ?? "body-md"` y el tag con `as ?? textDefaultElement[variant]`.
- [ ] 3.3 Resolver el peso efectivo con `weight ?? textDefaultWeight[variant]` y componer las clases con `clsx` en el orden variante → peso → color → alineación → modificadores → `className`.
- [ ] 3.4 Destructurar todas las props propias y reenviar únicamente el resto (`id`, `role`, `aria-*`, `data-*`, eventos, `ref`) al elemento renderizado.
- [ ] 3.5 Crear `src/components/web/text/index.ts` exportando `TextNerux`, `TextProps`, `TextVariant`, `TextWeight`, `TextColor`, `TextAlign` y los mapas públicos.
- [ ] 3.6 Verificar que `pnpm exec tsc -p tsconfig.app.json --noEmit` pasa y que `as` no se filtra al DOM en una prueba manual rápida.

## 4. Migración de consumidores y barrel

- [ ] 4.1 Migrar `src/components/web/select/select.tsx` de `<TextNerux variant="error">` a `<TextNerux variant="caption" color="danger">`, preservando el layout del `FieldError`.
- [ ] 4.2 Reemplazar en `src/components/web/index.ts` el export `./texto/texto` por `./text` y exportar los tipos públicos de la nueva API.
- [ ] 4.3 Confirmar que `src/index.ts` reexporta `TextNerux` y sus tipos desde `./components/web` sin cambios adicionales.
- [ ] 4.4 Buscar referencias restantes a `texto/`, `texto.tsx` o la API antigua (`variant="title"`, `variant="error"`, `color="error"`) fuera de `src/components/web/texto/`.
- [ ] 4.5 Eliminar `src/components/web/texto/` completo (`texto.tsx`, `texto.types.ts`, `texto.variant.ts`, `texto.stories.tsx`, `index.ts`).
- [ ] 4.6 Ejecutar `pnpm build` y confirmar que no quedan imports rotos ni exportaciones duplicadas de `TextNerux`.

## 5. Storybook

- [ ] 5.1 Reescribir `src/components/web/text/text.stories.tsx` con `meta` (`title: "Design System/Text"`, `component: TextNerux`), `args` por defecto y `argTypes` para `variant`, `size`, `weight`, `color`, `align` y modificadores.
- [ ] 5.2 Agregar la story `Scale` mostrando las 10 variantes con su tag renderizado y tamaño/peso por defecto.
- [ ] 5.3 Agregar la story `Weights` con las 4 opciones de `weight` sobre una misma variante.
- [ ] 5.4 Agregar la story `Colors` con los 8 colores semánticos, usando una superficie que permita leer `inverse` y verificar contraste.
- [ ] 5.5 Agregar la story `AlignAndModifiers` con alineaciones, `truncate` (con ancho acotado), `italic`, `uppercase` y `noWrap`.
- [ ] 5.6 Agregar la story `Playground` con controles interactivos para todos los ejes y documentar que `truncate` fuerza `display: block`.
- [ ] 5.7 Revisar visualmente las stories en light, dark y brand `custom`; verificar contraste AA de `muted` y `brand` y registrar el resultado.

## 6. Suite de contrato en `jsdom`

- [ ] 6.1 Crear `src/components/web/text/text.test.tsx` con `// @vitest-environment jsdom`, helpers de render y lectura de `primitives.css`, `semantic.css`, `brands.css` y `aliases.css`.
- [ ] 6.2 Cubrir el render por defecto (`p` + `body-md`) y el tag/clases por defecto de las 10 variantes.
- [ ] 6.3 Cubrir polimorfismo: `as` cambia el tag y conserva la variante, `as="a"` acepta `href`, `as` no se filtra al DOM y `expectTypeOf` valida la inferencia de props y `ref`.
- [ ] 6.4 Cubrir el alias `size`, su precedencia frente a `variant` y la ausencia del atributo `size` en el DOM.
- [ ] 6.5 Cubrir peso por defecto, sobrescritura con `weight` y ausencia de clases de peso duplicadas.
- [ ] 6.6 Cubrir los 8 colores semánticos contra la tabla de tokens y el color por defecto.
- [ ] 6.7 Cubrir alineación y modificadores, incluyendo `truncate`, la deduplicación de `white-space: nowrap` y la ausencia de clases cuando los modificadores están apagados.
- [ ] 6.8 Cubrir reenvío de `ref` al nodo correcto, passthrough de `id`/`role`/`aria-*`/`data-*`/`onClick` y el orden de composición de `className`.
- [ ] 6.9 Cubrir gobierno de tokens: cada `var(--nerux-*)` de los mapas existe en los CSS generados y no hay tokens locales.
- [ ] 6.10 Cubrir prohibiciones: ningún mapa contiene utilidades tipográficas de Tailwind ni valores hardcodeados.
- [ ] 6.11 Ejecutar `pnpm vitest run src/components/web/text/text.test.tsx` y corregir hasta que pase.

## 7. Verificación y cierre

- [ ] 7.1 Ejecutar `pnpm test` y confirmar que toda la suite (incluida la existente) pasa.
- [ ] 7.2 Ejecutar `pnpm lint` y dejar 0 errores; documentar cualquier warning preexistente.
- [ ] 7.3 Ejecutar `pnpm build` y confirmar que el paquete y los tipos se generan correctamente.
- [ ] 7.4 Ejecutar `pnpm tokens:check` y confirmar que no hay drift en los tokens generados.
- [ ] 7.5 Ejecutar `openspec validate --strict add-text-component` y confirmar que el cambio es válido.
- [ ] 7.6 Verificar con `grep` que no queden referencias a `src/components/web/texto/`, a la API antigua de `TextNerux` ni a variables legacy `--color-*`/`--font-*` en el componente nuevo.
- [ ] 7.7 Revisar el diff final y confirmar que el cambio incluye solo los archivos del impacto aprobado.
