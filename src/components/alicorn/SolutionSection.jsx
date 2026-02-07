import React from "react";
import { motion } from "framer-motion";
import { Lock, FileCheck, ShieldCheck, Headphones } from "lucide-react";

const FEATURES = [
  {
    icon: Lock,
    title: "Private workspace (isolated environment)",
    desc: "Your environment is separated from other clients.",
  },
  {
    icon: FileCheck,
    title: "Grounded answers with sources",
    desc: "Responses can cite your documents so people can verify.",
  },
  {
    icon: ShieldCheck,
    title: "Guardrails + role-based access",
    desc: "Clear boundaries for what AI can and cannot do.",
  },
  {
    icon: Headphones,
    title: "Managed operations",
    desc: "Monitoring, updates, and support so your team isn't stuck maintaining it.",
  },
];

export default function SolutionSection() {
  return (
    <section id="solution" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[13px] font-semibold tracking-widest uppercase text-[#4B9CD3] mb-4">The solution</p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-[#0B0B0B] leading-tight">
            The Alicorn AI solution
          </h2>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-[#0B0B0B]/60 max-w-3xl">
            We set up a private AI workspace for your company and run it for you. It's designed for internal Q&A, SOP guidance, drafting, and agent workflows — with guardrails and logging from day one.
          </p>
        </motion.div>

        <div className="mt-14 md:mt-16 grid sm:grid-cols-2 gap-5 md:gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-7 md:p-8 rounded-2xl border border-black/[0.06] hover:border-[#4B9CD3]/20 bg-[#F5F7FA]/50 hover:bg-[#4B9CD3]/[0.03] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#4B9CD3]/10 flex items-center justify-center mb-5 group-hover:bg-[#4B9CD3]/15 transition-colors">
                <feature.icon className="w-6 h-6 text-[#4B9CD3]" />
              </div>
              <h3 className="text-lg font-semibold text-[#0B0B0B] mb-2">{feature.title}</h3>
              <p className="text-[15px] leading-relaxed text-[#0B0B0B]/55">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}