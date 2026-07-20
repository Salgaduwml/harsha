"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const EVENTS = [
  {
    type: "Ceremony",
    emoji: "⛪",
    title: "The Sacred Oath",
    time: "4:00 PM",
    venue: "Rose Garden Cathedral",
    address: "123 Wall Rose Boulevard, Shiganshina",
    description:
      "Join us as two souls pledge their eternal devotion, breaking through the final wall together. Formal attire requested.",
    dresscode: "Formal / Black Tie Optional",
  },
  {
    type: "Reception",
    emoji: "🎉",
    title: "Victory Celebration",
    time: "7:00 PM",
    venue: "The Grand Titan Hall",
    address: "456 Freedom Avenue, Shiganshina",
    description:
      "A night of feasting, dancing, and celebration worthy of humanity's greatest victory. Dinner, drinks, and unforgettable memories await.",
    dresscode: "Cocktail Attire",
  },
];

export default function EventDetailsSection() {
  return (
    <SectionWrapper id="battle-plan">
      {/* Section header */}
      <div className="text-center mb-16">
        <motion.p
          className="font-accent italic text-crimson text-sm tracking-[0.3em] uppercase mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Chapter IV
        </motion.p>
        <motion.h2
          className="font-heading text-gold text-3xl sm:text-4xl md:text-5xl heading-glow"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          The Battle Plan
        </motion.h2>
        <motion.p
          className="font-body text-mist mt-4 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Mission briefing — everything you need to know for the operation
        </motion.p>
      </div>

      {/* Event cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {EVENTS.map((event, i) => (
          <motion.div
            key={event.type}
            className="parchment rounded-2xl p-8 relative overflow-hidden group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 + 0.3 }}
            whileHover={{
              borderColor: "rgba(212,168,67,0.5)",
              transition: { duration: 0.3 },
            }}
          >
            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-gold/50 to-transparent" />
              <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-gold/50 to-transparent" />
            </div>
            <div className="absolute bottom-0 right-0 w-16 h-16">
              <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-gold/50 to-transparent" />
              <div className="absolute bottom-0 right-0 w-[2px] h-full bg-gradient-to-t from-gold/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Type badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{event.emoji}</span>
                <div>
                  <span className="text-crimson text-[10px] tracking-[0.25em] uppercase font-body font-semibold">
                    {event.type}
                  </span>
                  <h3 className="font-heading text-gold text-xl">
                    {event.title}
                  </h3>
                </div>
              </div>

              {/* Details list */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-gold text-sm mt-0.5">🕐</span>
                  <div>
                    <p className="font-body text-parchment text-sm font-medium">
                      {event.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gold text-sm mt-0.5">📍</span>
                  <div>
                    <p className="font-body text-parchment text-sm font-medium">
                      {event.venue}
                    </p>
                    <p className="font-body text-mist text-xs mt-1">
                      {event.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gold text-sm mt-0.5">👔</span>
                  <div>
                    <p className="font-body text-parchment text-sm font-medium">
                      {event.dresscode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="my-6 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

              {/* Description */}
              <p className="font-body text-parchment-dark text-sm leading-relaxed">
                {event.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
