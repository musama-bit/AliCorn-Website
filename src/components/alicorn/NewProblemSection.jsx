import React from "react";
import { motion } from "framer-motion";

export default function NewProblemSection() {
  return (
    <section className="py-32 bg-[#F8F9FA]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          {/* Headline */}
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] font-bold tracking-[-0.03em] text-[#0B0B0B] mb-8">
            Ungoverned AI use is spreading<br className="hidden sm:block" /> throughout your company
          </h2>

          {/* Supporting copy */}
          <div className="text-xl leading-relaxed text-[#0B0B0B]/70 mb-12 space-y-2">
            <p>Some teams are using public tools.</p>
            <p>Some teams are blocked entirely.</p>
            <p>IT is caught in the middle.</p>
          </div>

          {/* Bullet list */}
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {[
              "Shadow AI is happening.",
              "Blocking AI creates workarounds.",
              "Audit visibility disappears.",
              "Costs grow silently across departments.",
              "Trust erodes between IT and the business.",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-3 text-lg text-[#0B0B0B]/80"
              >
                <div className="w-2 h-2 rounded-full bg-[#4B9CD3] flex-shrink-0" />
                <span>{item}</span>
              </motion.div>
            ))}
          </div>

          {/* Closing statement */}
          <div className="p-8 bg-[#0B0B0B] rounded-2xl">
            <p className="text-2xl font-bold leading-tight">
              <span className="text-white">Doing nothing </span>
              <span className="text-[#4B9CD3]">increases risk.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}