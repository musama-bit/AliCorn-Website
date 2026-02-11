import React from "react";
import { motion } from "framer-motion";

export default function NewSecuritySection() {
  const items = [
    "Environment isolation",
    "Role-based permissions",
    "Audit logs available",
    "Grounded responses with sources",
    "Human escalation paths",
    "Deployment flexibility",
  ];

  return (
    <section id="security" className="py-32 bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] font-bold tracking-[-0.03em] text-[#0B0B0B] mb-6">
            Security and governance<br className="hidden sm:block" /> by default
          </h2>

          <p className="text-2xl text-[#0B0B0B]/70 mb-4">
            Alicorn is built to withstand internal review.
          </p>

          {/* Forward callout */}
          <div className="inline-flex items-center gap-2 px-5 py-3 bg-[#4B9CD3]/10 border-2 border-[#4B9CD3]/30 rounded-lg mb-12">
            <div className="w-2 h-2 rounded-full bg-[#4B9CD3]" />
            <span className="text-sm font-semibold text-[#0B0B0B]/80">
              Forward this section to Security and Legal.
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-center gap-3 p-5 bg-white rounded-xl border border-[#0B0B0B]/10"
              >
                <div className="w-3 h-3 rounded-full bg-[#4B9CD3] flex-shrink-0" />
                <span className="text-lg text-[#0B0B0B]/80">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}