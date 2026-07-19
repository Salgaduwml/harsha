"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll
 * ------------
 * Wraps the page with Lenis smooth scrolling — the same buttery,
 * momentum-based scroll feel used on creative/portfolio sites.
 *
 * It also syncs with Framer Motion's scroll tracking so that
 * useScroll / scrollYProgress still work correctly.
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,          // scroll lerp duration (higher = more "buttery")
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // RAF loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
