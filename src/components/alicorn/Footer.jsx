import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#0B0B0B] border-t border-white/[0.06] py-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-[#4B9CD3] flex items-center justify-center">
            <span className="text-white font-bold text-xs">A</span>
          </div>
          <span className="text-white/60 text-sm">© {new Date().getFullYear()} Alicorn AI</span>
        </div>
        <p className="text-white/30 text-[13px]">Private AI systems for mid-market operators.</p>
      </div>
    </footer>
  );
}