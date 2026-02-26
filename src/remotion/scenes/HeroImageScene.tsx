import {
    AbsoluteFill,
    Img,
    interpolate,
    spring,
    staticFile,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";
import { BRAND } from "../lib/styles";
import { SPRING_CONFIGS } from "../lib/animations";

export const HeroImageScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Ken Burns effect: subtle scale up over time
    const imageScale = interpolate(frame, [0, 4 * fps], [1, 1.15], {
        extrapolateRight: "clamp",
    });

    // Fade in the dark overlay so text is readable
    const overlayOpacity = interpolate(
        frame,
        [0.5 * fps, 1.5 * fps],
        [0, 0.6],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    // Text entrance (spring animation)
    const textDelay = 1 * fps;
    const textEntrance = spring({
        frame,
        fps,
        config: SPRING_CONFIGS.smooth,
        delay: textDelay,
    });

    const textOpacity = interpolate(textEntrance, [0, 1], [0, 1]);
    const textY = interpolate(textEntrance, [0, 1], [40, 0]);

    return (
        <AbsoluteFill style={{ backgroundColor: BRAND.colors.background }}>
            {/* Background Image using Remotion's Img and staticFile */}
            <AbsoluteFill>
                <Img
                    src={staticFile("office-hero.png")}
                    alt="DigitalX Office"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transform: `scale(${imageScale})`,
                        transformOrigin: "center center",
                    }}
                />
            </AbsoluteFill>

            {/* Dark Gradient Overlay for text contrast */}
            <AbsoluteFill
                style={{
                    background: "linear-gradient(to top, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0) 60%)",
                    opacity: overlayOpacity,
                }}
            />

            {/* Overlay Text */}
            <AbsoluteFill
                style={{
                    justifyContent: "flex-end",
                    padding: "80px 120px",
                }}
            >
                <div
                    style={{
                        opacity: textOpacity,
                        transform: `translateY(${textY}px)`,
                    }}
                >
                    <div
                        style={{
                            fontFamily: BRAND.fonts.mono,
                            fontSize: 24,
                            color: BRAND.colors.acidGreen,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            marginBottom: 16,
                        }}
                    >
                        DigitalX Team
                    </div>
                    <div
                        style={{
                            fontFamily: BRAND.fonts.display,
                            fontSize: 96,
                            fontWeight: 700,
                            color: BRAND.colors.white,
                            textTransform: "uppercase",
                            lineHeight: 1,
                            letterSpacing: "-0.02em",
                            textShadow: "0px 10px 30px rgba(0,0,0,0.5)",
                        }}
                    >
                        Engineering
                        <br />
                        <span
                            style={{
                                color: BRAND.colors.cobalt,
                            }}
                        >
                            Excellence
                        </span>
                    </div>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
