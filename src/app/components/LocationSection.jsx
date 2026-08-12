"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const VENUE = {
  name: "Asliya Golden Cassandra",
  address: "Katupitiya Road, Dambokka, Sri Lanka",
  time: "9:00 AM onwards",
  mapSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.2824414759525!2d80.33747257934111!3d7.43396627343668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae33ba4acb686e9%3A0x4133679c8fdf897c!2sAsliya%20Golden%20Cassandra!5e0!3m2!1sen!2slk!4v1786535514467!5m2!1sen!2slk",
  googleMapsLink: "https://maps.app.goo.gl/B3a81oY1Ay1kZ6rD7",
};

const INFO_ITEMS = [
  { icon: "🌸", label: "Venue", value: VENUE.name },
  { icon: "🗺️", label: "Address", value: VENUE.address },
  { icon: "🕐", label: "Time", value: VENUE.time },
];

export default function LocationSection() {
  return (
    <SectionWrapper id="location" noPadding>
      {/* Inner container */}
      <div className="max-w-7xl mx-auto px-4 pt-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.h2
            className="font-heading font-bold text-5xl heading-glow bg-clip-text text-transparent bg-linear-to-b from-accent via-accent-light to-accent"
            // style={{ color: "var(--garden-gold-light)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Where We Celebrate
          </motion.h2>
          <div className="max-w-36 flex mx-auto">
            <svg
              width="278"
              height="32"
              viewBox="0 0 278 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M142.303 26.3843C142.303 26.3843 134.973 -1.5264 113.827 1.57494C92.682 4.67627 108.471 37.0989 123.414 29.4856C138.357 21.8736 119.185 -1.52639 92.9634 17.6456C66.7439 36.8176 49.2631 25.8202 47.572 12.8522C45.8798 -0.117085 62.9376 3.82959 60.8231 14.8256C58.7819 25.4363 38.5574 37.2296 30.9371 22.1549C24.4527 9.32693 44.7522 10.4549 38.6902 20.8869C32.2778 31.9256 14.3027 21.6456 1.3335 30.6416"
                stroke="url(#paint0_linear_2389_327)"
                strokeWidth="2.66667"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M135.531 26.3843C135.531 26.3843 142.862 -1.5264 164.007 1.57494C185.152 4.67627 169.363 37.0989 154.42 29.4856C139.478 21.8736 158.65 -1.52639 184.871 17.6456C211.091 36.8176 228.571 25.8202 230.262 12.8522C231.955 -0.117085 214.897 3.82959 217.011 14.8256C219.053 25.4363 239.277 37.2296 246.897 22.1549C253.382 9.32693 233.082 10.4549 239.144 20.8869C245.557 31.9256 263.532 21.6456 276.501 30.6416"
                stroke="url(#paint1_linear_2389_327)"
                strokeWidth="2.66667"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_2389_327"
                  x1="142.303"
                  y1="15.988"
                  x2="1.3335"
                  y2="15.988"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#D5A95B" />
                  <stop offset="0.5" stopColor="#F0D69C" />
                  <stop offset="1" stopColor="#D5A95B" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_2389_327"
                  x1="135.531"
                  y1="15.988"
                  x2="276.501"
                  y2="15.988"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#D5A95B" />
                  <stop offset="0.5" stopColor="#F0D69C" />
                  <stop offset="1" stopColor="#D5A95B" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <motion.p
            className="font-body mt-4 max-w-md mx-auto text-sm leading-relaxed"
            style={{ color: "var(--garden-taupe)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Come share in our joy and help us celebrate the beginning of our
            forever - we cannot wait to see you there.
          </motion.p>
        </div>

        {/* Map + Info grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Google Map embed */}
          <motion.div
            className="lg:col-span-2 relative rounded-2xl overflow-hidden"
            style={{ minHeight: "300px" }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* Blush border glow */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none z-10"
              style={{
                boxShadow: "inset 0 0 0 1px rgba(242,196,206,0.40)",
              }}
            />

            {/* Corner accents — blush tones */}
            {[
              { top: 0, left: 0, hDir: "to right", vDir: "to bottom" },
              { top: 0, right: 0, hDir: "to left", vDir: "to bottom" },
              { bottom: 0, left: 0, hDir: "to right", vDir: "to top" },
              { bottom: 0, right: 0, hDir: "to left", vDir: "to top" },
            ].map((corner, i) => (
              <div
                key={i}
                className="absolute w-8 h-8 z-20 pointer-events-none"
                style={{
                  top: corner.top,
                  bottom: corner.bottom,
                  left: corner.left,
                  right: corner.right,
                }}
              >
                <div
                  className="absolute w-full h-[2px]"
                  style={{
                    background: `linear-gradient(${corner.hDir}, rgba(212,132,154,0.6), transparent)`,
                    top: corner.top !== undefined ? 0 : "auto",
                    bottom: corner.bottom !== undefined ? 0 : "auto",
                  }}
                />
                <div
                  className="absolute h-full w-[2px]"
                  style={{
                    background: `linear-gradient(${corner.vDir}, rgba(212,132,154,0.6), transparent)`,
                    left: corner.left !== undefined ? 0 : "auto",
                    right: corner.right !== undefined ? 0 : "auto",
                  }}
                />
              </div>
            ))}

            <iframe
              src={VENUE.mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wedding Venue Location"
              className="block"
            />
          </motion.div>

          {/* Info panel */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {/* Venue detail cards */}
            {INFO_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                className="floral-card rounded-2xl p-5 relative overflow-hidden group flex-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.12 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                {/* Hover shimmer */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(242,196,206,0.12) 0%, transparent 60%)",
                  }}
                />
                <div className="relative z-10 flex items-start gap-4">
                  <span className="text-2xl leading-none mt-0.5">
                    {item.icon}
                  </span>
                  <div>
                    <p
                      className="font-body text-[10px] tracking-[0.25em] uppercase font-semibold mb-1"
                      style={{ color: "var(--garden-taupe-light)" }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="font-body text-sm font-medium leading-snug"
                      style={{ color: "var(--garden-charcoal)" }}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Directions button */}
            <motion.a
              href={VENUE.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-3 rounded-2xl py-4 px-6 overflow-hidden font-body font-semibold text-sm tracking-widest uppercase transition-all duration-300"
              style={{
                background:
                  "linear-gradient(135deg, rgba(242,196,206,0.18) 0%, rgba(242,196,206,0.08) 100%)",
                border: "1px solid rgba(212,132,154,0.35)",
                color: "var(--garden-rose)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.85 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Animated fill on hover */}
              <span
                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-2xl"
                style={{ background: "rgba(242,196,206,0.18)" }}
              />
              <span className="relative flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
                Get Directions
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
