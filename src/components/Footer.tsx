import React from "react";
import { Link } from "react-router-dom";
import { Shield, Mail, ArrowUpRight, Terminal } from "lucide-react";

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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-cyber-border/40 bg-cyber-bg/50 pt-16 pb-8 relative overflow-hidden">
      {/* Glow dot */}
      <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] bg-cyber-primary/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={handleScrollToTop}>
              <Shield className="h-6 w-6 text-cyber-primary filter drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]" />
              <span className="font-mono text-sm tracking-widest text-slate-100 font-bold uppercase">
                MADHUKAR PENDALWAR
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm text-slate-400">
              Aspiring Cybersecurity & Cloud Security Engineer focused on secure software development, least-privilege architectures, and hands-on system auditing. Based in Hyderabad, India.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://github.com/pendalwarmadhukar"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-cyber-border/60 hover:border-cyber-primary/50 hover:text-cyber-primary rounded-lg bg-cyber-card/30 transition-all duration-300"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/madhukar-pendalwar-2a5746348/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-cyber-border/60 hover:border-cyber-primary/50 hover:text-cyber-primary rounded-lg bg-cyber-card/30 transition-all duration-300"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href="mailto:madhukarpendalwar@gmail.com"
                className="p-2 border border-cyber-border/60 hover:border-cyber-primary/50 hover:text-cyber-primary rounded-lg bg-cyber-card/30 transition-all duration-300"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Site Navigation */}
          <div>
            <h4 className="font-mono text-xs text-slate-100 tracking-wider mb-4 border-l-2 border-cyber-primary pl-2 uppercase font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 font-mono text-[11px] tracking-wider text-slate-400">
              <li>
                <Link to="/" className="hover:text-cyber-primary transition-colors duration-200">
                  HOME
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyber-primary transition-colors duration-200">
                  ABOUT
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-cyber-primary transition-colors duration-200">
                  PROJECTS
                </Link>
              </li>
              <li>
                <Link to="/cybersecurity" className="hover:text-cyber-primary transition-colors duration-200">
                  CYBERSECURITY
                </Link>
              </li>
              <li>
                <Link to="/cloud" className="hover:text-cyber-primary transition-colors duration-200">
                  CLOUD SECURITY
                </Link>
              </li>
              <li>
                <Link to="/research" className="hover:text-cyber-primary transition-colors duration-200">
                  RESEARCH
                </Link>
              </li>
              <li>
                <Link to="/certifications" className="hover:text-cyber-primary transition-colors duration-200">
                  CERTIFICATIONS
                </Link>
              </li>
              <li>
                <Link to="/ideas" className="hover:text-cyber-primary transition-colors duration-200">
                  IDEAS LAB
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Connect */}
          <div>
            <h4 className="font-mono text-xs text-slate-100 tracking-wider mb-4 border-l-2 border-cyber-secondary pl-2 uppercase font-semibold">
              Resources
            </h4>
            <ul className="space-y-2 font-mono text-[11px] tracking-wider text-slate-400">
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyber-primary flex items-center group transition-colors duration-200"
                >
                  DOWNLOAD RESUME
                  <ArrowUpRight className="h-3 w-3 ml-1 text-slate-500 group-hover:text-cyber-primary transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:madhukarpendalwar@gmail.com"
                  className="hover:text-cyber-primary flex items-center group transition-colors duration-200"
                >
                  GET IN TOUCH
                  <ArrowUpRight className="h-3 w-3 ml-1 text-slate-500 group-hover:text-cyber-primary transition-colors" />
                </a>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="text-slate-500 hover:text-cyber-primary flex items-center group transition-colors duration-200 mt-4 border-t border-cyber-border/30 pt-4"
                >
                  <Terminal className="h-3 w-3 mr-1" />
                  ADMIN PANEL
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="border-t border-cyber-border/30 pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] font-mono tracking-widest text-slate-500">
          <div>
            &copy; {currentYear} MADHUKAR PENDALWAR. ALL RIGHTS SECURED.
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <span className="text-cyber-secondary">●</span>
            <span className="text-slate-400">"BUILD SECURE. THINK DIFFERENT. KEEP LEARNING."</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
