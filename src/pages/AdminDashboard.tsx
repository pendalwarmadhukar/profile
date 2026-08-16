import { useState } from "react";
import { Shield, Key, Eye, EyeOff, Save, Download, RefreshCw, Plus, Trash2, CheckCircle } from "lucide-react";
import { getPortfolioData, savePortfolioData, resetPortfolioData } from "../utils/portfolioData";
import type { Project, Publication, Certificate, Idea } from "../utils/portfolioData";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<"projects" | "publications" | "certifications" | "ideas">("projects");
  const [portfolio, setPortfolio] = useState(getPortfolioData());

  const [saveSuccess, setSaveSuccess] = useState(false);

  // Password verification
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Use an environment variable VITE_ADMIN_PASSWORD or simple secure fallback
    const targetPassword = import.meta.env.VITE_ADMIN_PASSWORD || "madhukarsecure123";
    if (password === targetPassword) {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("INCORRECT SECURITY DECRYPT KEY. PERMISSION DENIED.");
    }
  };

  // Save changes locally
  const handleSaveLocal = () => {
    savePortfolioData(portfolio);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Export JSON file
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(portfolio, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "portfolio.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Reset to default JSON structure
  const handleResetDefaults = () => {
    if (window.confirm("Are you sure you want to reset all local changes to default file data?")) {
      resetPortfolioData();
      setPortfolio(getPortfolioData());
    }
  };

  // Deletions
  const handleDeleteProject = (slug: string) => {
    const updated = portfolio.projects.filter((p) => p.slug !== slug);
    setPortfolio({ ...portfolio, projects: updated });
  };

  const handleDeletePublication = (title: string) => {
    const updated = portfolio.publications.filter((p) => p.title !== title);
    setPortfolio({ ...portfolio, publications: updated });
  };

  const handleDeleteCertificate = (title: string) => {
    const updated = portfolio.certifications.filter((c) => c.title !== title);
    setPortfolio({ ...portfolio, certifications: updated });
  };

  const handleDeleteIdea = (title: string) => {
    const updated = portfolio.ideas.filter((i) => i.title !== title);
    setPortfolio({ ...portfolio, ideas: updated });
  };

  // Form helpers for adding new items (using prompts/basic states for robustness)
  const handleAddProject = () => {
    const title = window.prompt("Enter Project Title:");
    if (!title) return;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const desc = window.prompt("Enter Project Description:") || "";
    const category = window.prompt("Enter Category (e.g. Cybersecurity Research):") || "Cybersecurity Research";
    const year = window.prompt("Enter Year (e.g. 2025):") || "2025";
    
    const newProject: Project = {
      title,
      slug,
      category,
      type: window.prompt("Enter Project Type (e.g. Academic Cybersecurity Project):") || "Academic Cybersecurity Project",
      year,
      role: window.prompt("Enter Role:") || "",
      institution: window.prompt("Enter Institution:") || "",
      guide: window.prompt("Enter Guide Name:") || "",
      description: desc,
      problem: window.prompt("Enter Challenge Problem:") || "",
      solution: window.prompt("Enter Mitigation Solution:") || "",
      impact: window.prompt("Enter Impact details:") || "",
      technologies: (window.prompt("Enter Technologies (comma separated):") || "").split(",").map((s) => s.trim()).filter(Boolean),
      architecture: {
        steps: (window.prompt("Enter Architecture Steps (comma separated label:detail):") || "").split(",").map((s) => s.trim()).filter(Boolean)
      },
      results: window.prompt("Enter Test Results:") || "",
      futureScope: window.prompt("Enter Future Scope:") || "",
      github: window.prompt("Enter GitHub URL:") || "",
      liveDemo: window.prompt("Enter Live Demo URL:") || "",
      documentation: window.prompt("Enter Documentation URL:") || "",
      images: [],
      featured: true
    };

    setPortfolio({ ...portfolio, projects: [newProject, ...portfolio.projects] });
  };

  const handleAddPublication = () => {
    const title = window.prompt("Enter Publication Title:");
    if (!title) return;
    const newPub: Publication = {
      title,
      authors: window.prompt("Enter Authors:") || "Madhukar Pendalwar",
      venue: window.prompt("Enter Venue:") || "",
      year: window.prompt("Enter Year:") || "2026",
      status: window.prompt("Enter Status (e.g. Published / Under Review):") || "Under Review",
      doi: window.prompt("Enter DOI:") || "",
      ieeeUrl: window.prompt("Enter IEEE Xplore Link:") || "",
      pdf: "",
      abstract: window.prompt("Enter Abstract:") || "",
      keywords: window.prompt("Enter Keywords (comma separated):") || ""
    };
    setPortfolio({ ...portfolio, publications: [newPub, ...portfolio.publications] });
  };

  const handleAddCertificate = () => {
    const title = window.prompt("Enter Certificate Title:");
    if (!title) return;
    const newCert: Certificate = {
      title,
      organization: window.prompt("Enter Organization:") || "SVNAPRO",
      domain: window.prompt("Enter Domain:") || "Cyber Security",
      project: window.prompt("Enter Project verified:") || "",
      type: "Completion Certificate",
      issueDate: window.prompt("Enter Issue Date (e.g. 17/12/2025):") || "17/12/2025",
      image: "",
      verificationUrl: ""
    };
    setPortfolio({ ...portfolio, certifications: [newCert, ...portfolio.certifications] });
  };

  const handleAddIdea = () => {
    const title = window.prompt("Enter Idea Title:");
    if (!title) return;
    const newIdea: Idea = {
      title: title.toUpperCase(),
      problem: window.prompt("Enter Problem:") || "",
      concept: window.prompt("Enter Concept Solution:") || "",
      technology: window.prompt("Enter Tech Core:") || "",
      impact: window.prompt("Enter Potential Impact:") || "",
      status: "IDEA"
    };
    setPortfolio({ ...portfolio, ideas: [newIdea, ...portfolio.ideas] });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 max-w-md mx-auto px-4 flex items-center justify-center font-mono">
        <div className="border border-cyber-border rounded-2xl bg-cyber-card/60 p-6 md:p-8 w-full relative overflow-hidden shadow-cyber-glow">
          {/* Laser warning strip */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-cyber-primary shadow-cyber-glow"></div>

          <div className="flex flex-col items-center space-y-4 mb-6">
            <div className="p-3 rounded-full bg-cyber-primary/10 border border-cyber-primary/20 text-cyber-primary">
              <Shield className="h-8 w-8 filter drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]" />
            </div>
            <h2 className="text-sm font-bold tracking-widest text-slate-100 uppercase">
              DECRYPT ADMIN GATEWAY
            </h2>
            <p className="text-[10px] text-slate-500 text-center uppercase leading-relaxed">
              ACCESS STRICTLY CONSTRAINED TO SECURE ADMIN CONTROLS. INPUT DECRYPT KEY.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">
                System Decrypt Key
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Input Decrypt Code..."
                  className="w-full pl-3 pr-10 py-2 border border-cyber-border rounded-lg bg-cyber-bg text-slate-200 text-xs focus:outline-none focus:border-cyber-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="text-[9px] text-red-500 border border-red-900/30 bg-red-950/5 p-2 rounded text-center leading-normal">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-cyber-primary text-cyber-bg text-xs font-bold tracking-widest hover:bg-cyber-primary/95 transition-colors cursor-pointer"
            >
              <Key className="h-4 w-4" />
              <span>HANDSHAKE SECURE AUTH</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 md:pt-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-mono text-xs">
      
      {/* Console title row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-cyber-border/40 pb-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-cyber-secondary">
            <span className="h-2 w-2 rounded-full bg-cyber-secondary animate-pulse"></span>
            <span className="text-[10px] tracking-widest font-bold">ADMIN SECURE SESSION</span>
          </div>
          <h1 className="text-2xl font-bold tracking-wide text-slate-100 uppercase">
            PORTFOLIO CONTENT HUB
          </h1>
        </div>

        {/* Global actions */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleSaveLocal}
            className="flex items-center space-x-1.5 px-4 py-2 bg-cyber-secondary hover:bg-cyber-secondary/95 text-cyber-bg font-bold rounded-lg transition-colors cursor-pointer"
          >
            <Save className="h-4 w-4" />
            <span>SAVE LOCALSTORAGE</span>
          </button>
          <button
            onClick={handleExportJSON}
            className="flex items-center space-x-1.5 px-4 py-2 bg-cyber-primary hover:bg-cyber-primary/95 text-cyber-bg font-bold rounded-lg transition-colors cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>EXPORT PORTFOLIO.JSON</span>
          </button>
          <button
            onClick={handleResetDefaults}
            className="flex items-center space-x-1.5 px-4 py-2 border border-cyber-border hover:border-red-500 rounded-lg text-slate-400 hover:text-slate-100 transition-all cursor-pointer"
            title="Reset storage to code defaults"
          >
            <RefreshCw className="h-4 w-4" />
            <span>RESET</span>
          </button>
        </div>
      </div>

      {/* Save indicators */}
      {saveSuccess && (
        <div className="border border-cyber-secondary/30 bg-cyber-secondary/5 rounded-lg p-3 text-center text-cyber-secondary flex items-center justify-center space-x-1.5 font-bold tracking-wider">
          <CheckCircle className="h-4 w-4" />
          <span>LOCAL BROWSER STORAGE UPDATED. SAVE CONFIRMED.</span>
        </div>
      )}

      {/* Operations guide instructions */}
      <div className="border border-cyber-border bg-cyber-card/30 rounded-xl p-4 space-y-2 text-slate-400 leading-relaxed font-sans">
        <h4 className="font-mono text-xs text-slate-300 font-bold uppercase">Deployment Instructions:</h4>
        <ol className="list-decimal pl-4 space-y-1 text-[11px]">
          <li>Edit current sections below (Add items or Delete items).</li>
          <li>Click **"SAVE LOCALSTORAGE"** to reflect changes on your active local browser session instantly.</li>
          <li>Click **"EXPORT PORTFOLIO.JSON"** to download the updated static data config payload.</li>
          <li>Save this downloaded file in your code editor as <code className="text-cyber-primary">src/data/portfolio.json</code> and push updates to your GitHub repository to update your public portfolio site.</li>
        </ol>
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-cyber-border/40">
        {(["projects", "publications", "certifications", "ideas"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 border-b-2 font-bold tracking-widest uppercase transition-colors ${
              activeTab === tab ? "border-cyber-primary text-cyber-primary" : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="border border-cyber-border/50 bg-cyber-card/25 rounded-xl p-5">
        
        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-300">PROJECT NODES ({portfolio.projects.length})</span>
              <button
                onClick={handleAddProject}
                className="flex items-center space-x-1 px-3 py-1.5 rounded bg-cyber-primary/10 border border-cyber-primary text-cyber-primary text-[10px]"
              >
                <Plus className="h-4.5 w-4.5" />
                <span>ADD NEW BUILD</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-cyber-border text-slate-500 text-[10px]">
                    <th className="py-2.5">TITLE</th>
                    <th className="py-2.5">CATEGORY</th>
                    <th className="py-2.5">YEAR</th>
                    <th className="py-2.5">SLUG</th>
                    <th className="py-2.5 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyber-border/40">
                  {portfolio.projects.map((p) => (
                    <tr key={p.slug} className="hover:bg-cyber-card/10 text-slate-300">
                      <td className="py-3 font-bold">{p.title}</td>
                      <td className="py-3 text-slate-400">{p.category}</td>
                      <td className="py-3">{p.year}</td>
                      <td className="py-3 text-slate-500">{p.slug}</td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => handleDeleteProject(p.slug)}
                          className="p-1 border border-cyber-border hover:border-red-500 rounded text-slate-500 hover:text-red-400"
                          title="Delete Project"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Publications Tab */}
        {activeTab === "publications" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-300">PUBLICATIONS ({portfolio.publications.length})</span>
              <button
                onClick={handleAddPublication}
                className="flex items-center space-x-1 px-3 py-1.5 rounded bg-cyber-primary/10 border border-cyber-primary text-cyber-primary text-[10px]"
              >
                <Plus className="h-4.5 w-4.5" />
                <span>ADD PUBLICATION</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-cyber-border text-slate-500 text-[10px]">
                    <th className="py-2.5">PAPER TITLE</th>
                    <th className="py-2.5">STATUS</th>
                    <th className="py-2.5">YEAR</th>
                    <th className="py-2.5 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyber-border/40">
                  {portfolio.publications.map((pub) => (
                    <tr key={pub.title} className="hover:bg-cyber-card/10 text-slate-300">
                      <td className="py-3 font-bold truncate max-w-xs">{pub.title}</td>
                      <td className="py-3 text-cyber-primary">{pub.status}</td>
                      <td className="py-3">{pub.year}</td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => handleDeletePublication(pub.title)}
                          className="p-1 border border-cyber-border hover:border-red-500 rounded text-slate-500 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Certifications Tab */}
        {activeTab === "certifications" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-300">CERTIFICATIONS ({portfolio.certifications.length})</span>
              <button
                onClick={handleAddCertificate}
                className="flex items-center space-x-1 px-3 py-1.5 rounded bg-cyber-primary/10 border border-cyber-primary text-cyber-primary text-[10px]"
              >
                <Plus className="h-4.5 w-4.5" />
                <span>ADD CERTIFICATE</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-cyber-border text-slate-500 text-[10px]">
                    <th className="py-2.5">TITLE</th>
                    <th className="py-2.5">ISSUER</th>
                    <th className="py-2.5">DATE</th>
                    <th className="py-2.5 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyber-border/40">
                  {portfolio.certifications.map((c) => (
                    <tr key={c.title} className="hover:bg-cyber-card/10 text-slate-300">
                      <td className="py-3 font-bold truncate max-w-xs">{c.title}</td>
                      <td className="py-3 text-slate-400">{c.organization}</td>
                      <td className="py-3">{c.issueDate}</td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => handleDeleteCertificate(c.title)}
                          className="p-1 border border-cyber-border hover:border-red-500 rounded text-slate-500 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Ideas Tab */}
        {activeTab === "ideas" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-300">IDEAS & BLUEPRINTS ({portfolio.ideas.length})</span>
              <button
                onClick={handleAddIdea}
                className="flex items-center space-x-1 px-3 py-1.5 rounded bg-cyber-primary/10 border border-cyber-primary text-cyber-primary text-[10px]"
              >
                <Plus className="h-4.5 w-4.5" />
                <span>ADD NEW IDEA</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-cyber-border text-slate-500 text-[10px]">
                    <th className="py-2.5">TITLE</th>
                    <th className="py-2.5">STATUS</th>
                    <th className="py-2.5">IMPACT</th>
                    <th className="py-2.5 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyber-border/40">
                  {portfolio.ideas.map((i) => (
                    <tr key={i.title} className="hover:bg-cyber-card/10 text-slate-300">
                      <td className="py-3 font-bold uppercase">{i.title}</td>
                      <td className="py-3 text-cyber-primary">{i.status}</td>
                      <td className="py-3 text-slate-400">{i.impact}</td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => handleDeleteIdea(i.title)}
                          className="p-1 border border-cyber-border hover:border-red-500 rounded text-slate-500 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
