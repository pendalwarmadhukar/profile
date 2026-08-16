import fallbackData from "../data/portfolio.json";

export interface Project {
  title: string;
  slug: string;
  category: string;
  type: string;
  year: string;
  role: string;
  institution: string;
  guide: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  technologies: string[];
  architecture?: {
    steps: string[];
  };
  results: string;
  futureScope: string;
  github: string;
  liveDemo: string;
  documentation: string;
  images: string[];
  videos?: string[];
  featured: boolean;
  securityAspects?: string;
}

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: string;
  status: string;
  doi: string;
  ieeeUrl: string;
  pdf: string;
  abstract: string;
  keywords: string;
}

export interface Certificate {
  title: string;
  organization: string;
  domain: string;
  project: string;
  type: string;
  issueDate: string;
  image: string;
  verificationUrl: string;
}

export interface Idea {
  title: string;
  problem: string;
  concept: string;
  technology: string;
  impact: string;
  status: "IDEA" | "RESEARCH" | "PROTOTYPE" | "BUILDING" | "COMPLETED";
  futureScope?: string;
}

export interface Experience {
  title: string;
  organization: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export function getPortfolioData() {
  const getOrInit = (key: string, defaultVal: any) => {
    const val = localStorage.getItem(key);
    if (!val) {
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    try {
      const parsed = JSON.parse(val);
      if (key === "portfolio_projects" && Array.isArray(parsed)) {
        const merged = parsed.map((p: any) => {
          const fallback = defaultVal.find((f: any) => f.slug === p.slug);
          if (fallback) {
            return {
              ...p,
              github: fallback.github || p.github,
              liveDemo: fallback.liveDemo || p.liveDemo,
            };
          }
          return p;
        });
        localStorage.setItem(key, JSON.stringify(merged));
        return merged;
      }
      return parsed;
    } catch {
      return defaultVal;
    }
  };

  return {
    projects: getOrInit("portfolio_projects", fallbackData.projects) as Project[],
    publications: getOrInit("portfolio_publications", fallbackData.publications) as Publication[],
    certifications: getOrInit("portfolio_certifications", fallbackData.certifications) as Certificate[],
    ideas: getOrInit("portfolio_ideas", fallbackData.ideas) as Idea[],
    experience: getOrInit("portfolio_experience", fallbackData.experience) as Experience[],
  };
}

export function savePortfolioData(data: {
  projects?: Project[];
  publications?: Publication[];
  certifications?: Certificate[];
  ideas?: Idea[];
  experience?: Experience[];
}) {
  if (data.projects) localStorage.setItem("portfolio_projects", JSON.stringify(data.projects));
  if (data.publications) localStorage.setItem("portfolio_publications", JSON.stringify(data.publications));
  if (data.certifications) localStorage.setItem("portfolio_certifications", JSON.stringify(data.certifications));
  if (data.ideas) localStorage.setItem("portfolio_ideas", JSON.stringify(data.ideas));
  if (data.experience) localStorage.setItem("portfolio_experience", JSON.stringify(data.experience));
}

export function resetPortfolioData() {
  localStorage.removeItem("portfolio_projects");
  localStorage.removeItem("portfolio_publications");
  localStorage.removeItem("portfolio_certifications");
  localStorage.removeItem("portfolio_ideas");
  localStorage.removeItem("portfolio_experience");
}
