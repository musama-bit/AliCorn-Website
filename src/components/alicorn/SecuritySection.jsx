import React from "react";
import { motion } from "framer-motion";
import { Shield, UserCheck, ClipboardList, Database, FileCheck, Users } from "lucide-react";

const ITEMS = [
  { icon: Shield, text: "Client environments are isolated" },
  { icon: UserCheck, text: "Access controls by role" },
  { icon: ClipboardList, text: "Audit logs available" },
  { icon: Database, text: "Data stays in your environment (no training on your data by default)" },
  { icon: FileCheck, text: "Document-based grounding and refusal behavior" },
  { icon: Users, text: "Human escalation paths for edge cases" },
];

export default function SecuritySection() {
  return (
    <section id="security" className="py-24 md:py-32 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[13px] font-semibold tracking-widest uppercase text-[#4B9CD3] mb-4">Security</p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-[#0B0B0B] leading-tight">
            Security and governance by design
          </h2>
          <div className="mt-6 p-5 bg-[#4B9CD3]/5 rounded-xl border border-[#4B9CD3]/15">
            <p className="text-sm font-semibold text-[#0B0B0B]/70 mb-2">
              Forward this section to your Security and Legal teams.
            </p>
            <p className="text-[15px] leading-relaxed text-[#0B0B0B]/60">
              Alicorn is built to support internal review. We align to your policies and deployment requirements (our cloud, your cloud, or on-prem).
            </p>
          </div>
        </motion.div>

        <div className="mt-14 md:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex items-start gap-4 p-5 md:p-6 bg-white rounded-2xl border border-black/[0.04]"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0B0B0B] flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-[#4B9CD3]" />
              </div>
              <p className="text-[15px] leading-relaxed text-[#0B0B0B]/70 pt-2">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 text-[13px] text-[#0B0B0B]/40 italic"
        >
          Specific controls vary by deployment (our cloud, your cloud, or on-prem). We'll align with your policies.
        </motion.p>
      </div>
    </section>
  );
}