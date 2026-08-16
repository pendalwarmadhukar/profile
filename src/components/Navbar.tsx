import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "PROJECTS", path: "/projects" },
    { name: "CYBERSECURITY", path: "/cybersecurity" },
    { name: "CLOUD", path: "/cloud" },
    { name: "RESEARCH", path: "/research" },
    { name: "CERTIFICATIONS", path: "/certifications" },
    { name: "IDEAS LAB", path: "/ideas" }
  ];

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      window.location.href = "/#contact";
    } else {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        scrolled ? "py-3 bg-cyber-bg/85 backdrop-blur-md border-b border-cyber-border/40" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Shield className="h-8 w-8 text-cyber-primary group-hover:text-cyber-secondary transition-colors duration-300 filter drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
              <div className="absolute inset-0 h-8 w-8 bg-cyber-primary/20 blur-sm rounded-full scale-75 group-hover:scale-110 transition-transform duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-sm tracking-widest text-slate-100 font-bold leading-none">
                MP
              </span>
              <span className="font-mono text-[9px] tracking-wider text-cyber-primary group-hover:text-cyber-secondary transition-colors duration-300 leading-none mt-1">
                MADHUKAR PENDALWAR
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3 py-2 font-mono text-[10px] tracking-widest transition-colors duration-300 ${
                    isActive ? "text-cyber-primary font-semibold" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-cyber-primary filter drop-shadow-[0_0_4px_rgba(6,182,212,0.7)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            <a
              href="#contact"
              onClick={handleContactClick}
              className="px-3 py-2 font-mono text-[10px] tracking-widest text-slate-400 hover:text-slate-200 transition-colors duration-300"
            >
              CONTACT
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="https://github.com/pendalwarmadhukar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-cyber-primary hover:shadow-cyber-glow/10 hover:border-cyber-primary/30 border border-transparent rounded-lg transition-all duration-300"
              title="GitHub Profile"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/madhukar-pendalwar-2a5746348/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-cyber-primary hover:shadow-cyber-glow/10 hover:border-cyber-primary/30 border border-transparent rounded-lg transition-all duration-300"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Madhukar_Pendalwar_Resume.pdf"
              className="flex items-center space-x-2 px-3 py-1.5 border border-cyber-border rounded-lg bg-cyber-card/50 hover:bg-cyber-primary/10 hover:border-cyber-primary/50 text-slate-300 hover:text-slate-100 font-mono text-[9px] tracking-widest transition-all duration-300"
            >
              <FileText className="h-3.5 w-3.5 text-cyber-primary" />
              <span>RESUME</span>
            </a>
            <a
              href="#contact"
              onClick={handleContactClick}
              className="relative group overflow-hidden px-3 py-1.5 rounded-lg bg-cyber-primary hover:bg-cyber-primary/95 text-cyber-bg font-mono text-[9px] font-bold tracking-widest transition-all duration-300 shadow-cyber-glow"
            >
              <span>CONNECT</span>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center space-x-2">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-2 border border-cyber-border rounded-lg bg-cyber-card/50 text-slate-300 font-mono text-[10px]"
            >
              <FileText className="h-3.5 w-3.5 text-cyber-primary" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-cyber-border rounded-lg bg-cyber-card/50 text-slate-300 hover:text-cyber-primary hover:border-cyber-primary/50 transition-all duration-300"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden w-full bg-cyber-card border-b border-cyber-border/80 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3 py-2.5 rounded-lg font-mono text-xs tracking-wider border-l-2 transition-all duration-300 ${
                      isActive
                        ? "bg-cyber-primary/10 border-cyber-primary text-slate-100"
                        : "border-transparent text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <a
                href="#contact"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleContactClick(e);
                }}
                className="px-3 py-2.5 rounded-lg font-mono text-xs tracking-wider border-l-2 border-transparent text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
              >
                CONTACT
              </a>
              <div className="pt-4 border-t border-cyber-border/40 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <a
                    href="https://github.com/pendalwarmadhukar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-cyber-border rounded-lg bg-cyber-bg/50 text-slate-400"
                  >
                    <GithubIcon className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/madhukar-pendalwar-2a5746348/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-cyber-border rounded-lg bg-cyber-bg/50 text-slate-400"
                  >
                    <LinkedinIcon className="h-4 w-4" />
                  </a>
                </div>
                <a
                  href="#contact"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleContactClick(e);
                  }}
                  className="px-5 py-2.5 rounded-lg bg-cyber-primary text-cyber-bg font-mono text-xs font-bold tracking-widest shadow-cyber-glow"
                >
                  LET'S CONNECT
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
