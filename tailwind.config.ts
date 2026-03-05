import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

/**
 * Digital X Solution — Design Tokens (Stitch Redesign)
 *
 * AESTHETIC: High-Tech Dark Mode / Electric Neon
 * - Typography: Space Grotesk (headings), Inter (body)
 * - Colors: Abyssal dark mode + Electric Neon Green (#0df26c)
 * - Interaction: 3D tilts, magnetic pulls, neon glow effects.
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
      display: ['var(--font-space-grotesk)', "sans-serif"],
      mono: ['"jetbrains mono"', "monospace"],
    },
    extend: {
      colors: {
        background: "#050505", // Abyssal Obsidian
        foreground: "#ededed", // Crisp Off-White

        // Stitch Design Palette
        cobalt: {
          DEFAULT: "#0df26c",
          vivid: "#0ac957",
        },
        acid: {
          green: "#0df26c",
          purple: "#0df26c",
        },
        neon: {
          DEFAULT: "#0df26c",
          vivid: "#0ac957",
          dim: "#09a34a",
          glow: "rgba(13, 242, 108, 0.3)",
        },
        surface: {
          100: "#121212",
          200: "#1e1e1e",
          300: "#2a2a2a",
        },
        border: "rgba(255, 255, 255, 0.1)",
      },
      borderRadius: {
        'stitch': '8px',
      },
      backgroundImage: {
        'noise': "url('/noise.png')",
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'blink': 'blink 1s step-end infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'slide-up-dock': 'slideUpDock 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
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
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUpDock: {
          '0%': { opacity: '0', transform: 'translateX(-50%) translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateX(-50%) translateY(0)' },
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
