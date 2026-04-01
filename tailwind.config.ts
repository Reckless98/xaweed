import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0A0A0A",
          obsidian: "#111111",
          charcoal: "#1A1A1A",
          smoke: "#2A2A2A",
          ash: "#3A3A3A",
          green: {
            DEFAULT: "#22C55E",
            dark: "#16A34A",
            light: "#4ADE80",
            glow: "#22C55E",
            muted: "#166534",
          },
          gold: {
            DEFAULT: "#F59E0B",
            light: "#FCD34D",
            dark: "#D97706",
          },
          red: {
            DEFAULT: "#EF4444",
            muted: "#991B1B",
          },
          ivory: "#F5F5F0",
          cream: "#E8E4DC",
          "rasta-red": "#CD0000",
          "rasta-gold": "#FFD700",
          "rasta-green": "#008000",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        hero: ["var(--font-permanent-marker)", "cursive"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-glow":
          "radial-gradient(ellipse at center, rgba(34,197,94,0.15) 0%, transparent 70%)",
        "gradient-gold":
          "radial-gradient(ellipse at center, rgba(245,158,11,0.1) 0%, transparent 70%)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(34,197,94,0.3)",
        "glow-lg": "0 0 40px rgba(34,197,94,0.2)",
        "glow-gold": "0 0 20px rgba(245,158,11,0.3)",
        glass: "0 8px 32px rgba(0,0,0,0.4)",
        "glass-lg": "0 16px 64px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
