import React from "react";
import { motion } from "framer-motion";
import { Search, Server, Database, Rocket, Info } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    num: "01",
    title: "Discovery",
    desc: "We map your priority use cases and data sources.",
  },
  {
    icon: Server,
    num: "02",
    title: "Secure setup",
    desc: "We deploy your private AI workspace (cloud-first by default; other options available).",
  },
  {
    icon: Database,
    num: "03",
    title: "Knowledge ingestion",
    desc: "We load SOPs, policies, and internal documentation with version control.",
  },
  {
    icon: Rocket,
    num: "04",
    title: "Launch + manage",
    desc: "We roll out to users, monitor usage, and improve quality over time.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how" className="py-24 md:py-32 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[13px] font-semibold tracking-widest uppercase text-[#4B9CD3] mb-4">Process</p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-white leading-tight">
            How it works
          </h2>
        </motion.div>

        <div className="mt-14 md:mt-16 grid md:grid-cols-4 gap-6 md:gap-4 lg:gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative"
            >
              {/* Connector line (desktop only) */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(100%_-_8px)] w-[calc(100%_-_40px)] h-px bg-white/10 -translate-x-1/2 z-0" />
              )}

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-6">
                  <step.icon className="w-7 h-7 text-[#4B9CD3]" />
                </div>
                <span className="text-[13px] font-semibold text-[#4B9CD3] tracking-wide">{step.num}</span>
                <h3 className="mt-2 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/50">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Callout */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 md:mt-16 flex items-start gap-3.5 p-5 md:p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08]"
        >
          <Info className="w-5 h-5 text-[#4B9CD3] flex-shrink-0 mt-0.5" />
          <p className="text-[15px] leading-relaxed text-white/60">
            Cloud-first now. Client cloud and on-prem options available once requirements demand it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}