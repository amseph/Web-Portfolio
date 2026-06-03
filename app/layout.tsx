import type { Metadata } from "next";
import { Pixelify_Sans, Press_Start_2P } from "next/font/google";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const pixelBody = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const pixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ivanjaurigue.vercel.app"),
  title: "Ivan Jaurigue - UI/UX Designer & Front-End Developer",
  description:
    "Retro RPG-inspired portfolio of Ivan Jaurigue, a UI/UX-focused Front-End Developer and Graphic Designer.",
  icons: { icon: "/WP.png", shortcut: "/WP.png", apple: "/WP.png" },
  openGraph: {
    title: "Ivan Jaurigue - UI/UX Designer & Front-End Developer",
    description:
      "Retro RPG-inspired portfolio of Ivan Jaurigue, a UI/UX-focused Front-End Developer and Graphic Designer.",
    url: "https://ivanjaurigue.vercel.app",
    siteName: "Ivan Jaurigue Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ivan Jaurigue Retro RPG Portfolio Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ivan Jaurigue - UI/UX Designer & Front-End Developer",
    description:
      "Retro RPG-inspired portfolio of Ivan Jaurigue, a UI/UX-focused Front-End Developer and Graphic Designer.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="atari" className={`${pixelBody.variable} ${pixel.variable}`} suppressHydrationWarning>
      <body>
        <Script id="theme-mode-init" strategy="beforeInteractive">
          {`
            try {
              var savedTheme = window.localStorage.getItem("ivan-theme-mode");
              var theme = savedTheme === "nintendo" ? "nintendo" : "atari";
              document.documentElement.dataset.theme = theme;
              document.documentElement.classList.toggle("dark", theme === "atari");
            } catch (_) {
              document.documentElement.dataset.theme = "atari";
              document.documentElement.classList.add("dark");
            }
          `}
        </Script>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
