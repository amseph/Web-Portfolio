"use client";

import { Gamepad2 } from "lucide-react";
import { useEffect, useState } from "react";

type ThemeMode = "atari" | "nintendo";

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("atari");

  useEffect(() => {
    let saved: string | null = null;

    try {
      saved = window.localStorage.getItem("ivan-theme-mode");
    } catch {
      saved = null;
    }

    const savedMode: ThemeMode = saved === "nintendo" ? "nintendo" : "atari";
    setMode(savedMode);
    document.documentElement.dataset.theme = savedMode;
    document.documentElement.classList.toggle("dark", savedMode === "atari");
  }, []);

  function toggleTheme() {
    const next: ThemeMode = mode === "atari" ? "nintendo" : "atari";
    setMode(next);
    document.documentElement.dataset.theme = next;
    document.documentElement.classList.toggle("dark", next === "atari");

    try {
      window.localStorage.setItem("ivan-theme-mode", next);
    } catch {
      // Keep the theme interactive even if storage is unavailable.
    }

    window.dispatchEvent(new CustomEvent("portfolio:theme-change", { detail: { theme: next } }));
  }

  const isAtari = mode === "atari";
  const activeLabel = isAtari ? "Atari Mode" : "Nintendo Mode";
  const nextLabel = isAtari ? "Nintendo Mode" : "Atari Mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle inline-flex min-h-11 items-center justify-center gap-2 border-2 border-[var(--border)] bg-[var(--surface-strong)] px-3 text-[var(--accent)] shadow-[3px_3px_0_var(--border)]"
      aria-label={`Active theme: ${activeLabel}. Switch to ${nextLabel}.`}
      title={`Active: ${activeLabel}`}
      data-mode={mode}
    >
      <Gamepad2 aria-hidden size={18} />
      <span className="hidden font-pixel text-[0.55rem] leading-5 sm:inline">{activeLabel}</span>
    </button>
  );
}
