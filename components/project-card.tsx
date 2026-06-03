"use client";

import { ArrowUpRight, Github, Lock, Swords } from "lucide-react";
import { motion } from "framer-motion";
import type { projects } from "@/lib/data";

type Project = (typeof projects)[number];

function EchoBanner({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 750 350"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-labelledby="echo-banner-title"
      preserveAspectRatio="xMidYMid meet"
    >
      <title id="echo-banner-title">ECHO Cashflow App Banner</title>

      <defs>
        <radialGradient id="echoGlow" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#0B4A42" />
          <stop offset="55%" stopColor="#063B35" />
          <stop offset="100%" stopColor="#032B27" />
        </radialGradient>
      </defs>

      <rect width="750" height="350" fill="url(#echoGlow)" />

      <g transform="translate(330 55)" fill="none" stroke="#2FAF87" strokeWidth="14">
        <path d="M40 15 L75 35 L75 78 L40 100 L5 78 L5 35 Z" />
        <path d="M67 20 L100 39 L100 74 L67 94" strokeOpacity="0.85" />
        <path d="M92 27 L120 43 L120 68 L92 84" strokeOpacity="0.65" />
        <path d="M38 38 L57 49 L57 67 L38 78 L20 67 L20 49 Z" fill="#063B35" />
      </g>

      <text
        x="375"
        y="225"
        textAnchor="middle"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="46"
        fontWeight="800"
        fill="#FFFFFF"
        letterSpacing="1"
      >
        ECHO
      </text>

      <text
        x="375"
        y="275"
        textAnchor="middle"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="23"
        fontWeight="500"
        fill="#A8B8B2"
      >
        Access your personal cashflow records.
      </text>
    </svg>
  );
}

function ElyBanner({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 750 350"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-labelledby="ely-banner-title"
      preserveAspectRatio="xMidYMid meet"
    >
      <title id="ely-banner-title">Ely Sales Agent Banner</title>

      <rect width="750" height="350" fill="#FFFFFF" />

      <g
        transform="translate(90 125)"
        fill="none"
        stroke="#000000"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M50 0H10V28" />
        <path d="M50 100H10V72" />
        <path d="M18 50H78" />
        <path d="M95 22C110 38 110 62 95 78" />
        <path d="M120 5C145 32 145 68 120 95" />
      </g>

      <text
        x="240"
        y="160"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="42"
        fontWeight="800"
        fill="#000000"
      >
        Ely Sales Agent
      </text>

      <text
        x="240"
        y="205"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="28"
        fontWeight="400"
        fill="#111111"
      >
        Live customer-call coaching
      </text>
    </svg>
  );
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isEchoProject = project.name === "ECHO";
  const isElyProject = project.name === "Ely Sales Agent";
  const hasCustomBanner = isEchoProject || isElyProject;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={`quest-card tilt-card p-4 sm:p-6 ${index % 2 ? "lg:mt-8" : ""}`}
    >
      <div
        className={`relative mb-6 overflow-hidden border-[3px] border-[var(--border)] bg-[var(--surface-strong)] sm:mb-7 ${
          hasCustomBanner ? "aspect-[15/7]" : "aspect-[4/3]"
        }`}
      >
        {isEchoProject ? (
          <>
            <EchoBanner className="h-full w-full" />
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_7px,rgba(47,175,135,0.08)_7px_8px)]" />
          </>
        ) : isElyProject ? (
          <>
            <ElyBanner className="h-full w-full" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.06),transparent_42%),repeating-linear-gradient(0deg,transparent_0_7px,rgba(0,0,0,0.04)_7px_8px)]" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--accent),transparent_58%),transparent_38%),repeating-linear-gradient(45deg,transparent_0_12px,color-mix(in_srgb,var(--border),transparent_90%)_12px_14px)]" />
        )}
        <div className="absolute left-4 top-4 game-chip bg-[var(--surface)]">
          QUEST 0{index + 1}
        </div>
        <div className="absolute right-5 top-5 grid h-16 w-16 place-items-center border-4 border-[var(--border)] bg-[var(--surface-deep)]">
          <Swords aria-hidden className="text-[var(--accent)]" size={24} />
        </div>
        <div
          className={`mission-preview-panel absolute left-4 right-4 border-4 border-[var(--border)] p-4 sm:left-5 sm:right-5 ${
            isEchoProject
              ? "mission-preview-panel-echo bottom-3 bg-[#021f1c]/90 backdrop-blur-sm sm:bottom-4"
              : isElyProject
                ? "mission-preview-panel-ely bottom-3 bg-white/92 text-black backdrop-blur-sm sm:bottom-4"
                : "bottom-4 bg-[var(--surface-deep)] sm:bottom-5"
          }`}
        >
          <p className={`mission-preview-label pixel-label ${isElyProject ? "text-neutral-500" : "text-[var(--muted)]"}`}>Mission Preview</p>
          <p className="mission-preview-title mt-2 font-pixel text-2xl leading-[1.35]">{project.name}</p>
        </div>
      </div>

      <div className="relative">
        <div className="flex flex-wrap items-center gap-2">
          <span className="game-chip text-[var(--accent)]">{project.status}</span>
          <span className="game-chip">{project.role}</span>
        </div>

        <h3 className="mt-5 font-pixel text-xl leading-[1.45] sm:mt-6">{project.name}</h3>
        <p className="mt-3 text-sm leading-7 text-[var(--muted)] sm:leading-8">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.slice(0, 7).map((tech) => (
            <span key={tech} className="game-chip">
              {tech}
            </span>
          ))}
        </div>

        <ul className="mt-5 grid gap-2.5 text-sm leading-7 text-[var(--ink-soft)]">
          {project.features.slice(0, 4).map((feature) => (
            <li key={feature} className="flex gap-2">
              <span className="mt-2 h-2 w-2 shrink-0 bg-[var(--accent-strong)]" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap gap-3">
          {project.live ? (
            <a href={project.live} target="_blank" rel="noreferrer" className="pixel-button px-4">
              Live Demo <ArrowUpRight aria-hidden size={16} />
            </a>
          ) : (
            <span className="game-chip cursor-not-allowed opacity-70">
              <Lock aria-hidden size={16} /> No Live Demo
            </span>
          )}
          <a href={project.repo} target="_blank" rel="noreferrer" className="pixel-button secondary px-4">
            <Github aria-hidden size={16} /> GitHub
          </a>
        </div>
      </div>
    </motion.article>
  );
}
