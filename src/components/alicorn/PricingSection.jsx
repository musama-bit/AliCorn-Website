import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const scrollTo = (id) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const PLANS = [
  {
    badge: "Start here",
    title: "Paid Pilot",
    subtitle: "30 days",
    price: "$25k–$40k",
    priceNote: "setup",
    features: [
      "Private environment setup",
      "2–3 workflows live",
      "SOP ingestion + grounding",
      "Basic governance + logs",
      "Success metrics report",
    ],
    cta: "Start a pilot",
    primary: true,
  },
  {
    badge: "Ongoing",
    title: "Managed Workspace",
    subtitle: "Monthly",
    price: "$15k–$25k",
    priceNote: "/ month",
    features: [
      "Monitoring + updates",
      "Ongoing tuning and improvements",
      "Support and incident response",
      "Add workflows over time",
    ],
    cta: "Talk pricing",
    primary: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-[13px] font-semibold tracking-widest uppercase text-[#4B9CD3] mb-4">Pricing</p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-[#0B0B0B] leading-tight">
            A simple way to start
          </h2>
        </motion.div>

        <div className="mt-14 md:mt-16 grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {PLANS.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative p-8 md:p-10 rounded-3xl border-2 transition-all ${
                plan.primary
                  ? "border-[#4B9CD3] bg-[#4B9CD3]/[0.02] shadow-lg shadow-[#4B9CD3]/5"
                  : "border-black/[0.06] bg-[#F5F7FA]/50"
              }`}
            >
              {/* Badge */}
              <span className={`inline-block text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-6 ${
                plan.primary ? "bg-[#4B9CD3]/10 text-[#4B9CD3]" : "bg-black/5 text-[#0B0B0B]/50"
              }`}>
                {plan.badge}
              </span>

              <h3 className="text-2xl font-bold text-[#0B0B0B]">{plan.title}</h3>
              <p className="text-sm text-[#0B0B0B]/45 mt-1">{plan.subtitle}</p>

              <div className="mt-6 mb-8">
                <span className="text-4xl font-bold text-[#0B0B0B]">{plan.price}</span>
                <span className="text-sm text-[#0B0B0B]/45 ml-1.5">{plan.priceNote}</span>
              </div>

              <ul className="space-y-3.5 mb-10">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check className="w-4.5 h-4.5 text-[#4B9CD3] flex-shrink-0 mt-0.5" />
                    <span className="text-[15px] text-[#0B0B0B]/65">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollTo("#contact")}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 font-semibold text-[15px] rounded-full transition-all group ${
                  plan.primary
                    ? "bg-[#4B9CD3] text-white hover:bg-[#3a8bc2] hover:shadow-lg hover:shadow-[#4B9CD3]/20"
                    : "bg-[#0B0B0B] text-white hover:bg-[#1a1a1a]"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 text-center text-[13px] text-[#0B0B0B]/40"
        >
          Pricing depends on scope, usage, and deployment requirements.
        </motion.p>
      </div>
    </section>
  );
}