"use client";

import { useState } from "react";
import { Code2, Database, Layers3, Wrench } from "lucide-react";
import type { CSSProperties } from "react";

type TechGroup = { title: string; items: string[] };
type ItemIcon = "code" | "bolt" | "db" | "chart" | "cloud" | "brush" | "tool" | "node";

type ItemMeta = { type: string; accent: string; icon: ItemIcon; role: string };

const fallbackMeta: ItemMeta = {
  type: "Utility Item",
  accent: "var(--accent)",
  icon: "tool",
  role: "A flexible tool used to support polished product builds.",
};

export const itemMeta: Record<string, ItemMeta> = {
  HTML: { type: "Markup Rune", accent: "var(--accent-danger)", icon: "code", role: "Structures semantic, accessible page content." },
  CSS: { type: "Style Tile", accent: "var(--accent-cool)", icon: "brush", role: "Shapes responsive layouts, polish, and visual states." },
  JavaScript: { type: "Logic Spark", accent: "var(--accent)", icon: "bolt", role: "Adds interaction, state, and browser behavior." },
  TypeScript: { type: "Typed Core", accent: "var(--accent-cool)", icon: "code", role: "Keeps React code safer, clearer, and easier to scale." },
  "C++": { type: "System Relic", accent: "var(--accent-special)", icon: "tool", role: "Builds lower-level logic and programming fundamentals." },
  React: { type: "UI Engine", accent: "var(--accent-cool)", icon: "bolt", role: "Composes reusable, stateful interface components." },
  "Next.js": { type: "Route Cartridge", accent: "var(--foreground)", icon: "cloud", role: "Powers fast React apps with routing and production builds." },
  "Tailwind CSS": { type: "Utility Armor", accent: "var(--accent-cool)", icon: "brush", role: "Speeds up consistent responsive styling." },
  "React Bits": { type: "Motion Charm", accent: "var(--accent-special)", icon: "bolt", role: "Adds expressive interaction and visual effects." },
  "Framer Motion": { type: "Animation Gear", accent: "var(--accent-special)", icon: "bolt", role: "Creates smooth transitions and scroll reveals." },
  Recharts: { type: "Stat Lens", accent: "var(--accent-strong)", icon: "chart", role: "Turns product data into readable dashboard visuals." },
  Supabase: { type: "Core Database", accent: "var(--accent-strong)", icon: "db", role: "Handles auth, data storage, and backend features." },
  "REST APIs": { type: "Link Module", accent: "var(--accent)", icon: "cloud", role: "Connects frontends to services and product data." },
  PostgreSQL: { type: "Data Vault", accent: "var(--accent-cool)", icon: "db", role: "Stores relational data with strong query support." },
  MySQL: { type: "Query Chest", accent: "var(--accent)", icon: "db", role: "Manages structured data for traditional app backends." },
  MongoDB: { type: "Document Orb", accent: "var(--accent-strong)", icon: "db", role: "Stores flexible document-shaped app data." },
  "Node.js": { type: "Runtime Core", accent: "var(--accent-strong)", icon: "node", role: "Runs JavaScript tooling and server-side logic." },
  npm: { type: "Package Crate", accent: "var(--accent-danger)", icon: "tool", role: "Manages scripts, packages, and project dependencies." },
  Vercel: { type: "Deploy Beacon", accent: "var(--foreground)", icon: "cloud", role: "Ships polished web apps to production quickly." },
  Postman: { type: "API Compass", accent: "var(--accent)", icon: "tool", role: "Tests requests, payloads, and API behavior." },
  Render: { type: "Host Relay", accent: "var(--accent-cool)", icon: "cloud", role: "Deploys web services and hosted app backends." },
  Figma: { type: "Design Token", accent: "var(--accent-special)", icon: "brush", role: "Designs flows, screens, components, and prototypes." },
  Canva: { type: "Graphic Card", accent: "var(--accent-cool)", icon: "brush", role: "Creates quick branded graphics and visual assets." },
  Git: { type: "Version Key", accent: "var(--accent-danger)", icon: "tool", role: "Tracks changes and keeps work recoverable." },
  GitHub: { type: "Repo Gate", accent: "var(--foreground)", icon: "cloud", role: "Hosts repositories, collaboration, and project history." },
};

const categoryIcons = {
  "Languages, Backend & Core": Code2,
  "Frameworks, Libraries & Runtime": Layers3,
  "Database & Tools": Database,
  "Other Tools": Wrench,
};

export function PixelItemIcon({ icon, accent }: { icon: ItemIcon; accent: string }) {
  return (
    <svg viewBox="0 0 48 48" className="tech-item-svg" aria-hidden>
      <path d="M9 13H39V38H13L9 34Z" fill="var(--border)" />
      <path d="M6 9H36V34H6Z" fill="var(--surface)" stroke="var(--border)" strokeWidth="3" />
      <path d="M11 5H31L36 9H6Z" fill={accent} stroke="var(--border)" strokeWidth="3" />
      <path d="M36 9L41 14V38L36 34Z" fill="color-mix(in srgb, var(--border), transparent 35%)" />
      <rect x="11" y="15" width="20" height="14" fill="var(--surface-strong)" stroke="var(--border)" strokeWidth="2" />
      {icon === "code" && (
        <>
          <rect x="13" y="20" width="5" height="5" fill={accent} />
          <rect x="18" y="25" width="5" height="5" fill={accent} />
          <rect x="27" y="20" width="5" height="5" fill={accent} />
          <rect x="23" y="30" width="5" height="4" fill="var(--muted)" />
        </>
      )}
      {icon === "bolt" && (
        <>
          <rect x="23" y="14" width="8" height="6" fill={accent} />
          <rect x="17" y="20" width="11" height="6" fill={accent} />
          <rect x="23" y="26" width="8" height="6" fill={accent} />
          <rect x="15" y="32" width="9" height="6" fill={accent} />
        </>
      )}
      {icon === "db" && (
        <>
          <rect x="15" y="16" width="18" height="5" fill={accent} />
          <rect x="13" y="21" width="22" height="8" fill="var(--surface-strong)" stroke="var(--border)" strokeWidth="2" />
          <rect x="13" y="29" width="22" height="7" fill="var(--surface-strong)" stroke="var(--border)" strokeWidth="2" />
          <rect x="18" y="24" width="12" height="3" fill={accent} />
        </>
      )}
      {icon === "chart" && (
        <>
          <rect x="15" y="29" width="5" height="7" fill={accent} />
          <rect x="22" y="23" width="5" height="13" fill="var(--accent-cool)" />
          <rect x="29" y="17" width="5" height="19" fill="var(--accent-strong)" />
          <rect x="14" y="36" width="22" height="3" fill="var(--border)" />
        </>
      )}
      {icon === "cloud" && (
        <>
          <rect x="14" y="25" width="22" height="9" fill={accent} />
          <rect x="18" y="19" width="10" height="7" fill={accent} />
          <rect x="27" y="22" width="7" height="5" fill={accent} />
          <rect x="17" y="29" width="16" height="3" fill="var(--surface)" />
        </>
      )}
      {icon === "brush" && (
        <>
          <rect x="28" y="14" width="7" height="7" fill={accent} />
          <rect x="23" y="20" width="7" height="7" fill={accent} />
          <rect x="18" y="26" width="7" height="7" fill="var(--muted)" />
          <rect x="13" y="33" width="6" height="6" fill={accent} />
        </>
      )}
      {icon === "tool" && (
        <>
          <rect x="16" y="15" width="7" height="7" fill={accent} />
          <rect x="23" y="22" width="6" height="6" fill={accent} />
          <rect x="29" y="28" width="7" height="7" fill={accent} />
          <rect x="13" y="34" width="10" height="4" fill="var(--muted)" />
        </>
      )}
      {icon === "node" && (
        <>
          <rect x="18" y="17" width="15" height="15" fill={accent} />
          <rect x="14" y="21" width="5" height="7" fill={accent} />
          <rect x="32" y="21" width="5" height="7" fill={accent} />
          <rect x="22" y="23" width="7" height="4" fill="var(--surface)" />
        </>
      )}
    </svg>
  );
}

export function TechItemMini({ item }: { item: string }) {
  const meta = itemMeta[item] ?? fallbackMeta;

  return (
    <span className="logo-loop-item" style={{ "--item-accent": meta.accent } as CSSProperties}>
      <PixelItemIcon icon={meta.icon} accent={meta.accent} />
      <span>{item}</span>
    </span>
  );
}

export function TechInventory({ groups }: { groups: TechGroup[] }) {
  const firstItem = groups[0]?.items[0] ?? "";
  const [selectedItem, setSelectedItem] = useState(firstItem);
  const selectedGroup = groups.find((group) => group.items.includes(selectedItem)) ?? groups[0];
  const selectedMeta = itemMeta[selectedItem] ?? fallbackMeta;

  return (
    <div className="tech-inventory-grid">
      {groups.map((group) => {
        const CategoryIcon = categoryIcons[group.title as keyof typeof categoryIcons] ?? Wrench;

        return (
          <section key={group.title} className="inventory-category" style={{ "--item-accent": itemMeta[group.items[0]]?.accent ?? "var(--accent)" } as CSSProperties}>
            <div className="inventory-category-lid">
              <div className="flex min-w-0 items-center gap-3">
                <span className="inventory-category-icon" aria-hidden>
                  <CategoryIcon size={18} />
                </span>
                <h3>{group.title}</h3>
              </div>
              <span>{group.items.length}</span>
            </div>
          <div className="inventory-items-grid">
            {group.items.map((item) => {
              const meta = itemMeta[item] ?? fallbackMeta;
              const isSelected = selectedItem === item;

              return (
                <button
                  key={item}
                  type="button"
                  className={`tech-item-card ${isSelected ? "is-selected" : ""}`}
                  style={{ "--item-accent": meta.accent } as CSSProperties}
                  aria-pressed={isSelected}
                  aria-describedby="tech-inventory-details"
                  onClick={() => setSelectedItem(item)}
                  onFocus={() => setSelectedItem(item)}
                  onMouseEnter={() => setSelectedItem(item)}
                >
                  <span className="tech-item-icon-shell">
                    <PixelItemIcon icon={meta.icon} accent={meta.accent} />
                  </span>
                  <span className="tech-item-name">{item}</span>
                </button>
              );
            })}
          </div>
        </section>
        );
      })}
      <aside
        id="tech-inventory-details"
        className="inventory-detail-panel"
        style={{ "--item-accent": selectedMeta.accent } as CSSProperties}
        aria-live="polite"
      >
        <p className="pixel-label text-[var(--item-accent)]">Selected Item</p>
        <div className="inventory-detail-main">
          <PixelItemIcon icon={selectedMeta.icon} accent={selectedMeta.accent} />
          <div>
            <h3>{selectedItem}</h3>
            <p>{selectedGroup?.title ?? "Inventory"} / {selectedMeta.type}</p>
          </div>
        </div>
        <p className="inventory-detail-copy">{selectedMeta.role}</p>
      </aside>
    </div>
  );
}
