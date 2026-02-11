import React, { useEffect } from "react";
import NewHeroSection from "@/components/alicorn/NewHeroSection";
import NewProblemSection from "@/components/alicorn/NewProblemSection";
import OutcomeSection from "@/components/alicorn/OutcomeSection";
import StatsSection from "@/components/alicorn/StatsSection";
import NewHowItWorksSection from "@/components/alicorn/NewHowItWorksSection";
import NewSecuritySection from "@/components/alicorn/NewSecuritySection";
import NewFAQSection from "@/components/alicorn/NewFAQSection";
import NewContactSection from "@/components/alicorn/NewContactSection";
import Footer from "@/components/alicorn/Footer";

export default function Home() {
  useEffect(() => {
    document.title = "Alicorn AI | Governed Private AI for IT & Security";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Deploy AI inside your company without losing control. Alicorn provides a private, governed AI environment built for IT, Security, and Legal.");
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content = "Deploy AI inside your company without losing control. Alicorn provides a private, governed AI environment built for IT, Security, and Legal.";
      document.head.appendChild(newMeta);
    }

    // Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    
    if (ogTitle) {
      ogTitle.setAttribute("content", "Alicorn AI | Governed Private AI for IT & Security");
    } else {
      const newOgTitle = document.createElement("meta");
      newOgTitle.setAttribute("property", "og:title");
      newOgTitle.content = "Alicorn AI | Governed Private AI for IT & Security";
      document.head.appendChild(newOgTitle);
    }

    if (ogDescription) {
      ogDescription.setAttribute("content", "Deploy AI inside your company without losing control. Alicorn provides a private, governed AI environment built for IT, Security, and Legal.");
    } else {
      const newOgDescription = document.createElement("meta");
      newOgDescription.setAttribute("property", "og:description");
      newOgDescription.content = "Deploy AI inside your company without losing control. Alicorn provides a private, governed AI environment built for IT, Security, and Legal.";
      document.head.appendChild(newOgDescription);
    }
  }, []);

  return (
    <div className="font-sans antialiased text-[#0B0B0B] bg-white" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <NewHeroSection />
      <NewProblemSection />
      <OutcomeSection />
      <StatsSection />
      <NewHowItWorksSection />
      <NewSecuritySection />
      <NewFAQSection />
      <NewContactSection />
      <Footer />
    </div>
  );
}