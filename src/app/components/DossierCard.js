"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

export default function DossierCard({ member, index }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="relative h-80 cursor-pointer"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative"
        style={{
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 180 : rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", damping: 20 }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden parchment"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Rank badge */}
          <div className="absolute top-3 right-3 z-10 bg-crimson/90 px-3 py-1 rounded-full">
            <span className="text-white text-[10px] tracking-[0.2em] uppercase font-body font-semibold">
              {member.rank}
            </span>
          </div>

          {/* Photo area */}
          <div className="h-44 w-full bg-steel/80 flex items-center justify-center relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${member.color}15 0%, transparent 60%)`,
              }}
            />
            <span className="text-6xl">{member.avatar}</span>
            {/* Subtle line texture */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(168,132,46,0.08) 2px, rgba(168,132,46,0.08) 4px)",
              }}
            />
          </div>

          {/* Info */}
          <div className="p-4 relative z-10">
            <h4 className="font-heading text-gold text-base mb-1">
              {member.name}
            </h4>
            <p className="font-body text-mist text-xs tracking-[0.15em] uppercase mb-2">
              {member.role}
            </p>
            <div className="flex items-center gap-2 text-parchment-dark">
              <div className="w-3 h-[1px] bg-gold/30" />
              <span className="font-accent italic text-xs">{member.side}</span>
            </div>
          </div>

          {/* Tap hint */}
          <div className="absolute bottom-3 right-3">
            <span className="text-mist-light text-[10px] tracking-wider uppercase">
              Tap to read
            </span>
          </div>
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden parchment flex flex-col items-center justify-center p-6 text-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="mb-4">
            <span className="text-4xl">{member.avatar}</span>
          </div>
          <h4 className="font-heading text-gold text-base mb-3">
            {member.name}
          </h4>
          <p className="font-accent italic text-parchment-dark text-sm leading-relaxed">
            &ldquo;{member.message}&rdquo;
          </p>
          <div className="mt-4">
            <span className="text-mist-light text-[10px] tracking-wider uppercase">
              Tap to flip back
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
