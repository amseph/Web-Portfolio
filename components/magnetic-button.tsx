"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

type MagneticButtonProps = HTMLMotionProps<"a"> & {
  variant?: "primary" | "secondary";
};

export function MagneticButton({
  children,
  className = "",
  variant = "primary",
  ...props
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 16, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 180, damping: 16, mass: 0.35 });

  const base =
    "inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition focus-visible:outline-offset-4";
  const styles =
    variant === "primary"
      ? "bg-[var(--foreground)] text-[var(--background)] shadow-[0_16px_40px_rgba(0,0,0,0.18)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.24)]"
      : "border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--accent)]";

  return (
    <motion.a
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={`${base} ${styles} ${className}`}
      {...props}
    >
      {children}
    </motion.a>
  );
}
