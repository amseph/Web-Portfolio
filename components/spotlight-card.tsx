"use client";

import type { ComponentProps } from "react";

export function SpotlightCard({ className = "", children, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={`spotlight ${className}`}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
      }}
      {...props}
    >
      {children}
    </div>
  );
}
