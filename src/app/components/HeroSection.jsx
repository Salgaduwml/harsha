"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ParticleField from "./ParticleField";
import Image from "next/image";

// Seeded PRNG (mulberry32) to produce deterministic random values
// on both server and client, avoiding hydration mismatches.
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
            duration: 0.05,
            delay: delay + i * 0.06,
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

function SoftOrbs() {
  const orbs = [
    { x: "15%", y: "20%", size: 300, color: "rgba(168,132,46,0.06)", delay: 0 },
    { x: "75%", y: "60%", size: 400, color: "rgba(181,48,42,0.04)", delay: 2 },
    { x: "50%", y: "80%", size: 250, color: "rgba(168,132,46,0.05)", delay: 4 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 15 + i * 3,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* -- Realistic Sakura SVG shapes -- */
function SakuraPetal({ size, color1, color2 }) {
  // Realistic petal with a narrow base and a cleft (notch) at the top tip.
  const petalPath =
    "M 0 0 C -12 -5, -16 -18, -10 -26 C -6 -32, -2 -24, 0 -22 C 2 -24, 6 -32, 10 -26 C 16 -18, 12 -5, 0 0 Z";

  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="-20 -35 40 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={`pg-${color1.replace(/[^a-z0-9]/gi, "")}`}
          x1="0"
          y1="1"
          x2="0"
          y2="0"
        >
          <stop offset="0%" stopColor={color2} />
          <stop offset="100%" stopColor={color1} />
        </linearGradient>
      </defs>
      <path
        d={petalPath}
        fill={`url(#pg-${color1.replace(/[^a-z0-9]/gi, "")})`}
        opacity="0.9"
      />
      {/* Delicate center vein */}
      <path
        d="M 0 0 Q -1 -15 0 -22"
        stroke={color2}
        strokeWidth="0.5"
        opacity="0.4"
        fill="none"
      />
    </svg>
  );
}

function SakuraFlower({ size }) {
  const petalPath =
    "M 0 0 C -12 -5, -15 -18, -8 -25 C -4 -30, -1 -24, 0 -22 C 1 -24, 4 -30, 8 -25 C 15 -18, 12 -5, 0 0 Z";

  return (
    <svg
      width={size}
      height={size}
      viewBox="-35 -35 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Radial gradient creates the deep pink center fading to pale edges */}
        <radialGradient id="sfg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e91e63" />
          <stop offset="25%" stopColor="#f48fb1" />
          <stop offset="100%" stopColor="#fce4ec" />
        </radialGradient>
      </defs>

      {/* 5 Petals */}
      {[0, 72, 144, 216, 288].map((angle) => (
        <path
          key={angle}
          d={petalPath}
          fill="url(#sfg)"
          opacity="0.9"
          transform={`rotate(${angle})`}
        />
      ))}

      {/* Realistic Stamens (radiating filaments + anthers) */}
      {Array.from({ length: 12 }).map((_, i) => {
        const stamenRng = createSeededRandom(size * 1000 + i * 7);
        const stamenAngle = i * (360 / 12) + (stamenRng() * 10 - 5);
        const length = 7 + stamenRng() * 5;
        return (
          <g key={`stamen-${i}`} transform={`rotate(${stamenAngle})`}>
            {/* Filament */}
            <line
              x1="0"
              y1="0"
              x2="0"
              y2={`-${length}`}
              stroke="#d81b60"
              strokeWidth="0.4"
              opacity="0.8"
            />
            {/* Anther (pollen cap) */}
            <circle
              cx="0"
              cy={`-${length}`}
              r="1.2"
              fill="#fbc02d"
              opacity="0.9"
            />
          </g>
        );
      })}

      {/* Inner dark pistil cap */}
      <circle r="1.5" fill="#ad1457" opacity="0.8" />
    </svg>
  );
}

/* -- Floating Sakura Petals & Blossoms -- */
function FloatingPetals() {
  const PETAL_PALETTES = [
    ["#f8bbd0", "#f48fb1"], // Soft pink to darker pink
    ["#fce4ec", "#f8bbd0"], // Very pale pink to soft pink
    ["#ffffff", "#fce4ec"], // White to pale pink
    ["#fce4ec", "#f48fb1"],
    ["#fff0f5", "#f8bbd0"],
  ];

  const rng = createSeededRandom(42);
  const items = Array.from({ length: 25 }, (_, i) => {
    const palette = PETAL_PALETTES[i % PETAL_PALETTES.length];
    return {
      id: i,
      x: rng() * 100,
      size: 12 + rng() * 14,
      delay: rng() * 14,
      duration: 12 + rng() * 12, // Slightly slower for more grace
      swayAmount: 30 + rng() * 70,
      swayDirection: rng() > 0.5 ? 1 : -1,
      isFlower: i % 8 === 0, // Roughly 1 in 8 items is a full flower
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
          style={{
            left: `${item.x}%`,
            top: -50,
          }}
          animate={{
            y: [-50, 900],
            x: [
              0,
              item.swayDirection * item.swayAmount * 0.5,
              item.swayDirection * -item.swayAmount * 0.4,
              item.swayDirection * item.swayAmount * 0.6,
              0,
            ],
            rotate: [
              item.initialRotate,
              item.initialRotate + 90,
              item.initialRotate + 180,
              item.initialRotate + 270,
              item.initialRotate + 360,
            ],
            // Adds a 3D tumbling effect to single petals, but keeps whole flowers mostly flat
            rotateY: item.isFlower ? [0, 20, -20, 0] : [0, 180, 360, 540],
            rotateX: item.isFlower ? [0, 15, -15, 0] : [0, 180, 360, 540],
            opacity: [0, 0.9, 0.9, 0.8, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {item.isFlower ? (
            <SakuraFlower size={item.size * 2} />
          ) : (
            <SakuraPetal
              size={item.size}
              color1={item.color1}
              color2={item.color2}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  return (
    <section
      id="prologue"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden w-full"
    >
      {/* Background layers */}
      {/* <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <SoftOrbs />
      </motion.div> */}

      {/* Floating petals */}
      <FloatingPetals />

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-4"
        style={{ opacity: textOpacity, y: textY }}
      >

        {/* <motion.p
          className="font-accent italic text-mist text-sm sm:text-base tracking-[0.3em] uppercase mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          The Wedding of
        </motion.p>

        <div className="mb-4">
          <h1 className="font-heading text-gold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.1em]">
            <TypewriterText text="Harsha" delay={2} />
          </h1>
          <motion.span
            className="block font-accent italic text-crimson text-2xl sm:text-3xl my-2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.8, duration: 0.6, type: "spring" }}
          >
            &
          </motion.span>
          <h1 className="font-heading text-gold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.1em]">
            <TypewriterText text="Sachini" delay={3.2} />
          </h1>
        </div>

        <motion.p
          className="font-accent italic text-parchment-dark text-base sm:text-lg md:text-xl mt-8 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.5, duration: 1 }}
        >
          &ldquo;Two hearts that broke through every wall&rdquo;
        </motion.p>

        <motion.div
          className="mt-8 flex items-center justify-center gap-4 text-mist"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 1 }}
        >
          <span className="w-12 h-[1px] bg-gold/30" />
          <span className="font-body text-sm tracking-[0.3em] uppercase">
            August 15, 2026
          </span>
          <span className="w-12 h-[1px] bg-gold/30" />
        </motion.div> */}
      </motion.div>

      {/* Bottom fade to white */}
      {/* <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--aot-midnight) 0%, transparent 100%)",
        }}
      /> */}
    </section>
  );
}
