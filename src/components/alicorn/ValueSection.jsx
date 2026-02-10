import React from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, DollarSign } from "lucide-react";

const COLUMNS = [
  {
    icon: Zap,
    title: "Faster execution",
    bullets: [
      "Quicker answers to process questions (SOP copilot)",
      "Less time searching for policies and tribal knowledge",
      "Drafting and summarization that stays inside your environment",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Governed adoption",
    bullets: [
      "Reduced shadow AI exposure",
      "Clear access + approval boundaries",
      "Audit logs for internal and compliance review",
    ],
  },
  {
    icon: DollarSign,
    title: "Predictable cost + ownership",
    bullets: [
      "Controlled deployment scope",
      "Avoid per-seat sprawl across vendors",
      "Operational support so IT isn't stuck maintaining it",
    ],
  },
];

export default function ValueSection() {
  return (
    <section id="value" className="py-24 md:py-32 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[13px] font-semibold tracking-widest uppercase text-[#4B9CD3] mb-4">Outcomes</p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-[#0B0B0B] leading-tight">
            What changes after Alicorn is in place
          </h2>
        </motion.div>

        <div className="mt-14 md:mt-16 grid md:grid-cols-3 gap-6 md:gap-8">
          {COLUMNS.map((col, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-7 md:p-8 bg-white rounded-2xl border border-black/[0.04]"
            >
              <div className="w-12 h-12 rounded-xl bg-[#4B9CD3]/10 flex items-center justify-center mb-5">
                <col.icon className="w-6 h-6 text-[#4B9CD3]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0B0B0B] mb-5">{col.title}</h3>
              <ul className="space-y-3.5">
                {col.bullets.map((bullet, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4B9CD3] mt-2 flex-shrink-0" />
                    <span className="text-[15px] leading-relaxed text-[#0B0B0B]/60">{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 p-6 md:p-8 rounded-2xl bg-[#4B9CD3]/5 border border-[#4B9CD3]/15"
        >
          <p className="text-base md:text-lg leading-relaxed text-[#0B0B0B] font-semibold">
            Even small time savings compound. We quantify ROI during the pilot.
          </p>
        </motion.div>
      </div>
    </section>
  );
}