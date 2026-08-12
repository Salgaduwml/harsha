"use client";
import { motion } from "framer-motion";
import CountdownTimer from "./CountdownTimer";
import SectionWrapper from "./SectionWrapper";

export default function Countdown() {
  return (
    <SectionWrapper id="countdown">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        {/* Date banner */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-4">
            {/* <div className="w-16 h-[1px] bg-gold/30" /> */}
            <div>
              <motion.h2
                className="font-heading font-bold text-5xl heading-glow bg-clip-text text-transparent bg-linear-to-b from-accent via-accent-light to-accent"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                September 18, 2026
              </motion.h2>
              <p
                className="font-body mt-1"
                style={{ color: "var(--garden-taupe)" }}
              >
                Friday, 9:00 AM
              </p>
            </div>
            {/* <div className="w-16 h-[1px] bg-gold/30" /> */}
          </div>
        </motion.div>
        <CountdownTimer targetDate="2026-09-19T10:00:00" />
      </motion.div>
    </SectionWrapper>
  );
}
