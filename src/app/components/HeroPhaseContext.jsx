"use client";

import { createContext, useContext, useState } from "react";

const HeroPhaseContext = createContext({
  phase: "idle",
  setPhase: () => {},
});

export function HeroPhaseProvider({ children }) {
  const [phase, setPhase] = useState("idle");
  return (
    <HeroPhaseContext.Provider value={{ phase, setPhase }}>
      {children}
    </HeroPhaseContext.Provider>
  );
}

export function useHeroPhase() {
  return useContext(HeroPhaseContext);
}
