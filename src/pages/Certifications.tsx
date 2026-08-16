import { useState } from "react";
import {
  Award,
  Calendar,
  X,
  FileText,
  CheckCircle2,
  Download,
  ExternalLink,
} from "lucide-react";

export interface Certificate {
  title: string;
  organization: string;
  issueDate: string;
  project: string;
  type: string;
  image?: string;
  pdf?: string;
  verificationUrl?: string;
}

const certifications: Certificate[] = [
  {
    title: "Hacker Holidays",
    organization: "TryHackMe",
    issueDate: "15 Aug 2026",
    project: "Certificate of Participation",
    type: "Cybersecurity",
    pdf: "/certificates/hacker-holidays.pdf",
    verificationUrl: "",
  },
  {
    title: "Advent of Cyber 2025",
    organization: "TryHackMe",
    issueDate: "25 Jan 2026",
    project: "Completed 24 Cyber Security Challenges",
    type: "Cybersecurity",
    pdf: "/certificates/advent-of-cyber-2025.pdf",
    verificationUrl: "",
  },
  {
    title: "Love at First Breach - CTF",
    organization: "TryHackMe",
    issueDate: "24 Feb 2026",
    project: "600 Points • Scoreboard Rank 228 • Offensive Security & Problem Solving",
    type: "CTF",
    pdf: "/certificates/love-at-first-breach.pdf",
    verificationUrl: "",
  },
  {
    title: "Cybersecurity Fundamentals",
    organization: "IBM SkillsBuild",
    issueDate: "12 Feb 2026",
    project: "Cybersecurity Fundamentals",
    type: "Cybersecurity",
    pdf: "/certificates/ibm-cybersecurity-fundamentals.pdf",
    verificationUrl: "https://www.credly.com/badges/3b52f7a7-f5e1-4a74-b266-9d5169190310",
  },
  {
    title: "TCS iON Career Edge - Young Professional",
    organization: "TCS iON",
    issueDate: "22 Jul 2025",
    project: "Communication, Presentation, Career Guidance, Resume Writing, Interview Skills, IT & AI Fundamentals",
    type: "Professional Development",
    pdf: "/certificates/tcs-ion-career-edge.pdf",
    verificationUrl: "",
  },
  {
    title: "The Cold Start - CTF",
    organization: "TryHackMe",
    issueDate: "8 Jan 2026",
    project: "Offensive Security & Problem Solving • 2160 Points",
    type: "CTF",
    image: "/certificates/tryhackme_cold_start_ctf.png",
    verificationUrl: "",
  },
];

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const handleDownload = (cert: Certificate) => {
    if (!cert.pdf) return;
    const link = document.createElement("a");
    link.href = cert.pdf;
    link.download = cert.pdf.split("/").pop() || "certificate.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-28 md:pt-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Page Header */}
      <div className="space-y-2">
        <span className="font-mono text-xs text-cyber-primary tracking-widest block uppercase font-bold">
          [// CREDENTIALS INDEX]
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-mono tracking-wide text-slate-100 uppercase">
          CERTIFICATIONS & RECOGNITION
        </h1>
        <p className="text-sm text-slate-500 font-mono max-w-2xl">
          VERIFIED SECURITY CREDENTIALS // TRAINING // CTF // PROFESSIONAL DEVELOPMENT
        </p>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certifications.map((cert: Certificate, index: number) => (
          <div
            key={`${cert.title}-${index}`}
            onClick={() => setSelectedCert(cert)}
            className="border border-cyber-border bg-cyber-card/40 rounded-xl p-6 glass-panel-hover flex flex-col justify-between cursor-pointer select-none relative overflow-hidden shadow-md group"
          >
            {/* Glow Side Bar */}
            <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-cyber-primary" />

            <div className="space-y-4">
              {/* Certificate Preview */}
              {cert.pdf ? (
                <div className="w-full h-40 rounded-lg overflow-hidden border border-cyber-border/60 bg-slate-950/80 relative">
                  <iframe
                    src={`${cert.pdf}#toolbar=0&navpanes=0&scrollbar=0`}
                    title={`${cert.title} preview`}
                    className="w-full h-full pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-2 right-2 text-[9px] font-mono font-bold bg-slate-900/90 text-cyber-primary border border-cyber-primary/40 px-2 py-0.5 rounded">
                    VIEW CERTIFICATE 🔍
                  </span>
                </div>
              ) : cert.image ? (
                <div className="w-full h-40 rounded-lg overflow-hidden border border-cyber-border/60 bg-slate-950/80 relative">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2 right-2 text-[9px] font-mono font-bold bg-slate-900/90 text-cyber-primary border border-cyber-primary/40 px-2 py-0.5 rounded">
                    VIEW CERTIFICATE 🔍
                  </span>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-cyber-primary/10 border border-cyber-primary/20 text-cyber-primary w-fit">
                  <Award className="h-6 w-6" />
                </div>
              )}

              {/* Certificate Information */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-[9px] text-cyber-primary tracking-widest font-bold uppercase">
                    {cert.organization}
                  </span>
                  <span className="font-mono text-[9px] text-slate-500 flex items-center space-x-1 whitespace-nowrap">
                    <Calendar className="h-3 w-3" />
                    <span>{cert.issueDate}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold font-mono text-slate-200 uppercase leading-snug">
                  {cert.title}
                </h3>

                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  <strong className="text-slate-300 font-mono font-normal uppercase">
                    {cert.project}
                  </strong>
                </p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="pt-4 mt-4 border-t border-cyber-border/40 flex justify-between items-center text-[9px] font-mono text-slate-500 gap-3">
              <span className="px-1.5 py-0.5 border border-cyber-border rounded">
                {cert.type}
              </span>
              <span className="text-cyber-primary font-bold group-hover:translate-x-1 transition-transform whitespace-nowrap">
                CLICK TO INSPECT →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedCert(null);
          }}
        >
          <div className="border border-cyber-border bg-cyber-card/90 max-w-5xl w-full rounded-2xl p-5 md:p-8 relative shadow-cyber-glow flex flex-col space-y-6 max-h-[94vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              aria-label="Close certificate viewer"
              className="absolute top-4 right-4 z-20 p-2 border border-cyber-border rounded-lg bg-cyber-bg text-slate-400 hover:text-cyber-primary hover:border-cyber-primary/50 transition-all duration-300"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="flex flex-col space-y-1 pr-12">
              <span className="font-mono text-xs text-cyber-primary tracking-widest font-bold uppercase">
                {selectedCert.organization} // {selectedCert.type}
              </span>
              <h2 className="text-xl md:text-2xl font-bold font-mono text-slate-100 uppercase">
                {selectedCert.title}
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                ISSUED: {selectedCert.issueDate}
              </span>
            </div>

            {/* PDF / Image Viewer */}
            {selectedCert.pdf ? (
              <div className="border border-cyber-border rounded-xl overflow-hidden bg-slate-950/80 shadow-2xl">
                <iframe
                  src={`${selectedCert.pdf}#toolbar=1&navpanes=0`}
                  title={selectedCert.title}
                  className="w-full h-[55vh] md:h-[65vh]"
                />
              </div>
            ) : selectedCert.image ? (
              <div className="border border-cyber-border rounded-xl overflow-hidden bg-slate-950/80 shadow-2xl">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full max-h-[65vh] object-contain mx-auto"
                />
              </div>
            ) : (
              <div className="border-2 border-dashed border-cyber-border p-6 md:p-8 flex flex-col justify-between aspect-[1.4/1] bg-[#050505]/30 relative rounded-lg">
                <div className="absolute top-2 left-2 font-mono text-[8px] text-cyber-primary">
                  [SEC_CORE_ID: VERIFIED]
                </div>
                <div className="flex items-center justify-center space-x-2 text-cyber-primary">
                  <Award className="h-8 w-8 filter drop-shadow-[0_0_8px_rgba(255,51,51,0.4)]" />
                  <span className="font-mono text-sm tracking-widest font-bold">VERIFIED COMPLETION</span>
                </div>
                <div className="space-y-4 text-center">
                  <span className="font-mono text-[10px] text-slate-500 tracking-wider block uppercase">
                    THIS DOCUMENT OFFICIALLY CERTIFIES
                  </span>
                  <h2 className="text-2xl font-bold font-mono tracking-wide text-slate-100 uppercase">
                    MADHUKAR PENDALWAR
                  </h2>
                  <h3 className="text-sm font-mono font-bold text-cyber-primary uppercase tracking-widest bg-cyber-primary/5 border border-cyber-primary/20 py-2 rounded max-w-md mx-auto">
                    {selectedCert.title}
                  </h3>
                </div>
              </div>
            )}

            {/* Footer Actions */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-4 border-t border-cyber-border/40 text-xs font-mono">
              <div className="flex items-center space-x-2 text-cyber-secondary font-bold">
                <CheckCircle2 className="h-4 w-4" />
                <span>OFFICIALLY VERIFIED CREDENTIAL</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                {selectedCert.verificationUrl && selectedCert.verificationUrl.startsWith("http") && (
                  <a
                    href={selectedCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 px-4 py-2 border border-cyber-primary/60 bg-cyber-primary/10 text-cyber-primary rounded-lg hover:bg-cyber-primary/20 transition-all duration-300"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>VERIFY CREDENTIAL →</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}

                {selectedCert.pdf && (
                  <button
                    onClick={() => handleDownload(selectedCert)}
                    className="flex items-center space-x-1.5 px-4 py-2 border border-cyber-primary/60 bg-cyber-primary/10 text-cyber-primary rounded-lg hover:bg-cyber-primary/20 transition-all duration-300"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>DOWNLOAD PDF</span>
                  </button>
                )}

                {selectedCert.pdf && (
                  <a
                    href={selectedCert.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 px-4 py-2 border border-cyber-border hover:border-cyber-primary rounded-lg text-slate-300 hover:text-slate-100 transition-all duration-300"
                  >
                    <FileText className="h-3.5 w-3.5 text-cyber-primary" />
                    <span>OPEN FULL PDF</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
