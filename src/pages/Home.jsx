import React, { useEffect } from "react";
import StickyNav from "@/components/alicorn/StickyNav";
import HeroSection from "@/components/alicorn/HeroSection";
import ProblemSection from "@/components/alicorn/ProblemSection";
import SolutionSection from "@/components/alicorn/SolutionSection";
import HowItWorksSection from "@/components/alicorn/HowItWorksSection";
import ValueSection from "@/components/alicorn/ValueSection";
import UseCasesSection from "@/components/alicorn/UseCasesSection";
import SecuritySection from "@/components/alicorn/SecuritySection";

import FAQSection from "@/components/alicorn/FAQSection";
import ContactSection from "@/components/alicorn/ContactSection";
import Footer from "@/components/alicorn/Footer";

export default function Home() {
  useEffect(() => {
    document.title = "Alicorn AI | Private AI Your Team Is Allowed to Use";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Alicorn AI deploys and manages private, governed AI workspaces so mid-market teams can use AI safely with predictable costs.");
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content = "Alicorn AI deploys and manages private, governed AI workspaces so mid-market teams can use AI safely with predictable costs.";
      document.head.appendChild(newMeta);
    }
  }, []);

  return (
    <div className="font-sans antialiased text-[#0B0B0B] bg-white" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <StickyNav />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <ValueSection />
      <UseCasesSection />
      <SecuritySection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}