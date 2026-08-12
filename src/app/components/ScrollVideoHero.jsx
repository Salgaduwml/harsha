"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "./HeroSection";
import { useLenis } from "./LenisContext";
import { useHeroPhase } from "./HeroPhaseContext";

/**
 * ScrollVideoHero  (now: CinematicEntry)
 * ----------------------------------------
 * Flow:
 *  1. Page loads → fullscreen loading screen (heart fills bottom→top).
 *  2. Video canplaythrough fires → loader fades out, "Enter" button appears.
 *  3. User clicks "You are Invited" → video plays smoothly, overlay fades out.
 *  4. Video ends → video fades to opacity 0, HeroSection fades in.
 */

// Duration of the one-shot heart fill animation (ms).
// Loader screen stays visible until BOTH this timer AND canplaythrough have fired.
const HEART_ANIM_MS = 1800;

export default function ScrollVideoHero() {
  const videoRef = useRef(null);
  const lenis = useLenis();
  const { setPhase: setGlobalPhase } = useHeroPhase();

  // 'idle'    — waiting for user to click Enter
  // 'playing' — video is playing, overlay gone
  // 'done'    — video ended, HeroSection visible
  const [phase, setPhase] = useState("idle");

  // true once the video has enough data to play through without buffering
  const [videoReady, setVideoReady] = useState(false);

  // true after the heart fill animation has completed
  const [animDone, setAnimDone] = useState(false);

  // Loader hides only when BOTH conditions are met
  const loaderVisible = !animDone || !videoReady;

  // Keep global phase in sync so FixedFrameLayer can react
  useEffect(() => {
    setGlobalPhase(phase);
  }, [phase, setGlobalPhase]);

  // One-shot timer that marks the animation as done.
  // Runs on every mount so the heart fill always plays on page load.
  useEffect(() => {
    const timer = setTimeout(() => setAnimDone(true), HEART_ANIM_MS);
    return () => clearTimeout(timer);
  }, []);

  // Wait for canplaythrough — guarantees smooth, uninterrupted playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Already fully buffered (e.g. cached)
    if (video.readyState >= 4) {
      setVideoReady(true);
      return;
    }

    const handler = () => setVideoReady(true);
    video.addEventListener("canplaythrough", handler);
    return () => video.removeEventListener("canplaythrough", handler);
  }, []);

  const handleEnter = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setPhase("playing");
    video.play().catch(() => {
      // Autoplay blocked — skip straight to hero
      setPhase("done");
    });
  }, []);

  const handleVideoEnd = useCallback(() => {
    setPhase("done");
  }, []);

  // Lock Lenis scroll until video is done
  useEffect(() => {
    if (!lenis) return;
    if (phase === "done") {
      lenis.start();
    } else {
      lenis.stop();
    }
  }, [lenis, phase]);

  // Also lock native scroll as a fallback
  useEffect(() => {
    document.body.style.overflow = phase === "done" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  return (
    <div className="relative w-full z-50">
      {/* ─── Sticky video container ─── */}
      <div className="relative w-full h-screen overflow-hidden">
        <motion.video
          ref={videoRef}
          src="/hero-clip.mp4"
          muted
          playsInline
          preload="auto"
          onEnded={handleVideoEnd}
          animate={{ opacity: phase === "done" ? 0 : 1 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* ─── "You are Invited" overlay ─── */}
        <AnimatePresence>
          {phase === "idle" && !loaderVisible && (
            <motion.div
              key="overlay"
              className="absolute bottom-40 translate-x-1/2 right-1/2 flex flex-col items-center justify-center z-10 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <button
                id="enter-btn"
                onClick={handleEnter}
                disabled={!videoReady}
                className="relative z-10 group p-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/30"
                style={{
                  cursor: videoReady ? "pointer" : "default",
                  pointerEvents: videoReady ? "auto" : "none",
                  opacity: videoReady ? 1 : 0.4,
                  transition: "opacity 0.35s ease",
                }}
              >
                <motion.span
                  className="relative flex items-center justify-center px-7 py-2 rounded-lg bg-linear-to-tr from-accent via-accent-light to-accent-light"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileTap={videoReady ? { scale: 0.96 } : undefined}
                  transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
                >
                  <span className="font-heading text-4xl font-bold text-white">
                    You are Invited
                  </span>
                </motion.span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Heart loading screen ─── */}
        <AnimatePresence>
          {loaderVisible && (
            <motion.div
              key="loader"
              className="absolute inset-0 flex flex-col items-center justify-center z-20"
              style={{ background: "var(--garden-ivory)" }}
              exit={{
                opacity: 0,
                transition: { duration: 0.7, ease: "easeInOut" },
              }}
            >
              <HeartLoader />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── HeroSection — lives below (or fades in as video fades out) ─── */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: phase === "done" ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
        style={{ pointerEvents: phase === "done" ? "auto" : "none" }}
      >
        <HeroSection />
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HeartLoader
   SVG heart that fills from bottom to top,
   exactly once (HEART_ANIM_MS duration).
   fill="freeze" holds the full state afterwards.
───────────────────────────────────────────── */
function HeartLoader() {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Heart SVG */}
      <svg
        width="80"
        height="76"
        viewBox="0 0 80 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Fill reveal animation */}
          <clipPath id="heart-fill-clip">
            <rect x="0" y="76" width="80" height="76">
              <animate
                attributeName="y"
                from="76"
                to="0"
                dur={`${HEART_ANIM_MS}ms`}
                repeatCount="1"
                fill="freeze"
                calcMode="spline"
                keySplines="0.4 0 0.2 1"
              />
            </rect>
          </clipPath>

          {/* Soft rose gradient */}
          <linearGradient
            id="heart-grad"
            x1="40"
            y1="72"
            x2="40"
            y2="2"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#b95770" />
            <stop offset="42%" stopColor="#d77d93" />
            <stop offset="72%" stopColor="#e9a5b4" />
            <stop offset="100%" stopColor="#f5d1d9" />
          </linearGradient>

          {/* Premium outline gradient */}
          <linearGradient
            id="heart-outline-grad"
            x1="8"
            y1="8"
            x2="72"
            y2="70"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#f8dce3" />
            <stop offset="45%" stopColor="#efb8c5" />
            <stop offset="100%" stopColor="#d98098" />
          </linearGradient>

          {/* Very subtle glow */}
          <filter id="heart-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Premium heart outline */}
        <path
          d="M40 72 C37.8 69.9 8 48.7 5.2 27.1 C3.6 14.9 10.7 4.8 21.9 2.5 C29.2 1 35.4 4.2 40 10.2 C44.6 4.2 50.8 1 58.1 2.5 C69.3 4.8 76.4 14.9 74.8 27.1 C72 48.7 42.2 69.9 40 72 Z"
          fill="none"
          stroke="url(#heart-outline-grad)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.78"
          filter="url(#heart-glow)"
        />

        {/* Filled heart */}
        <path
          d="M40 72 C37.8 69.9 8 48.7 5.2 27.1 C3.6 14.9 10.7 4.8 21.9 2.5 C29.2 1 35.4 4.2 40 10.2 C44.6 4.2 50.8 1 58.1 2.5 C69.3 4.8 76.4 14.9 74.8 27.1 C72 48.7 42.2 69.9 40 72 Z"
          fill="url(#heart-grad)"
          clipPath="url(#heart-fill-clip)"
        />
      </svg>

      {/* Loading label */}
      <p
        className="font-heading italic text-3xl font-bold"
        style={{ color: "var(--garden-rose)", opacity: 0.75 }}
      >
        Loading…
      </p>
    </div>
  );
}
