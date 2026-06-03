"use client";

import { useEffect, useRef, useState } from "react";

const scrollSpeeds = {
  easy: 0.045,
  normal: 0.105,
  hard: 0.17,
} as const;

type Difficulty = keyof typeof scrollSpeeds;

export function StatScroll({ strengths }: { strengths: string[] }) {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    let offset = 0;
    let previousTime = performance.now();

    function updateActiveStat() {
      if (!track) return;
      const shell = track.parentElement;
      if (!shell) return;
      const shellBox = shell.getBoundingClientRect();
      const center = shellBox.left + shellBox.width / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      Array.from(track.querySelectorAll<HTMLElement>("[data-stat-card]")).forEach((card, index) => {
        const cardBox = card.getBoundingClientRect();
        const distance = Math.abs(center - (cardBox.left + cardBox.width / 2));

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      const nextActive = closestIndex % strengths.length;
      if (activeRef.current !== nextActive) {
        activeRef.current = nextActive;
        setActive(nextActive);
      }
    }

    function animateScroll(time: number) {
      if (!track) return;
      const delta = time - previousTime;
      previousTime = time;
      const loopWidth = track.scrollWidth / 3;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const difficulty = document.documentElement.dataset.difficulty;
      const speed = scrollSpeeds[(difficulty === "easy" || difficulty === "hard" || difficulty === "normal" ? difficulty : "normal") as Difficulty];

      if (!reducedMotion && loopWidth > 0) {
        offset = (offset + delta * speed) % loopWidth;
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }

      updateActiveStat();
      frame = window.requestAnimationFrame(animateScroll);
    }

    updateActiveStat();
    frame = window.requestAnimationFrame(animateScroll);
    window.addEventListener("resize", updateActiveStat);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateActiveStat);
    };
  }, [strengths.length]);

  const loopedStrengths = [...strengths, ...strengths, ...strengths];

  return (
    <div className="stat-scroll-shell" aria-label="Scrolling player stats">
      <div ref={trackRef} className="stat-scroll-track">
        {loopedStrengths.map((strength, index) => {
          const realIndex = index % strengths.length;

          return (
            <article
              key={`${strength}-${index}`}
              data-stat-card
              className={`inventory-slot stat-scroll-card ${active === realIndex ? "is-active" : ""}`}
            >
              <p className="pixel-label text-[var(--accent)]">STAT {String(realIndex + 1).padStart(2, "0")}</p>
              <p className="mt-3 font-black">{strength}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
