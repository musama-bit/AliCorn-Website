import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "How It Works", href: "#how" },
  { label: "Use Cases", href: "#usecases" },
  { label: "Security", href: "#security" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 md:h-[72px]">
        {/* Logo */}
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center group">
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6987bf0f7f2976d049a2adb1/ddc3705c6_A2640A5F-7745-4900-96FA-3726CE1067D7.png" 
            alt="Alicorn AI" 
            className="h-10 w-auto"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="px-3 py-2 text-[13px] font-medium text-[#0B0B0B]/70 hover:text-[#0B0B0B] transition-colors rounded-lg hover:bg-black/[0.03]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleClick(e, "#contact")}
            className="ml-3 px-5 py-2.5 bg-[#4B9CD3] text-white text-[13px] font-semibold rounded-full hover:bg-[#3a8bc2] transition-colors"
          >
            Book a call
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 -mr-2 text-[#0B0B0B]/70"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-black/5 shadow-lg">
          <div className="px-5 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="block px-3 py-2.5 text-sm font-medium text-[#0B0B0B]/70 hover:text-[#0B0B0B] rounded-lg hover:bg-black/[0.03]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleClick(e, "#contact")}
              className="block mt-3 text-center px-5 py-3 bg-[#4B9CD3] text-white text-sm font-semibold rounded-full"
            >
              Book a call
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}