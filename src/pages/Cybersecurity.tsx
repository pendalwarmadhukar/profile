import { Shield, Terminal, CheckCircle2, ExternalLink } from "lucide-react";
import { getPortfolioData } from "../utils/portfolioData";
import type { Project } from "../utils/portfolioData";

export default function Cybersecurity() {
  const { projects } = getPortfolioData();
  
  // Get only cybersecurity projects
  const securityProjects = projects.filter(
    (p) => p.category.toLowerCase().includes("cybersecurity") || p.category.toLowerCase().includes("security")
  );

  const roadmapStages = [
    {
      title: "01 — FOUNDATIONS",
      desc: "Basic computing models, hardware audits, and computer architecture fundamentals.",
      topics: ["Data Representations", "CPU & RAM Architectures", "System Calls"]
    },
    {
      title: "02 — NETWORKING",
      desc: "OSI model, packet capturing, protocol analysis, and port states mappings.",
      topics: ["Wireshark Analyses", "Nmap Routing", "TCP/IP Handshakes"]
    },
    {
      title: "03 — LINUX SYSTEMS",
      desc: "Command line operations, file system structures, processes audits, and logging metrics.",
      topics: ["Privilege Audits", "Shell scripting", "syslog Monitoring"]
    },
    {
      title: "04 — WEB SECURITY",
      desc: "HTTP mechanisms, OWASP Top 10 vulnerabilities, parameters encoding, and access checks.",
      topics: ["Stored/Reflected XSS", "SQL injection filters", "JWT verification"]
    },
    {
      title: "05 — CYBERSECURITY LABS",
      desc: "Vulnerability audits inside virtual sandboxes, analyzing hypervisor boundaries.",
      topics: ["Hypervisor isolation", "API permission boundaries", "Local red-teaming"]
    },
    {
      title: "06 — CLOUD SECURITY",
      desc: "Identity access, serverless hardening, bucket permissions, and KMS keys rotation.",
      topics: ["AWS IAM least-privilege", "S3 Block Public access", "KMS Customer Keys"]
    },
    {
      title: "07 — DEVSECOPS",
      desc: "Integrating security checks into pre-commit filters, automated linting, and audit log pipelines.",
      topics: ["Secret scanners", "Static code audits (SAST)", "Audit logs streaming"]
    },
    {
      title: "08 — ADVANCED SECURITY",
      desc: "Threat intelligence feed ingestion, automated incident mitigation, and AI security systems.",
      topics: ["Anomalous logs scanning", "Adaptive security rules", "Compliance audits"]
    }
  ];

  const handsOnLabs = [
    {
      lab: "TryHackMe - Pre-Security Path",
      concept: "Networking & Linux fundamentals, web protocols, and network routing configurations.",
      learned: "Gained core competency in command-line tools, TCP packet structures, and routing parameters."
    },
    {
      lab: "TryHackMe - Web Hacking (OWASP)",
      concept: "Controlled hands-on exploration of command injection, IDOR, and cross-site scripting (XSS).",
      learned: "Learned how parameters are parsed on endpoints and how to sanitise inputs using express validation libraries."
    },
    {
      lab: "Advent of Cyber Challenges",
      concept: "General security awareness drills covering log analyses, cookies editing, and backup file hijacking.",
      learned: "Developed swift log-auditing skills, tracing anomalous activities inside server records."
    },
    {
      lab: "Splunk Basics Lab",
      concept: "Search processing language (SPL), log indexing, and dashboard queries monitoring traffic.",
      learned: "Learned to query mock system logs to flag login anomalies and database queries spiking."
    },
    {
      lab: "Hypervisor & VM Sandbox Lab",
      concept: "Isolating testing boundaries using VMware hypervisors to secure host OS files from untrusted scripts.",
      learned: "Learned configuration guidelines for virtual network adapters (NAT/Host-Only) and sandbox auditing."
    }
  ];

  return (
    <div className="pt-28 md:pt-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      
      {/* 1. Page Header */}
      <div className="space-y-4 text-center md:text-left">
        <span className="font-mono text-xs text-cyber-primary tracking-widest block uppercase font-bold">
          [// CORE SECURITY MODULE]
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-mono tracking-wide text-slate-100 uppercase">
          CYBERSECURITY LAB & ROADMAP
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          I explore cybersecurity, test browser permission models in isolated hypervisors, and continuously study security-by-design coding frameworks to mitigate top attack vectors.
        </p>
      </div>

      {/* Warning Box */}
      <div className="border border-amber-500/30 bg-amber-500/5 rounded-xl p-5 relative overflow-hidden font-mono text-xs text-slate-300">
        <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-amber-500"></div>
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold block uppercase tracking-wider text-amber-500">
              AUTHORIZED EDUCATIONAL ENVIRONMENT DISCLAIMER
            </span>
            <p className="font-sans leading-relaxed text-slate-400">
              All cybersecurity projects, vulnerability assessments, and browser API audits shown on this portfolio are executed exclusively inside isolated virtual lab environments (VMware/Kali Linux). No illegal activities are encouraged or conducted.
            </p>
          </div>
        </div>
      </div>

      {/* 2. My Security Journey */}
      <section className="space-y-8">
        <div className="space-y-3">
          <span className="font-mono text-xs text-cyber-primary tracking-widest block uppercase font-bold">
            [// MY SECURITY JOURNEY]
          </span>
          <h2 className="text-2xl font-bold font-mono tracking-wide text-slate-200 uppercase">
            PATHWAY FROM FOUNDATIONS TO SECURITY ENFORCEMENT
          </h2>
          <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
            A structured visual roadmap representing key concepts I've researched, tested, and implemented.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmapStages.map((stage, idx) => (
            <div key={idx} className="border border-cyber-border/80 bg-cyber-card/40 rounded-xl p-5 space-y-4 flex flex-col justify-between hover:border-cyber-primary/40 transition-colors">
              <div className="space-y-3">
                <span className="font-mono text-[9px] font-bold text-cyber-primary block tracking-widest">
                  {stage.title}
                </span>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                  {stage.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-cyber-border/40 space-y-1.5">
                <span className="font-mono text-[8px] text-slate-500 block uppercase font-bold">ACTIVE LOG:</span>
                <div className="flex flex-wrap gap-1">
                  {stage.topics.map((t, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded border border-cyber-border bg-cyber-bg font-mono text-[8px] text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Security Projects */}
      <section className="space-y-12">
        <div className="space-y-3">
          <span className="font-mono text-xs text-cyber-secondary tracking-widest block uppercase font-bold">
            [// LAB BUILDS]
          </span>
          <h2 className="text-2xl font-bold font-mono tracking-wide text-slate-200 uppercase">
            CONTROLLED CYBERSECURITY PROJECTS
          </h2>
        </div>

        <div className="space-y-8">
          {securityProjects.map((project: Project) => (
            <div key={project.slug} className="border border-cyber-border bg-cyber-card/50 rounded-2xl overflow-hidden p-6 md:p-8 relative shadow-md">
              <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-cyber-primary"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Text Description */}
                <div className="lg:col-span-3 space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 flex-wrap gap-2">
                      <span className="font-mono text-[9px] text-cyber-primary tracking-widest font-bold uppercase px-2 py-0.5 border border-cyber-primary/20 rounded bg-cyber-primary/5">
                        {project.category}
                      </span>
                      <span className="font-mono text-[9px] text-slate-500">
                        {project.year} // {project.type}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold font-mono tracking-wide text-slate-200 uppercase mt-2">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-xs font-mono text-slate-400">
                    <div className="p-3 border border-cyber-border bg-cyber-bg/40 rounded-xl space-y-1">
                      <span className="text-[9px] font-bold text-cyber-primary uppercase">OBJECTIVE</span>
                      <p className="text-[10px] text-slate-300 font-sans leading-relaxed">{project.problem}</p>
                    </div>
                    <div className="p-3 border border-cyber-border bg-cyber-bg/40 rounded-xl space-y-1">
                      <span className="text-[9px] font-bold text-cyber-secondary uppercase">MITIGATION DEFENSE</span>
                      <p className="text-[10px] text-slate-300 font-sans leading-relaxed">{project.solution}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 pt-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1.5 px-4 py-2 border border-cyber-border hover:border-cyber-primary rounded-lg text-slate-300 hover:text-slate-100 font-mono text-[10px] transition-colors"
                      >
                        <Terminal className="h-3.5 w-3.5 text-cyber-primary" />
                        <span>GITHUB REPOSITORY</span>
                      </a>
                    )}
                    {(project.liveDemo || project.slug === "bankguard-nexus") && (
                      <a
                        href={project.liveDemo || "https://bank-sentinel-ai.lovable.app"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1.5 px-4 py-2 border border-cyber-primary bg-cyber-primary/10 hover:bg-cyber-primary hover:text-black rounded-lg text-cyber-primary font-mono text-[10px] font-bold tracking-wider transition-all duration-300 shadow-cyber-glow"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>LIVE DEMO</span>
                      </a>
                    )}
                    {project.documentation && (
                      <a
                        href={project.documentation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] text-slate-500 hover:text-cyber-secondary transition-colors"
                      >
                        VIEW LAB LOGS &rarr;
                      </a>
                    )}
                  </div>
                </div>

                {/* Tech specifications side panel */}
                <div className="lg:col-span-2 border border-cyber-border bg-cyber-bg/30 rounded-xl p-5 space-y-4 font-mono text-xs">
                  <h4 className="font-bold text-slate-200 border-b border-cyber-border pb-2 flex items-center justify-between">
                    <span>LAB PARAMETERS</span>
                    <Shield className="h-4 w-4 text-cyber-primary" />
                  </h4>

                  <ul className="space-y-3 text-[11px] text-slate-400">
                    <li>
                      <span className="text-[9px] text-slate-500 block">ENVIRONMENT</span>
                      <span className="text-slate-300">{project.institution || "Controlled Sandbox"}</span>
                    </li>
                    <li>
                      <span className="text-[9px] text-slate-500 block">SECURITY CONCEPTS</span>
                      <span className="text-cyber-primary font-bold block">{project.securityAspects || "Vulnerability verification, API auditing"}</span>
                    </li>
                    <li>
                      <span className="text-[9px] text-slate-500 block">TESTED OUTCOMES</span>
                      <span className="text-slate-300">{project.results}</span>
                    </li>
                    <li>
                      <span className="text-[9px] text-slate-500 block">TECHNOLOGIES USED</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.technologies.map((t) => (
                          <span key={t} className="px-1.5 py-0.5 rounded border border-cyber-border bg-cyber-bg text-[8px] text-slate-400">
                            {t}
                          </span>
                        ))}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Hands-on Security Labs (TryHackMe/Splunk) */}
      <section className="space-y-8 pt-8 border-t border-cyber-border/30">
        <div className="space-y-3">
          <span className="font-mono text-xs text-cyber-primary tracking-widest block uppercase font-bold">
            [// ONLINE LEARNING VERIFICATION]
          </span>
          <h2 className="text-2xl font-bold font-mono tracking-wide text-slate-200 uppercase">
            HANDS-ON SECURITY LABS
          </h2>
          <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
            Ethical hacker modules completed across standard industry-testing platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {handsOnLabs.map((l, idx) => (
            <div key={idx} className="border border-cyber-border/80 bg-cyber-card/30 rounded-xl p-5 space-y-4 flex flex-col justify-between hover:border-cyber-primary/30 transition-colors">
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-cyber-secondary font-bold tracking-widest uppercase block">
                  {l.lab}
                </span>
                <h4 className="font-mono text-xs text-slate-200 font-bold uppercase leading-tight">
                  {l.concept}
                </h4>
                <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                  {l.learned}
                </p>
              </div>
              <div className="pt-2 border-t border-cyber-border/30 text-[8px] font-mono text-cyber-secondary flex items-center justify-between uppercase">
                <span>LAB COMPLETION: ACTIVE</span>
                <span className="flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-0.5 text-cyber-secondary" />
                  VERIFIED
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
