"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileOnlyNotice() {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    // Check if viewport is wider than a typical mobile device
    const checkWidth = () => {
      setShowNotice(window.innerWidth > 768);
    };

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
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, #f8f6f2 0%, #f0ede8 50%, #e8e4dd 100%)",
          }}
        >
          {/* Decorative sakura petals in background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl opacity-15"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${15 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [0, 30, 0],
                  rotate: [0, 15, -10, 0],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 5 + i * 0.7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              >
                🌸
              </motion.div>
            ))}
          </div>

          {/* Content card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative max-w-md mx-6 text-center"
          >
            {/* Gold decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mx-auto mb-8 h-px w-32"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #a8842e, transparent)",
              }}
            />

            {/* Phone icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.4,
              }}
              className="mx-auto mb-6 flex items-center justify-center"
            >
              <div
                className="relative w-16 h-28 rounded-2xl flex items-center justify-center"
                style={{
                  border: "2.5px solid #a8842e",
                  background:
                    "linear-gradient(180deg, rgba(168,132,46,0.06) 0%, rgba(168,132,46,0.02) 100%)",
                }}
              >
                {/* Phone notch */}
                <div
                  className="absolute top-2 w-6 h-1 rounded-full"
                  style={{ background: "rgba(168,132,46,0.3)" }}
                />
                {/* Screen content - heart */}
                <motion.span
                  className="text-2xl"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  💍
                </motion.span>
                {/* Home indicator */}
                <div
                  className="absolute bottom-2 w-8 h-1 rounded-full"
                  style={{ background: "rgba(168,132,46,0.3)" }}
                />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-2xl font-bold mb-3"
              style={{
                fontFamily: "var(--font-cinzel), serif",
                color: "#1a1a1a",
              }}
            >
              Best Viewed on Mobile
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="text-base leading-relaxed mb-8"
              style={{
                fontFamily: "var(--font-outfit), sans-serif",
                color: "#4a4540",
              }}
            >
              This wedding invitation was crafted with love for a mobile
              experience. Please visit on your phone to enjoy the full
              animations, music, and interactive moments.
            </motion.p>

            {/* Gold decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="mx-auto mb-8 h-px w-24"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #a8842e, transparent)",
              }}
            />

            {/* Continue anyway button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowNotice(false)}
              className="px-8 py-3 rounded-full text-sm font-medium tracking-wider uppercase cursor-pointer transition-all duration-300"
              style={{
                fontFamily: "var(--font-outfit), sans-serif",
                background:
                  "linear-gradient(135deg, #a8842e 0%, #c9a23c 100%)",
                color: "#fff",
                boxShadow: "0 4px 20px rgba(168,132,46,0.3)",
                border: "none",
              }}
            >
              Continue Anyway
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-4 text-xs"
              style={{ color: "#9e978d" }}
            >
              Some features may not display optimally on larger screens
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
