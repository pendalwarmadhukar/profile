import React, { useState } from "react";
import { Lightbulb, Search, Cpu, Code, ShieldCheck, Zap, Send, RefreshCw } from "lucide-react";

interface Step {
  title: string;
  icon: React.ReactNode;
  shortDesc: string;
  longDesc: string;
}

export default function PipelineAnimation() {
  const [activeStep, setActiveStep] = useState(0);

  const steps: Step[] = [
    {
      title: "IDEA",
      icon: <Lightbulb className="h-5 w-5" />,
      shortDesc: "Problem Identification",
      longDesc: "Spotting inefficiencies or vulnerabilities in current systems. I define the core user problems, requirements, and research directions before drawing any code models."
    },
    {
      title: "RESEARCH",
      icon: <Search className="h-5 w-5" />,
      shortDesc: "Academic & Tech Review",
      longDesc: "Diving into paper methodologies (IEEE/ACM), security protocols, existing solutions, and checking constraints. For security projects, this includes threat modeling and standard CVE research."
    },
    {
      title: "ARCHITECTURE",
      icon: <Cpu className="h-5 w-5" />,
      shortDesc: "System & Threat Modeling",
      longDesc: "Mapping out data structures, APIs, components, and virtualized setups. I design secure data paths, authorization logic (RBAC/ABAC), and modular flow charts."
    },
    {
      title: "BUILD",
      icon: <Code className="h-5 w-5" />,
      shortDesc: "Full-Stack Development",
      longDesc: "Writing clean, type-safe code using React, Node.js, and python cores. Adhering to strict coding standards, DRY principles, and version tracking on Git."
    },
    {
      title: "SECURITY TEST",
      icon: <ShieldCheck className="h-5 w-5" />,
      shortDesc: "Defensive Auditing",
      longDesc: "Subjecting the software to vulnerability scans. I test against OWASP Top 10 vectors (XSS, SQLi, CSRF, etc.) inside isolated environments, simulating real exploit flows."
    },
    {
      title: "OPTIMIZE",
      icon: <Zap className="h-5 w-5" />,
      shortDesc: "Performance Hardening",
      longDesc: "Refactoring database queries, optimizing bundles, and profiling latency. Setting up caching structures and ensuring high-speed page loads."
    },
    {
      title: "DEPLOY",
      icon: <Send className="h-5 w-5" />,
      shortDesc: "Secure Infrastructure",
      longDesc: "Publishing projects with strict HTTP headers, restricted CORS policies, and secure API keys. Deploying serverless nodes with automatic environment separation."
    },
    {
      title: "LEARN & ITERATE",
      icon: <RefreshCw className="h-5 w-5" />,
      shortDesc: "Continuous Feedback",
      longDesc: "Analyzing runtime logs, reviewing user experiences, and updating libraries. I fold new learnings directly back into Step 1 to keep the product evolving."
    }
  ];

  return (
    <div className="glass-panel rounded-2xl p-6 md:p-8 border border-cyber-border/40 relative overflow-hidden">
      {/* Laser light line across pipeline */}
      <div className="absolute top-24 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-cyber-primary/20 to-transparent pointer-events-none hidden md:block"></div>
      
      {/* Stepper Header */}
      <div className="grid grid-cols-2 md:grid-cols-8 gap-4 mb-8 relative z-10">
        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          const isCompleted = activeStep > idx;
          return (
            <button
              key={step.title}
              onClick={() => setActiveStep(idx)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-300 font-mono ${
                isActive
                  ? "bg-cyber-primary/10 border-cyber-primary text-slate-100 shadow-cyber-glow"
                  : isCompleted
                  ? "bg-cyber-secondary/5 border-cyber-secondary/30 text-cyber-secondary"
                  : "bg-cyber-card/40 border-cyber-border/50 text-slate-500 hover:border-slate-700 hover:text-slate-300"
              }`}
            >
              <div className={`p-2 rounded-lg mb-2 transition-transform duration-300 ${isActive ? "scale-110" : ""}`}>
                {step.icon}
              </div>
              <span className="text-[10px] tracking-wider font-bold">{step.title}</span>
              <span className="text-[8px] text-slate-500 mt-1 hidden md:block leading-none truncate max-w-full">
                {step.shortDesc}
              </span>
            </button>
          );
        })}
      </div>

      {/* active Step Detail Card */}
      <div className="border border-cyber-border/60 bg-cyber-bg/40 rounded-xl p-5 md:p-6 relative z-10">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 rounded-lg bg-cyber-primary/20 text-cyber-primary">
            {steps[activeStep].icon}
          </div>
          <div>
            <span className="font-mono text-xs text-cyber-primary tracking-widest font-bold">
              STEP 0{activeStep + 1} //
            </span>
            <h4 className="text-lg font-bold font-mono tracking-wide text-slate-200 uppercase mt-0.5">
              {steps[activeStep].title} — <span className="text-slate-400 font-normal text-sm font-sans lowercase">{steps[activeStep].shortDesc}</span>
            </h4>
          </div>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed font-sans mt-2">
          {steps[activeStep].longDesc}
        </p>
      </div>

      {/* Progress meter */}
      <div className="mt-6 flex items-center justify-between text-[10px] font-mono text-slate-500">
        <span>SECURITY METERS: OPERATIONAL</span>
        <span className="text-cyber-primary">
          PIPELINE PROGRESS: {Math.round(((activeStep + 1) / steps.length) * 100)}%
        </span>
      </div>
    </div>
  );
}
