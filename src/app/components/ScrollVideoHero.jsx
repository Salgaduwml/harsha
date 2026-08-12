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
 *  1. Page loads → fullscreen video (paused) + "Enter" button overlay.
 *  2. User clicks "Enter" → video plays, overlay fades out.
 *  3. Video ends → video fades to opacity 0, HeroSection fades in.
 */

export default function ScrollVideoHero() {
  const videoRef = useRef(null);
  const lenis = useLenis();
  const { setPhase: setGlobalPhase } = useHeroPhase();

  // 'idle'    — waiting for user to click Enter
  // 'playing' — video is playing, overlay gone
  // 'done'    — video ended, HeroSection visible
  const [phase, setPhase] = useState("idle");
  const [videoReady, setVideoReady] = useState(false);

  // Keep global phase in sync so FixedFrameLayer can react
  useEffect(() => {
    setGlobalPhase(phase);
  }, [phase, setGlobalPhase]);

  // Preload video metadata as early as possible
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.readyState >= 1) {
      setVideoReady(true);
    } else {
      const handler = () => setVideoReady(true);
      video.addEventListener("loadedmetadata", handler);
      return () => video.removeEventListener("loadedmetadata", handler);
    }
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

        <AnimatePresence>
          {phase === "idle" && (
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

        <AnimatePresence>
          {!videoReady && (
            <motion.div
              key="loader"
              className="absolute inset-0 flex items-center justify-center z-20"
              style={{ background: "var(--garden-ivory)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="w-8 h-8 rounded-full border-2"
                style={{
                  borderColor: "rgba(242,196,206,0.3)",
                  borderTopColor: "var(--garden-blush-deep)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
              />
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
