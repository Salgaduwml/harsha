"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import DossierCard from "./DossierCard";

const WEDDING_PARTY = [
  {
    name: "Kenji Tanaka",
    role: "Best Man",
    rank: "Commander",
    side: "Groom's Side",
    avatar: "🦅",
    color: "#d4a843",
    message:
      "From college roommates to standing by his side on the biggest day — I wouldn't miss this for the world. Let's go, Commander!",
  },
  {
    name: "Yuki Watanabe",
    role: "Maid of Honor",
    rank: "Captain",
    side: "Bride's Side",
    avatar: "🌸",
    color: "#e74c3c",
    message:
      "She's been my best friend since we were little scouts. Watching her find her person fills my heart with so much joy.",
  },
  {
    name: "Ryo Nakamura",
    role: "Groomsman",
    rank: "Squad Leader",
    side: "Groom's Side",
    avatar: "⚔️",
    color: "#2ecc71",
    message:
      "This guy taught me what loyalty means. Now he's showing the world what love means. Shinzou wo Sasageyo, brother!",
  },
  {
    name: "Ami Suzuki",
    role: "Bridesmaid",
    rank: "Scout",
    side: "Bride's Side",
    avatar: "✨",
    color: "#f0c866",
    message:
      "Two beautiful souls coming together — this wedding is going to be absolutely legendary. So honored to be part of it!",
  },
  {
    name: "Takeshi Yamamoto",
    role: "Groomsman",
    rank: "Scout",
    side: "Groom's Side",
    avatar: "🛡️",
    color: "#3498db",
    message:
      "We've been through thick and thin together. Standing beside him as he says 'I do' is the greatest honor.",
  },
  {
    name: "Hana Kimura",
    role: "Bridesmaid",
    rank: "Scout",
    side: "Bride's Side",
    avatar: "🌙",
    color: "#9b59b6",
    message:
      "She deserves all the happiness in the world, and I know she's found it. Can't wait to celebrate this love!",
  },
];

export default function WeddingPartySection() {
  return (
    <SectionWrapper id="the-scouts">
      {/* Section header */}
      <div className="text-center mb-16">
        <motion.p
          className="font-accent italic text-crimson text-sm tracking-[0.3em] uppercase mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Chapter III
        </motion.p>
        <motion.h2
          className="font-heading text-gold text-3xl sm:text-4xl md:text-5xl heading-glow"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          The Scouts
        </motion.h2>
        <motion.p
          className="font-body text-mist mt-4 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          The brave soldiers standing alongside the couple on their greatest mission
        </motion.p>
      </div>

      {/* Party grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {WEDDING_PARTY.map((member, i) => (
          <DossierCard key={i} member={member} index={i} />
        ))}
      </div>

      {/* Hint text */}
      <motion.p
        className="text-center text-mist/40 text-xs mt-8 tracking-wider"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
      >
        ↑ Hover to tilt • Click to reveal messages ↑
      </motion.p>
    </SectionWrapper>
  );
}
