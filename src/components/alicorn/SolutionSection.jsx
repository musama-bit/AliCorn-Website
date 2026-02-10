import React from "react";
import { motion } from "framer-motion";
import { Lock, FileCheck, ShieldCheck, Headphones } from "lucide-react";

const FEATURES = [
  {
    icon: Lock,
    title: "Isolated private workspace",
    desc: "Client environments are isolated by design. Your deployment is separated from other customers.",
  },
  {
    icon: FileCheck,
    title: "Grounded answers with citations",
    desc: "Responses reference your internal policies and SOPs so users can verify sources.",
  },
  {
    icon: ShieldCheck,
    title: "Governance guardrails + role-based access",
    desc: "Clear boundaries for what AI can do, who can do it, and what data it can touch.",
  },
  {
    icon: Headphones,
    title: "Managed operations",
    desc: "We monitor quality, maintain the system, and support rollout so IT isn't stuck owning a new platform.",
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
            We stand up a private, governed AI workspace and run it for you. The product is control: role-based access, logging, grounded answers from your documents, and guardrails that prevent risky behavior—so AI becomes deployable, auditable, and supportable.
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 p-6 md:p-8 bg-white rounded-2xl border border-black/[0.04]"
        >
          <h3 className="text-xl font-semibold text-[#0B0B0B] mb-4">
            Why teams use Alicorn AI alongside enterprise copilots
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4B9CD3] mt-2 flex-shrink-0" />
              <span className="text-[15px] leading-relaxed text-[#0B0B0B]/60">
                Alicorn is the governed workspace for internal knowledge + workflows.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4B9CD3] mt-2 flex-shrink-0" />
              <span className="text-[15px] leading-relaxed text-[#0B0B0B]/60">
                Copilots help with general productivity; governance still needs a home.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4B9CD3] mt-2 flex-shrink-0" />
              <span className="text-[15px] leading-relaxed text-[#0B0B0B]/60">
                We focus on auditability, policy grounding, and operational control from day one.
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}