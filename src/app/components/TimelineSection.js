"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import TimelineCard from "./TimelineCard";

const MILESTONES = [
  {
    icon: "🏰",
    date: "March 2020",
    title: "First Meeting — Inside Wall Rose",
    description:
      "Two strangers crossed paths at a gathering within the safety of familiar walls. A glance, a smile, and the seeds of something extraordinary were planted in the most ordinary of moments.",
  },
  {
    icon: "⚔️",
    date: "June 2020",
    title: "First Date — The Expedition Begins",
    description:
      "Like scouts venturing beyond the walls for the first time, they took a leap of faith. A coffee shop became their training ground, and hours felt like mere minutes.",
  },
  {
    icon: "🛡️",
    date: "December 2021",
    title: "Moving In — Establishing the Base",
    description:
      "They built their own headquarters — a home filled with laughter, anime marathons, and home-cooked meals. Every corner told their story.",
  },
  {
    icon: "🌟",
    date: "September 2023",
    title: "The Trials — Fighting Side by Side",
    description:
      "Through every challenge and storm, they stood shoulder to shoulder. Like the Survey Corps, they learned that true strength comes from fighting together.",
  },
  {
    icon: "💍",
    date: "February 2026",
    title: "The Proposal — Breaking Through Wall Maria",
    description:
      "Under a sky full of stars, one heart asked another to be forever entwined. The walls came crashing down, and freedom — true freedom — was found in a single word: Yes.",
  },
];

export default function TimelineSection() {
  return (
    <SectionWrapper id="our-story">
      {/* Section header */}
      <div className="text-center mb-16 md:mb-24">
        <motion.p
          className="font-accent italic text-crimson text-sm tracking-[0.3em] uppercase mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Chapter II
        </motion.p>
        <motion.h2
          className="font-heading text-gold text-3xl sm:text-4xl md:text-5xl heading-glow"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Beyond the Walls
        </motion.h2>
        <motion.p
          className="font-body text-mist mt-4 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          The expedition route of two hearts finding their way to each other
        </motion.p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2">
          <motion.div
            className="w-full h-full bg-gradient-to-b from-transparent via-gold/30 to-transparent"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />
        </div>

        {/* Milestone cards */}
        <div className="flex flex-col gap-12 md:gap-16">
          {MILESTONES.map((milestone, i) => (
            <TimelineCard
              key={i}
              milestone={milestone}
              index={i}
              isLeft={i % 2 === 0}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
