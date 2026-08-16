import { useState } from "react";
import { Cloud, Shield, Terminal, Settings, Lock, Eye, ArrowRight } from "lucide-react";
import { getPortfolioData } from "../utils/portfolioData";

export default function CloudSecurityPage() {
  const { projects } = getPortfolioData();
  const cloudshield = projects.find((p) => p.slug === "cloudshield");

  const visualChain = [
    { name: "IDENTITY", icon: <Lock className="h-4 w-4" />, desc: "Access roles (PoLP)" },
    { name: "NETWORK", icon: <Settings className="h-4 w-4" />, desc: "Isolated VPC / CORS" },
    { name: "STORAGE", icon: <Cloud className="h-4 w-4" />, desc: "S3 public block flags" },
    { name: "ENCRYPTION", icon: <Shield className="h-4 w-4" />, desc: "AES-256 KMS key rot" },
    { name: "LOGGING", icon: <Terminal className="h-4 w-4" />, desc: "CloudTrail audit logs" },
    { name: "MONITORING", icon: <Eye className="h-4 w-4" />, desc: "CloudWatch threshold triggers" }
  ];

  const awsTechStack = [
    { service: "AWS IAM", role: "Enforces granular role permissions, limiting admin credentials exposure." },
    { service: "AWS S3", role: "Provides encrypted document storage blocks with strict access block rules." },
    { service: "AWS KMS", role: "Secures customer-managed data keys with automatic annual rotation schedules." },
    { service: "AWS CLOUDTRAIL", role: "Maintains immutable log tracking databases for security analysis audit runs." },
    { service: "AWS CLOUDWATCH", role: "Sets real-time monitors to notify administrators of bucket access violations." }
  ];

  // Simulator state for CloudShield demo representation
  const [simulationState, setSimulationState] = useState<"idle" | "auth" | "policy" | "kms" | "success">("idle");

  const runSimulation = () => {
    setSimulationState("auth");
    setTimeout(() => {
      setSimulationState("policy");
      setTimeout(() => {
        setSimulationState("kms");
        setTimeout(() => {
          setSimulationState("success");
        }, 1200);
      }, 1200);
    }, 1200);
  };

  return (
    <div className="pt-28 md:pt-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      
      {/* 1. Page Header */}
      <div className="space-y-4 text-center md:text-left">
        <span className="font-mono text-xs text-cyber-primary tracking-widest block uppercase font-bold">
          [// CLOUD SECURITY LAYER]
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-mono tracking-wide text-slate-100 uppercase">
          CLOUD SECURITY & SERVICES
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Applying identity governance, least-privilege security controls, cryptographic data key rotations, and immutable activity auditing inside Amazon Web Services.
        </p>
      </div>

      {/* 2. Cloud Security Chain Visualization */}
      <section className="space-y-8">
        <div className="space-y-3">
          <span className="font-mono text-xs text-cyber-primary tracking-widest block uppercase font-bold">
            [// SECURITY LIFECYCLE]
          </span>
          <h2 className="text-2xl font-bold font-mono tracking-wide text-slate-200 uppercase">
            THE CLOUD PROTECTION CHAIN
          </h2>
          <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
            Ensuring data protection is enforced at every layer of cloud architecture.
          </p>
        </div>

        {/* Chain flex items */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 py-4">
          {visualChain.map((chain) => (
            <div key={chain.name} className="border border-cyber-border bg-cyber-card/40 rounded-xl p-4 space-y-3 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-cyber-primary/40"></div>
              <div className="flex justify-center text-cyber-primary mb-2">
                <div className="p-2 bg-cyber-primary/10 rounded-lg">
                  {chain.icon}
                </div>
              </div>
              <span className="font-mono text-[10px] text-slate-200 block font-bold tracking-wider">{chain.name}</span>
              <p className="text-[9px] text-slate-500 font-sans leading-relaxed">{chain.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. AWS Security Technologies */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start pt-8 border-t border-cyber-border/30">
        <div className="lg:col-span-2 space-y-4">
          <span className="font-mono text-xs text-cyber-secondary tracking-widest block uppercase font-bold">
            [// AWS SECURITY INTEGRATION]
          </span>
          <h2 className="text-2xl font-bold font-mono tracking-wide text-slate-200 uppercase">
            AMAZON WEB SERVICES TOOLKIT
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            I study and apply AWS cloud security configurations in my projects to safeguard infrastructure from permission hijackings and parameters vulnerability vectors.
          </p>
          <div className="p-4 border border-cyber-border bg-cyber-card/20 rounded-xl text-[10px] font-mono text-slate-500">
            * Currently configuring cloud systems under student developer program guidelines.
          </div>
        </div>

        <div className="lg:col-span-3 border border-cyber-border bg-cyber-card/40 rounded-2xl p-6 space-y-4">
          {awsTechStack.map((aws) => (
            <div key={aws.service} className="flex items-start space-x-3 border-b border-cyber-border/40 pb-3 last:border-0 last:pb-0">
              <span className="px-2 py-1 rounded bg-cyber-primary/10 border border-cyber-primary/30 font-mono text-[9px] text-cyber-primary font-bold shrink-0">
                {aws.service}
              </span>
              <p className="text-xs text-slate-300 font-sans leading-relaxed pt-0.5">
                {aws.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Large Featured Project Section: CloudShield */}
      {cloudshield && (
        <section className="space-y-12 pt-12 border-t border-cyber-border/30">
          <div className="space-y-3">
            <span className="font-mono text-xs text-cyber-primary tracking-widest block uppercase font-bold">
              [// FEATURED CLOUD DEPLOYMENT]
            </span>
            <h2 className="text-2xl font-bold font-mono tracking-wide text-slate-200 uppercase">
              PROJECT CLOUDSHIELD: SECURE CLOUD STORAGE
            </h2>
            <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
              Detailed architecture and flow diagram demonstrating zero-trust file storage utilizing AWS credentials isolation.
            </p>
          </div>

          <div className="border border-cyber-border bg-cyber-card/60 rounded-2xl p-6 md:p-8 space-y-8 relative overflow-hidden shadow-md">
            <div className="absolute top-0 left-0 w-[4px] h-full bg-cyber-primary"></div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Architecture text */}
              <div className="lg:col-span-3 space-y-6">
                <div className="space-y-1.5">
                  <span className="font-mono text-[9px] text-cyber-primary block tracking-widest uppercase font-bold">
                    AWS ARCHITECTING PRINCIPLES
                  </span>
                  <h3 className="text-lg font-bold font-mono text-slate-200 uppercase leading-snug">
                    Zero-Trust Access Pipeline
                  </h3>
                </div>

                <div className="p-4 bg-cyber-bg/40 border border-cyber-border rounded-xl space-y-3 font-sans text-xs">
                  <p className="text-slate-400 leading-relaxed">
                    <strong>Problem:</strong> Storing high-sensitivity documents on standard hosts makes credentials static and easily extractable via local injections.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    <strong>Solution:</strong> CloudShield maps user requests, sanitizes the query in the API boundary, checks active permissions using AWS IAM role policies, fetches the file with temporary AES-256 decrypted keys via KMS, and supplies the user with a short-lived Pre-signed S3 URL.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Implemented Features */}
                  <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-xl p-4 space-y-2">
                    <span className="font-mono text-[9px] text-emerald-400 font-bold block uppercase tracking-wider">
                      ✔ Implemented Features
                    </span>
                    <ul className="space-y-1.5 font-sans text-[11px] text-slate-400">
                      <li>• Restricted S3 public access blocked</li>
                      <li>• Ephemeral pre-signed URLs (10m cap)</li>
                      <li>• IAM privilege controls simulations</li>
                      <li>• AWS KMS key rotation integration</li>
                    </ul>
                  </div>

                  {/* Planned Features */}
                  <div className="border border-cyber-border bg-cyber-bg/40 rounded-xl p-4 space-y-2">
                    <span className="font-mono text-[9px] text-slate-500 font-bold block uppercase tracking-wider">
                      ⚙ Planned Features (R&D)
                    </span>
                    <ul className="space-y-1.5 font-sans text-[11px] text-slate-500">
                      <li>• Virus scanning on object upload</li>
                      <li>• Dual-region KMS backup recovery keys</li>
                      <li>• Multi-factor authentication gating</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-center space-x-4 pt-2">
                  <a
                    href={cloudshield.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 px-4 py-2 bg-cyber-primary hover:bg-cyber-primary/95 text-cyber-bg font-mono text-[10px] font-bold tracking-widest rounded-lg shadow-cyber-glow transition-all"
                  >
                    <span>GITHUB REPOSITORY</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    * AWS CLI / SDK Sandbox tested
                  </span>
                </div>
              </div>

              {/* Simulation Demo visual */}
              <div className="lg:col-span-2 border border-cyber-border bg-cyber-bg/50 rounded-xl p-5 flex flex-col justify-between font-mono text-xs">
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-200 border-b border-cyber-border pb-2 flex items-center justify-between">
                    <span>SECURITY ACCESS SIMULATOR</span>
                    <Settings className="h-4 w-4 text-cyber-primary animate-spin-slow" />
                  </h4>

                  <div className="space-y-2 text-[10px] leading-relaxed">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>STEP 1: Client Request:</span>
                      <span className={simulationState !== "idle" ? "text-cyber-primary" : "text-slate-600"}>
                        {simulationState !== "idle" ? "✔ TRANSMITTED" : "PENDING"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>STEP 2: IAM Identity Check:</span>
                      <span className={simulationState === "policy" || simulationState === "kms" || simulationState === "success" ? "text-cyber-primary" : "text-slate-600"}>
                        {simulationState === "policy" || simulationState === "kms" || simulationState === "success" ? "✔ AUTHORIZED" : "PENDING"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>STEP 3: KMS Key Decryption:</span>
                      <span className={simulationState === "kms" || simulationState === "success" ? "text-cyber-primary" : "text-slate-600"}>
                        {simulationState === "kms" || simulationState === "success" ? "✔ DECRYPTED" : "PENDING"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>STEP 4: S3 Pre-signed URL:</span>
                      <span className={simulationState === "success" ? "text-cyber-secondary font-bold" : "text-slate-600"}>
                        {simulationState === "success" ? "✔ GENERATED" : "PENDING"}
                      </span>
                    </div>
                  </div>

                  {simulationState === "success" && (
                    <div className="p-3 border border-cyber-secondary/30 bg-cyber-secondary/5 rounded text-[9px] text-cyber-secondary leading-snug">
                      ✔ SECURE SHA-256 ENCRYPTED EPHEMERAL LINK GENERATED SUCCESSFULLY. Link expires in 600s. CloudTrail log recorded.
                    </div>
                  )}
                </div>

                <button
                  onClick={runSimulation}
                  disabled={simulationState !== "idle" && simulationState !== "success"}
                  className="mt-6 w-full py-2.5 bg-cyber-card border border-cyber-border hover:border-cyber-primary text-slate-300 hover:text-slate-100 font-mono text-[10px] tracking-widest rounded-lg transition-all uppercase"
                >
                  {simulationState !== "idle" && simulationState !== "success" ? "Verifying..." : "Initialize File Pipeline"}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
