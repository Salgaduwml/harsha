"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import ConfettiEffect from "./ConfettiEffect";
import { submitRSVP } from "../actions";

const DIETARY_OPTIONS = [
  "No restrictions",
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Halal",
  "Kosher",
  "Other",
];

function FormField({ label, children, id }) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-parchment-dark text-sm tracking-[0.1em] uppercase font-body"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default function RSVPSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const formRef = useRef(null);

  const inputClasses =
    "w-full bg-white border border-gold/15 rounded-lg px-4 py-3 text-parchment font-body text-sm placeholder:text-mist-light outline-none transition-all duration-300 focus:border-gold/50 focus:ring-1 focus:ring-gold/20 focus:shadow-lg focus:shadow-gold/5";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);
    const response = await submitRSVP(formData);

    setIsSubmitting(false);
    setResult(response);

    if (response.success) {
      setConfettiTrigger((prev) => prev + 1);
      formRef.current?.reset();
    }
  };

  return (
    <SectionWrapper id="enlist">
      <ConfettiEffect trigger={confettiTrigger} />

      {/* Section header */}
      <div className="text-center mb-16">
        <motion.p
          className="font-accent italic text-crimson text-sm tracking-[0.3em] uppercase mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Chapter VI
        </motion.p>
        <motion.h2
          className="font-heading text-gold text-3xl sm:text-4xl md:text-5xl heading-glow"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Join the Corps
        </motion.h2>
        <motion.p
          className="font-body text-mist mt-4 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Enlist for the greatest mission of all — celebrating love.
          Fill out your deployment papers below.
        </motion.p>
      </div>

      {/* Form card */}
      <motion.div
        className="max-w-xl mx-auto parchment rounded-2xl p-8 md:p-10 relative overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-crimson/30 to-transparent" />
          <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-crimson/30 to-transparent" />
        </div>
        <div className="absolute bottom-0 right-0 w-20 h-20">
          <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-crimson/30 to-transparent" />
          <div className="absolute bottom-0 right-0 w-[2px] h-full bg-gradient-to-t from-crimson/30 to-transparent" />
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h3 className="font-heading text-gold text-xl mb-2">
            Enlistment Form
          </h3>
          <p className="font-body text-mist text-xs tracking-[0.2em] uppercase">
            Survey Corps — Special Operations Division
          </p>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          <FormField label="Full Name" id="rsvp-name">
            <input
              id="rsvp-name"
              name="name"
              type="text"
              required
              placeholder="Enter your full name"
              className={inputClasses}
            />
          </FormField>

          <FormField label="Email Address" id="rsvp-email">
            <input
              id="rsvp-email"
              name="email"
              type="email"
              required
              placeholder="your.email@example.com"
              className={inputClasses}
            />
          </FormField>

          <FormField label="Number of Soldiers" id="rsvp-guests">
            <input
              id="rsvp-guests"
              name="guests"
              type="number"
              min="1"
              max="10"
              defaultValue="1"
              className={inputClasses}
            />
          </FormField>

          <FormField label="Dietary Restrictions" id="rsvp-dietary">
            <select
              id="rsvp-dietary"
              name="dietary"
              className={`${inputClasses} cursor-pointer`}
            >
              {DIETARY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Message to the Couple" id="rsvp-message">
            <textarea
              id="rsvp-message"
              name="message"
              rows={3}
              placeholder="Share your blessings or a favorite memory..."
              className={`${inputClasses} resize-none`}
            />
          </FormField>

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 py-4 px-8 rounded-xl font-heading text-white tracking-[0.15em] uppercase text-sm relative overflow-hidden disabled:opacity-60 cursor-pointer"
            style={{
              background:
                "linear-gradient(135deg, var(--aot-crimson) 0%, #8b1a1a 100%)",
              border: "1px solid rgba(181, 48, 42, 0.3)",
              boxShadow: "0 4px 15px rgba(181, 48, 42, 0.15)",
            }}
            whileHover={{
              scale: 1.02,
              boxShadow:
                "0 6px 25px rgba(181, 48, 42, 0.25), 0 0 40px rgba(181, 48, 42, 0.1)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
                Enlisting...
              </span>
            ) : (
              "⚔️ Take the Oath"
            )}
          </motion.button>
        </form>

        {/* Result message */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-4 rounded-lg text-center text-sm font-body ${
              result.success
                ? "bg-emerald/10 border border-emerald/30 text-emerald"
                : "bg-crimson/10 border border-crimson/30 text-crimson"
            }`}
          >
            {result.success ? result.message : result.error}
          </motion.div>
        )}
      </motion.div>
    </SectionWrapper>
  );
}
