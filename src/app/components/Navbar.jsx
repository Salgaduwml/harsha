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

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           setActiveSection(`#${entry.target.id}`);
  //         }
  //       });
  //     },
  //     { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
  //   );

  //   const sections = document.querySelectorAll("section[id]");
  //   sections.forEach((section) => observer.observe(section));
  //   return () => observer.disconnect();
  // }, []);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-white/5 backdrop-blur-sm py-3" : "bg-transparent py-5"
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          {/* Logo */}
          <a
            href="#prologue"
            onClick={(e) => handleLinkClick(e, "#prologue")}
            className="flex items-center gap-3 group"
          >
            <span className="font-heading text-gold font-bold text-lg tracking-[0.2em] uppercase">
              H + S
            </span>
          </a>
        </div>
      </motion.nav>
    </>
  );
}
