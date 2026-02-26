import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";
import { BRAND } from "../lib/styles";
import { SPRING_CONFIGS } from "../lib/animations";

/**
 * Scene 1 — Logo reveal with animated gradient background.
 * The DigitalX logo scales in with spring physics while glows pulse behind it.
 */
export const IntroScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Logo scale: spring entrance
    const logoScale = spring({
        frame,
        fps,
        config: SPRING_CONFIGS.bouncy,
        durationInFrames: 2 * fps,
    });

    // Logo opacity
    const logoOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
        extrapolateRight: "clamp",
    });

    // Tagline fade in (appears after logo)
    const taglineOpacity = interpolate(
        frame,
        [1 * fps, 1.5 * fps],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    const taglineY = interpolate(
        frame,
        [1 * fps, 1.5 * fps],
        [30, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    // Pulsing glow
    const glowScale = interpolate(
        frame,
        [0, 2 * fps, 3 * fps],
        [0.5, 1.2, 1],
        { extrapolateRight: "clamp" }
    );

    // Divider line width animation
    const lineWidth = interpolate(
        frame,
        [0.8 * fps, 1.5 * fps],
        [0, 120],
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
            {/* Cobalt glow */}
            <div
                style={{
                    position: "absolute",
                    width: 600,
                    height: 600,
                    borderRadius: "50%",
                    background: BRAND.gradients.glow,
                    transform: `scale(${glowScale})`,
                    top: "20%",
                    right: "25%",
                    filter: "blur(80px)",
                }}
            />
            {/* Purple glow */}
            <div
                style={{
                    position: "absolute",
                    width: 500,
                    height: 500,
                    borderRadius: "50%",
                    background: BRAND.gradients.purpleGlow,
                    transform: `scale(${glowScale * 0.8})`,
                    bottom: "15%",
                    left: "20%",
                    filter: "blur(100px)",
                }}
            />

            {/* Logo + Text */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 24,
                    opacity: logoOpacity,
                    transform: `scale(${logoScale})`,
                }}
            >
                {/* Logo mark — stylized "DX" */}
                <div
                    style={{
                        fontSize: 140,
                        fontFamily: BRAND.fonts.display,
                        fontWeight: 700,
                        color: BRAND.colors.white,
                        letterSpacing: "-0.04em",
                        lineHeight: 1,
                        textTransform: "uppercase",
                    }}
                >
                    Digital
                    <span
                        style={{
                            background: BRAND.gradients.cobalt,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            marginLeft: 16,
                        }}
                    >
                        X
                    </span>
                </div>

                {/* Divider line */}
                <div
                    style={{
                        width: lineWidth,
                        height: 3,
                        background: BRAND.gradients.cobalt,
                        borderRadius: 2,
                    }}
                />

                {/* Sub-tagline */}
                <div
                    style={{
                        opacity: taglineOpacity,
                        transform: `translateY(${taglineY}px)`,
                        fontFamily: BRAND.fonts.mono,
                        fontSize: 22,
                        color: BRAND.colors.cobalt,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                    }}
                >
                    Solutions
                </div>
            </div>
        </AbsoluteFill>
    );
};
