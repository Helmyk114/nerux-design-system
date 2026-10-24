import { describe, expect, it, vi } from "vitest";
import {
  createThemeStore,
  getSystemThemeServerSnapshot,
} from "./store";

function createStorage(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => {
      data.set(key, value);
    },
    data,
  };
}

describe("createThemeStore", () => {
  it("hydrates from storage", () => {
    const store = createThemeStore({
      storageKey: "nerux-theme",
      defaultTheme: "system",
      persist: true,
      storage: createStorage({ "nerux-theme": "dark" }),
    });
    expect(store.getSnapshot()).toBe("dark");
    expect(store.getServerSnapshot()).toBe("system");
  });

  it("persists updates and notifies subscribers", () => {
    const storage = createStorage();
    const store = createThemeStore({
      storageKey: "nerux-theme",
      defaultTheme: "system",
      persist: true,
      storage,
    });
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);

    store.set("light");
    expect(store.getSnapshot()).toBe("light");
    expect(storage.data.get("nerux-theme")).toBe("light");
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
    store.set("dark");
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("does not touch storage when persistence is disabled", () => {
    const storage = createStorage({ "nerux-theme": "dark" });
    const store = createThemeStore({
      storageKey: "nerux-theme",
      defaultTheme: "system",
      persist: false,
      storage,
    });
    expect(store.getSnapshot()).toBe("system");
    store.set("light");
    expect(storage.data.get("nerux-theme")).toBe("dark");
  });

  it("returns the default server snapshot", () => {
    const store = createThemeStore({
      storageKey: "nerux-theme",
      defaultTheme: "light",
      persist: true,
      storage: createStorage({ "nerux-theme": "dark" }),
    });
    expect(store.getServerSnapshot()).toBe("light");
  });
});

describe("system theme snapshot", () => {
  it("returns light on the server", () => {
    expect(getSystemThemeServerSnapshot()).toBe(false);
  });
});
