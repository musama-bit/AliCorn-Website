import React from "react";
import { motion } from "framer-motion";

export default function OutcomeSection() {
  const outcomes = [
    {
      title: "Your teams move faster",
      points: [
        "Answers grounded in your SOPs",
        "Drafting inside your environment",
        "Workflow support without policy violations",
      ],
    },
    {
      title: "IT regains control",
      points: [
        "Role-based access",
        "Clear boundaries",
        "Usage visibility",
        "Predictable costs",
      ],
    },
    {
      title: "Security gets confidence",
      points: [
        "No training on your data",
        "Isolated environment",
        "Audit-ready logging",
        "Guardrails by design",
      ],
    },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] font-bold tracking-[-0.03em] text-[#0B0B0B]">
            What changes when<br className="hidden sm:block" /> Alicorn is in place
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {outcomes.map((col, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-gradient-to-br from-[#F8F9FA] to-white p-8 rounded-2xl border-2 border-[#0B0B0B]/5"
            >
              <h3 className="text-2xl font-bold text-[#0B0B0B] mb-6">{col.title}</h3>
              <ul className="space-y-3">
                {col.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-3 text-[#0B0B0B]/70">
                    <span className="text-[#4B9CD3] font-bold mt-1">—</span>
                    <span className="text-lg">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-2xl font-semibold text-[#0B0B0B]/80">
            AI becomes <span className="text-[#4B9CD3]">usable</span>. <span className="text-[#4B9CD3]">Governed</span>. <span className="text-[#4B9CD3]">Defensible</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}