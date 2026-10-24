import { describe, expect, it, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { NeruxProvider } from "./NeruxProvider";
import { useNeruxTheme } from "./useNeruxTheme";

function Consumer() {
  const { theme, resolvedTheme, brand } = useNeruxTheme();
  return <span>{`${theme}:${resolvedTheme}:${brand}`}</span>;
}

describe("NeruxProvider SSR", () => {
  it("renders the default preference", () => {
    const html = renderToString(
      <NeruxProvider>
        <Consumer />
      </NeruxProvider>,
    );
    expect(html).toContain("system:light:nerux");
  });

  it("renders an explicit default theme", () => {
    const html = renderToString(
      <NeruxProvider defaultTheme="dark">
        <Consumer />
      </NeruxProvider>,
    );
    expect(html).toContain("dark:dark:nerux");
  });

  it("honors a controlled theme", () => {
    const html = renderToString(
      <NeruxProvider theme="light" defaultTheme="dark">
        <Consumer />
      </NeruxProvider>,
    );
    expect(html).toContain("light:light:nerux");
  });

  it("renders a custom brand name", () => {
    const html = renderToString(
      <NeruxProvider
        brand={{ name: "ocean", primary: "#0ea5e9" }}
      >
        <Consumer />
      </NeruxProvider>,
    );
    expect(html).toContain("system:light:ocean");
  });

  it("throws when the hook is used outside the provider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {
      return undefined;
    });
    expect(() => renderToString(<Consumer />)).toThrow(
      "useNeruxTheme must be used within a NeruxProvider",
    );
    spy.mockRestore();
  });
});
