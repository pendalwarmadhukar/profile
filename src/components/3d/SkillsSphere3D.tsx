import { useEffect, useRef } from "react";

interface Tag {
  text: string;
  x: number;
  y: number;
  z: number;
  color: string;
}

const skills = [
  // Programming
  { text: "C", color: "#94a3b8" },
  { text: "C++", color: "#00f0ff" },
  { text: "Java", color: "#94a3b8" },
  { text: "Python", color: "#ff3333" },
  { text: "JavaScript", color: "#00f0ff" },
  { text: "Node.js", color: "#ff3333" },
  // Frontend
  { text: "HTML5", color: "#94a3b8" },
  { text: "CSS3", color: "#00f0ff" },
  { text: "React", color: "#00f0ff" },
  { text: "Tailwind", color: "#94a3b8" },
  // Databases
  { text: "MongoDB", color: "#ff3333" },
  { text: "SQL", color: "#00f0ff" },
  { text: "NoSQL", color: "#94a3b8" },
  // Security
  { text: "Ethical Hacking", color: "#ff3333" },
  { text: "OWASP", color: "#ff3333" },
  { text: "Network Analysis", color: "#00f0ff" },
  { text: "Kali Linux", color: "#ff3333" },
  { text: "Vulnerability Assessment", color: "#00f0ff" },
  { text: "Wireshark", color: "#00f0ff" },
  { text: "Nmap", color: "#ff3333" },
  // Tools
  { text: "Git", color: "#94a3b8" },
  { text: "GitHub", color: "#ffffff" },
  { text: "VMware", color: "#00f0ff" },
  { text: "REST APIs", color: "#00f0ff" },
];

export default function SkillsSphere3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 500;
    let height = 500;

    const radius = 180;
    const dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      if (containerRef.current && canvas) {
        width = containerRef.current.clientWidth;
        height = Math.min(width, 500);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let tags: Tag[] = [];
    const initTags = () => {
      tags = [];
      const count = skills.length;
      for (let i = 0; i < count; i++) {
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        tags.push({
          text: skills[i].text,
          x,
          y,
          z,
          color: skills[i].color,
        });
      }
    };
    initTags();

    let angleX = 0.005;
    let angleY = 0.005;
    let targetAngleX = 0.005;
    let targetAngleY = 0.005;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left - width / 2;
      const clientY = e.clientY - rect.top - height / 2;
      
      targetAngleY = (clientX / (width / 2)) * 0.02;
      targetAngleX = -(clientY / (height / 2)) * 0.02;
    };

    const handleMouseLeave = () => {
      targetAngleX = 0.005;
      targetAngleY = 0.005;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      angleX += (targetAngleX - angleX) * 0.1;
      angleY += (targetAngleY - angleY) * 0.1;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const projected = tags.map((tag) => {
        const x1 = tag.x * cosY - tag.z * sinY;
        const z1 = tag.z * cosY + tag.x * sinY;

        const y2 = tag.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + tag.y * sinX;

        tag.x = x1;
        tag.y = y2;
        tag.z = z2;

        const depth = 350;
        const scale = depth / (depth - z2);
        const projX = x1 * scale + width / 2;
        const projY = y2 * scale + height / 2;

        return {
          tag,
          projX,
          projY,
          scale,
          z: z2,
        };
      });

      projected.sort((a, b) => a.z - b.z);

      projected.forEach(({ tag, projX, projY, scale }) => {
        const opacity = Math.max(0.15, Math.min(1, (tag.z + radius) / (2 * radius) + 0.15));
        const fontSize = Math.max(9, Math.min(22, 12 * scale));

        ctx.font = `bold ${fontSize}px Space Grotesk, Share Tech Mono, monospace`;
        
        if (tag.z > 0) {
          ctx.shadowColor = tag.color;
          ctx.shadowBlur = 8;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = tag.color;
        ctx.globalAlpha = opacity;
        
        ctx.fillText(tag.text, projX - ctx.measureText(tag.text).width / 2, projY);
      });

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div ref={containerRef} className="w-full max-w-[500px] aspect-square flex items-center justify-center relative cursor-grab active:cursor-grabbing">
        <div className="absolute inset-10 bg-cyber-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
        <canvas ref={canvasRef} className="z-10 block" />
      </div>
      <p className="font-mono text-[9px] tracking-widest text-slate-500 uppercase mt-2">
        💡 Drag or Hover mouse over sphere to orient
      </p>
    </div>
  );
}
