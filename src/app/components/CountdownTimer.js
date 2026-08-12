"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function TimeUnit({ value, label }) {
  const display = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center bg-linear-to-tr from-accent-light via-accent-light/70 to-accent-light p-1 rounded-lg">
      <div
        className="relative w-18 h-20 shadow flex items-center justify-center overflow-hidden rounded-2xl"
        style={{
          background:
            "linear-gradient(180deg, #FFFFFF 0%, var(--garden-cream) 50%, #FDFCF9 100%)",
          border: "1px solid rgba(242,196,206,0.30)",
        }}
      >
        {/* Soft blush top accent line */}
        {/* <div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(242,196,206,0.6), rgba(201,169,110,0.3), rgba(242,196,206,0.6), transparent)",
          }}
        /> */}

        {/* Digit */}
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            className="font-heading text-4xl font-bold text-blush-deep"
            style={{
              // color: "var(--garden-gold)",
              textShadow: "0 0 14px rgba(201,169,110,0.18)",
            }}
            initial={{ y: -40, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 15, stiffness: 200 }}
          >
            {display}
          </motion.span>
        </AnimatePresence>

        {/* Center hairline */}
        <div className="absolute left-4 right-4 top-1/2 h-4 bg-blush/50 blur-sm" />
      </div>

      <span className="mt-2 pb-0.5 text-[10px] tracking-[0.25em] uppercase font-body text-white font-medium text-center">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({ targetDate = "2026-08-15T16:00:00" }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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
      className="flex items-center justify-center gap-4"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <TimeUnit value={timeLeft.days} label="Days" />
      {/* <Separator /> */}
      <TimeUnit value={timeLeft.hours} label="Hours" />
      {/* <Separator /> */}
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      {/* <Separator /> */}
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </motion.div>
  );
}
