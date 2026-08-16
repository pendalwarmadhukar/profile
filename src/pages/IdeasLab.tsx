import { useState } from "react";
import { Lightbulb, Send, X } from "lucide-react";
import { getPortfolioData, savePortfolioData } from "../utils/portfolioData";
import type { Idea } from "../utils/portfolioData";

export default function IdeasLab() {
  const { ideas } = getPortfolioData();
  const [ideaList, setIdeaList] = useState<Idea[]>(ideas);
  const [modalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState({ title: "", problem: "", concept: "", technology: "", impact: "" });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleShareIdea = (e: React.FormEvent) => {
    e.preventDefault();
    const newIdea: Idea = {
      title: formState.title.toUpperCase(),
      problem: formState.problem,
      concept: formState.concept,
      technology: formState.technology,
      impact: formState.impact,
      status: "IDEA"
    };

    const updated = [newIdea, ...ideaList];
    setIdeaList(updated);
    savePortfolioData({ ideas: updated });

    setSubmitSuccess(true);
    setFormState({ title: "", problem: "", concept: "", technology: "", impact: "" });
    setTimeout(() => {
      setSubmitSuccess(false);
      setModalOpen(false);
    }, 1500);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "border-emerald-500/30 bg-emerald-500/5 text-emerald-400";
      case "BUILDING":
        return "border-blue-500/30 bg-blue-500/5 text-blue-400";
      case "PROTOTYPE":
        return "border-yellow-500/30 bg-yellow-500/5 text-yellow-400";
      case "RESEARCH":
        return "border-purple-500/30 bg-purple-500/5 text-purple-400";
      default:
        return "border-cyber-primary/30 bg-cyber-primary/5 text-cyber-primary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "✅ COMPLETED";
      case "BUILDING":
        return "🚀 BUILDING";
      case "PROTOTYPE":
        return "⚙️ PROTOTYPE";
      case "RESEARCH":
        return "🔬 RESEARCH";
      default:
        return "💡 IDEA";
    }
  };

  return (
    <div className="pt-28 md:pt-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <span className="font-mono text-xs text-cyber-primary tracking-widest block uppercase font-bold">
            [// R&D BLUEPRINTS]
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-mono tracking-wide text-slate-100 uppercase">
            IDEAS LAB
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            Active concepts, security research blueprints, and future architectural experiments. This is where I draft models before launching full-scale codebases.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center space-x-2 px-5 py-3 rounded-lg bg-cyber-primary hover:bg-cyber-primary/90 text-cyber-bg font-mono text-xs font-bold tracking-widest transition-all duration-300 shadow-cyber-glow cursor-pointer shrink-0"
        >
          <Lightbulb className="h-4.5 w-4.5" />
          <span>SHARE AN IDEA</span>
        </button>
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {ideaList.map((idea: Idea, index) => (
          <div
            key={index}
            className="border border-cyber-border bg-cyber-card/40 rounded-xl p-6 flex flex-col justify-between h-full relative overflow-hidden shadow-md"
          >
            {/* Top row */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`font-mono text-[8px] font-bold tracking-widest px-2 py-0.5 border rounded uppercase ${getStatusBadgeColor(idea.status)}`}>
                  {getStatusIcon(idea.status)}
                </span>
                <span className="font-mono text-[9px] text-slate-500">EXPERIMENT NODE #{index + 1}</span>
              </div>

              <h3 className="text-base font-bold font-mono tracking-wide text-slate-200 uppercase leading-snug">
                {idea.title}
              </h3>

              <div className="space-y-3 font-sans text-xs">
                <p className="text-slate-400 leading-relaxed">
                  <strong className="text-slate-500 font-mono text-[9px] block uppercase mb-0.5">Problem Context:</strong>
                  {idea.problem}
                </p>
                <p className="text-slate-300 leading-relaxed">
                  <strong className="text-cyber-primary font-mono text-[9px] block uppercase mb-0.5">Proposed Idea:</strong>
                  {idea.concept}
                </p>
              </div>
            </div>

            {/* Bottom details */}
            <div className="mt-6 pt-4 border-t border-cyber-border/40 space-y-3 text-[10px] font-mono">
              <div className="flex justify-between text-slate-400">
                <span>IMPACT:</span>
                <span className="text-cyber-secondary font-bold uppercase">{idea.impact}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>TECH CORE:</span>
                <span className="text-slate-300 truncate max-w-[150px]">{idea.technology}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Share Idea Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-cyber-bg/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="border border-cyber-border bg-cyber-card max-w-lg w-full rounded-2xl p-6 relative shadow-cyber-glow flex flex-col space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-cyber-border/40 pb-4">
              <div className="flex items-center space-x-2 text-cyber-primary">
                <Lightbulb className="h-5 w-5" />
                <h3 className="font-mono text-sm tracking-widest uppercase font-bold text-slate-100">
                  SUBMIT R&D IDEA HANDSHAKE
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 border border-cyber-border rounded hover:border-cyber-primary/50 text-slate-400 hover:text-cyber-primary transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleShareIdea} className="space-y-4">
              <div className="space-y-1">
                <label className="font-mono text-[9px] text-slate-400 uppercase font-bold">Idea Title</label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  placeholder="e.g. Decentralized Credential Ledger"
                  className="w-full px-3 py-2 border border-cyber-border rounded-lg bg-cyber-bg text-slate-300 font-sans text-xs focus:outline-none focus:border-cyber-primary transition-all duration-300"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[9px] text-slate-400 uppercase font-bold">Problem Statement</label>
                <textarea
                  rows={2}
                  required
                  value={formState.problem}
                  onChange={(e) => setFormState({ ...formState, problem: e.target.value })}
                  placeholder="What is the core vulnerability or inefficiency?"
                  className="w-full px-3 py-2 border border-cyber-border rounded-lg bg-cyber-bg text-slate-300 font-sans text-xs focus:outline-none focus:border-cyber-primary transition-all duration-300"
                ></textarea>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[9px] text-slate-400 uppercase font-bold">Concept Solution</label>
                <textarea
                  rows={2}
                  required
                  value={formState.concept}
                  onChange={(e) => setFormState({ ...formState, concept: e.target.value })}
                  placeholder="Describe the architectural solution..."
                  className="w-full px-3 py-2 border border-cyber-border rounded-lg bg-cyber-bg text-slate-300 font-sans text-xs focus:outline-none focus:border-cyber-primary transition-all duration-300"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-[9px] text-slate-400 uppercase font-bold">Technology Core</label>
                  <input
                    type="text"
                    required
                    value={formState.technology}
                    onChange={(e) => setFormState({ ...formState, technology: e.target.value })}
                    placeholder="e.g. Go, Docker, IPFS"
                    className="w-full px-3 py-2 border border-cyber-border rounded-lg bg-cyber-bg text-slate-300 font-sans text-xs focus:outline-none focus:border-cyber-primary transition-all duration-300"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[9px] text-slate-400 uppercase font-bold">Potential Impact</label>
                  <input
                    type="text"
                    required
                    value={formState.impact}
                    onChange={(e) => setFormState({ ...formState, impact: e.target.value })}
                    placeholder="e.g. High security, Low latency"
                    className="w-full px-3 py-2 border border-cyber-border rounded-lg bg-cyber-bg text-slate-300 font-sans text-xs focus:outline-none focus:border-cyber-primary transition-all duration-300"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-lg bg-cyber-primary hover:bg-cyber-primary/90 text-cyber-bg font-mono text-xs font-bold tracking-widest transition-all duration-300 shadow-cyber-glow cursor-pointer"
              >
                <span>TRANSMIT IDEA TO LOCAL STORAGE</span>
                <Send className="h-3.5 w-3.5" />
              </button>

              {submitSuccess && (
                <div className="text-[10px] font-mono text-cyber-secondary border border-cyber-secondary/30 bg-cyber-secondary/5 rounded p-2 text-center">
                  ✔ IDEA TRANSMISSION COMPLETED. REFRESHING SYSTEM LOGS.
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
