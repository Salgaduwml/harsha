"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Botanical phone illustration ── */
function PhoneIllustration() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.45 }}
      className="mx-auto mb-8 flex items-center justify-center relative"
    >
      {/* Soft blush halo */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 88,
          height: 88,
          background:
            "radial-gradient(circle, rgba(242,196,206,0.38) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Phone frame */}
      <div
        className="relative flex flex-col items-center justify-between py-3"
        style={{
          width: 58,
          height: 108,
          borderRadius: 18,
          border: "2px solid var(--garden-gold)",
          background:
            "linear-gradient(180deg, rgba(201,169,110,0.07) 0%, rgba(242,196,206,0.06) 100%)",
          boxShadow:
            "0 8px 32px rgba(201,169,110,0.15), inset 0 1px 0 rgba(255,255,255,0.5)",
        }}
      >
        {/* Pill notch */}
        <div
          className="rounded-full"
          style={{ width: 22, height: 5, background: "rgba(201,169,110,0.4)" }}
        />

        {/* Beating heart on screen */}
        <motion.svg
          width="28"
          height="26"
          viewBox="0 0 80 76"
          fill="none"
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <defs>
            <linearGradient
              id="phone-heart-grad"
              x1="40"
              y1="72"
              x2="40"
              y2="2"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#b95770" />
              <stop offset="60%" stopColor="#e9a5b4" />
              <stop offset="100%" stopColor="#f5d1d9" />
            </linearGradient>
          </defs>
          <path
            d="M40 72 C37.8 69.9 8 48.7 5.2 27.1 C3.6 14.9 10.7 4.8 21.9 2.5 C29.2 1 35.4 4.2 40 10.2 C44.6 4.2 50.8 1 58.1 2.5 C69.3 4.8 76.4 14.9 74.8 27.1 C72 48.7 42.2 69.9 40 72 Z"
            fill="url(#phone-heart-grad)"
          />
        </motion.svg>

        {/* Home bar */}
        <div
          className="rounded-full"
          style={{
            width: 28,
            height: 4,
            background: "rgba(201,169,110,0.35)",
          }}
        />
      </div>
    </motion.div>
  );
}

/* ── Gold ornament divider ── */
function GoldDivider({ delay = 0, wide = false }) {
  return (
    <motion.div
      className="mx-auto mb-6"
      style={{
        height: 1,
        width: wide ? 120 : 80,
        background:
          "linear-gradient(90deg, transparent, var(--garden-gold), transparent)",
      }}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
    />
  );
}

export default function MobileOnlyNotice() {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const checkWidth = () => setShowNotice(window.innerWidth > 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <AnimatePresence>
      {showNotice && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "var(--garden-ivory)" }}
        >
          {/* Ambient blush glow — top right */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(242,196,206,0.22) 0%, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
          />
          {/* Ambient gold glow — bottom left */}
          <div
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)",
              transform: "translate(-30%, 30%)",
            }}
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
            className="relative mx-6 max-w-sm w-full text-center px-8 py-10 rounded-3xl"
            style={{
              background: "rgba(253,252,249,0.82)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(242,196,206,0.3)",
              boxShadow:
                "0 8px 48px rgba(201,169,110,0.10), 0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            {/* Top blush accent line */}
            <div
              className="absolute top-0 left-8 right-8 rounded-full"
              style={{
                height: 2,
                background:
                  "linear-gradient(90deg, transparent, rgba(212,132,154,0.55), transparent)",
              }}
            />

            <PhoneIllustration />

            {/* Heading — Tangerine / font-heading */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="font-heading text-5xl font-bold mb-1 bg-linear-to-b from-accent via-accent-light to-accent bg-clip-text text-transparent"
            >
              Best on Mobile
            </motion.h2>

            {/* Weds-style italic accent */}
            <motion.span
              className="block font-accent italic text-base mb-5"
              style={{ color: "var(--garden-rose)", opacity: 0.85 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.85, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
            >
              a love story, crafted for your palm
            </motion.span>

            <GoldDivider delay={0.9} />

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="font-body text-sm leading-relaxed"
              style={{ color: "var(--garden-taupe)" }}
            >
              This wedding invitation was crafted with love for a mobile
              experience. Please open it on your phone to enjoy the full
              animations, music, and every detail.
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
