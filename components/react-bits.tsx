"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { TechItemMini } from "@/components/tech-inventory";

export function TrueFocus({ words }: { words: string[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % words.length);
    }, 1700);
    return () => window.clearInterval(timer);
  }, [words.length]);

  return (
    <span className="inline-flex flex-wrap gap-x-4 gap-y-2">
      {words.map((word, index) => (
        <span
          key={word}
          className={`true-focus-word ${active === index ? "is-active" : ""}`}
        >
          {word}
        </span>
      ))}
    </span>
  );
}

export function RotatingText({ words }: { words: string[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % words.length);
    }, 2100);
    return () => window.clearInterval(timer);
  }, [words.length]);

  return (
    <span className="relative inline-grid min-w-[8ch] overflow-hidden align-baseline">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={words[active]}
          initial={{ y: 28, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -28, opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="col-start-1 row-start-1 text-[var(--accent)]"
        >
          {words[active]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function ScrollFloat({
  children,
  className = "",
  distance = 80,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34, filter: "blur(14px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function LogoLoop({ items }: { items: string[] }) {
  const loop = useMemo(() => [...items, ...items, ...items], [items]);

  return (
    <div className="logo-loop" aria-label="Technology loop">
      <div className="logo-loop-track">
        {loop.map((item, index) => (
          <TechItemMini key={`${item}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export function GradualBlur() {
  return <div className="gradual-blur" aria-hidden />;
}

export function GlassSurface({ className = "", children, ...props }: ComponentProps<"div">) {
  return (
    <div className={`glass-surface ${className}`} {...props}>
      {children}
    </div>
  );
}

export function FluidGlass({ className = "", children, ...props }: ComponentProps<"div">) {
  return (
    <div className={`fluid-glass ${className}`} {...props}>
      {children}
    </div>
  );
}

export function TiltedCard({ className = "", children, ...props }: ComponentProps<"div">) {
  return (
    <div className={`tilted-card ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardSwap({
  cards,
}: {
  cards: Array<{ label: string; title: string; copy: string; image: string }>;
}) {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const easyMode = document.documentElement.dataset.difficulty === "easy";

      if (!reducedMotion && !easyMode) {
        setActive((current) => (current + 1) % cards.length);
      }
    }, 2600);

    return () => window.clearInterval(timer);
  }, [cards.length]);

  return (
    <div className="card-swap scroll-stack" aria-label="Auto-cycling player profile trait cards">
      {cards.map((card, index) => {
        const previous = (active - 1 + cards.length) % cards.length;
        const next = (active + 1) % cards.length;
        const state = active === index ? "is-active" : previous === index ? "is-before" : next === index ? "is-after" : "is-hidden";

        return (
          <article
            key={card.title}
            data-profile-card
            className={`card-swap-card ${state}`}
          >
            <div className="card-swap-media" data-fallback={card.title}>
              <Image
                src={card.image}
                alt=""
                fill
                sizes="(min-width: 1180px) 433px, (min-width: 768px) 50vw, 90vw"
                priority={index === active}
                onError={(event) => {
                  event.currentTarget.hidden = true;
                }}
              />
            </div>
            <div className="card-swap-content">
              <span>{card.label}</span>
              <strong>{card.title}</strong>
              <small>{card.copy}</small>
            </div>
          </article>
        );
      })}
    </div>
  );
}
