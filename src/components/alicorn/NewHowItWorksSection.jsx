import React from "react";
import { motion } from "framer-motion";

export default function NewHowItWorksSection() {
  const steps = [
    "Align on priority workflows and approval requirements.",
    "Deploy a private AI environment (cloud-first; client cloud or on-prem if required).",
    "Ground it in your internal knowledge.",
    "Operate, monitor, and refine with you.",
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-[#4B9CD3] to-[#5aabdb]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] font-bold tracking-[-0.03em] text-white mb-12">
            How we deploy it
          </h2>

          <div className="space-y-6 mb-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex items-start gap-6 bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#4B9CD3]">{i + 1}</span>
                </div>
                <p className="text-xl text-white pt-2">{step}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="p-6 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30"
          >
            <p className="text-xl text-white font-semibold">
              We own the operational burden so IT doesn't inherit another fragile tool.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}