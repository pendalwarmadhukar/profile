import { useState } from "react";
import { Search, ArrowRight, ExternalLink, Calendar } from "lucide-react";
import { getPortfolioData } from "../utils/portfolioData";
import type { Publication } from "../utils/portfolioData";

export default function Research() {
  const { publications } = getPortfolioData();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filters = ["ALL", "IEEE", "CYBERSECURITY", "AI", "WEB SECURITY", "CLOUD SECURITY", "NETWORK SECURITY"];

  const filteredPublications = publications.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.keywords.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesFilter = true;
    if (activeFilter !== "ALL") {
      const keyword = activeFilter.toLowerCase();
      matchesFilter =
        pub.keywords.toLowerCase().includes(keyword) ||
        pub.venue.toLowerCase().includes(keyword) ||
        pub.title.toLowerCase().includes(keyword);
    }

    return matchesSearch && matchesFilter;
  });

  const researchTimelines = [
    {
      area: "Web Application Security",
      topic: "Cross-Site Scripting (XSS) & Header Analysis",
      period: "2025 - Active",
      details: "Controlled attack-and-patch assessments inside virtualization nodes, testing input encoding parameters and HTTP CSP configurations."
    },
    {
      area: "Hardware API Privacy Protection",
      topic: "Webcam Access Indicators Auditing",
      period: "2025 - Active",
      details: "Analyzing browser permission retention tables and virtual driver communication hooks to prevent malicious background capture vectors."
    },
    {
      area: "Secure Full-Stack Architecture",
      topic: "Zero Trust Database Gateways",
      period: "2024 - Active",
      details: "Researching role-based encryption schemas and input validation sanitizers in healthcare software pipelines."
    }
  ];

  return (
    <div className="pt-28 md:pt-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Page Header */}
      <div className="space-y-4">
        <span className="font-mono text-xs text-cyber-primary tracking-widest block uppercase font-bold">
          [// SECURITY SCHOLARSHIP]
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-mono tracking-wide text-slate-100 uppercase">
          RESEARCH & SECURITY
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Exploring advanced cybersecurity concepts beyond the classroom. Review ongoing research timeline modules, attack-and-patch briefs, and scholarly manuscripts.
        </p>
      </div>

      {/* Research areas timeline */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold font-mono tracking-wide text-slate-200 uppercase border-l-2 border-cyber-primary pl-3">
          RESEARCH DIRECTIONS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {researchTimelines.map((timeline, idx) => (
            <div
              key={idx}
              className="border border-cyber-border bg-cyber-card/45 rounded-xl p-5 space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-cyber-primary font-bold">{timeline.area}</span>
                <span className="text-slate-500">{timeline.period}</span>
              </div>
              <h3 className="font-mono text-sm font-bold text-slate-200 tracking-wide uppercase leading-snug">
                {timeline.topic}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {timeline.details}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Publications Index Database */}
      <section className="space-y-8 pt-8 border-t border-cyber-border/30">
        <div className="space-y-3">
          <h2 className="text-xl font-bold font-mono tracking-wide text-slate-200 uppercase border-l-2 border-cyber-secondary pl-3">
            RESEARCH LIBRARY & PUBLICATIONS
          </h2>
          <p className="text-xs text-slate-400 max-w-xl">
            Audit manuscript details, IEEE submissions, and pre-print abstracts. Accurate review statuses are marked on each node.
          </p>
        </div>

        {/* Database control panel */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyber-border/40 pb-6">
          {/* Search bar */}
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by publication title, abstracts, keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-cyber-border rounded-lg bg-cyber-card/60 text-slate-300 font-sans text-xs focus:outline-none focus:border-cyber-primary transition-all duration-300"
            />
          </div>

          {/* Database filters */}
          <div className="flex flex-wrap gap-1.5">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1 rounded-lg border font-mono text-[9px] tracking-widest transition-all duration-300 uppercase ${
                  activeFilter === f
                    ? "bg-cyber-primary/10 border-cyber-primary text-slate-100 shadow-cyber-glow"
                    : "bg-cyber-card/30 border-cyber-border/60 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Publication card database list */}
        <div className="space-y-6">
          {filteredPublications.map((pub: Publication, index) => (
            <div
              key={index}
                className="border border-cyber-border bg-cyber-card/45 rounded-xl p-6 relative overflow-hidden space-y-4"
              >
                {/* Horizontal status light */}
                <div
                  className={`absolute top-0 left-0 w-full h-[2px] ${
                    pub.status === "Published" ? "bg-cyber-secondary" : pub.status === "Under Review" ? "bg-cyber-primary" : "bg-cyber-accent"
                  }`}
                ></div>

                <div className="flex flex-wrap gap-2.5 items-center justify-between">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span
                      className={`font-mono text-[8px] font-bold tracking-widest px-2 py-0.5 border rounded uppercase ${
                        pub.status === "Published"
                          ? "border-cyber-secondary/30 bg-cyber-secondary/5 text-cyber-secondary"
                          : pub.status === "Under Review"
                          ? "border-cyber-primary/30 bg-cyber-primary/5 text-cyber-primary"
                          : "border-cyber-accent/30 bg-cyber-accent/5 text-cyber-accent"
                      }`}
                    >
                      {pub.status === "Published" ? "PUBLISHED RESEARCH" : pub.status === "Under Review" ? "RESEARCH UNDER REVIEW" : "RESEARCH MANUSCRIPT"}
                    </span>
                    <span className="font-mono text-[8px] tracking-wider text-slate-500 uppercase px-2 py-0.5 border border-cyber-border rounded">
                      STATUS: {pub.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1.5 font-mono text-[9px] text-slate-500">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>YEAR: {pub.year}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold font-mono tracking-wide text-slate-200 leading-snug">
                    {pub.title}
                  </h3>
                  <p className="font-mono text-[10px] text-slate-400">
                    Authors: <span className="text-slate-300 font-bold">{pub.authors}</span>
                  </p>
                  <p className="font-mono text-[9px] text-slate-500 uppercase">
                    Venue: {pub.venue}
                  </p>
                </div>

                {/* Abstract details */}
                <div className="p-4 rounded-lg bg-cyber-bg/50 border border-cyber-border/40 font-sans text-xs text-slate-400 leading-relaxed">
                  <strong className="text-cyber-primary block font-mono text-[9px] mb-1 tracking-wider uppercase font-bold">
                    Abstract:
                  </strong>
                  {pub.abstract}
                </div>

                {/* Keywords */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {pub.keywords.split(",").map((kw) => (
                    <span
                      key={kw}
                      className="px-2 py-0.5 font-mono text-[8px] tracking-wider border border-cyber-border bg-cyber-bg text-slate-500 rounded"
                    >
                      {kw.trim().toUpperCase()}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-cyber-border/30 flex flex-wrap gap-4 text-[10px] font-mono font-bold">
                  {pub.pdf && (
                    <a
                      href={pub.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-cyber-primary flex items-center space-x-1 transition-colors"
                    >
                      <span>READ PAPER</span>
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  )}
                  {pub.ieeeUrl && (
                    <a
                      href={pub.ieeeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-cyber-primary flex items-center space-x-1 transition-colors"
                    >
                      <span>IEEE Xplore Link</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {pub.doi && (
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-cyber-primary flex items-center space-x-1 transition-colors"
                    >
                      <span>DOI: {pub.doi}</span>
                    </a>
                  )}
                  {!pub.doi && !pub.ieeeUrl && !pub.pdf && (
                    <span className="text-slate-600 font-normal italic">
                      No publication links available (Controlled internal draft or pending review index)
                    </span>
                  )}
                </div>
              </div>
            ))}
          {filteredPublications.length === 0 && (
            <div className="text-center py-12 border border-dashed border-cyber-border rounded-xl bg-cyber-card/10 font-mono text-xs text-slate-500">
              🔎 No publications found matching the query.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
