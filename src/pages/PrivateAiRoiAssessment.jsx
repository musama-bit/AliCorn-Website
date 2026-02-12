import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, AlertTriangle, Shield, TrendingUp, FileCheck, Home, Loader2, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";

export default function PrivateAiRoiAssessment() {
  useEffect(() => {
    document.title = "Internal AI Readiness & ROI Assessment | Alicorn AI";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Evaluate your organization's AI risk exposure, governance maturity, and productivity opportunity in under 5 minutes.");
    }
  }, []);

  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSummary, setAiSummary] = useState("");

  const [formData, setFormData] = useState({
    // Step 1
    companyName: "",
    role: "",
    revenue: "",
    employees: "",
    industry: "",
    primaryConcerns: [],
    
    // Step 2
    aiUsage: "",
    aiApproval: "",
    aiLogging: "",
    dataType: "",
    
    // Step 3
    knowledgeWorkers: 100,
    hourlyRate: 60,
    searchMinutes: 30,
    sopReliance: "",
    aiPilots: "",
    
    // Step 4
    hasPolicy: "",
    hasOwner: "",
    budgetCentralized: "",
    executivePressure: "",
    
    // Lead capture
    firstName: "",
    lastName: "",
    leadEmail: "",
    wantsCall: false,
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Calculate Risk Score
  const calculateRiskScore = () => {
    let score = 0;
    
    if (formData.aiUsage === "Yes, openly" || formData.aiUsage === "Yes, unofficially") score += 20;
    if (formData.aiApproval === "No clear policy") score += 20;
    if (formData.aiApproval === "Explicitly restricted") score += 15;
    if (formData.aiApproval === "Partially approved") score += 10;
    if (formData.aiLogging === "No") score += 20;
    if (formData.aiLogging === "Limited visibility") score += 10;
    if (formData.dataType === "Highly regulated (healthcare, finance, legal)") score += 25;
    if (formData.dataType === "Sensitive but not regulated") score += 15;
    
    return Math.min(score, 100);
  };

  // Calculate Governance Score
  const calculateGovernanceScore = () => {
    let score = 100;
    
    if (formData.hasPolicy === "No") score -= 30;
    if (formData.hasOwner === "No") score -= 25;
    if (formData.budgetCentralized === "Fragmented") score -= 25;
    if (formData.executivePressure === "No") score -= 20;
    
    return Math.max(score, 0);
  };

  // Calculate ROI
  const calculateROI = () => {
    const workers = formData.knowledgeWorkers;
    const rate = formData.hourlyRate;
    const minutes = formData.searchMinutes;
    
    const dailyLoss = workers * (minutes / 60) * rate;
    const annualLoss = dailyLoss * 220;
    const recovery = annualLoss * 0.30;
    
    return {
      annualLoss: Math.round(annualLoss),
      recovery: Math.round(recovery),
    };
  };

  const handleSubmitLead = async (e) => {
    e.preventDefault();
    
    setIsAnalyzing(true);
    
    const riskScore = calculateRiskScore();
    const governanceScore = calculateGovernanceScore();
    const roi = calculateROI();
    
    // Generate AI summary (without PII)
    try {
      const summaryResponse = await base44.functions.invoke('generateRoiSummary', {
        companyName: formData.companyName,
        role: formData.role,
        revenue: formData.revenue,
        employees: formData.employees,
        industry: formData.industry,
        primaryConcerns: formData.primaryConcerns,
        aiUsage: formData.aiUsage,
        aiApproval: formData.aiApproval,
        aiLogging: formData.aiLogging,
        dataType: formData.dataType,
        sopReliance: formData.sopReliance,
        aiPilots: formData.aiPilots,
        hasPolicy: formData.hasPolicy,
        hasOwner: formData.hasOwner,
        budgetCentralized: formData.budgetCentralized,
        executivePressure: formData.executivePressure,
        riskScore: riskScore,
        governanceScore: governanceScore,
        annualLoss: roi.annualLoss,
        estimatedRecovery: roi.recovery,
        knowledgeWorkers: formData.knowledgeWorkers,
        hourlyRate: formData.hourlyRate,
        searchMinutes: formData.searchMinutes
      });
      
      setAiSummary(summaryResponse.data.summary);
    } catch (error) {
      console.error("AI summary generation failed:", error);
      // Fallback to default messaging
      setAiSummary(null);
    }
    
    // Show results immediately
    setIsAnalyzing(false);
    setSubmitted(true);
    
    // Send emails in background
    try {
      const emailBody = `
Alicorn AI Readiness Assessment - Results

CONTACT INFORMATION
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.leadEmail}
Company: ${formData.companyName}
Role: ${formData.role}
Wants Call: ${formData.wantsCall ? "Yes" : "No"}

ORGANIZATION PROFILE
Company: ${formData.companyName}
Revenue: ${formData.revenue}
Employees: ${formData.employees}
Industry: ${formData.industry}
Primary Concerns: ${formData.primaryConcerns.join(", ")}

ASSESSMENT RESULTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AI Risk Score: ${riskScore}/100 ${riskScore > 60 ? "(HIGH RISK)" : riskScore > 30 ? "(MODERATE RISK)" : "(LOW RISK)"}

Governance Maturity: ${governanceScore}/100 ${governanceScore < 40 ? "(LOW MATURITY)" : governanceScore < 70 ? "(MODERATE MATURITY)" : "(HIGH MATURITY)"}

PRODUCTIVITY OPPORTUNITY
Annual Productivity Loss: $${roi.annualLoss.toLocaleString()}
Estimated Recovery (15%): $${roi.recovery.toLocaleString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RISK FACTORS
- AI Usage: ${formData.aiUsage}
- AI Approval Status: ${formData.aiApproval}
- Logging/Audit: ${formData.aiLogging}
- Data Sensitivity: ${formData.dataType}

GOVERNANCE FACTORS
- Documented Policy: ${formData.hasPolicy}
- Defined Owner: ${formData.hasOwner}
- Budget Structure: ${formData.budgetCentralized}
- Executive Pressure: ${formData.executivePressure}

PRODUCTIVITY INPUTS
- Knowledge Workers: ${formData.knowledgeWorkers}
- Hourly Rate: $${formData.hourlyRate}
- Search Time: ${formData.searchMinutes} min/day
- SOP Reliance: ${formData.sopReliance}
- AI Pilots: ${formData.aiPilots}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted: ${new Date().toISOString()}
      `;

      // Send to sales team
      await base44.integrations.Core.SendEmail({
        to: "info@theproductunicorn.com",
        subject: `AI Assessment Lead: ${formData.companyName} - ${formData.firstName} ${formData.lastName} [${riskScore} risk, $${roi.recovery.toLocaleString()} ROI]`,
        body: emailBody,
      });

      // Send to lead
      const leadEmailBody = `
Hello ${formData.firstName},

Thank you for completing the Alicorn AI Readiness Assessment.

Your Results:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AI Risk Score: ${riskScore}/100
Governance Maturity: ${governanceScore}/100
Estimated Annual Productivity Recovery: $${roi.recovery.toLocaleString()}

What This Means:

${riskScore > 60 ? "Your organization shows elevated AI exposure risk. Employees are likely using AI without structured oversight. This creates compliance, data, and reputational risk." : riskScore > 30 ? "Your organization has moderate AI risk exposure. Some governance gaps exist that should be addressed." : "Your organization shows relatively low AI risk exposure."}

${roi.recovery > 100000 ? "Your organization may be leaving significant efficiency gains unrealized due to fragmented knowledge access." : ""}

${governanceScore < 40 ? "AI adoption without ownership and policy often stalls or becomes reactive." : ""}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Organizations in your range typically explore a governed private AI workspace to reduce shadow AI risk and recover productivity while maintaining control.

${formData.wantsCall ? "We'll reach out within one business day to schedule your strategy call." : "If you'd like to discuss these results, reply to this email or visit alicornai.com/contact"}

Best regards,
Alicorn AI Team
      `;

      await base44.integrations.Core.SendEmail({
        to: formData.leadEmail,
        subject: `Your Alicorn AI Readiness Report`,
        body: leadEmailBody,
      });
    } catch (error) {
      console.error("Email send failed:", error);
      // Results are still shown, just email failed silently
    }
  };

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const canContinue = () => {
    if (currentStep === 1) {
      return formData.companyName && formData.role && formData.revenue && formData.employees && formData.industry && formData.primaryConcerns.length > 0;
    }
    if (currentStep === 2) {
      return formData.aiUsage && formData.aiApproval && formData.aiLogging && formData.dataType;
    }
    if (currentStep === 3) {
      return formData.sopReliance && formData.aiPilots;
    }
    if (currentStep === 4) {
      return formData.hasPolicy && formData.hasOwner && formData.budgetCentralized && formData.executivePressure;
    }
    return true;
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mx-auto mb-6"
          >
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6987bf0f7f2976d049a2adb1/761c01319_ChatGPTImageFeb11202610_51_54AM.png"
              alt="Alicorn AI"
              className="w-32 h-32 mx-auto"
            />
          </motion.div>
          <h2 className="text-2xl font-bold text-[#0B0B0B] mb-3">Analyzing Your Assessment</h2>
          <p className="text-[#0B0B0B]/60 mb-8">Generating your personalized insights...</p>
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 text-[#4B9CD3] animate-spin" />
            <span className="text-sm text-[#0B0B0B]/50">This will take just a few seconds</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (submitted) {
    const riskScore = calculateRiskScore();
    const governanceScore = calculateGovernanceScore();
    const roi = calculateROI();

    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center mb-16">
              <div className="w-16 h-16 rounded-full bg-[#4B9CD3]/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-[#4B9CD3]" />
              </div>
              <h1 className="text-4xl font-bold text-[#0B0B0B] mb-4">Your Assessment Results</h1>
              <p className="text-lg text-[#0B0B0B]/60">A detailed report has been sent to {formData.leadEmail}</p>
            </div>

            {/* Scores Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* Risk Score */}
              <div className="p-8 bg-[#F5F7FA] rounded-2xl border border-[#0B0B0B]/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    riskScore > 60 ? "bg-red-100" : riskScore > 30 ? "bg-yellow-100" : "bg-green-100"
                  }`}>
                    <AlertTriangle className={`w-6 h-6 ${
                      riskScore > 60 ? "text-red-600" : riskScore > 30 ? "text-yellow-600" : "text-green-600"
                    }`} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#0B0B0B]/50">AI Risk Score</div>
                    <div className="text-3xl font-bold text-[#0B0B0B]">{riskScore}/100</div>
                  </div>
                </div>
                <div className={`text-sm font-semibold ${
                  riskScore > 60 ? "text-red-600" : riskScore > 30 ? "text-yellow-600" : "text-green-600"
                }`}>
                  {riskScore > 60 ? "HIGH RISK" : riskScore > 30 ? "MODERATE RISK" : "LOW RISK"}
                </div>
              </div>

              {/* Governance Score */}
              <div className="p-8 bg-[#F5F7FA] rounded-2xl border border-[#0B0B0B]/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    governanceScore < 40 ? "bg-red-100" : governanceScore < 70 ? "bg-yellow-100" : "bg-green-100"
                  }`}>
                    <Shield className={`w-6 h-6 ${
                      governanceScore < 40 ? "text-red-600" : governanceScore < 70 ? "text-yellow-600" : "text-green-600"
                    }`} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#0B0B0B]/50">Governance Maturity</div>
                    <div className="text-3xl font-bold text-[#0B0B0B]">{governanceScore}/100</div>
                  </div>
                </div>
                <div className={`text-sm font-semibold ${
                  governanceScore < 40 ? "text-red-600" : governanceScore < 70 ? "text-yellow-600" : "text-green-600"
                }`}>
                  {governanceScore < 40 ? "LOW MATURITY" : governanceScore < 70 ? "MODERATE MATURITY" : "HIGH MATURITY"}
                </div>
              </div>

              {/* ROI */}
              <div className="p-8 bg-[#F5F7FA] rounded-2xl border border-[#0B0B0B]/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#4B9CD3]/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-[#4B9CD3]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#0B0B0B]/50">Estimated Recovery</div>
                    <div className="text-3xl font-bold text-[#4B9CD3]">${Math.round(roi.recovery / 1000)}K</div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-[#0B0B0B]/60">
                  ANNUALLY
                </div>
              </div>
            </div>

            {/* Personalized Summary */}
            <div className="p-8 bg-white border-2 border-[#0B0B0B]/10 rounded-2xl mb-12">
              <h2 className="text-2xl font-bold text-[#0B0B0B] mb-6">What This Means</h2>
              {aiSummary ? (
                <div className="space-y-4 text-[#0B0B0B]/70 leading-relaxed whitespace-pre-line">
                  {aiSummary}
                </div>
              ) : (
                <div className="space-y-4 text-[#0B0B0B]/70 leading-relaxed">
                  {riskScore > 60 && (
                    <p>Your organization shows elevated AI exposure risk. Employees are likely using AI without structured oversight. This creates compliance, data, and reputational risk.</p>
                  )}
                  {riskScore > 30 && riskScore <= 60 && (
                    <p>Your organization has moderate AI risk exposure. Some governance gaps exist that should be addressed before they escalate.</p>
                  )}
                  {roi.recovery > 100000 && (
                    <p>Your organization may be leaving significant efficiency gains unrealized due to fragmented knowledge access and unstructured AI adoption.</p>
                  )}
                  {governanceScore < 40 && (
                    <p>AI adoption without ownership and policy often stalls or becomes reactive. Establishing clear governance now prevents future bottlenecks.</p>
                  )}
                  <p className="font-medium text-[#0B0B0B] pt-4">
                    Organizations in your range typically explore a governed private AI workspace to reduce shadow AI risk and recover productivity while maintaining control.
                  </p>
                </div>
              )}
              
              <div className="mt-6 pt-6 border-t border-[#0B0B0B]/10">
                <p className="text-sm text-[#0B0B0B]/50 italic">
                  Note: This summary includes AI-generated insights based on your assessment responses. We recommend booking a strategy call to clarify any assumptions and discuss your specific situation in detail.
                </p>
              </div>
            </div>

            {/* Final CTAs */}
            <div className="text-center space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://calendar.google.com/appointments/schedules/AcZssZ3azD2ZwRDM6gh-Ly3_dCKUTVcphEdJF9v_0BjE-2K2cj3Y-hRabZwE0hkbStlRSZaz9n3y2GZh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-[#4B9CD3] text-white font-bold text-lg rounded-lg hover:bg-[#3a8bc2] transition-all hover:shadow-xl hover:shadow-[#4B9CD3]/20"
                >
                  Schedule a 20-Minute Strategy Call
                  <ArrowRight className="w-5 h-5" />
                </a>
                <Link
                  to={createPageUrl("Home")}
                  className="inline-flex items-center justify-center gap-2 px-10 py-5 border-2 border-[#0B0B0B]/10 text-[#0B0B0B]/70 font-semibold text-lg rounded-lg hover:border-[#0B0B0B]/20 hover:bg-[#F5F7FA] transition-all"
                >
                  <Home className="w-5 h-5" />
                  Return to Home
                </Link>
              </div>
              <p className="text-sm text-[#0B0B0B]/50">
                No obligation. We'll quickly tell you if this isn't a fit.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0B0B0B] mb-4">
            Private AI Readiness & ROI Assessment
          </h1>
          <p className="text-lg text-[#0B0B0B]/60">
            3–5 minute evaluation of internal AI risk, governance maturity, and productivity opportunity.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between text-sm text-[#0B0B0B]/50 mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 bg-[#F5F7FA] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#4B9CD3]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* STEP 1 */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#0B0B0B] mb-6">About Your Organization</h2>
                
                <div>
                  <label className="block text-sm font-medium text-[#0B0B0B]/70 mb-2">Company Name</label>
                  <Input
                    value={formData.companyName}
                    onChange={(e) => updateField("companyName", e.target.value)}
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0B0B0B]/70 mb-2">Your Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => updateField("role", e.target.value)}
                    className="w-full h-12 px-3 border border-[#0B0B0B]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B9CD3]/50"
                  >
                    <option value="">Select role...</option>
                    <option value="CIO">CIO</option>
                    <option value="CISO">CISO</option>
                    <option value="Head of IT">Head of IT</option>
                    <option value="VP Ops">VP Ops</option>
                    <option value="COO">COO</option>
                    <option value="CEO">CEO</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0B0B0B]/70 mb-2">Annual Revenue</label>
                  <select
                    value={formData.revenue}
                    onChange={(e) => updateField("revenue", e.target.value)}
                    className="w-full h-12 px-3 border border-[#0B0B0B]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B9CD3]/50"
                  >
                    <option value="">Select range...</option>
                    <option value="< $10M">{"< $10M"}</option>
                    <option value="$10–20M">$10–20M</option>
                    <option value="$20–50M">$20–50M</option>
                    <option value="$50–100M">$50–100M</option>
                    <option value="$100–250M">$100–250M</option>
                    <option value="$250M+">$250M+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0B0B0B]/70 mb-2">Number of Employees</label>
                  <select
                    value={formData.employees}
                    onChange={(e) => updateField("employees", e.target.value)}
                    className="w-full h-12 px-3 border border-[#0B0B0B]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B9CD3]/50"
                  >
                    <option value="">Select range...</option>
                    <option value="< 50">{"< 50"}</option>
                    <option value="50–100">50–100</option>
                    <option value="100–250">100–250</option>
                    <option value="250–500">250–500</option>
                    <option value="500–1000">500–1000</option>
                    <option value="1000+">1000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0B0B0B]/70 mb-2">Industry</label>
                  <Input
                    value={formData.industry}
                    onChange={(e) => updateField("industry", e.target.value)}
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0B0B0B]/70 mb-3">Primary Concerns</label>
                  <div className="space-y-2">
                    {["Security/Compliance", "Shadow AI", "Productivity", "Cost Control", "Governance", "Executive Pressure"].map((concern) => (
                      <label key={concern} className="flex items-center gap-3 p-4 border border-[#0B0B0B]/10 rounded-lg hover:border-[#4B9CD3]/30 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.primaryConcerns.includes(concern)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              updateField("primaryConcerns", [...formData.primaryConcerns, concern]);
                            } else {
                              updateField("primaryConcerns", formData.primaryConcerns.filter(c => c !== concern));
                            }
                          }}
                          className="w-4 h-4 text-[#4B9CD3]"
                        />
                        <span className="text-[#0B0B0B]/80">{concern}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#0B0B0B] mb-6">Internal AI Usage & Risk</h2>
                
                <div>
                  <label className="block text-sm font-medium text-[#0B0B0B]/70 mb-3">Do employees currently use public AI tools?</label>
                  <div className="space-y-2">
                    {["Yes, openly", "Yes, unofficially", "Unsure", "No"].map((option) => (
                      <label key={option} className="flex items-center gap-3 p-4 border border-[#0B0B0B]/10 rounded-lg hover:border-[#4B9CD3]/30 cursor-pointer">
                        <input
                          type="radio"
                          name="aiUsage"
                          value={option}
                          checked={formData.aiUsage === option}
                          onChange={(e) => updateField("aiUsage", e.target.value)}
                          className="w-4 h-4 text-[#4B9CD3]"
                        />
                        <span className="text-[#0B0B0B]/80">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0B0B0B]/70 mb-3">Are AI tools formally approved by IT/security?</label>
                  <div className="space-y-2">
                    {["Fully approved", "Partially approved", "No clear policy", "Explicitly restricted"].map((option) => (
                      <label key={option} className="flex items-center gap-3 p-4 border border-[#0B0B0B]/10 rounded-lg hover:border-[#4B9CD3]/30 cursor-pointer">
                        <input
                          type="radio"
                          name="aiApproval"
                          value={option}
                          checked={formData.aiApproval === option}
                          onChange={(e) => updateField("aiApproval", e.target.value)}
                          className="w-4 h-4 text-[#4B9CD3]"
                        />
                        <span className="text-[#0B0B0B]/80">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0B0B0B]/70 mb-3">Does your organization log or audit AI usage?</label>
                  <div className="space-y-2">
                    {["Yes", "Limited visibility", "No"].map((option) => (
                      <label key={option} className="flex items-center gap-3 p-4 border border-[#0B0B0B]/10 rounded-lg hover:border-[#4B9CD3]/30 cursor-pointer">
                        <input
                          type="radio"
                          name="aiLogging"
                          value={option}
                          checked={formData.aiLogging === option}
                          onChange={(e) => updateField("aiLogging", e.target.value)}
                          className="w-4 h-4 text-[#4B9CD3]"
                        />
                        <span className="text-[#0B0B0B]/80">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0B0B0B]/70 mb-3">Do you handle regulated or sensitive data?</label>
                  <div className="space-y-2">
                    {["Highly regulated (healthcare, finance, legal)", "Sensitive but not regulated", "Minimal sensitive data"].map((option) => (
                      <label key={option} className="flex items-center gap-3 p-4 border border-[#0B0B0B]/10 rounded-lg hover:border-[#4B9CD3]/30 cursor-pointer">
                        <input
                          type="radio"
                          name="dataType"
                          value={option}
                          checked={formData.dataType === option}
                          onChange={(e) => updateField("dataType", e.target.value)}
                          className="w-4 h-4 text-[#4B9CD3]"
                        />
                        <span className="text-[#0B0B0B]/80">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#0B0B0B] mb-6">Productivity & Knowledge Flow</h2>
                
                <div>
                  <label className="block text-sm font-medium text-[#0B0B0B]/70 mb-3">
                    How many employees perform knowledge-based work?
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={formData.knowledgeWorkers}
                    onChange={(e) => updateField("knowledgeWorkers", parseInt(e.target.value))}
                    className="w-full h-2 bg-[#F5F7FA] rounded-lg appearance-none cursor-pointer accent-[#4B9CD3]"
                  />
                  <div className="flex justify-between text-sm text-[#0B0B0B]/50 mt-2">
                    <span>10</span>
                    <span className="font-semibold text-[#4B9CD3]">{formData.knowledgeWorkers} employees</span>
                    <span>1000</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0B0B0B]/70 mb-2">
                    Average hourly fully loaded cost per employee?
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-[#0B0B0B]">$</span>
                    <Input
                      type="number"
                      value={formData.hourlyRate}
                      onChange={(e) => updateField("hourlyRate", parseInt(e.target.value) || 60)}
                      className="h-12"
                    />
                    <span className="text-sm text-[#0B0B0B]/50">/hour</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0B0B0B]/70 mb-3">
                    Estimated minutes per day spent searching for information?
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="5"
                    value={formData.searchMinutes}
                    onChange={(e) => updateField("searchMinutes", parseInt(e.target.value))}
                    className="w-full h-2 bg-[#F5F7FA] rounded-lg appearance-none cursor-pointer accent-[#4B9CD3]"
                  />
                  <div className="flex justify-between text-sm text-[#0B0B0B]/50 mt-2">
                    <span>10 min</span>
                    <span className="font-semibold text-[#4B9CD3]">{formData.searchMinutes} minutes/day</span>
                    <span>60 min</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0B0B0B]/70 mb-3">Do employees rely on SOPs, policies, or internal documentation?</label>
                  <div className="space-y-2">
                    {["Heavily", "Moderately", "Lightly"].map((option) => (
                      <label key={option} className="flex items-center gap-3 p-4 border border-[#0B0B0B]/10 rounded-lg hover:border-[#4B9CD3]/30 cursor-pointer">
                        <input
                          type="radio"
                          name="sopReliance"
                          value={option}
                          checked={formData.sopReliance === option}
                          onChange={(e) => updateField("sopReliance", e.target.value)}
                          className="w-4 h-4 text-[#4B9CD3]"
                        />
                        <span className="text-[#0B0B0B]/80">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0B0B0B]/70 mb-3">Have you attempted AI pilots internally?</label>
                  <div className="space-y-2">
                    {["Yes, failed", "Yes, limited success", "No", "In progress"].map((option) => (
                      <label key={option} className="flex items-center gap-3 p-4 border border-[#0B0B0B]/10 rounded-lg hover:border-[#4B9CD3]/30 cursor-pointer">
                        <input
                          type="radio"
                          name="aiPilots"
                          value={option}
                          checked={formData.aiPilots === option}
                          onChange={(e) => updateField("aiPilots", e.target.value)}
                          className="w-4 h-4 text-[#4B9CD3]"
                        />
                        <span className="text-[#0B0B0B]/80">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#0B0B0B] mb-6">AI Governance Readiness</h2>
                
                <div>
                  <label className="block text-sm font-medium text-[#0B0B0B]/70 mb-3">Do you have a documented AI usage policy?</label>
                  <div className="space-y-2">
                    {["Yes", "In development", "No"].map((option) => (
                      <label key={option} className="flex items-center gap-3 p-4 border border-[#0B0B0B]/10 rounded-lg hover:border-[#4B9CD3]/30 cursor-pointer">
                        <input
                          type="radio"
                          name="hasPolicy"
                          value={option}
                          checked={formData.hasPolicy === option}
                          onChange={(e) => updateField("hasPolicy", e.target.value)}
                          className="w-4 h-4 text-[#4B9CD3]"
                        />
                        <span className="text-[#0B0B0B]/80">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0B0B0B]/70 mb-3">Is there a defined owner of AI inside the organization?</label>
                  <div className="space-y-2">
                    {["Yes", "Shared responsibility", "No"].map((option) => (
                      <label key={option} className="flex items-center gap-3 p-4 border border-[#0B0B0B]/10 rounded-lg hover:border-[#4B9CD3]/30 cursor-pointer">
                        <input
                          type="radio"
                          name="hasOwner"
                          value={option}
                          checked={formData.hasOwner === option}
                          onChange={(e) => updateField("hasOwner", e.target.value)}
                          className="w-4 h-4 text-[#4B9CD3]"
                        />
                        <span className="text-[#0B0B0B]/80">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0B0B0B]/70 mb-3">Is AI budget centralized or fragmented?</label>
                  <div className="space-y-2">
                    {["Centralized", "Partially centralized", "Fragmented"].map((option) => (
                      <label key={option} className="flex items-center gap-3 p-4 border border-[#0B0B0B]/10 rounded-lg hover:border-[#4B9CD3]/30 cursor-pointer">
                        <input
                          type="radio"
                          name="budgetCentralized"
                          value={option}
                          checked={formData.budgetCentralized === option}
                          onChange={(e) => updateField("budgetCentralized", e.target.value)}
                          className="w-4 h-4 text-[#4B9CD3]"
                        />
                        <span className="text-[#0B0B0B]/80">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0B0B0B]/70 mb-3">Is there executive pressure to adopt AI?</label>
                  <div className="space-y-2">
                    {["Yes, significant", "Moderate", "No"].map((option) => (
                      <label key={option} className="flex items-center gap-3 p-4 border border-[#0B0B0B]/10 rounded-lg hover:border-[#4B9CD3]/30 cursor-pointer">
                        <input
                          type="radio"
                          name="executivePressure"
                          value={option}
                          checked={formData.executivePressure === option}
                          onChange={(e) => updateField("executivePressure", e.target.value)}
                          className="w-4 h-4 text-[#4B9CD3]"
                        />
                        <span className="text-[#0B0B0B]/80">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5 - Lead Capture */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-full bg-[#4B9CD3]/10 flex items-center justify-center mx-auto mb-4">
                    <FileCheck className="w-8 h-8 text-[#4B9CD3]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0B0B0B] mb-2">See Your Results</h2>
                  <p className="text-[#0B0B0B]/60">Enter your information to receive your personalized assessment report</p>
                </div>

                <form onSubmit={handleSubmitLead} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#0B0B0B]/70 mb-2">First Name</label>
                      <Input
                        required
                        value={formData.firstName}
                        onChange={(e) => updateField("firstName", e.target.value)}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0B0B0B]/70 mb-2">Last Name</label>
                      <Input
                        required
                        value={formData.lastName}
                        onChange={(e) => updateField("lastName", e.target.value)}
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0B0B0B]/70 mb-2">Work Email</label>
                    <Input
                      required
                      type="email"
                      value={formData.leadEmail}
                      onChange={(e) => updateField("leadEmail", e.target.value)}
                      className="h-12"
                    />
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-[#F5F7FA] rounded-lg">
                    <input
                      type="checkbox"
                      checked={formData.wantsCall}
                      onChange={(e) => updateField("wantsCall", e.target.checked)}
                      className="mt-1 w-4 h-4 text-[#4B9CD3]"
                    />
                    <label className="text-sm text-[#0B0B0B]/70">
                      I'd like a 20-minute review call to discuss these results
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-14 bg-[#4B9CD3] text-white font-bold text-lg rounded-lg hover:bg-[#3a8bc2] transition-all hover:shadow-lg hover:shadow-[#4B9CD3]/20"
                  >
                    Generate My Assessment
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {currentStep < 5 && (
          <div className="flex justify-between mt-10">
            <button
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-3 text-[#0B0B0B]/70 font-medium rounded-lg hover:bg-[#F5F7FA] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!canContinue()}
              className="flex items-center gap-2 px-8 py-3 bg-[#4B9CD3] text-white font-semibold rounded-lg hover:bg-[#3a8bc2] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}