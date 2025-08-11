
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(220 89.8% 52.4%)",
        accent: "hsl(208 75.6% 61.6%)",
        bg: "hsl(220 20% 99%)",
        surface: "hsl(220 15% 95%)",
        textPrimary: "hsl(220 55% 15%)",
        textSecondary: "hsl(220 55% 35%)",
        border: "hsl(220 13% 91%)",
        card: "hsl(0 0% 100%)",
        muted: "hsl(220 14.3% 95.9%)",
        destructive: "hsl(0 84.2% 60.2%)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
      spacing: {
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        card: "0 2px 4px 0 hsla(220, 55%, 15%, 0.06), 0 6px 12px 0 hsla(220, 55%, 15%, 0.12)",
      },
      animation: {
        "fade-in": "fadeIn 200ms ease-in-out",
        "slide-up": "slideUp 300ms ease-in-out",
        "spin": "spin 1s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
