import React from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";

export default function ROISection() {

  return (
    <section id="roi" className="py-24 md:py-32 bg-[#F5F7FA]">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-14 h-14 rounded-xl bg-[#4B9CD3]/10 flex items-center justify-center mx-auto mb-6">
            <Calculator className="w-7 h-7 text-[#4B9CD3]" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-[#0B0B0B] leading-tight">
            Quantify the ROI
          </h2>
          
          <p className="mt-6 text-base md:text-lg leading-relaxed text-[#0B0B0B]/60 max-w-2xl mx-auto">
            Take our quick assessment to estimate your organization's AI risk exposure, governance maturity, and potential productivity ROI.
          </p>

          <Link
            to={createPageUrl("PrivateAiRoiAssessment")}
            className="mt-8 inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#4B9CD3] text-white font-semibold text-[15px] rounded-full hover:bg-[#3a8bc2] transition-all hover:shadow-lg hover:shadow-[#4B9CD3]/20 group"
          >
            Calculate Your ROI
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}