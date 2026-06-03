# Ivan Joseph Jaurigue Portfolio

A retro RPG and pixel-inspired web portfolio for Ivan Joseph Jaurigue, built with Next.js, React, TypeScript, and Tailwind CSS. The site presents projects, skills, achievements, contact flow, theme switching, intro loading animation, background audio, and toast feedback in an Atari/Nintendo styled interface.

## Features

- Retro RPG/pixel portfolio layout with quest, stats, inventory, achievements, and NPC dialogue sections
- Atari and Nintendo visual modes with persisted theme preference
- Player portrait image swap with local glitch animation
- Game Boy style loading intro with skip and mute controls
- Background music using `/public/BGM.mp3` with mute and volume persistence
- Contact flow with name/email validation, email format checks, and 8bit/Sonner toast feedback
- Responsive layouts for desktop, tablet, and mobile
- Accessible controls with labels, keyboard-focusable buttons, and reduced-motion handling
- Project cards with external live/demo and repository links

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React
- Sonner with 8bitcn toast styling
- shadcn/ui registry utilities

## Design Direction

The portfolio uses a retro RPG and pixel-art direction: high-contrast panels, pixel borders, game-menu controls, quest language, compact labels, and subtle glitch/motion effects. Atari Mode uses a darker arcade-inspired palette, while Nintendo Mode uses a lighter handheld-console feel.

## Setup

Install dependencies:

```bash
npm install
```

No environment variables are required for the current static portfolio experience.

## Run Locally

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Run deployment checks:

```bash
npm run lint
npm run typecheck
npm run build
```

## Vercel Deployment

This project is ready for Vercel with the default Next.js settings.

- Framework preset: Next.js
- Build command: `npm run build`
- Install command: `npm install`
- Output directory: handled automatically by Vercel
- Environment variables: none required

Keep the media files in `public/` because the loading screen, portrait, and audio controls reference them directly:

- `public/RetroLoading.mp4`
- `public/BGM.mp3`
- `public/ME.png`
- `public/8BIT.png`

## Credits

Built with open-source tools and components, including Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Lucide React, Sonner, shadcn/ui, and 8bitcn toast styling.

## Author

Designed and built by Ivan Joseph Jaurigue.
