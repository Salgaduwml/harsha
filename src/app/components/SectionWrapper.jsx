"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function SectionWrapper({
  children,
  id,
  className = "",
  fullHeight = false,
  noPadding = false,
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`relative backdrop-blur-sm rounded-2xl border border-gold/20 overflow-hidden ${fullHeight ? "min-h-screen" : ""} ${noPadding ? "" : "p-6 md:py-20"
        } ${className}`}
    >
      <div className={noPadding ? "" : "max-w-7xl mx-auto"}>{children}</div>
    </motion.section>
  );
}
