import React from "react";
import { motion } from "framer-motion";

export default function NewHeroSection() {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-white">
      {/* Animated gradient orb */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#4B9CD3]/20 to-[#4B9CD3]/30 blur-[120px] pointer-events-none"
      />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Main headline */}
          <h1 className="text-[clamp(3rem,7vw,5.5rem)] leading-[1.05] font-bold tracking-[-0.04em] text-[#0B0B0B] mb-8">
            Let your company use AI,<br />
            <span className="text-[#4B9CD3]">without losing control.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-[clamp(1.125rem,2.5vw,1.5rem)] leading-[1.4] text-[#0B0B0B]/70 max-w-4xl mx-auto mb-6">
            Alicorn AI deploys and operates a private, governed AI environment so your teams can move faster without creating security, compliance, or audit risk.
          </p>

          {/* Credibility line */}
          <p className="text-base font-semibold text-[#4B9CD3] tracking-wide mb-12">
            Built for IT. Trusted by Security. Reviewable by Legal.
          </p>

          {/* Primary CTA */}
          <button
            onClick={() => scrollTo("#contact")}
            className="inline-flex items-center justify-center px-10 py-5 bg-[#4B9CD3] text-white font-bold text-lg rounded-lg hover:bg-[#3a8bc2] transition-all hover:shadow-xl hover:shadow-[#4B9CD3]/30 hover:scale-105"
          >
            Calculate Your ROI
          </button>
        </motion.div>
      </div>
    </section>
  );
}