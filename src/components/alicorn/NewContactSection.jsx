import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NewContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const emailBody = `
New Contact - Alicorn AI

Name: ${form.name}
Email: ${form.email}
Company: ${form.company}

Message:
${form.message}

---
Submitted: ${new Date().toISOString()}
      `;

      await base44.integrations.Core.SendEmail({
        to: "info@theproductunicorn.com",
        subject: `Alicorn AI Inquiry: ${form.company} - ${form.name}`,
        body: emailBody,
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Failed to send:", error);
      alert("Failed to send. Please email us directly at info@theproductunicorn.com");
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="py-32 bg-[#0B0B0B]">
        <div className="max-w-2xl mx-auto px-6 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-full bg-[#4B9CD3]/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-[#4B9CD3]" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Message received</h3>
            <p className="text-xl text-white/60">We'll be in touch within one business day.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-32 bg-[#0B0B0B]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] font-bold tracking-[-0.03em] text-white mb-6">
            Leverage AI safely.
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            If AI is blocked internally, or already being used without oversight, contact us to map out your custom implementation plan.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-6">
              <Input
                required
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Name"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#4B9CD3]/50 h-14 text-lg"
              />
              <Input
                required
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Work email"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#4B9CD3]/50 h-14 text-lg"
              />
            </div>

            <Input
              required
              value={form.company}
              onChange={(e) => handleChange("company", e.target.value)}
              placeholder="Company"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#4B9CD3]/50 h-14 text-lg"
            />

            <Textarea
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              placeholder="Tell us about your situation..."
              rows={5}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#4B9CD3]/50 resize-none text-lg"
            />

            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-12 py-5 bg-[#4B9CD3] text-white font-bold text-lg rounded-lg hover:bg-[#3a8bc2] transition-all hover:shadow-xl hover:shadow-[#4B9CD3]/30 hover:scale-105"
              >
                Explore Now
              </button>
              <p className="mt-4 text-sm text-white/50">
                We'll outline a safe pilot and review steps for IT and Security.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}