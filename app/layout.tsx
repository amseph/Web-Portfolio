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
  title: "Ivan Jaurigue - UI/UX Designer & Front-End Developer",
  description:
    "Interactive web portfolio of Ivan Jaurigue, a UI/UX-focused Front-End Developer and Graphic Designer creating polished, familiar, and user-friendly digital experiences.",
  openGraph: {
    title: "Ivan Jaurigue - UI/UX Designer & Front-End Developer",
    description:
      "Interactive web portfolio of Ivan Jaurigue, a UI/UX-focused Front-End Developer and Graphic Designer creating polished, familiar, and user-friendly digital experiences.",
    type: "website",
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
