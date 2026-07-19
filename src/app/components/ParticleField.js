"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Particle({ delay, duration, startX, startY, size, color }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${startX}%`,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        willChange: "transform, opacity",
      }}
      initial={{ y: startY, opacity: 0, scale: 0 }}
      animate={{
        y: [startY, startY - 600, startY - 1200],
        x: [0, Math.random() * 60 - 30, Math.random() * 100 - 50],
        opacity: [0, 0.5, 0],
        scale: [0, 1, 0.3],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

export default function ParticleField({
  count = 25,
  colors = ["rgba(181,48,42,0.3)", "rgba(168,132,46,0.25)", "rgba(212,61,53,0.2)", "rgba(201,162,60,0.2)"],
  className = "",
}) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 8,
      startX: Math.random() * 100,
      startY: typeof window !== "undefined" ? window.innerHeight : 800,
      size: 2 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(generated);
  }, [count]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}
    </div>
  );
}
