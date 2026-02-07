import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Is this the same as ChatGPT for business?",
    a: "No. ChatGPT is a general-purpose tool. Alicorn AI creates a private workspace grounded in your company's own documents, with governance controls and logging. Think of it as your internal AI system, not a public chatbot.",
  },
  {
    q: "Do you train models on our data?",
    a: "No. By default, no external model is trained on your data. Your information stays within your environment and is used only for generating responses in real time.",
  },
  {
    q: "Where does it run?",
    a: "Cloud-first by default, hosted in a secure environment isolated for your company. We also support client-hosted cloud accounts and on-prem for organizations with stricter requirements.",
  },
  {
    q: "Can we use our own cloud account?",
    a: "Yes. After the pilot, we can deploy to your AWS, Azure, or GCP account if your compliance requirements demand it.",
  },
  {
    q: "Do we need to buy hardware?",
    a: "No. The cloud-first setup requires no hardware procurement. If you move to on-prem later, we'll help scope the infrastructure.",
  },
  {
    q: "How do you prevent bad answers?",
    a: "We use document-based grounding (answers cite sources), guardrails for topic boundaries, and refusal behavior when the system doesn't have enough information. Human escalation paths are built in.",
  },
  {
    q: "How fast can we launch?",
    a: "Most pilots go live within 2–4 weeks depending on the complexity of your use cases and data readiness.",
  },
  {
    q: "What happens if it fails or is uncertain?",
    a: "The system is configured to say 'I don't know' or escalate to a human rather than guess. Audit logs capture all interactions for review.",
  },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-black/[0.06] last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 md:py-6 text-left group"
      >
        <span className="text-[15px] md:text-base font-medium text-[#0B0B0B] group-hover:text-[#4B9CD3] transition-colors pr-4">
          {faq.q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[#0B0B0B]/30 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[#4B9CD3]" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="pb-5 md:pb-6 text-[15px] leading-relaxed text-[#0B0B0B]/55 pr-10">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-24 md:py-32 bg-[#F5F7FA]">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-16"
        >
          <p className="text-[13px] font-semibold tracking-widest uppercase text-[#4B9CD3] mb-4">FAQ</p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-[#0B0B0B] leading-tight">
            Frequently asked questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl border border-black/[0.04] px-6 md:px-8"
        >
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}