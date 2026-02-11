import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Where does the data live?",
    a: "Cloud-first by default. Client cloud (AWS, Azure, GCP) or on-prem options available based on your requirements.",
  },
  {
    q: "Do you train on our data?",
    a: "No. Your data stays in your environment and is never used for model training.",
  },
  {
    q: "What if the AI is uncertain?",
    a: "It refuses to answer, asks clarifying questions, or routes to a human based on configured policies.",
  },
  {
    q: "Can we control who has access?",
    a: "Yes. Role-based access controls determine who can use the system and what data they can access.",
  },
  {
    q: "How long does deployment take?",
    a: "Most pilots deploy in 2–4 weeks depending on use case complexity and data readiness.",
  },
  {
    q: "How is this different from Copilot?",
    a: "Copilot is general productivity. Alicorn is a governed workspace for your internal knowledge with audit controls, grounded answers, and managed operations.",
  },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-[#0B0B0B]/10 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-6 text-left group"
      >
        <span className="text-lg font-semibold text-[#0B0B0B] group-hover:text-[#4B9CD3] transition-colors">
          {faq.q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[#0B0B0B]/40 flex-shrink-0 transition-transform duration-300 ${
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
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-lg text-[#0B0B0B]/70 leading-relaxed">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function NewFAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] font-bold tracking-[-0.03em] text-[#0B0B0B] mb-12">
            Common questions
          </h2>

          <div className="bg-[#F8F9FA] rounded-2xl p-8">
            {FAQS.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}