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
      className={`relative ${fullHeight ? "min-h-screen" : ""} ${
        noPadding ? "" : "px-4 sm:px-6 lg:px-8 py-20 md:py-32"
      } ${className}`}
    >
      <div className={noPadding ? "" : "max-w-7xl mx-auto"}>{children}</div>
    </motion.section>
  );
}
