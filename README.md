# Ivan Joseph Jaurigue Portfolio

A retro RPG and pixel-inspired web portfolio for Ivan Joseph Jaurigue, built with Next.js, React, TypeScript, and Tailwind CSS. The site presents projects, skills, achievements, contact flow, theme switching, intro loading animation, background audio, and toast feedback in an Atari/Nintendo styled interface.

## Live Site

https://ivanjaurigue.vercel.app

## Features

* Retro RPG/pixel portfolio layout with quest, stats, inventory, achievements, and NPC dialogue sections
* Atari and Nintendo visual modes with persisted theme preference
* Player portrait image swap with local glitch animation
* Game Boy style loading intro with skip and mute controls
* Background music with mute and volume persistence
* Contact form with validation, toast feedback, and email delivery
* Responsive layouts for desktop, tablet, and mobile
* Project cards with external live/demo and repository links

## Tech Stack

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS 4
* Framer Motion
* Lucide React
* Sonner with 8bitcn toast styling
* shadcn/ui registry utilities
* Resend for contact form email delivery

## Design Direction

The portfolio follows a retro RPG and pixel-art direction with high-contrast panels, pixel borders, game-menu controls, quest language, compact labels, and subtle glitch/motion effects. Atari Mode uses a darker arcade-inspired palette, while Nintendo Mode uses a lighter handheld-console feel.

## Deployment

Deployed on Vercel:
https://ivanjaurigue.vercel.app

Required environment variables for deployment:

```bash
RESEND_API_KEY=
CONTACT_EMAIL=
```

Required media files in `public/`:

```text
RetroLoading.mp4
BGM.mp3
ME.png
8BIT.png
WP.png
og-image.png
```

## Credits

Built with open-source tools and components, including Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Lucide React, Sonner, shadcn/ui, 8bitcn toast styling, and Resend.

## Author

Designed and built by Ivan Joseph Jaurigue.
