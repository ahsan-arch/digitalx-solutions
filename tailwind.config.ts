import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

/**
 * Velocity Digital — Design Tokens (Refined)
 *
 * AESTHETIC: Swiss Style / Brutalism
 * - Typography: Oswald (headings), Inter (technical/body)
 * - Colors: High contrast, dark mode default.
 * - Interaction: 3D tilts, magnetic pulls.
 */

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
      display: ['var(--font-oswald)', "sans-serif"],
      mono: ['"jetbrains mono"', "monospace"],
    },
    extend: {
      colors: {
        background: "#050505", // Deeper than charcoal
        foreground: "#ededed", // Off-white
        
        // Swiss/Brutalist Palette
        cobalt: {
          DEFAULT: "#2d5bff",
          vivid: "#0033ff",
        },
        acid: {
          green: "#ccff00",
          purple: "#b026ff",
        },
        surface: {
          100: "#121212",
          200: "#1e1e1e",
          300: "#2a2a2a",
        },
        border: "rgba(255, 255, 255, 0.1)",
      },
      backgroundImage: {
        'noise': "url('/noise.png')", // We will implement a CSS-based noise fallback
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      // 3D Transform Utilities
      transformOrigin: {
        'center-center': 'center center',
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
