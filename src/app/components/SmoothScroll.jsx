"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll
 * ------------
 * Wraps the page with Lenis smooth scrolling — the same buttery,
 * momentum-based scroll feel used on creative/portfolio sites.
 *
 * Syncs with Framer Motion by dispatching a native scroll event
 * on every Lenis tick so useScroll / scrollYProgress track the
 * interpolated (smooth) scroll position, not the raw jumpy one.
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

    // Sync Lenis → Framer Motion on every scroll tick.
    // Framer Motion listens for native "scroll" events on window;
    // Lenis moves scrollTop internally but doesn't always dispatch
    // the native event at the right frequency. Force it here.
    lenis.on("scroll", () => {
      // Dispatching a bare scroll event nudges Framer Motion's
      // useScroll to re-read window.scrollY (which Lenis keeps
      // in sync) on the *interpolated* timing, not the raw one.
      window.dispatchEvent(new Event("scroll"));
    });

    // RAF loop — drives Lenis interpolation each frame
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

