import React, { useEffect, useRef, useState } from "react";
import { Shield, Network, Cloud, Globe, Database, Terminal, Brain, Cpu, HelpCircle } from "lucide-react";

interface Node {
  id: string;
  name: string;
  x: number; // base 3D coordinates
  y: number;
  z: number;
  icon: React.ReactNode;
  color: string;
  details: string[];
  angle: number; // current orbital angle
  speed: number;
  radius: number; // orbital radius
}

export default function CyberCore3D({ standaloneCanvas = false }: { standaloneCanvas?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>("CLOUD");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodes: Node[] = [
    {
      id: "LINUX",
      name: "LINUX SYSTEMS",
      x: 0, y: 0, z: 0,
      icon: <Terminal className="h-5 w-5" />,
      color: "#00f0ff", // Cyan
      details: [
        "File system permissions management & user privilege levels",
        "Shell command-line operations and automation scripting",
        "Log analysis auditing & process monitoring checks"
      ],
      angle: 0,
      speed: 0.002,
      radius: 170
    },
    {
      id: "NETWORK",
      name: "NETWORK SECURITY",
      x: 0, y: 0, z: 0,
      icon: <Network className="h-5 w-5" />,
      color: "#ff3333", // Red
      details: [
        "Packet capture analyses via Wireshark and traffic tracing",
        "Intrusion signatures checking and ports scanning (Nmap)",
        "Secure socket layer (SSL/TLS) certificate handshakes"
      ],
      angle: (2 * Math.PI) / 7,
      speed: 0.0018,
      radius: 155
    },
    {
      id: "WEB",
      name: "WEB APPLICATION",
      x: 0, y: 0, z: 0,
      icon: <Globe className="h-5 w-5" />,
      color: "#00f0ff", // Cyan
      details: [
        "OWASP Top 10 vulnerability tracking and defensive patching",
        "Reflected / Stored / DOM-based XSS payload sanitization",
        "Secure auth structures implementing cookies & session management"
      ],
      angle: (4 * Math.PI) / 7,
      speed: 0.0022,
      radius: 160
    },
    {
      id: "CLOUD",
      name: "CLOUD SECURITY",
      x: 0, y: 0, z: 0,
      icon: <Cloud className="h-5 w-5" />,
      color: "#ff3333", // Red
      details: [
        "AWS Identity & Access Management (IAM) permissions audits",
        "AWS S3 bucket security policies and block-public configurations",
        "AWS KMS customer-managed key parameters and data encryption"
      ],
      angle: (6 * Math.PI) / 7,
      speed: 0.0015,
      radius: 175
    },
    {
      id: "AI",
      name: "AI & SECURITY",
      x: 0, y: 0, z: 0,
      icon: <Brain className="h-5 w-5" />,
      color: "#00f0ff", // Cyan
      details: [
        "Anomaly log analysis patterns using local parsers",
        "Audit check scripting automation via lightweight script modules",
        "Security configuration file verification logic templates"
      ],
      angle: (8 * Math.PI) / 7,
      speed: 0.0025,
      radius: 165
    },
    {
      id: "APPLICATION",
      name: "APPLICATION CODE",
      x: 0, y: 0, z: 0,
      icon: <Cpu className="h-5 w-5" />,
      color: "#ff3333", // Red
      details: [
        "Secure coding standards preventing buffer/input vulnerabilities",
        "API parameter checks and strict validation gateways",
        "Role-based Access Controls (RBAC) separating administrative access"
      ],
      angle: (10 * Math.PI) / 7,
      speed: 0.0019,
      radius: 150
    },
    {
      id: "DATABASE",
      name: "DATABASE SECURITY",
      x: 0, y: 0, z: 0,
      icon: <Database className="h-5 w-5" />,
      color: "#00f0ff", // Cyan
      details: [
        "AES-256 field encryption setups for storage data at rest",
        "Sanitized parameter queries blocking SQL injection attempts",
        "Access credential security separating server privilege channels"
      ],
      angle: (12 * Math.PI) / 7,
      speed: 0.0021,
      radius: 170
    }
  ];

  const nodeScreenPositions = useRef<{ [id: string]: { x: number; y: number; r: number; color: string } }>({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 600;
    let height = 500;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
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
    resize();
    window.addEventListener("resize", resize);

    // Orbital parameters
    let inclination = 0.45;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left - width / 2) * 0.05;
      targetMouseY = (e.clientY - rect.top - height / 2) * 0.05;

      // Collision detection for hover state
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      let matchedNode: string | null = null;

      Object.entries(nodeScreenPositions.current).forEach(([id, pos]) => {
        const dist = Math.hypot(x - pos.x, y - pos.y);
        if (dist < pos.r + 5) {
          matchedNode = id;
        }
      });
      setHoveredNode(matchedNode);
    };

    const handleMouseLeave = () => {
      targetMouseX = 0;
      targetMouseY = 0;
      setHoveredNode(null);
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      Object.entries(nodeScreenPositions.current).forEach(([id, pos]) => {
        const dist = Math.hypot(x - pos.x, y - pos.y);
        if (dist < pos.r + 8) {
          setSelectedNode(id);
        }
      });
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);

    // Particle flow data
    const particles: Array<{ angle: number; speed: number; radius: number; size: number; color: string }> = Array.from({ length: 45 }).map((_, i) => ({
      angle: Math.random() * Math.PI * 2,
      speed: 0.004 + Math.random() * 0.006,
      radius: 80 + Math.random() * 110,
      size: 1 + Math.random() * 2,
      color: i % 2 === 0 ? "#ff3333" : "#00f0ff"
    }));

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse movements
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      const centerX = width / 2 + mouseX;
      const centerY = height / 2 + mouseY;

      // 1. Draw glowing cybersecurity shield center background
      ctx.save();
      const shieldGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 80);
      shieldGlow.addColorStop(0, "rgba(255, 51, 51, 0.15)");
      shieldGlow.addColorStop(0.5, "rgba(0, 240, 255, 0.04)");
      shieldGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = shieldGlow;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // 2. Draw central shield target circles (radar lines)
      ctx.strokeStyle = "rgba(255, 51, 51, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(0, 240, 255, 0.05)";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 95, 0, Math.PI * 2);
      ctx.stroke();

      // 3. Draw moving network traffic particles
      particles.forEach((p) => {
        p.angle += p.speed;
        
        // 3D projection on inclined plane
        const x3d = p.radius * Math.cos(p.angle);
        const y3d = p.radius * Math.sin(p.angle) * inclination;
        const z3d = p.radius * Math.sin(p.angle) * Math.sin(inclination);

        const px = centerX + x3d;
        const py = centerY + y3d;
        const opacity = Math.max(0.1, (z3d + p.radius) / (2 * p.radius));

        ctx.fillStyle = p.color;
        ctx.globalAlpha = opacity * 0.5;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;

      // 4. Calculate node positions
      const activePositions: Array<{ id: string; x: number; y: number; z: number; color: string; name: string }> = [];

      nodes.forEach((n) => {
        n.angle += n.speed;

        // 3D Coordinate generation
        const x3d = n.radius * Math.cos(n.angle);
        const y3d = n.radius * Math.sin(n.angle) * inclination;
        const z3d = n.radius * Math.sin(n.angle) * Math.sin(inclination);

        const px = centerX + x3d;
        const py = centerY + y3d;

        activePositions.push({
          id: n.id,
          x: px,
          y: py,
          z: z3d,
          color: n.color,
          name: n.name
        });
      });

      // Animate connections between adjacent nodes in the orbit
      ctx.lineWidth = 1;
      for (let i = 0; i < activePositions.length; i++) {
        const nodeA = activePositions[i];
        const nodeB = activePositions[(i + 1) % activePositions.length];
        
        // Gradient connection line
        const grad = ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
        grad.addColorStop(0, `${nodeA.color}25`);
        grad.addColorStop(1, `${nodeB.color}25`);
        
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(nodeA.x, nodeA.y);
        ctx.lineTo(nodeB.x, nodeB.y);
        ctx.stroke();
      }

      // Sort by depth
      activePositions.sort((a, b) => a.z - b.z);

      activePositions.forEach((pos) => {
        // Draw connection lines to central core (subtle opacity)
        const opacity = Math.max(0.1, (pos.z + 180) / 360);
        ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.2})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();

        // Draw node circles
        const isHovered = hoveredNode === pos.id;
        const isSelected = selectedNode === pos.id;
        const r = isSelected ? 16 : isHovered ? 14 : 12;

        // Save screen positions for interaction
        nodeScreenPositions.current[pos.id] = { x: pos.x, y: pos.y, r, color: pos.color };

        // Outer glow
        ctx.save();
        ctx.shadowColor = pos.color;
        ctx.shadowBlur = isSelected ? 15 : isHovered ? 10 : 4;
        ctx.fillStyle = isSelected ? pos.color : "rgba(12, 13, 18, 0.9)";
        ctx.strokeStyle = pos.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Inner marker dot
        ctx.fillStyle = isSelected ? "#050508" : pos.color;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Node text label
        ctx.font = "bold 9px Space Grotesk, Share Tech Mono, monospace";
        ctx.fillStyle = isSelected ? "#f8fafc" : "#94a3b8";
        ctx.fillText(pos.id, pos.x - ctx.measureText(pos.id).width / 2, pos.y - r - 6);
      });

      // 5. Draw central core emblem
      ctx.save();
      ctx.shadowColor = "#ff3333";
      ctx.shadowBlur = 15;
      ctx.fillStyle = "#0a0a0a";
      ctx.strokeStyle = "#ff3333";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Inner glowing core
      ctx.fillStyle = "#ff3333";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
        canvas.removeEventListener("click", handleClick);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [hoveredNode, selectedNode]);

  const activeNodeInfo = nodes.find((n) => n.id === selectedNode) || nodes[0];

  const getNodeIcon = (nodeId: string) => {
    switch (nodeId) {
      case "LINUX": return <Terminal className="h-5 w-5" />;
      case "NETWORK": return <Network className="h-5 w-5" />;
      case "WEB": return <Globe className="h-5 w-5" />;
      case "CLOUD": return <Cloud className="h-5 w-5" />;
      case "AI": return <Brain className="h-5 w-5" />;
      case "APPLICATION": return <Cpu className="h-5 w-5" />;
      case "DATABASE": return <Database className="h-5 w-5" />;
      default: return <Shield className="h-5 w-5" />;
    }
  };

  if (standaloneCanvas) {
    return (
      <div ref={containerRef} className="flex justify-center items-center relative aspect-square w-full select-none">
        <canvas ref={canvasRef} className="z-10 block rounded-full" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <Shield className="h-8 w-8 text-cyber-primary pulse-node filter drop-shadow-[0_0_10px_rgba(255,51,51,0.6)]" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center py-6">
      {/* 3D Orbit Canvas Column */}
      <div ref={containerRef} className="lg:col-span-3 flex justify-center items-center relative aspect-square w-full max-w-[500px] mx-auto select-none">
        <canvas ref={canvasRef} className="z-10 block rounded-full" />
        
        {/* Core Shield overlay icon inside canvas center for depth */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <Shield className="h-6 w-6 text-cyber-primary pulse-node" />
        </div>
      </div>

      {/* Info Details Panel Column */}
      <div className="lg:col-span-2 space-y-4">
        <span className="font-mono text-[10px] text-cyber-primary tracking-widest block uppercase font-bold">
          [// Security Core Nodes Log]
        </span>
        <div className="border border-cyber-border/80 bg-cyber-card/85 backdrop-blur-sm rounded-xl p-6 relative overflow-hidden shadow-cyber-glow">
          {/* Neon indicator border based on node color */}
          <div
            className="absolute top-0 left-0 w-full h-[3px]"
            style={{ backgroundColor: activeNodeInfo.color, boxShadow: `0 0 10px ${activeNodeInfo.color}` }}
          ></div>

          <div className="flex items-center space-x-3 mb-4">
            <div
              className="p-2.5 rounded-lg text-slate-100"
              style={{ backgroundColor: `${activeNodeInfo.color}20` }}
            >
              {getNodeIcon(activeNodeInfo.id)}
            </div>
            <div>
              <h3 className="text-lg font-bold font-mono tracking-wide text-slate-200 uppercase mt-0.5">
                {activeNodeInfo.name}
              </h3>
              <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">
                SECURITY CORE // {selectedNode}
              </span>
            </div>
          </div>

          <ul className="space-y-3 font-sans text-xs">
            {activeNodeInfo.details.map((detail, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-cyber-primary font-mono mt-0.5">&rarr;</span>
                <span className="text-slate-300 leading-relaxed">{detail}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-4 border-t border-cyber-border/40 flex items-center justify-between text-[8px] font-mono text-slate-500">
            <span>AUDIT STATUS: HARDENED</span>
            <span style={{ color: activeNodeInfo.color }}>
              {activeNodeInfo.id}_MODULE_PASSING
            </span>
          </div>
        </div>

        {/* Action instruction */}
        <div className="flex items-center space-x-2 bg-cyber-border/30 rounded-lg p-3 border border-cyber-border/40 text-[10px] font-mono text-slate-400">
          <HelpCircle className="h-3.5 w-3.5 text-cyber-primary shrink-0" />
          <span>Click on floating nodes in the cyber grid to inspect threat mitigation modules.</span>
        </div>
      </div>
    </div>
  );
}
