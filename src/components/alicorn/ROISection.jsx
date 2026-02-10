import React from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight } from "lucide-react";

export default function ROISection() {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="roi" className="py-24 md:py-32 bg-[#F5F7FA]">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-14 h-14 rounded-xl bg-[#4B9CD3]/10 flex items-center justify-center mx-auto mb-6">
            <Calculator className="w-7 h-7 text-[#4B9CD3]" />
          </div>
          
          <p className="text-[13px] font-semibold tracking-widest uppercase text-[#4B9CD3] mb-4">
            Coming next
          </p>
          
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-[#0B0B0B] leading-tight">
            Quantify the ROI
          </h2>
          
          <p className="mt-6 text-base md:text-lg leading-relaxed text-[#0B0B0B]/60 max-w-2xl mx-auto">
            We're building a short assessment to estimate ROI and capture your governance requirements (team size, usage, risk posture, and priority workflows). If you'd like early access, mention 'ROI assessment' in your message.
          </p>

          <button
            onClick={() => scrollTo("#contact")}
            className="mt-8 inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-white border-2 border-[#4B9CD3]/20 text-[#4B9CD3] font-semibold text-[15px] rounded-full hover:bg-[#4B9CD3]/5 hover:border-[#4B9CD3]/30 transition-all group"
          >
            Request early access
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}