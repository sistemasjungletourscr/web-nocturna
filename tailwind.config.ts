import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./tracking/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "Inter", "sans-serif"],
        heading: ["var(--font-heading)", "serif"]
      },
      colors: {
        night: "#06130E",
        jungle: "#0B2A1B",
        moss: "#1F5C3A",
        frog: "#7CFF6B",
        lantern: "#F5B642",
        volcanic: "#E8D8B8",
        fog: "#A7B0A5",
        soft: "#F7F4EA"
      },
      boxShadow: {
        glow: "0 0 40px rgba(245, 182, 66, 0.16)",
        glass: "0 24px 80px rgba(0, 0, 0, 0.25)"
      }
    }
  },
  plugins: []
};

export default config;
