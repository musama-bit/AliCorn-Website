import React from "react";
import { motion } from "framer-motion";
import { BookOpen, FileText, Users, PenTool, HelpCircle, ClipboardList, UserPlus, Bot } from "lucide-react";

const USE_CASES = [
  { icon: BookOpen, title: "SOP Copilot", desc: "'How do we handle X?'" },
  { icon: FileText, title: "Policy Q&A", desc: "With citations" },
  { icon: Users, title: "Customer escalation", desc: "Summaries" },
  { icon: PenTool, title: "Proposal / SOW drafting", desc: "Using internal standards" },
  { icon: HelpCircle, title: "IT helpdesk", desc: "Knowledge assistant" },
  { icon: ClipboardList, title: "Operations checklists", desc: "Generation" },
  { icon: UserPlus, title: "Onboarding assistant", desc: "For new hires" },
  { icon: Bot, title: "Agent workflows", desc: "That follow strict rules" },
];

export default function UseCasesSection() {
  return (
    <section id="usecases" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[13px] font-semibold tracking-widest uppercase text-[#4B9CD3] mb-4">Use cases</p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-[#0B0B0B] leading-tight">
            Common use cases
          </h2>
        </motion.div>

        <div className="mt-14 md:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {USE_CASES.map((uc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group p-5 md:p-6 rounded-2xl border border-black/[0.06] bg-[#F5F7FA]/40 hover:bg-[#4B9CD3]/[0.04] hover:border-[#4B9CD3]/15 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-[#0B0B0B] flex items-center justify-center mb-4 group-hover:bg-[#4B9CD3] transition-colors">
                <uc.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-[15px] font-semibold text-[#0B0B0B]">{uc.title}</h3>
              <p className="mt-1 text-[13px] text-[#0B0B0B]/45">{uc.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-[15px] text-[#0B0B0B]/50 border-l-2 border-[#4B9CD3]/30 pl-5"
        >
          We start with 2–3 high-value workflows and expand once trust is established.
        </motion.p>
      </div>
    </section>
  );
}