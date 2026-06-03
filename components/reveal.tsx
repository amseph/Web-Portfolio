"use client";

import { ScrollReveal } from "@/components/react-bits";
import type { ComponentProps } from "react";

type RevealProps = ComponentProps<"div"> & {
  delay?: number;
};

export function Reveal({ children, delay = 0, ...props }: RevealProps) {
  return <ScrollReveal delay={delay} {...props}>{children}</ScrollReveal>;
}
