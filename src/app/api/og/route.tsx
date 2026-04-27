import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

export const runtime = "edge";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Revenue Systems That Perform";
    const subtitle = searchParams.get("subtitle") || "Web Development, AI Automation, and Performance Marketing";

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f7f2e8",
                    backgroundImage: "radial-gradient(circle at 20% 10%, rgba(143, 86, 50, 0.18), transparent 35%), radial-gradient(circle at 80% 18%, rgba(191, 133, 90, 0.2), transparent 35%)",
                    color: "#202126",
                    padding: "40px 60px",
                }}
            >
                {/* Top accent */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "20px",
                    }}
                >
                    <div style={{ width: "60px", height: "4px", backgroundColor: "#8f5632", marginRight: "20px" }} />
                    <div
                        style={{
                            fontSize: 36,
                            fontWeight: 900,
                            letterSpacing: "-0.02em",
                            textTransform: "uppercase",
                            fontFamily: 'sans-serif',
                        }}
                    >
                        DigitalX Solutions
                    </div>
                    <div style={{ width: "60px", height: "4px", backgroundColor: "#8f5632", marginLeft: "20px" }} />
                </div>

                {/* Dynamic title */}
                <div
                    style={{
                        fontSize: 48,
                        fontWeight: 900,
                        letterSpacing: "-0.03em",
                        textTransform: "uppercase",
                        fontFamily: 'sans-serif',
                        textAlign: "center",
                        maxWidth: "900px",
                        lineHeight: 1.1,
                        marginTop: "10px",
                    }}
                >
                    {title}
                </div>

                {/* Subtitle */}
                <div
                    style={{
                        fontSize: 20,
                        fontWeight: 400,
                        fontFamily: 'monospace',
                        color: "rgba(32, 33, 38, 0.65)",
                        letterSpacing: "0.05em",
                        textAlign: "center",
                        marginTop: "20px",
                        maxWidth: "700px",
                    }}
                >
                    {subtitle}
                </div>

                {/* Geo badges */}
                <div style={{ display: "flex", gap: "16px", marginTop: "30px" }}>
                    <div style={{
                        fontSize: 14,
                        fontFamily: 'monospace',
                        color: "#8f5632",
                        border: "1px solid rgba(143, 86, 50, 0.35)",
                        padding: "6px 16px",
                        borderRadius: "999px",
                    }}>
                        United States
                    </div>
                    <div style={{
                        fontSize: 14,
                        fontFamily: 'monospace',
                        color: "#8f5632",
                        border: "1px solid rgba(143, 86, 50, 0.35)",
                        padding: "6px 16px",
                        borderRadius: "999px",
                    }}>
                        Australia
                    </div>
                </div>

                <div style={{ position: 'absolute', bottom: 40, fontSize: 16, color: '#8f5632', fontFamily: 'monospace' }}>
                    {siteConfig.domain.replace('https://', '')}
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
