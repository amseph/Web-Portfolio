"use client";

import { Volume1, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ChangeEvent } from "react";

const DEFAULT_VOLUME = 0.2;
const STORAGE_MUTED_KEY = "ivan-bgm-muted";
const STORAGE_VOLUME_KEY = "ivan-bgm-volume";

function readStoredVolume() {
  if (typeof window === "undefined") {
    return DEFAULT_VOLUME;
  }

  let stored: string | null = null;

  try {
    stored = window.localStorage.getItem(STORAGE_VOLUME_KEY);
  } catch {
    return DEFAULT_VOLUME;
  }

  const parsed = stored ? Number(stored) : DEFAULT_VOLUME;

  if (Number.isNaN(parsed)) {
    return DEFAULT_VOLUME;
  }

  return Math.min(1, Math.max(0, parsed));
}

function readStoredMuted() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return window.localStorage.getItem(STORAGE_MUTED_KEY) === "true";
  } catch {
    return false;
  }
}

export function PortfolioAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const storedVolume = readStoredVolume();
    const storedMuted = readStoredMuted();

    setVolume(storedVolume);
    setIsMuted(storedMuted);

    const audio = audioRef.current;
    if (audio) {
      audio.volume = storedVolume;
      audio.muted = storedMuted;
    }

    const handleReady = () => setIsReady(true);
    window.addEventListener("portfolio:intro-complete", handleReady);

    if (document.body.classList.contains("portfolio-ready")) {
      handleReady();
    }

    return () => window.removeEventListener("portfolio:intro-complete", handleReady);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.volume = volume;
    audio.muted = isMuted;

    try {
      window.localStorage.setItem(STORAGE_VOLUME_KEY, String(volume));
      window.localStorage.setItem(STORAGE_MUTED_KEY, String(isMuted));
    } catch {
      // Storage can be unavailable in private or restricted browser contexts.
    }
  }, [isMuted, volume]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!isReady || !audio || isMuted) {
      return;
    }

    const playMusic = async () => {
      try {
        await audio.play();
        setIsBlocked(false);
      } catch {
        setIsBlocked(true);
      }
    };

    playMusic();
  }, [isMuted, isReady]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!isReady || !isBlocked || !audio || isMuted) {
      return;
    }

    const playAfterInteraction = async () => {
      try {
        await audio.play();
        setIsBlocked(false);
      } catch {
        setIsBlocked(true);
      }
    };

    window.addEventListener("pointerdown", playAfterInteraction, { once: true });
    window.addEventListener("keydown", playAfterInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", playAfterInteraction);
      window.removeEventListener("keydown", playAfterInteraction);
    };
  }, [isBlocked, isMuted, isReady]);

  const toggleMute = async () => {
    const nextMuted = !isMuted;
    const audio = audioRef.current;

    setIsMuted(nextMuted);

    if (!nextMuted && isReady && audio) {
      try {
        await audio.play();
        setIsBlocked(false);
      } catch {
        setIsBlocked(true);
      }
    }
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value) / 100);
  };

  const VolumeIcon = isMuted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;
  const volumePercent = Math.round(volume * 100);
  const volumeStyle = { "--volume-level": `${volumePercent}%` } as CSSProperties;

  return (
    <>
      <audio ref={audioRef} src="/BGM.mp3" loop preload="auto" />
      {isReady ? (
        <div className="portfolio-audio-control" aria-label="Portfolio background music controls">
          <button type="button" className="portfolio-audio-button" onClick={toggleMute} aria-label={isMuted ? "Unmute background music" : "Mute background music"}>
            <VolumeIcon aria-hidden size={14} />
          </button>
          <label className="portfolio-volume-control">
            <span>VOL</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volumePercent}
              onChange={handleVolumeChange}
              aria-label="Background music volume"
              style={volumeStyle}
            />
          </label>
        </div>
      ) : null}
    </>
  );
}
