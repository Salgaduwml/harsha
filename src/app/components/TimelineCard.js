"use client";

import { motion } from "framer-motion";

export default function TimelineCard({ milestone, index, isLeft }) {
  return (
    <motion.div
      className={`flex items-center gap-6 md:gap-12 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-col md:flex-row`}
      initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Card */}
      <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"}`}>
        <div className="parchment rounded-xl p-6 md:p-8 relative overflow-hidden group hover:border-gold/40 transition-all duration-500 hover:shadow-lg hover:shadow-gold/5">
          {/* Gold shimmer on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, transparent 30%, rgba(168,132,46,0.04) 50%, transparent 70%)",
              backgroundSize: "200% 200%",
              animation: "shimmer 3s linear infinite",
            }}
          />

          <div className="relative z-10">
            {/* Icon & Date */}
            <div
              className={`flex items-center gap-3 mb-3 ${
                isLeft ? "md:justify-end" : ""
              }`}
            >
              <span className="text-2xl">{milestone.icon}</span>
              <span className="text-gold text-xs tracking-[0.2em] uppercase font-body font-medium">
                {milestone.date}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-heading text-gold text-lg md:text-xl mb-3">
              {milestone.title}
            </h3>

            {/* Description */}
            <p className="font-body text-parchment-dark text-sm leading-relaxed">
              {milestone.description}
            </p>
          </div>
        </div>
      </div>

      {/* Timeline node */}
      <div className="hidden md:flex flex-col items-center">
        <motion.div
          className="w-4 h-4 rounded-full border-2 border-gold bg-white relative"
          whileInView={{
            boxShadow: [
              "0 0 0px rgba(168,132,46,0)",
              "0 0 12px rgba(168,132,46,0.3)",
              "0 0 4px rgba(168,132,46,0.15)",
            ],
          }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: index * 0.15 }}
        >
          <div className="absolute inset-1 rounded-full bg-gold/40" />
        </motion.div>
      </div>

      {/* Empty space for alternating layout */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}
