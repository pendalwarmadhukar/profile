import SkillsSphere3D from "../components/3d/SkillsSphere3D";
import { Lock, Terminal, ShieldAlert } from "lucide-react";

export default function About() {
  const profileDetails = [
    { label: "IDENTITY", value: "Madhukar Pendalwar" },
    { label: "ROLE", value: "Cybersecurity Student" },
    { label: "FOCUS", value: "Cybersecurity // Cloud Security // Web Security // AI Security" },
    { label: "ENVIRONMENT", value: "Linux // AWS // Kali Linux" },
    { label: "STATUS", value: "OPEN TO OPPORTUNITIES" }
  ];

  const skillCards = [
    {
      category: "CYBERSECURITY",
      items: [
        { name: "NMAP", dots: 5 },
        { name: "WIRESHARK", dots: 4 },
        { name: "TCP/IP PROTOCOLS", dots: 5 },
        { name: "OWASP TOP 10", dots: 4 },
        { name: "ETHICAL HACKING", dots: 4 }
      ]
    },
    {
      category: "CLOUD SECURITY",
      items: [
        { name: "AWS IAM ROLES", dots: 5 },
        { name: "S3 BUCKET GATES", dots: 4 },
        { name: "KMS DECRYPTION", dots: 4 },
        { name: "CLOUDTRAIL AUDITS", dots: 4 },
        { name: "SECURITY GROUPS", dots: 5 }
      ]
    },
    {
      category: "LINUX & TOOLS",
      items: [
        { name: "BASH SCRIPTING", dots: 5 },
        { name: "PERMISSIONS MAPPING", dots: 5 },
        { name: "PROCESS MONITORING", dots: 4 },
        { name: "BURP SUITE GATES", dots: 4 },
        { name: "VMWARE SANDBOXING", dots: 5 }
      ]
    },
    {
      category: "PROGRAMMING & WEB",
      items: [
        { name: "PYTHON SCRIPTS", dots: 5 },
        { name: "JAVASCRIPT / TS", dots: 4 },
        { name: "REACT / VITE", dots: 4 },
        { name: "NODE.js / EXPRESS", dots: 4 },
        { name: "MONGO QUERY SANITIZE", dots: 4 }
      ]
    }
  ];

  const renderDots = (count: number) => {
    return (
      <span className="font-mono text-cyber-primary tracking-widest font-bold">
        {"●".repeat(count)}{"○".repeat(5 - count)}
      </span>
    );
  };

  return (
    <div className="pt-28 md:pt-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* WHO IS MADHUKAR BIOGRAPHY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="font-mono text-xs text-cyber-primary tracking-widest block uppercase font-bold">
            [// SECURITY PROFILE SUMMARY]
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-mono tracking-wide text-slate-100 uppercase">
            WHO IS MADHUKAR?
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            I am a Computer Science student focused on Cybersecurity, Cloud Security, Linux, and secure software development. I enjoy understanding how systems work, identifying security weaknesses, and building technologies that are secure by design.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            My learning philosophy merges developer skills with security insights. I write code in Python and TypeScript, while analyzing vulnerabilities inside closed Kali Linux VMs. I study AWS policies, IAM boundaries, and cryptographic encryption keys to build systems that prevent parameter manipulations and leakage vectors from target launch onward.
          </p>
        </div>

        {/* PROFILE PROFILE CARD */}
        <div className="lg:col-span-5 border border-cyber-border bg-cyber-card p-6 rounded-2xl shadow-cyber-glow relative overflow-hidden font-mono text-xs select-none">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-cyber-primary"></div>
          <div className="flex items-center justify-between border-b border-cyber-border pb-3 text-slate-300 font-bold uppercase">
            <span>IDENTITY PROFILE</span>
            <Lock className="h-4.5 w-4.5 text-cyber-primary animate-pulse" />
          </div>
          <div className="space-y-3.5 pt-3">
            {profileDetails.map((det) => (
              <div key={det.label} className="space-y-0.5">
                <span className="text-[9px] text-slate-500 block">{det.label}</span>
                <span className={det.label === "STATUS" ? "text-cyber-secondary font-bold" : det.label === "ROLE" ? "text-cyber-primary font-bold" : "text-slate-200"}>
                  {det.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SKILL CONSTELLATION SPHERE */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-10 border-t border-cyber-border/40">
        <div className="lg:col-span-5 flex justify-center items-center">
          <SkillsSphere3D />
        </div>
        <div className="lg:col-span-7 space-y-6">
          <span className="font-mono text-xs text-cyber-secondary tracking-widest block uppercase font-bold">
            [// INTERACTIVE ORBITAL PATH]
          </span>
          <h2 className="text-2xl font-bold font-mono tracking-wide text-slate-100 uppercase">
            3D SKILL CONSTELLATION
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
            The floating constellation displays core programming languages, libraries, and forensic/auditing tools checked inside my security testbed. Drag and hover over the constellation nodes to inspect parameters.
          </p>
          <div className="p-4 border border-cyber-border bg-cyber-card/30 rounded-xl flex items-start space-x-3 text-[10px] font-mono text-slate-500">
            <Terminal className="h-4.5 w-4.5 text-cyber-primary shrink-0 mt-0.5" />
            <span>Interactive rendering is canvas-assisted. All nodes map directly to tested competencies in academic and personal lab environments.</span>
          </div>
        </div>
      </section>

      {/* 3D SKILL MONOSPACE CARDS GRID */}
      <section className="space-y-8 pt-10 border-t border-cyber-border/40">
        <div className="space-y-3">
          <span className="font-mono text-xs text-cyber-primary tracking-widest block uppercase font-bold">
            [// RATING HARDENING MATRIX]
          </span>
          <h2 className="text-2xl font-bold font-mono tracking-wide text-slate-100 uppercase">
            SKILLS AUDIT MODULES
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCards.map((card) => (
            <div
              key={card.category}
              className="border border-cyber-border bg-cyber-card/80 p-5 rounded-xl font-mono text-xs relative overflow-hidden flex flex-col justify-between hover:border-cyber-primary/45 transition-colors shadow-md select-none"
            >
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-primary/5 to-transparent pointer-events-none opacity-50 h-1/2 animate-[scanline_4s_linear_infinite]"></div>

              <div>
                <div className="flex items-center justify-between border-b border-cyber-border pb-2.5 mb-4">
                  <span className="font-bold text-slate-200 tracking-wider uppercase text-[10px]">{card.category}</span>
                  <ShieldAlert className="h-3.5 w-3.5 text-cyber-primary" />
                </div>

                <div className="space-y-2.5">
                  {card.items.map((item) => (
                    <div key={item.name} className="flex justify-between items-center text-[10px] text-slate-400">
                      <span className="truncate pr-2">{item.name}</span>
                      {renderDots(item.dots)}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-cyber-border/40 text-[9px] font-bold text-cyber-secondary text-center tracking-widest">
                [ ACTIVE SECURE ]
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
