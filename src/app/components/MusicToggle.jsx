"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const BAR_COUNT = 4;

export default function MusicToggle({ musicSrc }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [needsGesture, setNeedsGesture] = useState(false);

  // Try to autoplay on mount.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Autoplay blocked — wait for the first user interaction instead.
        setIsPlaying(false);
        setNeedsGesture(true);
      });
  }, []);

  // Fallback: start music on the first interaction anywhere on the page.
  useEffect(() => {
    if (!needsGesture) return;

    const startOnGesture = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setNeedsGesture(false);
        })
        .catch(() => {});
    };

    document.addEventListener("click", startOnGesture, { once: true });
    document.addEventListener("touchstart", startOnGesture, { once: true });

    return () => {
      document.removeEventListener("click", startOnGesture);
      document.removeEventListener("touchstart", startOnGesture);
    };
  }, [needsGesture]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true));
      setNeedsGesture(false);
    }
  };

  return (
    <>
      {musicSrc && <audio ref={audioRef} src={musicSrc} loop />}

      <button
        onClick={toggle}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        aria-pressed={isPlaying}
        className={`fixed bottom-5 cursor-pointer right-5 z-100 flex items-center size-12 rounded-full justify-center border border-white/30 bg-white/15 backdrop-blur-sm pl-1`}
      >
        <Waveform isPlaying={isPlaying} />
      </button>
    </>
  );
}

function Waveform({ isPlaying }) {
  // Each bar gets its own height range and stagger delay so the sway
  // doesn't look mechanically synced.
  const bars = [
    { min: 4, max: 12, delay: 0 },
    { min: 4, max: 18, delay: 0.15 },
    { min: 4, max: 10, delay: 0.3 },
    { min: 4, max: 15, delay: 0.1 },
  ];

  return (
    <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
      {bars.map((bar, i) => (
        <motion.rect
          key={i}
          x={i * 7}
          width="3"
          rx="1.5"
          fill="#d4849a"
          initial={{ height: bar.min, y: (20 - bar.min) / 2 }}
          animate={
            isPlaying
              ? {
                  height: [bar.min, bar.max, bar.min],
                  y: [
                    (20 - bar.min) / 2,
                    (20 - bar.max) / 2,
                    (20 - bar.min) / 2,
                  ],
                }
              : { height: bar.min, y: (20 - bar.min) / 2 }
          }
          transition={
            isPlaying
              ? {
                  duration: 0.9,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: bar.delay,
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </svg>
  );
}
