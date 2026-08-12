"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import TimelineCard from "./TimelineCard";

const MILESTONES = [
  {
    icon: "🌸",
    date: "JUL 2023",
    title: "First Meeting",
    description:
      "We were university friends, yet somehow never really met. We graduated without knowing that one day, our paths would cross again.",
  },
  {
    icon: "☕",
    date: "AUG 2023",
    title: "Our First Date",
    description:
      "And then, finally, we met in Kandy for the first time. What started as a simple meeting slowly became something neither of us expected.",
  },
  {
    icon: "🌿",
    date: "2023 — 2026",
    title: "Growing Together",
    description:
      "From little moments to big memories, we grew closer, one day at a time. Somewhere along the way, you became my favourite part of every day..",
  },
  {
    icon: "💍",
    date: "Feb 2026",
    title: "The Proposal",
    description:
      "One day, I stopped wondering where life would take us. I just knew who I wanted beside me for every tomorrow that followed.",
  },
];

export default function TimelineSection() {
  return (
    <SectionWrapper id="our-story">
      {/* Section header */}
      <div className="text-center mb-10">
        <motion.h2
          className="font-heading font-bold text-5xl heading-glow bg-clip-text text-transparent bg-linear-to-b from-accent via-accent-light to-accent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Our Love Story
        </motion.h2>
        <div className="max-w-36 flex mx-auto">
          <svg
            width="278"
            height="32"
            viewBox="0 0 278 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M142.303 26.3843C142.303 26.3843 134.973 -1.5264 113.827 1.57494C92.682 4.67627 108.471 37.0989 123.414 29.4856C138.357 21.8736 119.185 -1.52639 92.9634 17.6456C66.7439 36.8176 49.2631 25.8202 47.572 12.8522C45.8798 -0.117085 62.9376 3.82959 60.8231 14.8256C58.7819 25.4363 38.5574 37.2296 30.9371 22.1549C24.4527 9.32693 44.7522 10.4549 38.6902 20.8869C32.2778 31.9256 14.3027 21.6456 1.3335 30.6416"
              stroke="url(#paint0_linear_2389_327)"
              strokeWidth="2.66667"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M135.531 26.3843C135.531 26.3843 142.862 -1.5264 164.007 1.57494C185.152 4.67627 169.363 37.0989 154.42 29.4856C139.478 21.8736 158.65 -1.52639 184.871 17.6456C211.091 36.8176 228.571 25.8202 230.262 12.8522C231.955 -0.117085 214.897 3.82959 217.011 14.8256C219.053 25.4363 239.277 37.2296 246.897 22.1549C253.382 9.32693 233.082 10.4549 239.144 20.8869C245.557 31.9256 263.532 21.6456 276.501 30.6416"
              stroke="url(#paint1_linear_2389_327)"
              strokeWidth="2.66667"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2389_327"
                x1="142.303"
                y1="15.988"
                x2="1.3335"
                y2="15.988"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#D5A95B" />
                <stop offset="0.5" stopColor="#F0D69C" />
                <stop offset="1" stopColor="#D5A95B" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_2389_327"
                x1="135.531"
                y1="15.988"
                x2="276.501"
                y2="15.988"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#D5A95B" />
                <stop offset="0.5" stopColor="#F0D69C" />
                <stop offset="1" stopColor="#D5A95B" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Milestone cards */}
        <div className="flex flex-col gap-6">
          {MILESTONES.map((milestone, i) => (
            <TimelineCard key={i} milestone={milestone} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
