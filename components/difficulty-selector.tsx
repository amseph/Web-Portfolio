"use client";

import { useEffect, useState } from "react";

const modes = [
  {
    id: "easy",
    label: "Easy",
    copy: "Clean view",
  },
  {
    id: "normal",
    label: "Normal",
    copy: "Balanced",
  },
  {
    id: "hard",
    label: "Hard",
    copy: "Full RPG",
  },
] as const;

type Difficulty = (typeof modes)[number]["id"];

export function DifficultySelector() {
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");

  useEffect(() => {
    document.documentElement.dataset.difficulty = difficulty;
  }, [difficulty]);

  return (
    <div className="mt-5 grid gap-3" role="radiogroup" aria-label="Viewing mode">
      {modes.map((mode) => (
        <button
          key={mode.id}
          type="button"
          role="radio"
          aria-checked={difficulty === mode.id}
          onClick={() => setDifficulty(mode.id)}
          className={`rpg-menu-button difficulty-button ${difficulty === mode.id ? "is-active" : ""}`}
        >
          <span>{mode.label}</span>
          <small>{mode.copy}</small>
        </button>
      ))}
    </div>
  );
}
