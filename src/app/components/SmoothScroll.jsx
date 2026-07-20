"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { LenisContext } from "./LenisContext";

/**
 * SmoothScroll
 * ------------
 * Wraps the page with Lenis smooth scrolling — the same buttery,
 * momentum-based scroll feel used on creative/portfolio sites.
 * Exposes the Lenis instance via LenisContext so child components
 * can call lenis.stop() / lenis.start() to lock/unlock scroll.
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    // Prevent browser from restoring scroll position on reload
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Jump native scroll to top immediately (before Lenis takes over)
    window.scrollTo(0, 0);

    const lenisInstance = new Lenis({
      duration: 1.2,          // scroll lerp duration (higher = more "buttery")
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenisInstance;
    setLenis(lenisInstance);

    // Also reset Lenis's internal scroll position to 0
    lenisInstance.scrollTo(0, { immediate: true });

    // RAF loop — drives Lenis interpolation each frame
    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
