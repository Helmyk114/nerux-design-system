import "../src/index";
import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
      },
    },
    brand: {
      name: "Brand",
      description: "Brand token set",
      defaultValue: "nerux",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "nerux", title: "Nerux" },
          { value: "custom", title: "Custom (ocean)" },
        ],
      },
    },
  },

  decorators: [
    (Story, context) => {
      const root = document.documentElement;
      root.setAttribute("data-theme", context.globals.theme);
      root.setAttribute("data-brand", context.globals.brand);

      if (context.globals.brand === "custom") {
        root.style.setProperty("--nerux-brand-base", "#0369a1");
        root.style.setProperty("--nerux-brand-foreground", "#ffffff");
      } else {
        root.style.removeProperty("--nerux-brand-base");
        root.style.removeProperty("--nerux-brand-foreground");
      }

      return <Story />;
    },
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "error",
    },
  },
};

export default preview;
