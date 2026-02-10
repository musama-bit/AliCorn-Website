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
import ROISection from "@/components/alicorn/ROISection";
import ContactSection from "@/components/alicorn/ContactSection";
import Footer from "@/components/alicorn/Footer";

export default function Home() {
  useEffect(() => {
    document.title = "Alicorn AI | Governed Private AI Workspace for IT, Security & Legal";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Deploy a secure, private AI workspace with role-based access, audit logs, and grounded answers from your SOPs. Built for mid-market IT, Security, and Legal.");
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content = "Deploy a secure, private AI workspace with role-based access, audit logs, and grounded answers from your SOPs. Built for mid-market IT, Security, and Legal.";
      document.head.appendChild(newMeta);
    }

    // Open Graph tags for sharing
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    
    if (ogTitle) {
      ogTitle.setAttribute("content", "Alicorn AI | Governed Private AI Workspace");
    } else {
      const newOgTitle = document.createElement("meta");
      newOgTitle.setAttribute("property", "og:title");
      newOgTitle.content = "Alicorn AI | Governed Private AI Workspace";
      document.head.appendChild(newOgTitle);
    }

    if (ogDescription) {
      ogDescription.setAttribute("content", "Deploy a secure, private AI workspace with role-based access, audit logs, and grounded answers from your SOPs.");
    } else {
      const newOgDescription = document.createElement("meta");
      newOgDescription.setAttribute("property", "og:description");
      newOgDescription.content = "Deploy a secure, private AI workspace with role-based access, audit logs, and grounded answers from your SOPs.";
      document.head.appendChild(newOgDescription);
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
      <ROISection />
      <ContactSection />
      <Footer />
    </div>
  );
}