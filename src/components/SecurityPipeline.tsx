import React, { useState } from "react";
import { User, Shield, Network, Cloud, Cpu, ArrowRight } from "lucide-react";

interface Step {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  glowClass: string;
  description: string;
  details: string[];
}

export default function SecurityPipeline() {
  const [activeStep, setActiveStep] = useState<string>("user");

  const steps: Step[] = [
    {
      id: "user",
      label: "USER",
      icon: <User className="h-6 w-6" />,
      color: "text-cyber-secondary",
      glowClass: "shadow-cyber-glow-success",
      description: "Secure authentication & least-privilege role assignment.",
      details: [
        "Simulates multi-factor checks (MFA)",
        "Enforces Least-Privilege Access (PoLP)",
        "Audits session tokens & rotation rules"
      ]
    },
    {
      id: "application",
      label: "APPLICATION",
      icon: <Cpu className="h-6 w-6" />,
      color: "text-cyber-primary",
      glowClass: "shadow-cyber-glow",
      description: "Defensive web code preventing runtime script execution.",
      details: [
        "Mitigates OWASP Top 10 vulnerabilities",
        "Context-aware input parameter sanitization",
        "Strict Content Security Policy (CSP)"
      ]
    },
    {
      id: "network",
      label: "NETWORK",
      icon: <Network className="h-6 w-6" />,
      color: "text-cyber-secondary",
      glowClass: "shadow-cyber-glow-success",
      description: "Encrypted traffic tunnels and packet-level inspection filters.",
      details: [
        "Continuous port audit scans via Nmap",
        "Secure socket shell (SSH) configurations",
        "Audits data-in-transit via Wireshark logs"
      ]
    },
    {
      id: "cloud",
      label: "CLOUD",
      icon: <Cloud className="h-6 w-6" />,
      color: "text-cyber-primary",
      glowClass: "shadow-cyber-glow",
      description: "Hardened infrastructure parameters blocking global access.",
      details: [
        "AWS IAM least-privilege role setups",
        "S3 Bucket Block-Public configuration",
        "KMS customer-managed key rotation policy"
      ]
    },
    {
      id: "security",
      label: "SECURITY",
      icon: <Shield className="h-6 w-6" />,
      color: "text-cyber-secondary",
      glowClass: "shadow-cyber-glow-success",
      description: "Central validation and logging tracking transaction events.",
      details: [
        "Zero-trust end-to-end audits",
        "AWS CloudTrail transaction logs monitoring",
        "Pre-commit code credential validation"
      ]
    }
  ];

  return (
    <div className="w-full space-y-8 py-6">
      {/* Pipeline Diagram */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 px-4 py-8 border border-cyber-border/40 rounded-2xl bg-cyber-card/30 relative overflow-hidden">
        {/* Abstract background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-emerald-500/5 to-indigo-500/5 opacity-30 pointer-events-none"></div>

        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Card */}
            <button
              onClick={() => setActiveStep(step.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 w-28 aspect-square relative z-10 cursor-pointer ${
                activeStep === step.id
                  ? "bg-cyber-card border-cyber-primary shadow-cyber-glow scale-105"
                  : "bg-cyber-bg/40 border-cyber-border/60 hover:border-slate-500 hover:scale-102"
              }`}
            >
              <div className={`p-2 rounded-lg mb-2 ${step.color} ${activeStep === step.id ? "bg-cyber-primary/10" : "bg-cyber-border/20"}`}>
                {step.icon}
              </div>
              <span className="font-mono text-[10px] tracking-widest font-bold text-slate-200">
                {step.label}
              </span>
            </button>

            {/* Connection Arrow */}
            {index < steps.length - 1 && (
              <div className="hidden md:flex items-center justify-center flex-grow mx-2">
                <div className="relative w-full h-[2px]">
                  {/* Glowing animating dashed line */}
                  <div className="absolute inset-0 border-t-2 border-dashed border-cyber-border/80"></div>
                  <div className={`absolute inset-0 border-t-2 border-dashed animate-pulse transition-colors ${
                    activeStep === step.id || activeStep === steps[index + 1].id ? "border-cyber-primary" : "border-cyber-border/20"
                  }`}></div>
                </div>
                <ArrowRight className={`h-4 w-4 shrink-0 mx-1 transition-colors ${
                  activeStep === step.id ? "text-cyber-primary" : "text-slate-600"
                }`} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Terminal Details Output */}
      <div className="border border-cyber-border bg-cyber-card/65 rounded-xl p-5 relative overflow-hidden shadow-md">
        {/* Top glowing bar */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 via-emerald-500 to-indigo-500"></div>

        {steps.map((step) => {
          if (step.id !== activeStep) return null;
          return (
            <div key={step.id} className="space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-cyber-border pb-3">
                <h4 className="font-bold tracking-widest text-slate-100 uppercase">
                  SECURITY NODES LOG // {step.label}_MODULE
                </h4>
                <span className="text-[9px] text-cyber-primary tracking-widest uppercase">
                  STATUS: HARDENED
                </span>
              </div>

              <p className="text-slate-400 font-sans italic text-xs leading-relaxed">
                {step.description}
              </p>

              <ul className="space-y-2.5 pt-1 text-[11px] text-slate-300">
                {step.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-cyber-primary font-bold">&gt;</span>
                    <span className="leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
