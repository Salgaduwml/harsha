"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ConfettiPiece({ index, originX, originY }) {
  const colors = ["#a8842e", "#b5302a", "#c9a23c", "#d43d35", "#1f9e56", "#7c5bbf"];
  const color = colors[index % colors.length];
  const angle = (index / 40) * Math.PI * 2 + Math.random() * 0.5;
  const velocity = 200 + Math.random() * 300;
  const finalX = Math.cos(angle) * velocity;
  const finalY = Math.sin(angle) * velocity - 100;
  const rotation = Math.random() * 720 - 360;
  const size = 4 + Math.random() * 8;
  const isWing = index % 5 === 0;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: originX,
        top: originY,
        width: isWing ? size * 2 : size,
        height: size,
        backgroundColor: color,
        borderRadius: isWing ? "50% 50% 0 0" : index % 2 === 0 ? "50%" : "2px",
        willChange: "transform, opacity",
      }}
      initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
      animate={{
        x: finalX,
        y: [0, finalY - 100, finalY + 200],
        opacity: [1, 1, 0],
        rotate: rotation,
        scale: [1, 1.2, 0.5],
      }}
      transition={{
        duration: 1.8 + Math.random() * 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    />
  );
}

export default function ConfettiEffect({ trigger, originX = "50%", originY = "50%" }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (trigger) {
      setPieces(Array.from({ length: 40 }, (_, i) => i));
      const timer = setTimeout(() => setPieces([]), 3000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {pieces.map((i) => (
          <ConfettiPiece
            key={`${trigger}-${i}`}
            index={i}
            originX={originX}
            originY={originY}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
