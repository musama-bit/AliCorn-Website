import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Eye, FileQuestion, Link2, TrendingUp } from "lucide-react";

const PROBLEMS = [
  { icon: AlertTriangle, text: "Employees use public AI tools anyway (shadow AI)." },
  { icon: Eye, text: "Legal and security teams worry about sensitive information leaving the company." },
  { icon: FileQuestion, text: "Public AI is hard to govern. No clear audit trail." },
  { icon: Link2, text: "AI governance teams block third-party tools from accessing internal knowledge, leaving solutions disconnected from your SOPs." },
  { icon: TrendingUp, text: "Costs become unpredictable as usage grows." },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="py-24 md:py-32 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[13px] font-semibold tracking-widest uppercase text-[#4B9CD3] mb-4">The problem</p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-[#0B0B0B] leading-tight">
            Why internal AI gets stuck
          </h2>
        </motion.div>

        <div className="mt-12 md:mt-16 grid gap-4 md:gap-5">
          {PROBLEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-start gap-4 md:gap-5 p-5 md:p-6 bg-white rounded-2xl border border-black/[0.04] hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#0B0B0B] flex items-center justify-center">
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-[15px] md:text-base leading-relaxed text-[#0B0B0B]/80 pt-2">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 md:mt-12 text-base md:text-lg leading-relaxed text-[#0B0B0B]/60 max-w-2xl"
        >
          Most teams don't have the time or staff to build a secure internal AI platform. So AI stays blocked, fragmented, or risky.
        </motion.p>
      </div>
    </section>
  );
}