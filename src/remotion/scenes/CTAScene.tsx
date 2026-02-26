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
 * Scene 4 — Call-to-action with contact info fade-in and website URL.
 */
export const CTAScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Main CTA text entrance
    const ctaProgress = spring({
        frame,
        fps,
        config: SPRING_CONFIGS.smooth,
    });
    const ctaOpacity = interpolate(ctaProgress, [0, 1], [0, 1]);
    const ctaScale = interpolate(ctaProgress, [0, 1], [0.9, 1]);

    // Contact details entrance (staggered)
    const detailDelay = 0.5 * fps;
    const detailProgress = spring({
        frame,
        fps,
        config: SPRING_CONFIGS.smooth,
        delay: detailDelay,
    });
    const detailOpacity = interpolate(detailProgress, [0, 1], [0, 1]);
    const detailY = interpolate(detailProgress, [0, 1], [20, 0]);

    // URL entrance
    const urlDelay = 1 * fps;
    const urlProgress = spring({
        frame,
        fps,
        config: SPRING_CONFIGS.smooth,
        delay: urlDelay,
    });
    const urlOpacity = interpolate(urlProgress, [0, 1], [0, 1]);

    // Glow pulse
    const glowScale = interpolate(
        frame,
        [0, 1.5 * fps, 2.5 * fps],
        [0.3, 1.1, 1],
        { extrapolateRight: "clamp" }
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
            {/* Glows */}
            <div
                style={{
                    position: "absolute",
                    width: 700,
                    height: 700,
                    borderRadius: "50%",
                    background: BRAND.gradients.glow,
                    transform: `scale(${glowScale})`,
                    filter: "blur(100px)",
                    opacity: 0.5,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    width: 500,
                    height: 500,
                    borderRadius: "50%",
                    background: BRAND.gradients.purpleGlow,
                    transform: `scale(${glowScale * 0.7})`,
                    filter: "blur(120px)",
                    opacity: 0.4,
                    top: "60%",
                    left: "60%",
                }}
            />

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 32,
                    position: "relative",
                }}
            >
                {/* CTA headline */}
                <div
                    style={{
                        opacity: ctaOpacity,
                        transform: `scale(${ctaScale})`,
                        fontFamily: BRAND.fonts.display,
                        fontSize: 80,
                        fontWeight: 700,
                        color: BRAND.colors.white,
                        textTransform: "uppercase",
                        letterSpacing: "-0.02em",
                        textAlign: "center",
                        lineHeight: 1.1,
                    }}
                >
                    Let&apos;s Build
                    <br />
                    <span
                        style={{
                            background: BRAND.gradients.cobalt,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Together
                    </span>
                </div>

                {/* Divider */}
                <div
                    style={{
                        width: 80,
                        height: 3,
                        background: BRAND.gradients.cobalt,
                        borderRadius: 2,
                        opacity: detailOpacity,
                    }}
                />

                {/* Contact details */}
                <div
                    style={{
                        opacity: detailOpacity,
                        transform: `translateY(${detailY}px)`,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 12,
                    }}
                >
                    <div
                        style={{
                            fontFamily: BRAND.fonts.body,
                            fontSize: 24,
                            color: BRAND.colors.white60,
                        }}
                    >
                        Get in touch for a free consultation
                    </div>
                </div>

                {/* Website URL */}
                <div
                    style={{
                        opacity: urlOpacity,
                        fontFamily: BRAND.fonts.mono,
                        fontSize: 20,
                        color: BRAND.colors.cobalt,
                        letterSpacing: "0.15em",
                        padding: "12px 32px",
                        border: `1px solid ${BRAND.colors.cobalt}`,
                        borderRadius: 8,
                    }}
                >
                    digitalxsolutions.com.au
                </div>
            </div>
        </AbsoluteFill>
    );
};
