"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-3"
            : "bg-transparent py-5"
        }`}
        style={
          isScrolled
            ? {
                background: "rgba(253,252,249,0.88)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderBottom: "1px solid rgba(242,196,206,0.25)",
                boxShadow: "0 2px 16px rgba(201,169,110,0.07)",
              }
            : {}
        }
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          {/* Monogram */}
          <a
            href="#prologue"
            onClick={(e) => handleLinkClick(e, "#prologue")}
            className="flex items-center gap-3 group"
          >
            <span
              className="font-heading font-bold text-xl tracking-[0.22em] uppercase transition-all duration-300"
              style={{
                color: isScrolled ? "var(--garden-gold)" : "var(--garden-gold-light)",
                textShadow: isScrolled
                  ? "0 1px 8px rgba(201,169,110,0.2)"
                  : "0 1px 12px rgba(201,169,110,0.3)",
              }}
            >
              H + S
            </span>
          </a>
        </div>
      </motion.nav>
    </>
  );
}
