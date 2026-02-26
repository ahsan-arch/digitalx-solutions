import { Composition } from "remotion";
import { PromoVideo, PromoVideoProps } from "./compositions/PromoVideo";
import { VIDEO } from "./lib/styles";
import { getTotalDuration } from "./lib/animations";

/**
 * RemotionRoot — Registers all video compositions.
 * This is the entry point used by the Remotion CLI and Studio.
 */
export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="PromoVideo"
                component={PromoVideo}
                durationInFrames={getTotalDuration(VIDEO.FPS)}
                fps={VIDEO.FPS}
                width={VIDEO.WIDTH}
                height={VIDEO.HEIGHT}
                defaultProps={
                    {
                        companyName: "DigitalX Solutions",
                        tagline: "We Build What Performs",
                        website: "digitalxsolutions.com.au",
                    } satisfies PromoVideoProps
                }
            />
        </>
    );
};
