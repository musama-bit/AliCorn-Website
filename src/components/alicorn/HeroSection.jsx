import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export default function HeroSection() {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-white">
      {/* Subtle grid bg */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#0B0B0B 1px, transparent 1px), linear-gradient(90deg, #0B0B0B 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Gradient orb */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#4B9CD3]/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-20 md:pt-36 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-3xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4B9CD3]/8 border border-[#4B9CD3]/15 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4B9CD3]" />
            <span className="text-[13px] font-medium text-[#0B0B0B]/70">Private AI for mid-market companies</span>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[1.08] font-bold tracking-[-0.035em] text-[#0B0B0B]">
            Private AI your team<br className="hidden sm:block" /> is allowed to use.
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-[#0B0B0B]/60 max-w-2xl">
            Alicorn AI deploys and manages a secure, private AI workspace so your company can use AI with confidence — without exposing sensitive data.
          </p>

          {/* Trust statement */}
          <p className="mt-4 text-sm font-medium text-[#0B0B0B]/45 tracking-wide uppercase">
            Built for mid-market companies that need control, auditability, and predictable costs.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => scrollTo("#contact")}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#4B9CD3] text-white font-semibold text-[15px] rounded-full hover:bg-[#3a8bc2] transition-all hover:shadow-lg hover:shadow-[#4B9CD3]/20 group"
            >
              Book a 20-minute fit call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo("#how")}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-transparent border-2 border-[#0B0B0B]/12 text-[#0B0B0B] font-semibold text-[15px] rounded-full hover:border-[#0B0B0B]/25 hover:bg-black/[0.02] transition-all"
            >
              <Play className="w-4 h-4" />
              See how it works
            </button>
          </div>

          {/* Note */}
          <p className="mt-5 text-[13px] text-[#0B0B0B]/40">
            No obligation. We'll tell you quickly if this is not a fit.
          </p>
        </motion.div>
      </div>
    </section>
  );
}