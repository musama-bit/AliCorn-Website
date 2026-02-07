import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Send, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const CONCERNS = [
  "Security / Compliance",
  "Productivity",
  "Cost predictability",
  "Governance",
  "Other",
];

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    team_size: "",
    concern: "",
    message: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production this would submit to a backend
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="contact" className="py-24 md:py-32 bg-[#0B0B0B]">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-full bg-[#4B9CD3]/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-[#4B9CD3]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">We got your message</h3>
            <p className="text-white/50 text-base">We'll review your info and reach out within one business day.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[13px] font-semibold tracking-widest uppercase text-[#4B9CD3] mb-4">Contact</p>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-white leading-tight">
              Want to see if this fits?
            </h2>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-white/50 max-w-md">
              If AI is blocked internally or you're worried about shadow AI, we'll help you evaluate the safest path forward.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href="mailto:hello@alicornai.com"
                className="inline-flex items-center gap-3 text-white/40 hover:text-[#4B9CD3] transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="text-[15px]">hello@alicornai.com</span>
              </a>
            </div>
          </motion.div>

          {/* Right side - form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/60 text-[13px]">Name</Label>
                  <Input
                    required
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Jane Smith"
                    className="bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/25 focus:border-[#4B9CD3]/50 h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/60 text-[13px]">Work email</Label>
                  <Input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="jane@company.com"
                    className="bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/25 focus:border-[#4B9CD3]/50 h-12"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/60 text-[13px]">Company</Label>
                  <Input
                    required
                    value={form.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    placeholder="Acme Corp"
                    className="bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/25 focus:border-[#4B9CD3]/50 h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/60 text-[13px]">Role</Label>
                  <Input
                    value={form.role}
                    onChange={(e) => handleChange("role", e.target.value)}
                    placeholder="VP of Operations"
                    className="bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/25 focus:border-[#4B9CD3]/50 h-12"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/60 text-[13px]">Team size</Label>
                  <Input
                    value={form.team_size}
                    onChange={(e) => handleChange("team_size", e.target.value)}
                    placeholder="50–200"
                    className="bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/25 focus:border-[#4B9CD3]/50 h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/60 text-[13px]">Primary concern</Label>
                  <Select onValueChange={(v) => handleChange("concern", v)}>
                    <SelectTrigger className="bg-white/[0.06] border-white/[0.08] text-white h-12 [&>span]:text-white/25 data-[state=open]:border-[#4B9CD3]/50">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {CONCERNS.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white/60 text-[13px]">Message</Label>
                <Textarea
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Tell us about your situation…"
                  rows={4}
                  className="bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/25 focus:border-[#4B9CD3]/50 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#4B9CD3] text-white font-semibold text-[15px] rounded-full hover:bg-[#3a8bc2] transition-all hover:shadow-lg hover:shadow-[#4B9CD3]/20 group"
              >
                <Send className="w-4 h-4" />
                Book a 20-minute fit call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}