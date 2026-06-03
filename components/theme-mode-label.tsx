"use client";

import { useEffect, useState } from "react";

type ThemeMode = "atari" | "nintendo";

function readTheme(): ThemeMode {
  if (typeof document === "undefined") {
    return "atari";
  }

  return document.documentElement.dataset.theme === "nintendo" ? "nintendo" : "atari";
}

export function ThemeModeLabel() {
  const [theme, setTheme] = useState<ThemeMode>("atari");

  useEffect(() => {
    setTheme(readTheme());

    function handleThemeChange(event: Event) {
      const nextTheme = (event as CustomEvent<{ theme?: ThemeMode }>).detail?.theme;
      setTheme(nextTheme === "nintendo" ? "nintendo" : "atari");
    }

    window.addEventListener("portfolio:theme-change", handleThemeChange);

    return () => window.removeEventListener("portfolio:theme-change", handleThemeChange);
  }, []);

  return (
    <div className="rpg-panel dark theme-mode-panel">
      <p className="pixel-label theme-mode-label">{theme === "nintendo" ? "NINTENDO" : "ATARI"}</p>
    </div>
  );
}
