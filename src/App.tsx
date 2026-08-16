import { useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Research from "./pages/Research";
import Certifications from "./pages/Certifications";
import IdeasLab from "./pages/IdeasLab";
import AdminDashboard from "./pages/AdminDashboard";
import Cybersecurity from "./pages/Cybersecurity";
import CloudSecurity from "./pages/Cloud";

// Helper component to scroll to top on route change or handle hash offsets
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen relative z-10">
        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-grow pb-24 md:pb-32">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetails />} />
            <Route path="/cybersecurity" element={<Cybersecurity />} />
            <Route path="/cloud" element={<CloudSecurity />} />
            <Route path="/research" element={<Research />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/ideas" element={<IdeasLab />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* Fallback route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
