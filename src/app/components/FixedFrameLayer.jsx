"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useHeroPhase } from "./HeroPhaseContext";

/**
 * FixedFrameLayer
 * ---------------
 * Renders the top (/last-t.png) and bottom (/last-b.png) frame images in a
 * fixed layer. Once the HeroSection has fully faded in (phase === "done" +
 * 1.5 s delay), each image slides 20 px outward in a single 5-second ease-out
 * animation and holds that position.
 */
export default function FixedFrameLayer() {
  const { phase } = useHeroPhase();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (phase !== "done") return;

    // HeroSection fade-in: 1.2s duration + 0.3s delay = 1.5s total
    const timer = setTimeout(() => setAnimate(true), 700);
    return () => clearTimeout(timer);
  }, [phase]);

  // ScrollVideoHero's root div has z-50, which creates a stacking context.
  // While the video is playing we stay below it (z-5). Once the hero is
  // fully visible we jump above that stacking context (z-[60]) so the frame
  // decorations correctly overlay ALL page content.
  const zIndex = phase === "done" ? 60 : 5;

  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen flex flex-col justify-between pointer-events-none"
      style={{ zIndex }}
    >
      {/* Top frame image — slides UP 20 px */}
      <motion.div
        animate={{ y: animate && -20 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <Image
          src="/last-t.png"
          loading="lazy"
          alt="Frame top"
          width={1080}
          height={500}
          sizes="100vw"
          className="w-full h-auto object-cover"
        />
      </motion.div>
      {/* Bottom frame image — slides DOWN 20 px */}
      <motion.div
        animate={{ y: animate && 20 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <Image
          src="/last-b.png"
          loading="lazy"
          alt="Frame bottom"
          width={1080}
          height={500}
          sizes="100vw"
          className="w-full h-auto object-contain"
        />
      </motion.div>
    </div>
  );
}
