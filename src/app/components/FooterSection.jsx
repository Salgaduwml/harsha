"use client";

import { motion } from "framer-motion";

export default function FooterSection() {
  return (
    <section
      id="footer"
      className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 overflow-hidden bg-void"
    >
      {/* Soft gradient background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "linear-gradient(135deg, rgba(181,48,42,0.04) 0%, rgba(248,246,242,1) 25%, rgba(168,132,46,0.03) 50%, rgba(248,246,242,1) 75%, rgba(181,48,42,0.04) 100%)",
          backgroundSize: "400% 400%",
          animation: "aurora 15s ease infinite",
        }}
      />

      {/* Soft cloud drift */}
      <motion.div
        className="absolute top-20 left-0 right-0 h-32 opacity-5 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--aot-gold) 0%, transparent 70%)",
        }}
        animate={{ x: [-100, 100, -100] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Wings watermark */}
        <motion.div
          className="flex justify-center mb-10 opacity-10"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          {/* logo */}
        </motion.div>

        {/* Closing message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="font-accent italic text-crimson text-sm tracking-[0.3em] uppercase mb-6">
            Epilogue
          </p>

          <h2 className="font-heading text-gold text-2xl sm:text-3xl md:text-4xl heading-glow mb-6">
            Shinzou wo Sasageyo
          </h2>

          <p className="font-accent italic text-parchment-dark text-lg leading-relaxed mb-8">
            &ldquo;Dedicate your hearts to celebrating with us. From the bottom
            of our souls, we are grateful for every person who has been part of
            our journey. See you beyond the walls.&rdquo;
          </p>

          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="w-16 h-[1px] bg-gold/30" />
            <p className="font-heading text-gold text-lg">Haruto & Sakura</p>
            <div className="w-16 h-[1px] bg-gold/30" />
          </div>
        </motion.div>

        {/* Date reminder */}
        <motion.div
          className="parchment inline-block rounded-xl px-8 py-4 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-mist text-xs tracking-[0.2em] uppercase mb-1 font-body">
            Save the Date
          </p>
          <p className="font-heading text-gold text-xl">August 15, 2026</p>
        </motion.div>

        {/* Contact / Social */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-mist text-sm font-body">
            Questions? Reach out to us at
          </p>
          <a
            href="mailto:haruto.sakura.wedding@example.com"
            className="text-gold hover:text-gold-light transition-colors font-body text-sm underline underline-offset-4 decoration-gold/30 hover:decoration-gold/60"
          >
            haruto.sakura.wedding@example.com
          </a>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 py-6 text-center">
        <div className="section-divider mb-4" />
        <p className="text-mist-light text-xs font-body tracking-wider">
          Made with ❤️ and a whole lot of anime
        </p>
        <p className="text-mist-light/60 text-[10px] font-body mt-1 tracking-wider">
          © 2026 Haruto & Sakura — All rights reserved
        </p>
      </div>
    </section>
  );
}
