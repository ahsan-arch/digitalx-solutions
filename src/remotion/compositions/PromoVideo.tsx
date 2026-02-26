import { AbsoluteFill, Series, useVideoConfig } from "remotion";
import { IntroScene } from "../scenes/IntroScene";
import { HeroImageScene } from "../scenes/HeroImageScene";
import { ServicesScene } from "../scenes/ServicesScene";
import { TaglineScene } from "../scenes/TaglineScene";
import { CTAScene } from "../scenes/CTAScene";
import { secondsToFrames, SCENE_DURATIONS } from "../lib/animations";

export type PromoVideoProps = {
    companyName: string;
    tagline: string;
    website: string;
};

/**
 * PromoVideo — Main branded promotional composition.
 *
 * 5 scenes sequenced one after another:
 * 1. Intro (logo reveal)
 * 2. Hero (office image)
 * 3. Services (animated cards)
 * 4. Tagline (typewriter effect)
 * 5. CTA (call-to-action)
 */
export const PromoVideo: React.FC<PromoVideoProps> = () => {
    const { fps } = useVideoConfig();

    const introFrames = secondsToFrames(SCENE_DURATIONS.intro, fps);
    const heroFrames = secondsToFrames(SCENE_DURATIONS.hero, fps);
    const servicesFrames = secondsToFrames(SCENE_DURATIONS.services, fps);
    const taglineFrames = secondsToFrames(SCENE_DURATIONS.tagline, fps);
    const ctaFrames = secondsToFrames(SCENE_DURATIONS.cta, fps);

    // Negative offset to create a slight overlap between scenes
    const overlapFrames = Math.round(0.5 * fps);

    return (
        <AbsoluteFill style={{ backgroundColor: "#050505" }}>
            <Series>
                {/* Scene 1: Intro */}
                <Series.Sequence durationInFrames={introFrames}>
                    <IntroScene />
                </Series.Sequence>

                {/* Scene 2: Hero Office Image */}
                <Series.Sequence offset={-overlapFrames} durationInFrames={heroFrames}>
                    <HeroImageScene />
                </Series.Sequence>

                {/* Scene 3: Services */}
                <Series.Sequence offset={-overlapFrames} durationInFrames={servicesFrames}>
                    <ServicesScene />
                </Series.Sequence>

                {/* Scene 4: Tagline */}
                <Series.Sequence offset={-overlapFrames} durationInFrames={taglineFrames}>
                    <TaglineScene />
                </Series.Sequence>

                {/* Scene 5: CTA */}
                <Series.Sequence offset={-overlapFrames} durationInFrames={ctaFrames}>
                    <CTAScene />
                </Series.Sequence>
            </Series>
        </AbsoluteFill>
    );
};
