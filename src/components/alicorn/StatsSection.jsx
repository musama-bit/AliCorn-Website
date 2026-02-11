import React from "react";
import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    { number: "2-4 weeks", label: "typical deployment time" },
    { number: "60%", label: "reduction in repetitive queries" },
    { number: "100%", label: "audit visibility" },
    { number: "Zero", label: "data training by default" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl sm:text-6xl font-bold text-[#FF6B35] mb-3">
                {stat.number}
              </div>
              <div className="text-lg text-[#0B0B0B]/70">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}