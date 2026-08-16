import { CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";
import { getPortfolioData } from "../utils/portfolioData";

export default function ExperiencePage() {
  const { experience } = getPortfolioData();

  // Custom placeholder items for the future section
  const futureItems = [
    {
      title: "Cybersecurity Analyst Intern",
      organization: "Target Security firm",
      period: "Future Placement",
      description: "Proposed internship mapping and executing automated vulnerability tests on REST APIs and auditing cloud access keys.",
      highlights: ["API security validation testing", "Cloud audit logging ingestion", "Least-privilege policy creation"],
      type: "CYBERSEC"
    },
    {
      title: "Cloud DevSecOps Engineer",
      organization: "Cloud Security Solutions",
      period: "Future Placement",
      description: "Proposed internship deploying CI/CD secure pipeline hooks with automated SAST scanners and KMS key rotations.",
      highlights: ["SAST pre-commit hook scripts", "Serverless lambda scans", "Multi-region recovery setup"],
      type: "CLOUDSEC"
    }
  ];

  return (
    <div className="pt-28 md:pt-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <span className="font-mono text-xs text-cyber-primary tracking-widest block uppercase font-bold">
          [// CAREER TIMELINE]
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-mono tracking-wide text-slate-100 uppercase">
          PROFESSIONAL EXPERIENCE
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Horizontal career timeline. Explore completed developer internship logs and proposed future cybersecurity specialization directions below.
        </p>
      </div>

      {/* HORIZONTAL TIMELINE CONTAINER */}
      <div className="relative py-10 overflow-x-auto no-scrollbar">
        {/* Horizontal glowing line across track */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-cyber-primary via-cyber-secondary to-cyber-border translate-y-[-1px] z-0 min-w-[1000px]"></div>

        <div className="flex space-x-8 min-w-[1000px] pb-6 relative z-10">
          
          {/* Node 1: Web Development Intern */}
          {experience.map((exp, idx) => (
            <div 
              key={idx} 
              className="w-[320px] shrink-0 border border-cyber-border bg-cyber-card p-6 rounded-2xl relative shadow-cyber-glow flex flex-col justify-between"
            >
              {/* Pulsing timeline connector dot */}
              <div className="absolute top-1/2 left-1/2 h-5 w-5 rounded-full border-2 border-cyber-primary bg-cyber-bg translate-x-[-10px] translate-y-[-162px] z-20 flex items-center justify-center">
                <span className="h-2 w-2 rounded-full bg-cyber-primary animate-ping"></span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-cyber-primary font-bold uppercase tracking-wider">{exp.organization}</span>
                  <span className="text-slate-500">{exp.period}</span>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-slate-500 block">ROLE CODE</span>
                  <h3 className="text-base font-bold font-mono text-slate-200 uppercase leading-snug">{exp.title}</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-sans min-h-[50px]">{exp.description}</p>
                
                <ul className="space-y-1.5 font-sans text-[11px] text-slate-400">
                  {exp.highlights.slice(0, 3).map((h, i) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-cyber-secondary shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 mt-6 border-t border-cyber-border/40 flex flex-wrap gap-1">
                {exp.technologies.map(tech => (
                  <span key={tech} className="px-1.5 py-0.5 border border-cyber-border bg-cyber-bg rounded text-[8px] font-mono text-slate-400">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Node 2: Proposed / Future placements */}
          {futureItems.map((item, idx) => (
            <div 
              key={idx} 
              className="w-[320px] shrink-0 border border-cyber-border bg-cyber-card/40 p-6 rounded-2xl relative flex flex-col justify-between opacity-80 hover:opacity-100 hover:border-cyber-secondary/40 transition-all"
            >
              {/* Timeline connector dot */}
              <div className="absolute top-1/2 left-1/2 h-5 w-5 rounded-full border-2 border-cyber-secondary bg-cyber-bg translate-x-[-10px] translate-y-[-162px] z-20 flex items-center justify-center">
                <span className="h-2 w-2 rounded-full bg-cyber-secondary"></span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-cyber-secondary font-bold uppercase tracking-wider">{item.organization}</span>
                  <span className="text-slate-500 uppercase">{item.period}</span>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-slate-500 block">PROPOSED PLACEMENT</span>
                  <h3 className="text-base font-bold font-mono text-slate-300 uppercase leading-snug">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-sans min-h-[50px]">{item.description}</p>
                
                <ul className="space-y-1.5 font-sans text-[11px] text-slate-500">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <ChevronRight className="h-3.5 w-3.5 text-cyber-secondary shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 mt-6 border-t border-cyber-border/40 text-[9px] font-mono text-slate-600 text-center tracking-widest uppercase">
                [ LAB TARGET DIRECTION ]
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2 bg-cyber-border/30 rounded-lg p-3.5 border border-cyber-border/40 text-[10px] font-mono text-slate-400 max-w-xl">
        <HelpCircle className="h-4.5 w-4.5 text-cyber-primary shrink-0" />
        <span>Scroll horizontally on the timeline track above to audit completed and proposed placement nodes.</span>
      </div>
    </div>
  );
}
