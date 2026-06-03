import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Gamepad2,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { ProjectCard } from "@/components/project-card";
import {
  CardSwap,
  GradualBlur,
  LogoLoop,
  RotatingText,
  TrueFocus,
} from "@/components/react-bits";
import { DifficultySelector } from "@/components/difficulty-selector";
import { HeroCharacterPortrait } from "@/components/hero-character-portrait";
import { IntroSplash } from "@/components/intro-splash";
import { PixelLogo } from "@/components/pixel-logo";
import { PortfolioAudio } from "@/components/portfolio-audio";
import { Reveal } from "@/components/reveal";
import { StatScroll } from "@/components/stat-scroll";
import { TechInventory } from "@/components/tech-inventory";
import { ThemeModeLabel } from "@/components/theme-mode-label";
import { ThemeToggle } from "@/components/theme-toggle";
import { education, profile, projects, socials, strengths, techGroups } from "@/lib/data";

const socialIcons = {
  Email: Mail,
  GitHub: Github,
  LinkedIn: Linkedin,
  Discord: MessageCircle,
};

const menuItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Tech Inventory", href: "#stack" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
const gameLoop = ["Start Screen", "Player Profile", "Quest Log", "Tech Inventory", "Achievements", "NPC Dialogue"];

function RetroSectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "right";
}) {
  const isRightAligned = align === "right";

  return (
    <Reveal
      className={`mb-10 grid gap-4 sm:mb-12 sm:gap-5 ${
        isRightAligned ? "lg:grid-cols-[0.34fr_0.66fr] lg:items-end" : "max-w-4xl justify-items-start"
      }`}
    >
      <p className="pixel-label text-[var(--accent)]">[{eyebrow}]</p>
      <div className={isRightAligned ? "text-right" : "text-left"}>
        <h2 className="font-pixel text-[clamp(1.55rem,4.5vw,3.6rem)] leading-[1.25] text-balance [overflow-wrap:anywhere] sm:leading-[1.2]">{title}</h2>
        {copy ? <p className={`mt-5 max-w-2xl text-base leading-8 text-[var(--muted)] ${isRightAligned ? "ml-auto" : ""}`}>{copy}</p> : null}
      </div>
    </Reveal>
  );
}

export default function Home() {
  return (
    <main className="overflow-hidden">
      <IntroSplash />
      <GradualBlur />
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
        <nav aria-label="Primary navigation" className="pixel-frame mx-auto flex max-w-6xl items-center justify-between gap-3 bg-[var(--surface)] px-3 py-3">
          <a href="#home" className="flex items-center gap-3 px-2 font-black">
            <span className="grid h-10 w-10 place-items-center border-2 border-[var(--border)] bg-[var(--foreground)] text-[var(--background)]">
              <PixelLogo className="h-7 w-7 text-current" />
            </span>
            <span className="hidden font-pixel text-xs sm:inline">IVAN.EXE</span>
          </a>
          <div className="hidden items-center gap-2 md:flex">
            {menuItems.map((item) => (
              <a key={item.label} href={item.href} className="game-chip justify-center transition hover:-translate-y-1 hover:bg-[var(--accent)] hover:text-[var(--background)]">
                {item.label}
              </a>
            ))}
          </div>
          <div className="top-control-cluster">
            <ThemeToggle />
            <PortfolioAudio />
          </div>
        </nav>
      </header>

      <section id="home" className="relative min-h-screen px-4 pb-20 pt-32 sm:pt-40">
        <div className="pointer-events-none absolute inset-x-0 top-28 overflow-hidden py-4 opacity-55">
          <div className="marquee-track flex w-max gap-6 font-pixel text-[9vw] uppercase leading-none text-[color-mix(in_srgb,var(--foreground),transparent_90%)]">
            {[...gameLoop, ...gameLoop].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </div>

        <div className="dashboard-grid relative mx-auto max-w-7xl">
          <Reveal className="grid gap-4">
            <ThemeModeLabel />
            <div className="rpg-panel">
              <div className="grid grid-cols-[64px_1fr] items-center gap-4 sm:grid-cols-[72px_1fr]">
                <div className="grid h-16 w-16 place-items-center border-4 border-[var(--border)] bg-[var(--surface-deep)] text-[var(--accent)] sm:h-20 sm:w-20">
                  <PixelLogo className="h-10 w-10 text-current sm:h-12 sm:w-12" />
                </div>
                <div>
                  <p className="font-pixel text-sm leading-6 [word-break:keep-all]">HMU!</p>
                  <p className="mt-2 text-xs font-bold text-[var(--muted)]">Help build the next quest screen.</p>
                </div>
              </div>
            </div>
            <div className="rpg-panel">
              <h2 className="font-pixel text-sm">Main Menu</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Retro 8-bit Portfolio</p>
              <div className="mt-5 grid gap-3">
                <a className="rpg-menu-button" href="#about">Who Am I?</a>
                <a className="rpg-menu-button" href="#projects">My Quests</a>
                <a className="rpg-menu-button" href="#stack">Tech Inventory</a>
                <a className="rpg-menu-button" href="#contact">Talk</a>
              </div>
            </div>
            <div className="rpg-panel dark">
              <p className="pixel-label text-[var(--accent-danger)]">Warning</p>
              <p className="mt-3 text-sm font-black leading-6 text-[var(--accent-danger)]">Generic UI defeated. RPG interface loaded.</p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="grid gap-4">
            <div className="rpg-panel scanline">
              <p className="font-pixel text-sm">Party (3/3)</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                {["Wizard MP", "Troll HP", "Orc XP"].map((label, index) => (
                  <div key={label}>
                    <div className="mb-2 flex justify-between gap-3 text-xs font-black">
                      <span>{label}</span>
                      <span>{index === 0 ? "140/190" : index === 1 ? "320/450" : "950/1200"}</span>
                    </div>
                    <div className="stat-bar">
                      <span className={index === 0 ? "stat-mp w-[74%]" : index === 1 ? "stat-hp w-[71%]" : "stat-xp w-[79%]"} />
                    </div>
                    <div className="mt-5 grid h-24 place-items-center border-2 border-[var(--border)] bg-[var(--surface-deep)] font-pixel text-2xl text-[var(--accent)]">
                      {index === 0 ? "UX" : index === 1 ? "FE" : "GD"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rpg-panel">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="pixel-label text-[var(--accent)]">Character Intro</span>
                <Gamepad2 aria-hidden size={18} className="text-[var(--accent)]" />
              </div>
              <h1 className="mt-5 font-pixel text-[clamp(1.8rem,5vw,4.3rem)] leading-[1.18] text-balance">
                Hey, I&apos;m <span className="text-[var(--accent)]">Ivan</span>.
                <span className="mt-4 block text-[0.42em] leading-[1.75]">
                  UI/UX-focused <RotatingText words={["Frontend", "Interface", "Product"]} /> Developer.
                </span>
              </h1>
              <p className="mt-6 max-w-3xl text-sm leading-7 text-[var(--muted)] sm:text-base sm:leading-8">{profile.subtitle}</p>
              <div className="mt-6 font-pixel text-base leading-[1.85] sm:text-lg">
                <TrueFocus words={["Polished", "Familiar", "Interactive"]} />
              </div>
              <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
                <a className="pixel-button gold px-6" href="#about">Press Start</a>
                <a className="pixel-button px-6" href="#projects">Quest Log <ArrowRight aria-hidden size={16} /></a>
              </div>
            </div>

            <div className="dialogue-box p-5">
              <div className="grid gap-4 sm:grid-cols-[84px_1fr]">
                <div className="grid h-20 w-20 place-items-center border-4 border-[var(--border)] bg-[var(--accent-cool)] text-[var(--contrast-ink)]">
                  <PixelLogo className="h-12 w-12 text-current" />
                </div>
                <div>
                  <p className="font-pixel text-sm text-[var(--accent)]">Ivan</p>
                  <p className="mt-2 leading-7 text-[var(--foreground)]">Choose a route from the menu, inspect the quest log, or open the inventory.</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.14} className="grid gap-4">
            <HeroCharacterPortrait />
            <div className="rpg-panel dark difficulty-panel">
              <p className="difficulty-panel-title font-pixel text-sm">Select Difficulty</p>
              <p className="difficulty-panel-copy mt-3 text-xs font-bold leading-6">Tune motion and retro effects.</p>
              <DifficultySelector />
            </div>
            <div className="rpg-panel">
              <p className="font-pixel text-sm">Player Status</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="game-chip">Level 42</span>
                <span className="game-chip">Warrior</span>
                <span className="game-chip">Online</span>
              </div>
              <div className="mt-5 grid gap-2">
                {socials.map((social) => {
                  const Icon = socialIcons[social.label as keyof typeof socialIcons];
                  return (
                    <a key={social.label} href={social.href} target={social.href.startsWith("http") ? "_blank" : undefined} rel={social.href.startsWith("http") ? "noreferrer" : undefined} className="game-chip justify-between">
                      <span className="flex items-center gap-2"><Icon aria-hidden size={16} /> {social.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
        <a href="#about" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-pixel text-[0.65rem] text-[var(--muted)] sm:flex">
          Scroll <ArrowDown aria-hidden size={16} />
        </a>
      </section>

      <section id="about" className="section-shell">
        <div className="mx-auto max-w-6xl">
          <RetroSectionHeading eyebrow="Player Profile" title="Stats, traits, and class specialty." copy={profile.focus} align="right" />
          <div className="profile-layout grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-8">
            <Reveal className="min-w-0">
              <div className="hud-panel profile-panel min-w-0 p-6 sm:p-8">
                <div className="mb-6 flex flex-wrap gap-3">
                  <span className="game-chip">Class: Front-End Developer</span>
                  <span className="game-chip">Guild: {profile.club}</span>
                  <span className="game-chip">Badge: {profile.clubRole}</span>
                </div>
                <p className="max-w-full text-base leading-8 text-[var(--ink-soft)] [overflow-wrap:anywhere] sm:text-lg sm:leading-9">{profile.about}</p>
                <div className="mt-6">
                  <StatScroll strengths={strengths} />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="profile-build min-w-0">
              <CardSwap
                cards={[
                  { label: "Trait Card", title: "Creative", copy: "A visual thinker who keeps interfaces useful and memorable.", image: "/Creative.png" },
                  { label: "Main Skill", title: "UI/UX", copy: "Familiar flows, clean hierarchy, and smooth interaction.", image: "/UI.png" },
                  { label: "Build Style", title: "Frontend", copy: "Responsive React interfaces with complete polished states.", image: "/Frontend.png" },
                ]}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section id="projects" className="section-shell">
        <div className="mx-auto max-w-6xl">
          <RetroSectionHeading eyebrow="Quest Log" title="Quests contributed, shipped, and leveling up." align="left" />
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="stack" className="section-shell overflow-hidden">
        <div className="mx-auto max-w-6xl">
          <RetroSectionHeading eyebrow="Tech Inventory" title="Equipped tools, skill slots, and unlocks." copy="A compact inventory grid for the tools Ivan uses to design, build, ship, and keep learning." align="right" />
          <LogoLoop items={techGroups.flatMap((group) => group.items)} />
          <Reveal className="mt-10">
            <TechInventory groups={techGroups.map(({ title, items }) => ({ title, items }))} />
          </Reveal>
        </div>
      </section>

      <section id="education" className="section-shell">
        <div className="mx-auto max-w-6xl">
          <RetroSectionHeading eyebrow="Achievements" title="Achievements, guild role, and certificates unlocked." align="left" />
          <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:gap-8">
            <Reveal className="lg:sticky lg:top-28">
              <div className="hud-panel p-7">
                <education.icon aria-hidden className="text-[var(--accent)]" size={34} />
                <h3 className="mt-5 font-pixel text-2xl leading-[1.35]">{education.school}</h3>
                <p className="mt-4 text-lg font-black">{education.program}</p>
                <p className="mt-2 text-sm text-[var(--muted)]">{education.level}</p>
                <p className="mt-5 leading-8 text-[var(--muted)]">{education.summary}</p>
                <p className="mt-5 border-2 border-[var(--border)] bg-[var(--surface-strong)] p-4 text-sm font-black">
                  {education.organization}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="grid gap-3 sm:grid-cols-2">
                {education.highlights.map((highlight) => (
                  <div key={highlight} className="achievement-badge">
                    <BadgeCheck aria-hidden className="mt-1 shrink-0 text-[var(--accent-strong)]" size={18} />
                    {highlight}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="contact" className="section-shell">
        <div className="mx-auto max-w-6xl">
          <RetroSectionHeading
            eyebrow="NPC Dialogue"
            title="Slide right in if you want to collaborate on a project!"
            copy="Choose a menu option or send a short message. Email stays available as the fallback while service credentials are not configured."
            align="right"
          />
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <div className="dialogue-box p-7">
                <p className="pixel-label text-[var(--accent)]">NPC: Ivan</p>
                <h3 className="mt-4 font-pixel text-xl leading-[1.55]">Need a polished interface?</h3>
                <p className="mt-4 leading-8 text-[var(--muted)]">
                  I am open to UI/UX-focused frontend work, interactive web builds, product interfaces, and collaborations that need a clean visual direction.
                </p>
                <div className="mt-7 grid gap-3">
                  {socials.map((social) => {
                    const Icon = socialIcons[social.label as keyof typeof socialIcons];
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target={social.href.startsWith("http") ? "_blank" : undefined}
                        rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                        className="game-chip justify-between transition hover:-translate-y-1 hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                      >
                        <span className="flex items-center gap-3">
                          <Icon aria-hidden size={18} /> {social.label}
                        </span>
                        <ArrowRight aria-hidden size={16} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
      <footer className="portfolio-footer px-4 pb-10 pt-2 text-center">
        <div className="mx-auto max-w-6xl border-t-[3px] border-[color-mix(in_srgb,var(--border),transparent_45%)] pt-8">
          <p className="font-pixel text-[0.62rem] leading-6 text-[var(--foreground)] sm:text-[0.7rem]">
            Designed &amp; Built by Ivan Joseph Jaurigue
          </p>
          <p className="mt-3 font-pixel text-[0.55rem] leading-5 text-[var(--accent)]">© 2026</p>
          <p className="mt-3 text-xs font-semibold leading-6 text-[var(--muted)] sm:text-sm">
            Built with open-source tools and components.
          </p>
        </div>
      </footer>
    </main>
  );
}
