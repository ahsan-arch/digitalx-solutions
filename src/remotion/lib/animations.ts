/**
 * Reusable animation helpers for Remotion compositions.
 * Based on Remotion best practices — all animations driven by useCurrentFrame().
 */

/** Spring config presets (per Remotion skill rules) */
export const SPRING_CONFIGS = {
    /** Smooth, no bounce — subtle reveals */
    smooth: { damping: 200 },
    /** Snappy, minimal bounce — UI elements */
    snappy: { damping: 20, stiffness: 200 },
    /** Bouncy entrance — playful animations */
    bouncy: { damping: 8 },
    /** Heavy, slow, small bounce */
    heavy: { damping: 15, stiffness: 80, mass: 2 },
} as const;

/** Scene durations in seconds */
export const SCENE_DURATIONS = {
    intro: 3,
    hero: 4,
    services: 3,
    tagline: 2.5,
    cta: 2.5,
} as const;

/** Convert seconds to frames at a given fps */
export function secondsToFrames(seconds: number, fps: number): number {
    return Math.round(seconds * fps);
}

/** Get total composition duration in frames */
export function getTotalDuration(fps: number): number {
    const total = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);
    return secondsToFrames(total, fps);
}
