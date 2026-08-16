import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Globe, FileText, ShieldAlert, Cpu, ShieldCheck } from "lucide-react";
import { getPortfolioData } from "../utils/portfolioData";

// Custom SVG Github Icon
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { projects } = getPortfolioData();

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="pt-32 max-w-7xl mx-auto px-4 text-center font-mono text-xs">
        <div className="border border-cyber-border rounded-2xl bg-cyber-card/40 p-12 max-w-md mx-auto space-y-4">
          <ShieldAlert className="h-10 w-10 text-cyber-primary mx-auto animate-pulse" />
          <p className="text-slate-200 uppercase font-bold">Project Node Not Located</p>
          <p className="text-slate-500">The project hash requested does not exist in our static repository index.</p>
          <Link
            to="/projects"
            className="inline-block px-4 py-2 border border-cyber-border hover:border-cyber-primary rounded-lg text-cyber-primary transition-all duration-300"
          >
            RETURN TO DIRECTORY
          </Link>
        </div>
      </div>
    );
  }

  // Determine architecture diagram type based on slug
  const renderArchitectureDiagram = () => {
    const steps = project.architecture?.steps || [];
    if (steps.length === 0) return null;

    return (
      <div className="border border-cyber-border/80 bg-cyber-bg/40 rounded-xl p-5 space-y-4 relative overflow-hidden">
        <h4 className="font-mono text-xs text-slate-300 tracking-wider uppercase font-bold border-b border-cyber-border/40 pb-2.5 flex items-center justify-between">
          <span>SYSTEM ARCHITECTURE DIAGRAM</span>
          <Cpu className="h-4 w-4 text-cyber-primary" />
        </h4>

        {/* Dynamic visual step pipeline */}
        <div className="flex flex-col space-y-3 relative">
          {/* Vertical connecting laser lines */}
          <div className="absolute left-6 top-4 bottom-4 w-[1px] bg-gradient-to-b from-cyber-primary via-cyber-secondary to-cyber-accent opacity-30"></div>

          {steps.map((step, idx) => {
            const parts = step.split(":");
            const label = parts[0];
            const detail = parts[1] || "";
            return (
              <div key={idx} className="flex items-start space-x-3 pl-3 relative z-10 group">
                <div className="flex items-center justify-center h-6 w-6 rounded-full border border-cyber-primary bg-cyber-card font-mono text-[9px] font-bold text-cyber-primary shadow-cyber-glow group-hover:bg-cyber-primary group-hover:text-cyber-bg transition-colors duration-300 shrink-0">
                  {idx + 1}
                </div>
                <div className="space-y-0.5 pt-0.5">
                  <span className="font-mono text-[10px] text-slate-200 tracking-wide font-bold uppercase block leading-none">
                    {label}
                  </span>
                  {detail && (
                    <span className="text-[10px] text-slate-500 font-sans leading-normal block">
                      {detail.trim()}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 text-[8px] font-mono text-slate-600 text-right">
          INTEGRITY AUDITING // MODULES OPERATIONAL
        </div>
      </div>
    );
  };

  const isAcademicSecurity = project.category.toLowerCase().includes("security research") || project.slug === "webcam-snapshot-test" || project.slug === "web-application-security-research";

  return (
    <div className="pt-28 md:pt-36 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Back to Projects */}
      <button
        onClick={() => navigate("/projects")}
        className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-400 hover:text-cyber-primary transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        <span>BACK TO PROJECTS DIRECTORY</span>
      </button>

      {/* Hero header */}
      <div className="border border-cyber-border rounded-2xl bg-cyber-card/30 p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-cyber-glow">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-mono text-[9px] text-cyber-primary tracking-widest font-bold uppercase px-2 py-0.5 border border-cyber-primary/20 rounded bg-cyber-primary/5">
              {project.category}
            </span>
            <span className="px-2 py-0.5 rounded font-mono text-[9px] border border-cyber-border text-slate-400 bg-cyber-card/50">
              YEAR: {project.year}
            </span>
            {project.role && (
              <span className="px-2 py-0.5 rounded font-mono text-[9px] border border-cyber-border text-slate-400 bg-cyber-card/50">
                ROLE: {project.role}
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-mono tracking-wide text-slate-100 uppercase">
            {project.title}
          </h1>
          {project.institution && (
            <p className="text-[10px] sm:text-xs font-mono text-slate-500">
              INSTITUTION: {project.institution} {project.guide && `| GUIDE: ${project.guide}`}
            </p>
          )}
        </div>

        {/* Source links */}
        <div className="flex flex-wrap gap-3 shrink-0 w-full md:w-auto">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-cyber-border hover:border-cyber-primary bg-cyber-card/40 text-slate-300 hover:text-slate-100 font-mono text-[10px] tracking-wider transition-all duration-300"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span>SOURCE CODE</span>
            </a>
          )}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyber-primary hover:bg-cyber-primary/95 text-cyber-bg font-mono text-[10px] font-bold tracking-wider transition-all duration-300 shadow-cyber-glow"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>LIVE DEMO</span>
            </a>
          )}
          {project.documentation && (
            <a
              href={project.documentation}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-cyber-border hover:border-cyber-secondary bg-cyber-card/40 text-slate-300 hover:text-slate-100 font-mono text-[10px] tracking-wider transition-all duration-300"
            >
              <FileText className="h-3.5 w-3.5 text-cyber-secondary" />
              <span>DOCUMENTATION</span>
            </a>
          )}
        </div>
      </div>

      {/* Controlled Academic warning banner if security project */}
      {isAcademicSecurity && (
        <div className="border border-red-900/30 bg-red-950/10 rounded-xl p-4 flex items-start space-x-3 text-red-400 font-mono text-[10px] leading-relaxed">
          <ShieldAlert className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold uppercase text-red-300">⚠️ SECURITY RESEARCH DISCLOSURE & CODE OF ETHICS</span>
            <p>
              This project is purely for educational, academic, and defense research purposes. All vulnerabilities, permission bypasses, and threat actions were conducted strictly inside authorized virtual laboratory environments at Siddhartha Institute of Technology & Sciences. No unauthorized testing or scanning was executed on public systems.
            </p>
          </div>
        </div>
      )}

      {/* Main Grid content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs text-cyber-primary tracking-widest uppercase font-bold">
              [// PROJECT OVERVIEW]
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {project.description}
            </p>
          </div>

          {/* Problem / Solution split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-cyber-border/40">
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-red-400 tracking-wider block font-bold uppercase">
                THE CHALLENGE
              </span>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {project.problem}
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-cyber-secondary tracking-wider block font-bold uppercase">
                THE MITIGATION
              </span>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Red Team vs Blue Team / Security Hardening details if applicable */}
          {project.slug === "webcam-snapshot-test" && (
            <div className="border border-cyber-border rounded-xl bg-cyber-card/25 p-5 space-y-4">
              <h4 className="font-mono text-xs text-slate-200 font-bold tracking-wider uppercase border-b border-cyber-border/40 pb-2">
                RED TEAM VS BLUE TEAM EVALUATION
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                <div className="p-3.5 rounded-lg bg-red-950/5 border border-red-900/20 space-y-2">
                  <span className="font-mono text-[10px] text-red-400 font-bold uppercase block">
                    RED TEAM (Exploit Vector)
                  </span>
                  <ul className="space-y-1.5 list-disc pl-4 text-slate-400 text-[11px] leading-relaxed">
                    <li>Assessment of media API request scopes.</li>
                    <li>Hijacking permission caches via active background execution.</li>
                    <li>Controlled exfiltration tests via isolated network sockets.</li>
                  </ul>
                </div>
                <div className="p-3.5 rounded-lg bg-emerald-950/5 border border-emerald-900/20 space-y-2">
                  <span className="font-mono text-[10px] text-cyber-secondary font-bold uppercase block">
                    BLUE TEAM (Mitigation Audit)
                  </span>
                  <ul className="space-y-1.5 list-disc pl-4 text-slate-400 text-[11px] leading-relaxed">
                    <li>Strict Content-Security-Policy iframe headers.</li>
                    <li>Enforcement of feature-policy restrictions on hardware APIs.</li>
                    <li>Runtime audits of hardware activity indicators (LEDs).</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Results / Impact */}
          <div className="space-y-3 pt-6 border-t border-cyber-border/40">
            <h3 className="font-mono text-xs text-cyber-primary tracking-widest uppercase font-bold flex items-center space-x-1.5">
              <ShieldCheck className="h-4 w-4 text-cyber-secondary" />
              <span>TEST RESULTS & CLINICAL IMPACT</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {project.results}
            </p>
            <div className="p-4 rounded-lg bg-cyber-card/30 border border-cyber-border/60 text-xs font-sans leading-relaxed text-slate-300">
              <strong className="text-cyber-primary block font-mono text-[10px] mb-1 font-bold uppercase">
                Key Deliverables:
              </strong>
              {project.impact}
            </div>
          </div>
        </div>

        {/* Right column sidebar */}
        <div className="space-y-6">
          {/* Architecture diagram */}
          {renderArchitectureDiagram()}

          {/* Tech Stack Badge box */}
          <div className="border border-cyber-border bg-cyber-card/25 rounded-xl p-5 space-y-4">
            <h4 className="font-mono text-xs text-slate-300 font-bold tracking-wider uppercase border-b border-cyber-border/40 pb-2">
              TECHNOLOGY BUNDLE
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded font-mono text-[10px] tracking-wide border border-cyber-border bg-cyber-bg text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Future Scope */}
          <div className="border border-cyber-border bg-cyber-card/25 rounded-xl p-5 space-y-3">
            <h4 className="font-mono text-xs text-slate-300 font-bold tracking-wider uppercase border-b border-cyber-border/40 pb-2">
              FUTURE SYSTEM PATHWAYS
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {project.futureScope}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
