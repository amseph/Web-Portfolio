"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const FALLBACK_DURATION_MS = 12000;
const GLITCH_EXIT_DURATION_MS = 820;
const PORTFOLIO_FADE_IN_DURATION_MS = 900;

export function IntroSplash() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackTimerRef = useRef<number | null>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const isClosingRef = useRef(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [needsUserPlay, setNeedsUserPlay] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setIsVisible(false);
      document.body.classList.add("portfolio-ready");
      window.dispatchEvent(new Event("portfolio:intro-complete"));
      return;
    }

    setIsVisible(true);

    const video = videoRef.current;
    const closeIntro = () => {
      if (isClosingRef.current) {
        return;
      }

      isClosingRef.current = true;
      setNeedsUserPlay(false);
      setIsClosing(true);
      fadeTimerRef.current = window.setTimeout(() => {
        setIsVisible(false);
        document.body.classList.add("portfolio-ready");
        window.setTimeout(() => window.dispatchEvent(new Event("portfolio:intro-complete")), PORTFOLIO_FADE_IN_DURATION_MS);
      }, GLITCH_EXIT_DURATION_MS);
    };

    fallbackTimerRef.current = window.setTimeout(closeIntro, FALLBACK_DURATION_MS);

    if (video) {
      video.muted = false;
      video.volume = 1;
      video.play().catch(() => {
        setNeedsUserPlay(true);
      });
    }

    return () => {
      if (fallbackTimerRef.current) {
        window.clearTimeout(fallbackTimerRef.current);
      }
      if (fadeTimerRef.current) {
        window.clearTimeout(fadeTimerRef.current);
      }
    };
  }, []);

  const closeIntro = () => {
    if (isClosingRef.current) {
      return;
    }

    isClosingRef.current = true;
    if (fallbackTimerRef.current) {
      window.clearTimeout(fallbackTimerRef.current);
    }
    setNeedsUserPlay(false);
    setIsClosing(true);
    fadeTimerRef.current = window.setTimeout(() => {
      setIsVisible(false);
      document.body.classList.add("portfolio-ready");
      window.setTimeout(() => window.dispatchEvent(new Event("portfolio:intro-complete")), PORTFOLIO_FADE_IN_DURATION_MS);
    }, GLITCH_EXIT_DURATION_MS);
  };

  const handlePlayIntro = async () => {
    const video = videoRef.current;

    if (!video) {
      closeIntro();
      return;
    }

    try {
      video.muted = isMuted;
      await video.play();
      setNeedsUserPlay(false);
    } catch {
      video.muted = true;
      setIsMuted(true);
      await video.play();
      setNeedsUserPlay(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    const nextMuted = !isMuted;

    setIsMuted(nextMuted);
    if (video) {
      video.muted = nextMuted;
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`intro-splash ${isClosing ? "is-closing" : ""}`} role="dialog" aria-modal="true" aria-label="Portfolio intro">
      <video
        ref={videoRef}
        className="intro-splash-video"
        src="/RetroLoading.mp4"
        playsInline
        preload="auto"
        onEnded={closeIntro}
        onCanPlay={() => {
          if (!needsUserPlay) {
            videoRef.current?.play().catch(() => setNeedsUserPlay(true));
          }
        }}
      />
      <div className="intro-splash-vignette" />

      <div className="intro-splash-controls">
        {needsUserPlay ? (
          <button type="button" className="intro-skip-button is-primary" onClick={handlePlayIntro}>
            Play
          </button>
        ) : (
          <button type="button" className="intro-audio-button" onClick={toggleMute} aria-label={isMuted ? "Unmute intro" : "Mute intro"}>
            {isMuted ? <VolumeX aria-hidden size={14} /> : <Volume2 aria-hidden size={14} />}
          </button>
        )}
        <button type="button" className="intro-skip-button" onClick={closeIntro}>
          Skip
        </button>
      </div>
    </div>
  );
}
