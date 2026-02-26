import {
    AbsoluteFill,
    Sequence,
    spring,
    interpolate,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";
import { BRAND } from "../lib/styles";
import { SPRING_CONFIGS } from "../lib/animations";

const SERVICES = [
    {
        icon: "⚡",
        title: "Revenue Operations",
        subtitle: "Automate & Scale",
        color: BRAND.colors.cobalt,
    },
    {
        icon: "🌐",
        title: "Web Development",
        subtitle: "Next.js & React",
        color: BRAND.colors.acidPurple,
    },
    {
        icon: "📊",
        title: "Meta Ads Engineering",
        subtitle: "Data-Driven Growth",
        color: BRAND.colors.acidGreen,
    },
    {
        icon: "🤖",
        title: "AI Automation",
        subtitle: "Intelligent Systems",
        color: BRAND.colors.cobalt,
    },
];

/**
 * Scene 2 — Animated service cards entering with staggered spring physics.
 */
export const ServicesScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Title entrance
    const titleProgress = spring({
        frame,
        fps,
        config: SPRING_CONFIGS.smooth,
    });
    const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
    const titleY = interpolate(titleProgress, [0, 1], [-40, 0]);

    return (
        <AbsoluteFill
            style={{
                backgroundColor: BRAND.colors.background,
                padding: "80px 120px",
                overflow: "hidden",
            }}
        >
            {/* Background accent line */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: 4,
                    background: BRAND.gradients.accent,
                }}
            />

            {/* Section title */}
            <div
                style={{
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px)`,
                    marginBottom: 60,
                }}
            >
                <div
                    style={{
                        fontFamily: BRAND.fonts.mono,
                        fontSize: 16,
                        color: BRAND.colors.cobalt,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        marginBottom: 12,
                    }}
                >
                    What We Do
                </div>
                <div
                    style={{
                        fontFamily: BRAND.fonts.display,
                        fontSize: 72,
                        fontWeight: 700,
                        color: BRAND.colors.white,
                        textTransform: "uppercase",
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                    }}
                >
                    Our Services
                </div>
            </div>

            {/* Service cards grid */}
            <div
                style={{
                    display: "flex",
                    gap: 24,
                    flex: 1,
                    alignItems: "stretch",
                }}
            >
                {SERVICES.map((service, i) => {
                    const delay = 8 + i * 6; // staggered delay in frames

                    return (
                        <Sequence
                            key={service.title}
                            from={0}
                            layout="none"
                        >
                            <ServiceCard
                                service={service}
                                index={i}
                                delay={delay}
                            />
                        </Sequence>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};

const ServiceCard: React.FC<{
    service: (typeof SERVICES)[number];
    index: number;
    delay: number;
}> = ({ service, delay }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({
        frame,
        fps,
        config: SPRING_CONFIGS.snappy,
        delay,
    });

    const scale = interpolate(entrance, [0, 1], [0.8, 1]);
    const opacity = interpolate(entrance, [0, 1], [0, 1]);
    const translateY = interpolate(entrance, [0, 1], [60, 0]);

    return (
        <div
            style={{
                flex: 1,
                background: BRAND.colors.surface100,
                borderRadius: 16,
                padding: "40px 32px",
                border: `1px solid ${BRAND.colors.white10}`,
                display: "flex",
                flexDirection: "column",
                gap: 20,
                opacity,
                transform: `translateY(${translateY}px) scale(${scale})`,
            }}
        >
            {/* Icon */}
            <div style={{ fontSize: 48 }}>{service.icon}</div>

            {/* Accent bar */}
            <div
                style={{
                    width: 40,
                    height: 3,
                    background: service.color,
                    borderRadius: 2,
                }}
            />

            {/* Title */}
            <div
                style={{
                    fontFamily: BRAND.fonts.display,
                    fontSize: 28,
                    fontWeight: 700,
                    color: BRAND.colors.white,
                    textTransform: "uppercase",
                    lineHeight: 1.2,
                }}
            >
                {service.title}
            </div>

            {/* Subtitle */}
            <div
                style={{
                    fontFamily: BRAND.fonts.body,
                    fontSize: 18,
                    color: BRAND.colors.white60,
                    lineHeight: 1.4,
                }}
            >
                {service.subtitle}
            </div>
        </div>
    );
};
