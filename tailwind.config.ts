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
        primaryHover: "hsl(220 89.8% 45%)",
        accent: "hsl(208 75.6% 61.6%)",
        accentHover: "hsl(208 75.6% 55%)",
        bg: "hsl(220 20% 99%)",
        surface: "hsl(220 15% 95%)",
        surfaceHover: "hsl(220 15% 90%)",
        textPrimary: "hsl(220 55% 15%)",
        textSecondary: "hsl(220 55% 35%)",
        textMuted: "hsl(220 55% 55%)",
        border: "hsl(220 13% 91%)",
        borderHover: "hsl(220 13% 85%)",
        card: "hsl(0 0% 100%)",
        cardHover: "hsl(220 20% 98%)",
        muted: "hsl(220 14.3% 95.9%)",
        destructive: "hsl(0 84.2% 60.2%)",
        success: "hsl(142 76% 36%)",
        warning: "hsl(38 92% 50%)",
        premium: "hsl(280 100% 70%)",
        premiumBg: "hsl(280 100% 97%)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      spacing: {
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
        '2xl': "32px",
        '3xl': "48px",
      },
      boxShadow: {
        card: "0 2px 4px 0 hsla(220, 55%, 15%, 0.06), 0 6px 12px 0 hsla(220, 55%, 15%, 0.12)",
        cardHover: "0 4px 8px 0 hsla(220, 55%, 15%, 0.08), 0 12px 24px 0 hsla(220, 55%, 15%, 0.15)",
        premium: "0 4px 12px 0 hsla(280, 100%, 70%, 0.25)",
        button: "0 1px 2px 0 hsla(220, 55%, 15%, 0.05)",
        buttonHover: "0 2px 4px 0 hsla(220, 55%, 15%, 0.1)",
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
