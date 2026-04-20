import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

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
      display: ['var(--font-fraunces)', "serif"],
      mono: ['var(--font-jetbrains-mono)', "monospace"],
    },
    extend: {
      colors: {
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

        // Legacy aliases kept to avoid breaking older components during migration.
        cobalt: {
          DEFAULT: "rgb(var(--brand) / <alpha-value>)",
          vivid: "rgb(var(--brand-deep) / <alpha-value>)",
        },
        acid: {
          green: "rgb(var(--brand) / <alpha-value>)",
          purple: "rgb(var(--brand) / <alpha-value>)",
        },
        neon: {
          DEFAULT: "rgb(var(--brand) / <alpha-value>)",
          vivid: "rgb(var(--brand-deep) / <alpha-value>)",
          dim: "rgb(var(--brand-soft) / <alpha-value>)",
          glow: "rgb(var(--brand) / 0.24)",
        },
      },
      borderRadius: {
        stitch: "10px",
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
  plugins: [
    require("@tailwindcss/typography"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".preserve-3d": {
          "transform-style": "preserve-3d",
        },
        ".perspective-1000": {
          perspective: "1000px",
        },
        ".backface-hidden": {
          "backface-visibility": "hidden",
        },
        ".rotate-y-180": {
          transform: "rotateY(180deg)",
        },
      });
    }),
  ],
};

export default config;
