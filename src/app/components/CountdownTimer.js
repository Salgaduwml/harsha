"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function TimeUnit({ value, label }) {
  const display = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 flex items-center justify-center overflow-hidden rounded-lg"
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, var(--aot-void) 50%, #ffffff 100%)",
          border: "1px solid rgba(168, 132, 46, 0.15)",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
        }}
      >
        {/* Subtle line texture */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(168,132,46,0.1) 3px, rgba(168,132,46,0.1) 4px)",
          }}
        />

        {/* Digit */}
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            className="font-heading text-gold text-3xl sm:text-4xl md:text-5xl"
            initial={{ y: -40, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 15, stiffness: 200 }}
            style={{
              textShadow: "0 0 15px rgba(168, 132, 46, 0.15)",
            }}
          >
            {display}
          </motion.span>
        </AnimatePresence>

        {/* Center divider */}
        <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-gold/8" />
      </div>

      <span className="mt-3 text-mist text-[10px] sm:text-xs tracking-[0.25em] uppercase font-body">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({ targetDate = "2026-08-15T16:00:00" }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const calculate = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <motion.div
      className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <TimeUnit value={timeLeft.days} label="Days" />
      <span className="text-gold text-2xl md:text-3xl font-heading mt-[-20px]">:</span>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="text-gold text-2xl md:text-3xl font-heading mt-[-20px]">:</span>
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <span className="text-gold text-2xl md:text-3xl font-heading mt-[-20px]">:</span>
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </motion.div>
  );
}
