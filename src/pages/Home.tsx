import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  FileText,
  Mail,
  Shield,
  Terminal,
  Lock,
  Activity,
  Eye,
  CheckCircle,
  ShieldAlert,
  Layers,
  Award,
  X,
  CheckCircle2,
  Calendar
} from "lucide-react";
import { getPortfolioData } from "../utils/portfolioData";
import type { Certificate } from "../utils/portfolioData";
import CyberCore3D from "../components/3d/CyberCore3D";

// Custom SVG Brand Icons
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Home() {
  const { projects, certifications } = getPortfolioData();
  const [selectedHomeCert, setSelectedHomeCert] = useState<Certificate | null>(null);
  const bankguard = projects.find((p) => p.slug === "bankguard-nexus") || projects[0];
  const cloudshield = projects.find((p) => p.slug === "cloudshield") || projects[1];
  const sentinel = projects.find((p) => p.slug === "sentinel-ai") || projects[2];
  const taskmanager = projects.find((p) => p.slug === "secure-task-manager") || projects[3];

  // System Loading State
  const [loading, setLoading] = useState(true);
  const [loadingSteps, setLoadingSteps] = useState<string[]>([]);
  useEffect(() => {
    const steps = [
      "INITIALIZING SECURE PROTOCOLS...",
      "[✓] HOST KERNEL CHECK: OK",
      "[✓] FIREWALL GATEWAYS: ARMED",
      "[✓] CLOUD DEPLOYMENT STACKS: VERIFIED",
      "[✓] AI FRAUD ENGINE CLASSIFIERS: ACTIVE",
      "SYSTEM STATUS: ONLINE"
    ];
    let idx = 0;
    const timer = setInterval(() => {
      if (idx < steps.length) {
        const nextStep = steps[idx];
        setLoadingSteps(prev => [...prev, nextStep]);
        idx++;
      } else {
        clearInterval(timer);
        setTimeout(() => setLoading(false), 550);
      }
    }, 280);
    return () => clearInterval(timer);
  }, []);

  // Glitch Name Scrambler
  const [glitchText, setGlitchText] = useState("MADHUKAR PENDALWAR");
  useEffect(() => {
    if (loading) return;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_//<>";
    let interval: number;
    const triggerScrambler = () => {
      let iteration = 0;
      clearInterval(interval);
      interval = setInterval(() => {
        setGlitchText(
          "MADHUKAR PENDALWAR"
            .split("")
            .map((char, index) => {
              if (index < iteration || char === " ") {
                return "MADHUKAR PENDALWAR"[index];
              }
              return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("")
        );
        if (iteration >= "MADHUKAR PENDALWAR".length) {
          clearInterval(interval);
          setGlitchText("MADHUKAR PENDALWAR");
        }
        iteration += 1 / 2;
      }, 25);
    };

    const mainTimer = setInterval(triggerScrambler, 7000);
    triggerScrambler();
    return () => {
      clearInterval(interval);
      clearInterval(mainTimer);
    };
  }, [loading]);

  // BankGuard Nexus AI Dashboard simulation
  const [threatScore, setThreatScore] = useState(0);
  const [threatState, setThreatState] = useState<"SCANNING" | "ALERT">("SCANNING");
  useEffect(() => {
    if (loading) return;
    const runScan = () => {
      setThreatState("SCANNING");
      setThreatScore(0);
      let current = 0;
      const progress = setInterval(() => {
        current += Math.floor(Math.random() * 8) + 4;
        if (current >= 82) {
          clearInterval(progress);
          setThreatScore(82);
          setThreatState("ALERT");
        } else {
          setThreatScore(current);
        }
      }, 70);
    };
    const mainTimer = setInterval(runScan, 5000);
    runScan();
    return () => clearInterval(mainTimer);
  }, [loading]);

  // Security Lab scan simulation
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [labState, setLabState] = useState<"IDLE" | "RUNNING" | "DONE">("IDLE");
  const runLabScan = () => {
    if (labState === "RUNNING") return;
    setLabState("RUNNING");
    setTerminalLines(["$ nmap -sV target.local"]);
    const lines = [
      "Starting Nmap 7.94 ( https://nmap.org ) at 2026-08-17 01:06 GST",
      "Nmap scan report for target.local (192.168.1.100)",
      "Host is up (0.00045s latency).",
      "Not shown: 997 closed tcp ports (reset)",
      "PORT     STATE     SERVICE",
      "22/tcp   OPEN      ssh     (OpenSSH 9.2p1 Debian)",
      "80/tcp   OPEN      http    (Apache httpd 2.4.57)",
      "443/tcp  OPEN      https   (Apache httpd 2.4.57)",
      "Scan completed: 1 IP address scanned in 1.84 seconds.",
      "SECURITY ANALYSIS: COMPLETE // PORTS RECON VERIFIED"
    ];
    let idx = 0;
    const logInterval = setInterval(() => {
      if (idx < lines.length) {
        const nextLine = lines[idx];
        setTerminalLines(prev => [...prev, nextLine]);
        idx++;
      } else {
        clearInterval(logInterval);
        setLabState("DONE");
      }
    }, 350);
  };

  useEffect(() => {
    if (loading) return;
    runLabScan();
  }, [loading]);

  // Contact handshake states
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success">("idle");
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 4000);
    }, 1200);
  };

  // 1. Loading Screen
  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#050505] z-50 flex flex-col items-center justify-center p-4 select-none">
        <div className="max-w-md w-full border border-cyber-border bg-cyber-card p-8 rounded-2xl shadow-cyber-glow space-y-6 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-cyber-border pb-3">
            <span className="text-cyber-primary font-bold tracking-widest uppercase">BOOTING // MP_CORE_SEC</span>
            <span className="h-2 w-2 rounded-full bg-cyber-primary animate-ping"></span>
          </div>
          <div className="space-y-2 text-slate-300">
            {loadingSteps.map((step, i) => (
              <p key={i} className={step.includes("ONLINE") ? "text-cyber-secondary font-bold animate-pulse" : "text-slate-400"}>
                {step}
              </p>
            ))}
          </div>
          <div className="h-[2px] w-full bg-cyber-border rounded-full overflow-hidden relative">
            <div className="absolute h-full bg-cyber-primary w-1/3 animate-[scanline_2s_infinite]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-28 md:space-y-36">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-24 md:pt-32 overflow-hidden">
        {/* Glow grid overlay */}
        <div className="absolute top-1/4 left-1/4 h-[350px] w-[350px] bg-cyber-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 h-[350px] w-[350px] bg-cyber-secondary/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Side: Technical bio heading details */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <div className="flex flex-wrap gap-2.5 items-center">
              <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyber-primary/10 border border-cyber-primary/30 text-[9px] font-mono tracking-widest text-cyber-primary font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-cyber-primary animate-ping"></span>
                <span>SYSTEM: COMPILING CONNECTS</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-cyber-border/80 border border-cyber-border text-[9px] font-mono tracking-widest text-slate-400 font-semibold">
                OPEN TO OPPORTUNITIES
              </span>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs text-cyber-primary tracking-widest block uppercase font-bold">
                [// IDENTITY GATING]
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-mono tracking-wider text-slate-100 uppercase select-none">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-cyber-primary to-cyber-secondary filter drop-shadow-[0_0_10px_rgba(255,51,51,0.2)]">
                  {glitchText}
                </span>
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl font-mono text-slate-200 uppercase font-semibold">
                Aspiring Cybersecurity & Cloud Security Engineer
              </h2>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-xl font-sans">
              Building secure systems, exploring cybersecurity, and engineering cloud infrastructure with security at the core. Focus areas cover hypervisor isolated lab testing, identity access controls, and machine learning threat pipelines.
            </p>

            {/* Technical Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {["CYBERSECURITY", "CLOUD SECURITY", "LINUX", "PYTHON", "AWS", "WEB SECURITY", "AI SECURITY"].map(tag => (
                <span key={tag} className="px-2.5 py-1 border border-cyber-border/80 bg-cyber-card/60 rounded text-[9px] font-mono tracking-widest text-slate-300 font-bold select-none hover:border-cyber-primary/40 hover:text-cyber-primary transition-all">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#featured-projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("featured-projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center space-x-2 px-5 py-3 rounded-lg bg-cyber-primary hover:bg-cyber-primary/90 text-black font-mono text-xs font-bold tracking-widest transition-all duration-300 shadow-cyber-glow cursor-pointer"
              >
                <span>LAUNCH COMMAND CENTER</span>
                <ArrowRight className="h-4 w-4 text-black" />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center space-x-2 px-5 py-3 rounded-lg border border-cyber-border hover:border-cyber-primary/50 bg-cyber-card/50 hover:bg-cyber-primary/5 text-slate-300 hover:text-slate-100 font-mono text-xs tracking-widest transition-all duration-300 cursor-pointer"
              >
                <Mail className="h-4 w-4 text-cyber-primary" />
                <span>ESTABLISH CONNECTION</span>
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Madhukar_Pendalwar_Resume.pdf"
                className="flex items-center space-x-2 px-5 py-3 rounded-lg border border-cyber-secondary/60 hover:border-cyber-secondary bg-cyber-secondary/10 hover:bg-cyber-secondary hover:text-black text-cyber-secondary font-mono text-xs font-bold tracking-widest transition-all duration-300 shadow-cyber-glow-success cursor-pointer"
              >
                <FileText className="h-4 w-4" />
                <span>DOWNLOAD RESUME</span>
              </a>
            </div>
          </div>

          {/* Right Side: Interactive CyberCore3D globe with custom HUD elements overlay */}
          <div className="lg:col-span-5 w-full flex justify-center items-center relative py-12 lg:py-0 select-none">
            {/* The 3D Orb Component */}
            <div className="relative w-full max-w-[450px] aspect-square flex items-center justify-center">
              <CyberCore3D standaloneCanvas={true} />

              {/* HUD Card 1: System Status */}
              <div className="absolute -top-4 -left-4 p-3.5 border border-cyber-border bg-cyber-card/90 backdrop-blur-md rounded-xl font-mono text-[9px] text-slate-400 space-y-1 shadow-cyber-glow animate-float">
                <div className="flex items-center space-x-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyber-secondary animate-ping"></span>
                  <span className="text-slate-300 font-bold uppercase tracking-wider">SYSTEM STATUS</span>
                </div>
                <div className="text-cyber-secondary font-extrabold text-[10px] tracking-widest">● SECURE</div>
              </div>

              {/* HUD Card 2: Threat Level */}
              <div className="absolute top-1/2 -right-6 p-3.5 border border-cyber-border bg-cyber-card/90 backdrop-blur-md rounded-xl font-mono text-[9px] text-slate-400 space-y-1 shadow-cyber-glow animate-float" style={{ animationDelay: "1.5s" }}>
                <div className="text-slate-500 font-bold uppercase tracking-wider">THREAT LEVEL</div>
                <div className="text-cyber-primary font-extrabold text-[10px] tracking-widest">LOW</div>
              </div>

              {/* HUD Card 3: Network Protection */}
              <div className="absolute -bottom-4 left-6 p-3.5 border border-cyber-border bg-cyber-card/90 backdrop-blur-md rounded-xl font-mono text-[9px] text-slate-400 space-y-1 shadow-cyber-glow animate-float" style={{ animationDelay: "2.5s" }}>
                <div className="text-slate-300 font-bold uppercase tracking-wider">NETWORK</div>
                <div className="text-cyber-secondary font-extrabold text-[10px] tracking-widest">PROTECTED</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE SECURE HANDSHAKE TERMINAL IN HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full border border-cyber-border bg-cyber-card/85 backdrop-blur-sm rounded-2xl p-6 space-y-4 shadow-cyber-glow font-mono text-xs relative overflow-hidden select-none">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyber-primary via-cyber-secondary to-cyber-accent"></div>
          <div className="flex items-center justify-between border-b border-cyber-border pb-3 text-slate-500 font-bold uppercase tracking-widest">
            <div className="flex items-center space-x-2">
              <Terminal className="h-4 w-4 text-cyber-primary animate-pulse" />
              <span>TERMINAL CONSOLE // SECURE_HANDSHAKE_INIT</span>
            </div>
            <span className="text-cyber-primary text-[10px] animate-pulse">● LOGGING ACTIVE</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-300">
            <div className="space-y-3">
              <div>
                <span className="text-cyber-primary font-bold">$</span> whoami
                <p className="text-slate-200 mt-1 pl-4 font-mono font-medium">madhukar@cybersec:~# (Aspiring Cybersecurity & Cloud Specialist)</p>
              </div>
              <div>
                <span className="text-cyber-primary font-bold">$</span> cat env_targets.cfg
                <div className="mt-1 pl-4 text-slate-400 font-mono space-y-0.5">
                  <p>IDENTITY: Madhukar Pendalwar</p>
                  <p>FOCUS: Cloud Security // Cryptography // Linux VM Lab</p>
                  <p>LOCATION: Hyderabad, Telangana, India</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-cyber-primary font-bold">$</span> ./secure_world.sh
                <div className="mt-1 pl-4 space-y-1 font-mono text-[11px]">
                  <p className="text-slate-500 italic">Initializing Cyber Security Defense Systems...</p>
                  <p className="text-cyber-secondary font-bold">✔ [LINUX] permissions model audited</p>
                  <p className="text-cyber-secondary font-bold">✔ [NETWORKING] ports recon validation complete</p>
                  <p className="text-cyber-secondary font-bold">✔ [CLOUD SECURITY] AWS KMS key encryption verified</p>
                  <p className="text-cyber-secondary font-bold">✔ [AI SECURITY] threat scoring classification initialized</p>
                  <p className="text-cyber-primary font-bold mt-2">SYSTEM READY // SHELL OPERATIONAL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE SECURITY CORE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-6">
        <div className="space-y-3 text-center md:text-left">
          <span className="font-mono text-xs text-cyber-primary tracking-widest block uppercase font-bold">
            [// INTERACTIVE THREAT HARDENING]
          </span>
          <h2 className="text-3xl font-bold font-mono tracking-wide text-slate-100 uppercase">
            THE SECURITY CORE
          </h2>
          <p className="text-xs text-slate-400 max-w-lg leading-relaxed font-sans">
            Interactive node architecture log. Click on floating orbit nodes in the 3D grid below to inspect specific threat mitigation parameters.
          </p>
        </div>
        <CyberCore3D />
      </section>

      {/* ABOUT ME SECTION (DASHBOARD CONCEPT) */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="font-mono text-xs text-cyber-primary tracking-widest block uppercase font-bold">
            [// WHO IS MADHUKAR]
          </span>
          <h2 className="text-3xl font-bold font-mono tracking-wide text-slate-100 uppercase">
            WHO IS MADHUKAR?
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed font-sans">
            I am a Computer Science student focused on Cybersecurity, Cloud Security, Linux, and secure software development. I enjoy understanding how systems work, identifying security weaknesses, and building technologies that are secure by design.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {[
              { title: "SECURITY BY DESIGN", desc: "Evaluating application parameters and encoding user inputs to eliminate exploits." },
              { title: "LEAST PRIVILEGE", desc: "Setting restrictive policies inside AWS and local user access scopes." },
              { title: "DEFENSE IN DEPTH", desc: "Securing systems from client web APIs down to kernel permissions maps." },
              { title: "SECURE DEVELOPMENT", desc: "Hardening databases, encrypting tokens, and validating REST routes at runtime." }
            ].map((p, i) => (
              <div key={i} className="p-4 border border-cyber-border rounded-xl bg-cyber-card/45 relative overflow-hidden group hover:border-cyber-primary/45 transition-colors">
                <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-cyber-primary"></div>
                <span className="text-[9px] font-mono tracking-widest text-cyber-primary font-bold uppercase block mb-1">{p.title}</span>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cybersecurity Student Profile Dashboard Card */}
        <div className="lg:col-span-5 border border-cyber-border rounded-2xl bg-cyber-card p-6 space-y-4 shadow-cyber-glow relative overflow-hidden font-mono text-xs select-none">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-cyber-primary"></div>
          <div className="flex items-center justify-between border-b border-cyber-border pb-3">
            <span className="text-slate-300 font-bold uppercase tracking-wider">IDENTITY PROFILE CARD</span>
            <Shield className="h-4.5 w-4.5 text-cyber-primary animate-pulse" />
          </div>
          <div className="space-y-3.5 text-slate-400">
            <div>
              <span className="text-[9px] text-slate-500 uppercase block">Identity Name</span>
              <span className="text-slate-200 font-bold text-sm">Madhukar Pendalwar</span>
            </div>
            <div>
              <span className="text-[9px] text-slate-500 uppercase block">Role Title</span>
              <span className="text-cyber-primary font-bold text-xs uppercase">Cybersecurity Student</span>
            </div>
            <div>
              <span className="text-[9px] text-slate-500 uppercase block">Security Focus</span>
              <span className="text-slate-200 font-semibold block">Cybersecurity // Cloud Security // Web Security // AI Security</span>
            </div>
            <div>
              <span className="text-[9px] text-slate-500 uppercase block">Work Environment</span>
              <span className="text-slate-200 font-semibold">Linux // AWS // Kali LinuxVM</span>
            </div>
            <div className="pt-2 border-t border-cyber-border flex justify-between items-center text-[10px]">
              <span className="text-slate-500 font-bold">STATUS REPORT:</span>
              <span className="text-cyber-secondary font-bold uppercase tracking-widest">Open to Opportunities</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SHOWCASE */}
      <section id="featured-projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-4">
            <span className="font-mono text-xs text-cyber-primary tracking-widest block uppercase font-bold">
              [// CYBER SECURITY LABS]
            </span>
            <h2 className="text-3xl font-bold font-mono tracking-wide text-slate-100 uppercase">
              FEATURED BUILDS
            </h2>
            <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
              Explore complete full-stack web applications, controlled academic cybersecurity threat modeling, and research builds demonstrating security-by-design principles.
            </p>
          </div>
          <Link
            to="/projects"
            className="flex items-center space-x-1.5 text-xs font-mono font-bold text-cyber-primary hover:text-cyber-secondary transition-colors group shrink-0"
          >
            <span>VIEW ALL PROJECTS</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="space-y-12">
          {/* Project 01: BankGuard Nexus (Largest Card Layout) */}
          <div className="border border-cyber-border bg-cyber-card/50 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-cyber-glow group hover:border-cyber-primary/40 transition-colors">
            <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-cyber-primary"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-[9px] text-cyber-primary tracking-widest font-bold uppercase px-2 py-0.5 border border-cyber-primary/20 rounded bg-cyber-primary/5">
                    {bankguard.category}
                  </span>
                  <span className="font-mono text-[9px] text-slate-500">{bankguard.year}</span>
                </div>
                <h3 className="text-2xl font-bold font-mono text-slate-100 uppercase tracking-wide">
                  {bankguard.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {bankguard.description}
                </p>
                <div className="p-4 border border-cyber-border bg-cyber-bg/40 rounded-xl space-y-2 text-xs font-sans">
                  <p className="text-slate-400"><strong className="text-cyber-primary font-mono text-[9px] block uppercase">Vulnerability Target:</strong> {bankguard.problem}</p>
                  <p className="text-slate-300"><strong className="text-cyber-secondary font-mono text-[9px] block uppercase">Defensive Solution:</strong> {bankguard.solution}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {bankguard.technologies.map(tech => (
                    <span key={tech} className="px-2.5 py-0.5 border border-cyber-border bg-cyber-bg rounded font-mono text-[9px] text-slate-400">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-4">
                  <a href={bankguard.github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1.5 px-4 py-2 border border-cyber-border hover:border-cyber-primary rounded-lg font-mono text-[10px] text-slate-300 hover:text-slate-100 transition-colors">
                    <GithubIcon className="h-4 w-4 text-cyber-primary" />
                    <span>GITHUB BUILD</span>
                  </a>
                </div>
              </div>

              {/* Animated AI Threat Detection Dashboard */}
              <div className="lg:col-span-5 border border-cyber-border bg-cyber-bg/60 rounded-xl p-5 space-y-4 font-mono text-xs shadow-md">
                <div className="flex items-center justify-between border-b border-cyber-border pb-2 text-slate-300 font-bold uppercase">
                  <span>AI THREAT DETECTION ENGINE</span>
                  <Activity className="h-4.5 w-4.5 text-cyber-primary animate-pulse" />
                </div>
                <div className="space-y-3.5">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-400">THREAT SCORE CALCULATION</span>
                      <span className={threatState === "ALERT" ? "text-cyber-primary font-bold animate-pulse" : "text-cyber-secondary font-bold"}>
                        {threatScore}% {threatState === "ALERT" ? "[DANGEROUS]" : "[SCANNING]"}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-cyber-card border border-cyber-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyber-primary transition-all duration-70"
                        style={{ width: `${threatScore}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[10px] text-slate-400 pt-1.5">
                    <div className="p-2 border border-cyber-border bg-cyber-card/40 rounded flex items-center justify-between">
                      <span>SMS BODY:</span>
                      <span className={threatState === "ALERT" ? "text-cyber-primary font-bold" : "text-slate-500"}>
                        {threatState === "ALERT" ? "⚠ SUSPICIOUS" : "SCANNING"}
                      </span>
                    </div>
                    <div className="p-2 border border-cyber-border bg-cyber-card/40 rounded flex items-center justify-between">
                      <span>URL TARGET:</span>
                      <span className={threatState === "ALERT" ? "text-cyber-primary font-bold" : "text-slate-500"}>
                        {threatState === "ALERT" ? "⚠ MALICIOUS" : "SCANNING"}
                      </span>
                    </div>
                    <div className="p-2 border border-cyber-border bg-cyber-card/40 rounded flex items-center justify-between">
                      <span>OTP TOKEN:</span>
                      <span className="text-cyber-secondary font-bold">✓ SAFE</span>
                    </div>
                    <div className="p-2 border border-cyber-border bg-cyber-card/40 rounded flex items-center justify-between">
                      <span>FLOW AUDIT:</span>
                      <span className="text-cyber-secondary font-bold">✓ ENCRYPTED</span>
                    </div>
                  </div>

                  <div className={`p-2.5 border rounded text-[9px] flex items-center space-x-2 ${threatState === "ALERT" ? "border-cyber-primary/40 bg-cyber-primary/5 text-cyber-primary" : "border-cyber-border bg-cyber-card/20 text-slate-500"}`}>
                    <ShieldAlert className={`h-4 w-4 shrink-0 ${threatState === "ALERT" ? "animate-bounce" : ""}`} />
                    <span>
                      {threatState === "ALERT"
                        ? "DECISION PIPELINE // AUTOMATIC TRIGGER: BLOCK + TERMINATE HANDSHAKE ALERTED"
                        : "SCANNING CORRELATION PIPELINE ON HOST INTERFACE..."}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Layout for Project 2 and Project 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project 02: CloudShield with pipeline workflow */}
            <div className="border border-cyber-border bg-cyber-card/50 rounded-2xl p-6 relative overflow-hidden group hover:border-cyber-primary/40 transition-colors flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-start justify-between border-b border-cyber-border/40 pb-3">
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] text-cyber-primary tracking-widest font-bold uppercase px-2 py-0.5 border border-cyber-primary/20 rounded bg-cyber-primary/5">
                      {cloudshield.category}
                    </span>
                    <h3 className="text-lg font-bold font-mono text-slate-100 uppercase tracking-wide mt-1.5">
                      {cloudshield.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[9px] text-slate-500">{cloudshield.year}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {cloudshield.description}
                </p>

                {/* Cloud Security Chain Pipeline Visual */}
                <div className="p-4 border border-cyber-border bg-cyber-bg/40 rounded-xl space-y-3 font-mono text-[9px]">
                  <div className="flex items-center justify-between border-b border-cyber-border pb-1.5 text-slate-500 font-bold uppercase tracking-widest">
                    <span>AWS STORAGE PIPELINE</span>
                    <Layers className="h-3.5 w-3.5 text-cyber-primary" />
                  </div>
                  <div className="flex items-center justify-between text-slate-400 space-x-1">
                    <div className="flex flex-col items-center p-1 border border-cyber-border bg-cyber-card rounded text-center w-[58px]">
                      <span className="text-slate-300 font-bold">USER</span>
                      <span className="text-[7px] text-slate-500">REQUEST</span>
                    </div>
                    <span className="text-cyber-primary animate-pulse">&rarr;</span>
                    <div className="flex flex-col items-center p-1 border border-cyber-border bg-cyber-card rounded text-center w-[58px]">
                      <span className="text-cyber-primary font-bold">IAM</span>
                      <span className="text-[7px] text-slate-500">ROLE CHECK</span>
                    </div>
                    <span className="text-cyber-primary animate-pulse">&rarr;</span>
                    <div className="flex flex-col items-center p-1 border border-cyber-border bg-cyber-card rounded text-center w-[58px]">
                      <span className="text-cyber-secondary font-bold">S3</span>
                      <span className="text-[7px] text-slate-500">ACCESS BLOCK</span>
                    </div>
                    <span className="text-cyber-primary animate-pulse">&rarr;</span>
                    <div className="flex flex-col items-center p-1 border border-cyber-border bg-cyber-card rounded text-center w-[58px]">
                      <span className="text-cyber-primary font-bold">KMS</span>
                      <span className="text-[7px] text-slate-500">DECRYPT</span>
                    </div>
                  </div>
                  <div className="text-[8px] text-slate-500 pt-1 flex justify-between items-center border-t border-cyber-border/40">
                    <span>SECURITY: LEAST PRIVILEGE</span>
                    <span className="text-cyber-secondary font-bold">ACTIVE</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {cloudshield.technologies.slice(0, 5).map(tech => (
                    <span key={tech} className="px-2 py-0.5 border border-cyber-border bg-cyber-bg rounded font-mono text-[8px] text-slate-400">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-cyber-border/40 flex items-center justify-between">
                <Link to="/cloud" className="font-mono text-[9px] tracking-widest font-bold text-slate-300 hover:text-cyber-primary transition-colors flex items-center">
                  INSPECT ARCHITECTURE &rarr;
                </Link>
                <a href={cloudshield.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyber-primary transition-colors">
                  <GithubIcon className="h-4.5 w-4.5" />
                </a>
              </div>
            </div>

            {/* Project 03: Sentinel AI with threat log simulation */}
            <div className="border border-cyber-border bg-cyber-card/50 rounded-2xl p-6 relative overflow-hidden group hover:border-cyber-primary/40 transition-colors flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-start justify-between border-b border-cyber-border/40 pb-3">
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] text-cyber-primary tracking-widest font-bold uppercase px-2 py-0.5 border border-cyber-primary/20 rounded bg-cyber-primary/5">
                      {sentinel.category}
                    </span>
                    <h3 className="text-lg font-bold font-mono text-slate-100 uppercase tracking-wide mt-1.5">
                      {sentinel.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[9px] text-slate-500">{sentinel.year}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {sentinel.description}
                </p>

                {/* AI Threat Log simulator */}
                <div className="p-4 border border-cyber-border bg-cyber-bg/40 rounded-xl space-y-2 font-mono text-[9px] text-slate-400">
                  <div className="flex items-center justify-between border-b border-cyber-border pb-1.5 text-slate-500 font-bold uppercase tracking-widest">
                    <span>COGNITIVE LOG THREAT SCOPES</span>
                    <Eye className="h-3.5 w-3.5 text-cyber-primary animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-cyber-primary">[ALERT] 192.168.1.105 SSH login brute-force detected</p>
                    <p className="text-slate-400">[MONITOR] Audit policy rule applied dynamically</p>
                    <p className="text-cyber-secondary">[ACTION] Isolate node container context immediately</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {sentinel.technologies.map(tech => (
                    <span key={tech} className="px-2 py-0.5 border border-cyber-border bg-cyber-bg rounded font-mono text-[8px] text-slate-400">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-cyber-border/40 flex items-center justify-between">
                <Link to="/projects" className="font-mono text-[9px] tracking-widest font-bold text-slate-300 hover:text-cyber-primary transition-colors flex items-center">
                  INSPECT INCIDENT REPORT &rarr;
                </Link>
                <a href={sentinel.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyber-primary transition-colors">
                  <GithubIcon className="h-4.5 w-4.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Project 04: Secure Task Manager */}
          <div className="border border-cyber-border bg-cyber-card/50 rounded-2xl p-6 relative overflow-hidden group hover:border-cyber-primary/40 transition-colors">
            <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-cyber-secondary"></div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-[9px] text-cyber-secondary tracking-widest font-bold uppercase px-2 py-0.5 border border-cyber-secondary/20 rounded bg-cyber-secondary/5">
                    {taskmanager.category}
                  </span>
                  <span className="font-mono text-[9px] text-slate-500">{taskmanager.year}</span>
                </div>
                <h3 className="text-lg font-bold font-mono text-slate-100 uppercase tracking-wide">
                  {taskmanager.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {taskmanager.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {taskmanager.technologies.map(tech => (
                    <span key={tech} className="px-2 py-0.5 border border-cyber-border bg-cyber-bg rounded font-mono text-[8px] text-slate-400">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Security Verification Panel */}
              <div className="md:col-span-4 border border-cyber-border bg-cyber-bg/40 rounded-xl p-4.5 space-y-2.5 font-mono text-[9px] text-slate-400">
                <div className="flex items-center justify-between border-b border-cyber-border pb-1.5 text-slate-500 font-bold uppercase tracking-widest">
                  <span>SECURE GATE CHECKS</span>
                  <Lock className="h-3.5 w-3.5 text-cyber-secondary" />
                </div>
                <ul className="space-y-1.5">
                  <li className="flex items-center space-x-1.5 text-slate-300">
                    <CheckCircle className="h-3.5 w-3.5 text-cyber-secondary" />
                    <span>JWT Encrypted Session Gating</span>
                  </li>
                  <li className="flex items-center space-x-1.5 text-slate-300">
                    <CheckCircle className="h-3.5 w-3.5 text-cyber-secondary" />
                    <span>Password Bcrypt Salt-Hashing</span>
                  </li>
                  <li className="flex items-center space-x-1.5 text-slate-300">
                    <CheckCircle className="h-3.5 w-3.5 text-cyber-secondary" />
                    <span>OWASP Injection Mitigations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MY SECURITY LAB SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-4">
          <span className="font-mono text-xs text-cyber-primary tracking-widest block uppercase font-bold">
            [// MY TESTING TESTBED]
          </span>
          <h2 className="text-3xl font-bold font-mono tracking-wide text-slate-100 uppercase">
            MY SECURITY LAB
          </h2>
          <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
            Hands-on vulnerability and reconnaissance tools audit run output. Check simulated log traces on isolated lab target instances below.
          </p>
        </div>

        <div className="border border-cyber-border rounded-2xl bg-cyber-card/90 shadow-cyber-glow overflow-hidden font-mono text-xs select-none">
          {/* Top header bar */}
          <div className="bg-cyber-card border-b border-cyber-border px-4 py-3 flex items-center justify-between text-slate-400">
            <div className="flex items-center space-x-2">
              <span className="h-3 w-3 rounded-full bg-red-600"></span>
              <span className="h-3 w-3 rounded-full bg-yellow-600"></span>
              <span className="h-3 w-3 rounded-full bg-green-600"></span>
              <span className="text-[10px] font-bold font-mono text-slate-500 pl-2">madhukar@kali: ~/security-lab</span>
            </div>
            <button
              onClick={runLabScan}
              disabled={labState === "RUNNING"}
              className="px-3 py-1 border border-cyber-border hover:border-cyber-primary rounded bg-cyber-bg hover:text-cyber-primary transition-all text-[9px] font-bold tracking-widest disabled:opacity-50"
            >
              {labState === "RUNNING" ? "EXECUTING RECON..." : "RUN SCAN MODULE"}
            </button>
          </div>
          {/* Console print panel */}
          <div className="p-6 bg-black/60 min-h-[220px] space-y-1.5 text-slate-300 font-mono text-[10px] leading-relaxed">
            {terminalLines.map((line, i) => (
              <p key={i} className={line.startsWith("$") ? "text-cyber-primary font-bold" : line.includes("COMPLETE") ? "text-cyber-secondary font-bold" : "text-slate-400"}>
                {line}
              </p>
            ))}
            {labState === "RUNNING" && (
              <span className="inline-block h-3.5 w-1.5 bg-cyber-primary animate-pulse ml-0.5"></span>
            )}
          </div>
        </div>
      </section>

      {/* CYBERSECURITY KNOWLEDGE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-4">
          <span className="font-mono text-xs text-cyber-primary tracking-widest block uppercase font-bold">
            [// CORE SECURITY ROADMAP]
          </span>
          <h2 className="text-3xl font-bold font-mono tracking-wide text-slate-100 uppercase">
            SECURITY KNOWLEDGE CORE
          </h2>
          <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
            Overview of standard networks, cloud frameworks, and operating system permission paradigms studied and audited.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              category: "NETWORK SECURITY",
              topics: ["TCP/IP stack headers", "DNS mapping records", "HTTP/HTTPS cookies flags", "Ports filtering controls", "Firewalls rule states", "Routing mappings"]
            },
            {
              category: "WEB SECURITY",
              topics: ["OWASP Top 10 exploits", "JWT authentication gates", "RBAC/ABAC models", "CORS policy blocks", "XSS payload escapes", "SQL injection sanitization", "IDOR token tracking"]
            },
            {
              category: "CLOUD SECURITY",
              topics: ["AWS IAM resource limits", "S3 Block Public buckets", "AWS KMS key rotations", "VPC routing tables", "CloudTrail trace logs", "CloudWatch alerts rule definitions", "Security Groups parameters"]
            },
            {
              category: "LINUX SECURITY",
              topics: ["Files system privilege maps", "Linux processes isolation", "NAT & host adapter networks", "Syslog audits indexing", "Bash script modules", "CPU/RAM systems metrics"]
            }
          ].map(sec => (
            <div key={sec.category} className="border border-cyber-border bg-cyber-card/45 rounded-xl p-5 space-y-4 relative overflow-hidden group hover:border-cyber-primary/40 transition-colors">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-cyber-primary/50"></div>
              <h3 className="font-mono text-xs font-bold text-slate-200 tracking-widest border-b border-cyber-border/40 pb-2">{sec.category}</h3>
              <ul className="grid grid-cols-1 gap-2 font-mono text-[10px] text-slate-400">
                {sec.topics.map(t => (
                  <li key={t} className="flex items-center space-x-1.5">
                    <span className="text-cyber-primary">&rsaquo;</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CODE / SECURITY / BUILD (GITHUB SECTION) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-4">
            <span className="font-mono text-xs text-cyber-primary tracking-widest block uppercase font-bold">
              [// REPOSITORIES COMPILATION]
            </span>
            <h2 className="text-3xl font-bold font-mono tracking-wide text-slate-100 uppercase">
              CODE // SECURITY // BUILD
            </h2>
            <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
              Open-source developer builds hosted on GitHub. Click credentials parameters to inspect repositories.
            </p>
          </div>
          <a
            href="https://github.com/pendalwarmadhukar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 text-xs font-mono font-bold text-cyber-primary hover:text-cyber-secondary transition-colors group shrink-0"
          >
            <span>VIEW GITHUB PROFILE</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "bankguard-nexus", desc: "AI-powered fraud scanning decision pipeline with phishing body text models.", lang: "Python", stars: "4", forks: "1", date: "2026-02" },
            { name: "cloudshield", desc: "Serverless S3 storage configurations enforcing KMS key rotations and S3 policies.", lang: "TypeScript", stars: "3", forks: "0", date: "2026-01" },
            { name: "webcam-snapshot-test", desc: "Controlled sandbox testing of client browser media permission policies.", lang: "Python / JS", stars: "6", forks: "2", date: "2025-12" }
          ].map(repo => (
            <div key={repo.name} className="border border-cyber-border bg-cyber-card/45 rounded-xl p-5 flex flex-col justify-between hover:border-cyber-primary/30 transition-colors">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[9px] text-cyber-primary font-bold uppercase">REPOSITORY NODE</span>
                  <span className="text-[8px] font-mono text-slate-500">UPDATED: {repo.date}</span>
                </div>
                <h4 className="font-mono text-sm font-bold text-slate-200 uppercase tracking-wide">{repo.name}</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">{repo.desc}</p>
              </div>
              <div className="pt-4 mt-4 border-t border-cyber-border/40 flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span>LANG: {repo.lang}</span>
                <a
                  href={`https://github.com/pendalwarmadhukar/${repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyber-primary hover:text-cyber-secondary transition-colors font-bold uppercase"
                >
                  INSPECT &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ESTABLISH SECURE CONNECTION (CONTACT) */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="border border-cyber-border rounded-2xl bg-cyber-card/30 relative overflow-hidden p-6 md:p-12 shadow-cyber-glow">
          {/* Side glowing neon highlight bar */}
          <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-cyber-primary"></div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Info parameters */}
            <div className="lg:col-span-2 space-y-6">
              <span className="font-mono text-xs text-cyber-primary tracking-widest block uppercase font-bold">
                [// SECURE CHANNEL HANDSHAKE]
              </span>
              <h2 className="text-3xl font-bold font-mono tracking-wide text-slate-100 uppercase leading-snug">
                ESTABLISH SECURE CONNECTION
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                Initializing communication payload routing guidelines. Fill the form parameters to forward a message handshake directly to my dashboard inbox.
              </p>

              <div className="space-y-3 font-mono text-xs text-slate-400">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-cyber-primary" />
                  <a href="mailto:madhukarpendalwar@gmail.com" className="hover:text-cyber-primary transition-all">
                    madhukarpendalwar43@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-4 w-4 text-cyber-secondary" />
                  <span>Hyderabad, Telangana, India</span>
                </div>
              </div>

              <div className="flex space-x-4 pt-4 border-t border-cyber-border/40 font-mono text-xs">
                <a href="https://github.com/pendalwarmadhukar" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1.5 hover:text-cyber-primary transition-all font-bold">
                  <GithubIcon className="h-4 w-4" />
                  <span>GITHUB</span>
                </a>
                <a href="https://www.linkedin.com/in/madhukar-pendalwar-2a5746348/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1.5 hover:text-cyber-primary transition-all font-bold">
                  <LinkedinIcon className="h-4 w-4" />
                  <span>LINKEDIN</span>
                </a>
              </div>
            </div>

            {/* Handshake Form */}
            <div className="lg:col-span-3 border border-cyber-border bg-cyber-bg/50 rounded-xl p-6 relative">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="font-mono text-[9px] text-slate-400 uppercase font-bold">
                    CONNECTION NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Recruiter Lead"
                    className="w-full px-3 py-2 border border-cyber-border rounded-lg bg-cyber-bg text-slate-200 font-sans text-xs focus:outline-none focus:border-cyber-primary transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[9px] text-slate-400 uppercase font-bold">
                    RESPONSE EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="e.g. lead@corporation.com"
                    className="w-full px-3 py-2 border border-cyber-border rounded-lg bg-cyber-bg text-slate-200 font-sans text-xs focus:outline-none focus:border-cyber-primary transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[9px] text-slate-400 uppercase font-bold">
                    MESSAGE PAYLOAD BODY
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Describe collaboration opportunities or audit tasks..."
                    className="w-full px-3 py-2 border border-cyber-border rounded-lg bg-cyber-bg text-slate-200 font-sans text-xs focus:outline-none focus:border-cyber-primary transition-all"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-lg bg-cyber-primary hover:bg-cyber-primary/90 disabled:opacity-50 text-black font-mono text-xs font-bold tracking-widest transition-all duration-300 shadow-cyber-glow cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>TRANSMITTING BINDINGS...</span>
                  ) : (
                    <>
                      <span>SEND SECURE MESSAGE</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                {submitStatus === "success" && (
                  <div className="text-[10px] font-mono text-cyber-secondary border border-cyber-secondary/30 bg-cyber-secondary/5 rounded p-2 text-center">
                    ✔ BINDING RECEIVED. DIRECT Handshake channel established.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
