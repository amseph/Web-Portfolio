"use client";

import React from "react";

import { toast as sonnerToast } from "sonner";
import { CheckCircle2, Info, Loader2, OctagonX, TriangleAlert } from "lucide-react";

import "@/components/ui/8bit/styles/retro.css";

type ToastVariant = "success" | "error" | "warning" | "info" | "loading";

const variantConfig = {
  success: {
    label: "Success",
    icon: CheckCircle2,
    color: "var(--accent-strong)",
  },
  error: {
    label: "Error",
    icon: OctagonX,
    color: "var(--accent-danger)",
  },
  warning: {
    label: "Warning",
    icon: TriangleAlert,
    color: "var(--warning)",
  },
  info: {
    label: "Info",
    icon: Info,
    color: "var(--accent-cool)",
  },
  loading: {
    label: "Loading",
    icon: Loader2,
    color: "var(--accent)",
  },
} satisfies Record<ToastVariant, { label: string; icon: React.ComponentType<{ className?: string; size?: number }>; color: string }>;

function showToast(variant: ToastVariant, title: string, description?: string) {
  return sonnerToast.custom((id) => <Toast id={id} variant={variant} title={title} description={description} />);
}

interface ToastProps {
  id: string | number;
  variant: ToastVariant;
  title: string;
  description?: string;
}

function Toast(props: ToastProps) {
  const { description, title, variant } = props;
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div className="retro relative max-w-[min(24rem,calc(100vw-2rem))]">
      <div className="flex w-full items-start gap-3 border-[3px] border-[var(--border)] bg-[var(--surface-deep)] p-4 text-[var(--foreground)] shadow-[4px_4px_0_var(--border)]">
        <span
          className="mt-0.5 grid size-7 shrink-0 place-items-center border-2 border-[var(--border)] bg-[var(--surface-strong)]"
          style={{ color: config.color }}
          aria-hidden
        >
          <Icon className={variant === "loading" ? "animate-spin" : undefined} size={15} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[0.55rem] leading-5" style={{ color: config.color }}>
            {config.label}
          </p>
          <div className="w-full">
            <p className="text-xs font-black leading-6">{title}</p>
            {description ? <p className="mt-1 text-[0.65rem] leading-5 text-[var(--muted)]">{description}</p> : null}
          </div>
        </div>
      </div>

      <div className="absolute -top-1.5 w-1/2 left-1.5 h-1.5 bg-foreground dark:bg-ring" />
      <div className="absolute -top-1.5 w-1/2 right-1.5 h-1.5 bg-foreground dark:bg-ring" />
      <div className="absolute -bottom-1.5 w-1/2 left-1.5 h-1.5 bg-foreground dark:bg-ring" />
      <div className="absolute -bottom-1.5 w-1/2 right-1.5 h-1.5 bg-foreground dark:bg-ring" />
      <div className="absolute top-0 left-0 size-1.5 bg-foreground dark:bg-ring" />
      <div className="absolute top-0 right-0 size-1.5 bg-foreground dark:bg-ring" />
      <div className="absolute bottom-0 left-0 size-1.5 bg-foreground dark:bg-ring" />
      <div className="absolute bottom-0 right-0 size-1.5 bg-foreground dark:bg-ring" />
      <div className="absolute top-1 -left-1.5 h-1/2 w-1.5 bg-foreground dark:bg-ring" />
      <div className="absolute bottom-1 -left-1.5 h-1/2 w-1.5 bg-foreground dark:bg-ring" />
      <div className="absolute top-1 -right-1.5 h-1/2 w-1.5 bg-foreground dark:bg-ring" />
      <div className="absolute bottom-1 -right-1.5 h-1/2 w-1.5 bg-foreground dark:bg-ring" />
    </div>
  );
}

export const toast = {
  success: (title: string, description?: string) => showToast("success", title, description),
  error: (title: string, description?: string) => showToast("error", title, description),
  warning: (title: string, description?: string) => showToast("warning", title, description),
  info: (title: string, description?: string) => showToast("info", title, description),
  loading: (title: string, description?: string) => showToast("loading", title, description),
  message: (title: string, description?: string) => showToast("info", title, description),
  dismiss: sonnerToast.dismiss,
};
