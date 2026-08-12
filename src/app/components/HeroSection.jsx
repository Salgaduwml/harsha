"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Seeded PRNG (mulberry32) — deterministic on server + client to avoid hydration mismatches
function createSeededRandom(seed) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function TypewriterText({ text, className = "", delay = 0 }) {
  return (
    <span className={`inline-block ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.06,
            delay: delay + i * 0.07,
            ease: "easeOut",
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Rose Petal SVG ── */
function RosePetal({ size, color1, color2, id }) {
  const petalPath =
    "M 0 0 C -10 -4, -14 -16, -8 -24 C -4 -30, -1 -22, 0 -20 C 1 -22, 4 -30, 8 -24 C 14 -16, 10 -4, 0 0 Z";
  const gradId = `rp-${id}`;
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="-18 -34 36 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={color2} />
          <stop offset="100%" stopColor={color1} />
        </linearGradient>
      </defs>
      <path d={petalPath} fill={`url(#${gradId})`} opacity="0.88" />
      {/* Delicate centre vein */}
      <path
        d="M 0 0 Q -0.5 -12 0 -20"
        stroke={color2}
        strokeWidth="0.4"
        opacity="0.35"
        fill="none"
      />
    </svg>
  );
}

/* ── Tiny Rose Bloom ── */
function RoseBloom({ size }) {
  const petalPath =
    "M 0 0 C -9 -3, -12 -14, -6 -20 C -3 -25, -0.5 -19, 0 -17 C 0.5 -19, 3 -25, 6 -20 C 12 -14, 9 -3, 0 0 Z";
  const petals = [0, 72, 144, 216, 288];
  const rng = createSeededRandom(size * 137);
  const stamens = Array.from({ length: 10 }).map((_, i) => {
    const angle = i * 36 + (rng() * 8 - 4);
    const len = 5 + rng() * 3;
    return { angle, len };
  });
  return (
    <svg width={size} height={size} viewBox="-32 -32 64 64" fill="none">
      <defs>
        <radialGradient id={`rb-${size}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e8a0b0" />
          <stop offset="40%" stopColor="#f2c4ce" />
          <stop offset="100%" stopColor="#fdfcf9" />
        </radialGradient>
      </defs>
      {petals.map((angle) => (
        <path
          key={angle}
          d={petalPath}
          fill={`url(#rb-${size})`}
          opacity="0.92"
          transform={`rotate(${angle})`}
        />
      ))}
      {stamens.map((s, i) => (
        <g key={i} transform={`rotate(${s.angle})`}>
          <line
            x1="0"
            y1="0"
            x2="0"
            y2={`-${s.len}`}
            stroke="#c9a96e"
            strokeWidth="0.35"
            opacity="0.7"
          />
          <circle
            cx="0"
            cy={`-${s.len}`}
            r="0.9"
            fill="#c9a96e"
            opacity="0.85"
          />
        </g>
      ))}
      <circle r="1.2" fill="#a8873e" opacity="0.75" />
    </svg>
  );
}

/* ── Floating Rose Petals + Blooms ── */
function FloatingPetals() {
  const PETAL_PALETTES = [
    ["#fdfcf9", "#f2c4ce"], // white → blush
    ["#f2c4ce", "#d4849a"], // blush → rose
    ["#faf8f4", "#f2c4ce"], // cream → blush
    ["#fff", "#ede8df"], // white → cream
    ["#f2c4ce", "#e8a0b0"], // blush → deeper blush
    ["#ede8df", "#c9a96e"], // cream → gold tint
  ];

  const rng = createSeededRandom(99);
  const items = Array.from({ length: 28 }, (_, i) => {
    const palette = PETAL_PALETTES[i % PETAL_PALETTES.length];
    return {
      id: i,
      x: rng() * 100,
      size: 10 + rng() * 14,
      delay: rng() * 16,
      duration: 14 + rng() * 14,
      swayAmount: 28 + rng() * 60,
      swayDir: rng() > 0.5 ? 1 : -1,
      isBloom: i % 7 === 0,
      color1: palette[0],
      color2: palette[1],
      initialRotate: rng() * 360,
    };
  });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-5">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{ left: `${item.x}%`, top: -60 }}
          animate={{
            y: [-60, 950],
            x: [
              0,
              item.swayDir * item.swayAmount * 0.4,
              item.swayDir * -item.swayAmount * 0.3,
              item.swayDir * item.swayAmount * 0.5,
              0,
            ],
            rotate: [item.initialRotate, item.initialRotate + 360],
            rotateY: item.isBloom ? [0, 15, -15, 0] : [0, 180, 360],
            rotateX: item.isBloom ? [0, 10, -10, 0] : [0, 180, 360],
            opacity: [0, 0.85, 0.85, 0.7, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {item.isBloom ? (
            <RoseBloom size={item.size * 2} />
          ) : (
            <RosePetal
              size={item.size}
              color1={item.color1}
              color2={item.color2}
              id={item.id}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ── Scroll Down Indicator ── */
function ScrollDownIndicator({ opacity }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 pointer-events-none mt-6"
      style={{ opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 5.8, duration: 1 }}
    >
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-[3px]"
      >
        {/* Double chevron for depth */}
        <svg
          width="18"
          height="10"
          viewBox="0 0 18 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.45 }}
        >
          <path
            d="M1 1L9 9L17 1"
            stroke="var(--garden-taupe)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          width="18"
          height="10"
          viewBox="0 0 18 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.25 }}
        >
          <path
            d="M1 1L9 9L17 1"
            stroke="var(--garden-taupe)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.15],
    [1, 0],
  );
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -70]);

  return (
    <section
      id="prologue"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden w-full"
    >
      <FloatingPetals />

      {/* Main content */}
      <motion.div
        className="text-center px-4"
        style={{ opacity: textOpacity, y: textY }}
      >
        <div className="mb-8">
          <h1
            className="font-heading text-[80px] font-bold -translate-x-10 -mb-6 bg-clip-text text-transparent bg-linear-to-b from-accent via-accent-light to-accent"
            style={{
              textShadow: "0 2px 24px rgba(201,169,110,0.18)",
            }}
          >
            <TypewriterText text="Sachini" delay={1.2} />
          </h1>
          <motion.span
            className="block font-accent italic text-3xl font-medium bg-clip-text text-transparent bg-linear-to-b from-rose via-blush to-rose"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2, duration: 0.6, type: "spring" }}
          >
            weds
          </motion.span>
          <h1
            className="font-heading text-[80px] font-bold translate-x-6 -mt-1 bg-clip-text text-transparent bg-linear-to-b from-accent via-accent-light to-accent"
            style={{
              textShadow: "0 2px 24px rgba(201,169,110,0.18)",
            }}
          >
            <TypewriterText text="Harsha" delay={2.8} />
          </h1>
        </div>
        {/* Date line */}
        <motion.div
          className="flex items-center justify-center gap-4"
          style={{ color: "var(--garden-taupe)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.8, duration: 1 }}
        >
          <span
            className="w-14 h-1 rounded-full"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(242,196,206,0.7))",
            }}
          />
          <span className="text-sm tracking-[0.3em] uppercase font-body font-medium">
            18 September 2026
          </span>
          <span
            className="w-14 h-1 rounded-full"
            style={{
              background:
                "linear-gradient(to left, transparent, rgba(242,196,206,0.7))",
            }}
          />
        </motion.div>

        <motion.div
          className="mt-3 flex flex-col items-center justify-center gap-2.5"
          style={{ color: "var(--garden-taupe)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.8, duration: 1 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase font-body">
            Asliya Golden Cassandra
          </p>
          <p className="text-xs tracking-[0.3em] uppercase font-body">
            9 AM - 4 PM
          </p>
        </motion.div>
      </motion.div>

      <ScrollDownIndicator opacity={scrollIndicatorOpacity} />
    </section>
  );
}
