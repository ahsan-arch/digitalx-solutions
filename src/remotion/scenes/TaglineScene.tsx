import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";
import { BRAND } from "../lib/styles";
import { SPRING_CONFIGS } from "../lib/animations";

const TAGLINE_LINE1 = "We Build";
const TAGLINE_LINE2 = "What Performs";

/**
 * Scene 3 — Typewriter-style tagline reveal with word highlighting.
 * Uses string slicing (per Remotion best practices — never per-character opacity).
 */
export const TaglineScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Line 1 typewriter: reveal over 0.8s
    const line1Chars = Math.floor(
        interpolate(frame, [0, 0.8 * fps], [0, TAGLINE_LINE1.length], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
    );
    const displayLine1 = TAGLINE_LINE1.slice(0, line1Chars);

    // Line 2 typewriter: starts at 0.6s, reveal over 1s
    const line2Start = 0.6 * fps;
    const line2Chars = Math.floor(
        interpolate(
            frame,
            [line2Start, line2Start + 1 * fps],
            [0, TAGLINE_LINE2.length],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        )
    );
    const displayLine2 = TAGLINE_LINE2.slice(0, line2Chars);

    // Cursor blink — toggles every 15 frames
    const cursorVisible = Math.floor(frame / 15) % 2 === 0;

    // "Performs" highlight: springs in after full text is typed
    const highlightDelay = 1.8 * fps;
    const highlightProgress = spring({
        frame,
        fps,
        config: SPRING_CONFIGS.smooth,
        delay: highlightDelay,
    });
    const highlightWidth = interpolate(highlightProgress, [0, 1], [0, 100]);

    // Glow entrance
    const glowOpacity = interpolate(
        frame,
        [0.5 * fps, 1.5 * fps],
        [0, 0.6],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    return (
        <AbsoluteFill
            style={{
                backgroundColor: BRAND.colors.background,
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
            }}
        >
            {/* Background glow */}
            <div
                style={{
                    position: "absolute",
                    width: 800,
                    height: 800,
                    borderRadius: "50%",
                    background: BRAND.gradients.glow,
                    opacity: glowOpacity,
                    filter: "blur(120px)",
                }}
            />

            <div style={{ position: "relative", textAlign: "center" }}>
                {/* Line 1 */}
                <div
                    style={{
                        fontFamily: BRAND.fonts.display,
                        fontSize: 120,
                        fontWeight: 700,
                        color: BRAND.colors.white,
                        textTransform: "uppercase",
                        letterSpacing: "-0.04em",
                        lineHeight: 0.9,
                    }}
                >
                    {displayLine1}
                    {line1Chars < TAGLINE_LINE1.length && (
                        <span
                            style={{
                                opacity: cursorVisible ? 1 : 0,
                                color: BRAND.colors.cobalt,
                                marginLeft: 4,
                            }}
                        >
                            |
                        </span>
                    )}
                </div>

                {/* Line 2 with highlight */}
                <div
                    style={{
                        fontFamily: BRAND.fonts.display,
                        fontSize: 120,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "-0.04em",
                        lineHeight: 0.9,
                        marginTop: 8,
                        position: "relative",
                        display: "inline-block",
                    }}
                >
                    {/* Highlight bar behind "Performs" */}
                    {line2Chars >= TAGLINE_LINE2.length && (
                        <div
                            style={{
                                position: "absolute",
                                bottom: 4,
                                left: "50%",
                                width: `${highlightWidth}%`,
                                height: "0.15em",
                                background: BRAND.gradients.cobalt,
                                borderRadius: 4,
                                transform: "translateX(-50%)",
                            }}
                        />
                    )}
                    <span style={{ color: BRAND.colors.white }}>
                        {displayLine2.slice(0, 5)}
                    </span>
                    <span
                        style={{
                            background:
                                line2Chars >= TAGLINE_LINE2.length
                                    ? BRAND.gradients.cobalt
                                    : "none",
                            WebkitBackgroundClip:
                                line2Chars >= TAGLINE_LINE2.length ? "text" : "unset",
                            WebkitTextFillColor:
                                line2Chars >= TAGLINE_LINE2.length
                                    ? "transparent"
                                    : BRAND.colors.white,
                            color: BRAND.colors.white,
                        }}
                    >
                        {displayLine2.slice(5)}
                    </span>
                    {line2Chars < TAGLINE_LINE2.length && line1Chars >= TAGLINE_LINE1.length && (
                        <span
                            style={{
                                opacity: cursorVisible ? 1 : 0,
                                color: BRAND.colors.cobalt,
                                marginLeft: 4,
                            }}
                        >
                            |
                        </span>
                    )}
                </div>
            </div>
        </AbsoluteFill>
    );
};
