import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-inter)', "sans-serif"],
      display: ['var(--font-roboto)', "sans-serif"],
      mono: ['var(--font-jetbrains-mono)', "monospace"],
    },
    fontSize: {
      // Display (Fraunces)
      "display-xl": ["4.5rem", { lineHeight: "1.05", fontWeight: "500", letterSpacing: "-0.02em" }],
      "display-lg": ["3.5rem", { lineHeight: "1.08", fontWeight: "500", letterSpacing: "-0.02em" }],
      "display-md": ["2.75rem", { lineHeight: "1.1", fontWeight: "500", letterSpacing: "-0.015em" }],
      "display-sm": ["2.125rem", { lineHeight: "1.15", fontWeight: "500", letterSpacing: "-0.01em" }],
      // Titles (Inter)
      "title-lg": ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
      "title-md": ["1.25rem", { lineHeight: "1.35", fontWeight: "600" }],
      // Body
      "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
      "body": ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
      "body-sm": ["0.9375rem", { lineHeight: "1.55", fontWeight: "400" }],
      "caption": ["0.8125rem", { lineHeight: "1.4", fontWeight: "500" }],
      "overline": ["0.75rem", { lineHeight: "1.4", fontWeight: "600", letterSpacing: "0.08em" }],
      "mono": ["0.875rem", { lineHeight: "1.6", fontWeight: "400" }],
      // Tailwind defaults preserved for legacy utilities
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.25rem" }],
      base: ["1rem", { lineHeight: "1.5rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "1" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
    },
    extend: {
      colors: {
        // Primary token surface — use these going forward.
        "surface-page": "rgb(var(--surface-page) / <alpha-value>)",
        "surface-raised": "rgb(var(--surface-raised) / <alpha-value>)",
        "surface-sunken": "rgb(var(--surface-sunken) / <alpha-value>)",
        "surface-inverse": "rgb(var(--surface-inverse) / <alpha-value>)",

        "ink-primary": "rgb(var(--ink-primary) / <alpha-value>)",
        "ink-secondary": "rgb(var(--ink-secondary) / <alpha-value>)",
        "ink-tertiary": "rgb(var(--ink-tertiary) / <alpha-value>)",
        "ink-on-inverse": "rgb(var(--ink-on-inverse) / <alpha-value>)",

        accent: {
          DEFAULT: "rgb(var(--accent-primary) / <alpha-value>)",
          hover: "rgb(var(--accent-primary-hover) / <alpha-value>)",
          soft: "rgb(var(--accent-primary-soft) / <alpha-value>)",
          secondary: "rgb(var(--accent-secondary) / <alpha-value>)",
          "secondary-soft": "rgb(var(--accent-secondary-soft) / <alpha-value>)",
        },

        success: {
          DEFAULT: "rgb(var(--success) / <alpha-value>)",
          soft: "rgb(var(--success-soft) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "rgb(var(--warning) / <alpha-value>)",
          soft: "rgb(var(--warning-soft) / <alpha-value>)",
        },
        error: {
          DEFAULT: "rgb(var(--error) / <alpha-value>)",
          soft: "rgb(var(--error-soft) / <alpha-value>)",
        },
        info: {
          DEFAULT: "rgb(var(--info) / <alpha-value>)",
          soft: "rgb(var(--info-soft) / <alpha-value>)",
        },

        line: {
          subtle: "rgb(var(--border-subtle) / <alpha-value>)",
          strong: "rgb(var(--border-strong) / <alpha-value>)",
          divider: "rgb(var(--divider) / <alpha-value>)",
        },

        // Legacy aliases — retained until deprecated components/pages are removed.
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",

        brand: {
          DEFAULT: "rgb(var(--brand) / <alpha-value>)",
          deep: "rgb(var(--brand-deep) / <alpha-value>)",
          soft: "rgb(var(--brand-soft) / <alpha-value>)",
        },

        surface: {
          50: "rgb(var(--surface-50) / <alpha-value>)",
          100: "rgb(var(--surface-100) / <alpha-value>)",
          200: "rgb(var(--surface-200) / <alpha-value>)",
          300: "rgb(var(--surface-200) / <alpha-value>)",
        },
      },
      borderRadius: {
        xs: "6px",
        sm: "10px",
        md: "14px",
        lg: "20px",
        xl: "28px",
        "2xl": "36px",
        pill: "999px",
        stitch: "10px",
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        focus: "var(--shadow-focus)",
      },
      transitionDuration: {
        120: "120ms",
        200: "200ms",
        320: "320ms",
        480: "480ms",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
      maxWidth: {
        reading: "680px",
        prose: "820px",
        content: "1200px",
        wide: "1360px",
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        blink: "blink 1s step-end infinite",
        "fade-in-up": "fadeInUp 0.7s ease-out forwards",
        "scale-in": "scaleIn 0.55s ease-out forwards",
        "float-slow": "floatSlow 5s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.97)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
