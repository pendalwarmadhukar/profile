/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#050505",
          card: "#0a0a0a",
          border: "#1c1c1c",
          text: "#a3a3a3",
          primary: "#ff3333", // Red
          secondary: "#00f0ff", // Cyan
          accent: "#3b82f6", // Blue
          glow: "rgba(255, 51, 51, 0.15)",
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Space Grotesk", "Share Tech Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "cyber-glow": "0 0 15px rgba(255, 51, 51, 0.25)",
        "cyber-glow-success": "0 0 15px rgba(0, 240, 255, 0.25)",
        "cyber-glow-accent": "0 0 15px rgba(59, 130, 246, 0.25)",
      },
      backgroundImage: {
        "cyber-grid": "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
      },
      animation: {
        "scanline": "scanline 6s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "matrix": "matrix 20s linear infinite",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        }
      }
    },
  },
  plugins: [],
}
