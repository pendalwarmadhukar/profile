import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Globe } from "lucide-react";
import { getPortfolioData } from "../utils/portfolioData";
import type { Project } from "../utils/portfolioData";

// Custom SVG Github Icon
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function Projects() {
  const { projects } = getPortfolioData();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");

  const categories = ["ALL", "CYBERSECURITY", "FULL-STACK", "RESEARCH"];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    let matchesCategory = true;
    if (activeCategory === "CYBERSECURITY") {
      matchesCategory = project.category.toLowerCase().includes("cybersecurity") || project.category.toLowerCase().includes("security");
    } else if (activeCategory === "FULL-STACK") {
      matchesCategory = project.category.toLowerCase().includes("full-stack") || project.category.toLowerCase().includes("web application");
    } else if (activeCategory === "RESEARCH") {
      matchesCategory = project.category.toLowerCase().includes("research");
    }

    return matchesSearch && matchesCategory;
  });

  const futureConcepts = [
    {
      title: "AI CYBERSECURITY ASSISTANT",
      category: "Concept",
      description: "Local threat parsing assistant designed to review repository config files and flag potential secret disclosures or default password breaches before pushing to clouds.",
      tech: "Python, PyTorch, Ollama"
    },
    {
      title: "CLOUD SECURITY PLATFORM",
      category: "Future Idea",
      description: "Serverless dashboard mapping live traffic patterns, generating AWS IAM policies based on minimal execution logs, preventing credential leaks.",
      tech: "React, Node, AWS SDK"
    },
    {
      title: "REAL-TIME THREAT DETECTION",
      category: "Research Direction",
      description: "Kernel driver analyzer tracking file system access hooks on Linux containers, alerting security admins when background code alters execution nodes.",
      tech: "C++, eBPF, Go"
    },
    {
      title: "ZERO TRUST DEVELOPER TOOLKIT",
      category: "Concept",
      description: "Local daemon orchestrating secure ephemeral developer environment credentials, avoiding long-term hardcoded SSH key dependencies.",
      tech: "Go, Docker API"
    }
  ];

  return (
    <div className="pt-28 md:pt-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <span className="font-mono text-xs text-cyber-primary tracking-widest block uppercase font-bold">
          [// PROJECT REPOSITORY]
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-mono tracking-wide text-slate-100 uppercase">
          THINGS I'VE BUILT
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Explore complete full-stack web applications, controlled academic cybersecurity threat modeling, and research builds demonstrating security-by-design principles.
        </p>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyber-border/40 pb-6">
        {/* Search */}
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search projects by title, description or technology..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-cyber-border rounded-lg bg-cyber-card/60 text-slate-300 font-sans text-xs focus:outline-none focus:border-cyber-primary transition-all duration-300"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg border font-mono text-[10px] tracking-widest transition-all duration-300 uppercase ${
                activeCategory === cat
                  ? "bg-cyber-primary/10 border-cyber-primary text-slate-100 shadow-cyber-glow"
                  : "bg-cyber-card/30 border-cyber-border/60 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project: Project) => (
          <div
            key={project.slug}
            className="border border-cyber-border bg-cyber-card/40 rounded-2xl overflow-hidden glass-panel-hover flex flex-col h-full shadow-md"
          >
            <div className="p-6 flex-grow space-y-4">
              <div className="flex items-start justify-between">
                <span className="font-mono text-[9px] text-cyber-primary tracking-widest font-bold uppercase px-2 py-0.5 border border-cyber-primary/20 rounded bg-cyber-primary/5">
                  {project.category}
                </span>
                <span className="font-mono text-[9px] text-slate-500 tracking-wider">
                  {project.year}
                </span>
              </div>

              <h3 className="text-xl font-bold font-mono tracking-wide text-slate-200 uppercase">
                {project.title}
              </h3>

              {project.institution && (
                <div className="flex flex-col text-[10px] font-mono text-slate-500 space-y-1">
                  <span>INSTITUTION: {project.institution}</span>
                  {project.guide && (
                    <span className="truncate">GUIDE: {project.guide.split("(")[0]}</span>
                  )}
                </div>
              )}

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 font-mono text-[8px] tracking-wider rounded border border-cyber-border bg-cyber-bg text-slate-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 bg-cyber-bg/30 border-t border-cyber-border/40 flex items-center justify-between mt-auto">
              <Link
                to={`/projects/${project.slug}`}
                className="font-mono text-[10px] tracking-wider font-bold text-slate-300 hover:text-cyber-primary flex items-center group transition-colors"
              >
                <span>EXPLORE TECHNICAL DETAILS</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex items-center space-x-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-cyber-primary transition-colors"
                    title="GitHub Repository"
                  >
                    <GithubIcon className="h-4.5 w-4.5" />
                  </a>
                )}
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-cyber-secondary transition-colors"
                    title="Live Demo"
                  >
                    <Globe className="h-4.5 w-4.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
        {filteredProjects.length === 0 && (
          <div className="col-span-2 text-center py-16 border border-dashed border-cyber-border rounded-2xl bg-cyber-card/10 font-mono text-xs text-slate-500">
            🔎 No projects matched the current filters. Try altering search parameters.
          </div>
        )}
      </div>

      {/* 2. FUTURE PROJECTS SECTION ("WHAT'S NEXT?") */}
      <section className="space-y-8 pt-12 border-t border-cyber-border/30">
        <div className="space-y-4">
          <span className="font-mono text-xs text-cyber-secondary tracking-widest block uppercase font-bold">
            [// FUTURE CONCEPTS]
          </span>
          <h2 className="text-2xl font-bold font-mono tracking-wide text-slate-200">
            WHAT'S NEXT?
          </h2>
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
            Hypotheses and future build routes exploring Zero-Trust architectures and automated client threat audits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {futureConcepts.map((c, i) => (
            <div
              key={i}
              className="border border-cyber-border/40 bg-cyber-card/20 rounded-xl p-5 space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] font-bold tracking-widest px-2 py-0.5 rounded border border-cyber-secondary/20 bg-cyber-secondary/5 text-cyber-secondary uppercase">
                  {c.category}
                </span>
                <span className="text-[8px] font-mono text-slate-600 font-bold">PENDING</span>
              </div>
              <h3 className="font-mono text-xs font-bold text-slate-200 tracking-wide">
                {c.title}
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                {c.description}
              </p>
              <div className="pt-2 border-t border-cyber-border/20 text-[8px] font-mono text-slate-600">
                PROPOSED SYSTEM: {c.tech}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
