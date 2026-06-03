"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ThemeMode = "atari" | "nintendo";
const PORTRAIT_SWAP_DELAY_MS = 220;
const PORTRAIT_GLITCH_DURATION_MS = 520;

function readTheme(): ThemeMode {
  if (typeof document === "undefined") {
    return "atari";
  }

  return document.documentElement.dataset.theme === "nintendo" ? "nintendo" : "atari";
}

export function HeroCharacterPortrait() {
  const [theme, setTheme] = useState<ThemeMode>("atari");
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    setTheme(readTheme());
    let swapTimeout: number | undefined;
    let glitchTimeout: number | undefined;

    function handleThemeChange(event: Event) {
      const nextTheme = (event as CustomEvent<{ theme?: ThemeMode }>).detail?.theme;
      const resolvedTheme = nextTheme === "nintendo" ? "nintendo" : "atari";
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        setTheme(resolvedTheme);
        return;
      }

      setIsGlitching(false);
      window.requestAnimationFrame(() => {
        setIsGlitching(true);
        swapTimeout = window.setTimeout(() => setTheme(resolvedTheme), PORTRAIT_SWAP_DELAY_MS);
        glitchTimeout = window.setTimeout(() => setIsGlitching(false), PORTRAIT_GLITCH_DURATION_MS);
      });
    }

    window.addEventListener("portfolio:theme-change", handleThemeChange);

    return () => {
      window.removeEventListener("portfolio:theme-change", handleThemeChange);
      if (swapTimeout) {
        window.clearTimeout(swapTimeout);
      }
      if (glitchTimeout) {
        window.clearTimeout(glitchTimeout);
      }
    };
  }, []);

  const isNintendo = theme === "nintendo";

  return (
    <div className="hero-character-card rpg-panel scanline">
      <div className="flex items-center justify-center gap-3">
        <span className="pixel-label text-[var(--accent)]">Player Portrait</span>
      </div>
      <div className={`hero-character-frame mt-5 ${isGlitching ? "is-glitching" : ""}`}>
        <Image
          key={theme}
          src={isNintendo ? "/8BIT.png" : "/ME.png"}
          alt={isNintendo ? "Ivan in Nintendo pixel style" : "Ivan in Atari portrait style"}
          width={520}
          height={520}
          priority
          className="hero-character-image"
        />
      </div>
      <p className="mt-4 text-center font-pixel text-[0.58rem] leading-5 text-[var(--muted)]">
        {isNintendo ? "NINTENDO READY" : "ATARI READY"}
      </p>
    </div>
  );
}
