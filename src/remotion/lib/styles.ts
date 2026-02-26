/**
 * Digital X Solution — Brand design tokens for Remotion compositions.
 * Mirrors the Tailwind config values so videos match the website aesthetic.
 */

export const BRAND = {
    colors: {
        background: "#050505",
        foreground: "#ededed",
        cobalt: "#2d5bff",
        cobaltVivid: "#0033ff",
        acidGreen: "#ccff00",
        acidPurple: "#b026ff",
        surface100: "#121212",
        surface200: "#1e1e1e",
        surface300: "#2a2a2a",
        white: "#ffffff",
        white60: "rgba(255,255,255,0.6)",
        white10: "rgba(255,255,255,0.1)",
    },
    fonts: {
        display: "Oswald, sans-serif",
        body: "Inter, sans-serif",
        mono: "JetBrains Mono, monospace",
    },
    gradients: {
        cobalt: "linear-gradient(135deg, #2d5bff, #0033ff)",
        accent: "linear-gradient(135deg, #2d5bff, #b026ff)",
        glow: "radial-gradient(circle, rgba(45,91,255,0.3) 0%, transparent 70%)",
        purpleGlow:
            "radial-gradient(circle, rgba(176,38,255,0.2) 0%, transparent 70%)",
    },
} as const;

/** Standard video dimensions */
export const VIDEO = {
    WIDTH: 1920,
    HEIGHT: 1080,
    FPS: 30,
} as const;
