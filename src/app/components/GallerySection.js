"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const GALLERY_ITEMS = [
  { id: 1, emoji: "🌅", caption: "Where it all began", color: "#b5302a" },
  { id: 2, emoji: "☕", caption: "Our favorite coffee spot", color: "#a8842e" },
  { id: 3, emoji: "🏔️", caption: "Adventures together", color: "#1f9e56" },
  { id: 4, emoji: "🌸", caption: "Spring in bloom", color: "#d43d35" },
  { id: 5, emoji: "🎆", caption: "New Year's magic", color: "#c9a23c" },
  { id: 6, emoji: "🏠", caption: "Home sweet home", color: "#7c5bbf" },
  { id: 7, emoji: "🌊", caption: "By the ocean", color: "#2980b9" },
  { id: 8, emoji: "💍", caption: "The big question", color: "#a8842e" },
];

function GalleryCard({ item, index, onOpen }) {
  const heights = ["h-52", "h-64", "h-56", "h-72", "h-60", "h-48", "h-68", "h-56"];

  return (
    <motion.div
      className={`${heights[index % heights.length]} rounded-xl overflow-hidden cursor-pointer relative group`}
      style={{
        background: `linear-gradient(135deg, ${item.color}08 0%, var(--aot-void) 50%, ${item.color}05 100%)`,
        border: "1px solid rgba(168, 132, 46, 0.1)",
      }}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ scale: 1.03, borderColor: "rgba(168,132,46,0.3)", boxShadow: "0 8px 30px rgba(0,0,0,0.06)" }}
      onClick={() => onOpen(item)}
      layout
    >
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        <motion.span
          className="text-5xl mb-3"
          whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.3 }}
        >
          {item.emoji}
        </motion.span>
        <p className="font-body text-parchment-dark text-sm text-center">
          {item.caption}
        </p>
        <p className="text-mist-light text-[10px] mt-2 tracking-wider uppercase">
          Photo placeholder
        </p>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/30 transition-colors duration-300" />

      {/* Subtle texture on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none overflow-hidden">
        <div
          className="w-full h-full"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(168,132,46,0.05) 2px, rgba(168,132,46,0.05) 4px)",
          }}
        />
      </div>

      {/* Corner accents on hover */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold/0 group-hover:border-gold/40 transition-colors duration-300" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold/0 group-hover:border-gold/40 transition-colors duration-300" />
    </motion.div>
  );
}

function Lightbox({ item, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-white/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-2xl parchment rounded-2xl p-8 text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-mist hover:text-gold transition-colors text-xl"
          aria-label="Close lightbox"
        >
          ✕
        </button>

        <span className="text-8xl block mb-6">{item.emoji}</span>
        <h3 className="font-heading text-gold text-2xl mb-3">
          {item.caption}
        </h3>
        <p className="font-body text-parchment-dark text-sm">
          This is a placeholder for your actual photo. Drop your favorite
          couple photo here and it will look stunning!
        </p>
        <div className="mt-6 inline-flex items-center gap-2 text-mist-light text-xs">
          <span>📷</span>
          <span className="tracking-wider uppercase">
            Replace with actual photo
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function GallerySection() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <SectionWrapper id="gallery">
      {/* Section header */}
      <div className="text-center mb-16">
        <motion.p
          className="font-accent italic text-crimson text-sm tracking-[0.3em] uppercase mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Chapter V
        </motion.p>
        <motion.h2
          className="font-heading text-gold text-3xl sm:text-4xl md:text-5xl heading-glow"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Captured Moments
        </motion.h2>
        <motion.p
          className="font-body text-mist mt-4 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Memories forged in the fires of love — each frame a story worth
          telling
        </motion.p>
      </div>

      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {GALLERY_ITEMS.map((item, i) => (
          <GalleryCard
            key={item.id}
            item={item}
            index={i}
            onOpen={setSelectedItem}
          />
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <Lightbox
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
