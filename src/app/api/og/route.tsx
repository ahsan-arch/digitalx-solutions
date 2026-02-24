import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

export const runtime = "edge";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "We Build What Performs";
    const subtitle = searchParams.get("subtitle") || "High-Performance Web Dev & Meta Ads Agency — USA & Australia";

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
                    backgroundColor: "#050505",
                    backgroundImage: "radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.1) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.1) 2%, transparent 0%)",
                    backgroundSize: "100px 100px",
                    color: "white",
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
                    <div style={{ width: "60px", height: "4px", backgroundColor: "#2d5bff", marginRight: "20px" }} />
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
                    <div style={{ width: "60px", height: "4px", backgroundColor: "#2d5bff", marginLeft: "20px" }} />
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
                        color: "rgba(255, 255, 255, 0.6)",
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
                        color: "#2d5bff",
                        border: "1px solid rgba(45, 91, 255, 0.3)",
                        padding: "6px 16px",
                        borderRadius: "999px",
                    }}>
                        🇺🇸 United States
                    </div>
                    <div style={{
                        fontSize: 14,
                        fontFamily: 'monospace',
                        color: "#2d5bff",
                        border: "1px solid rgba(45, 91, 255, 0.3)",
                        padding: "6px 16px",
                        borderRadius: "999px",
                    }}>
                        🇦🇺 Australia
                    </div>
                </div>

                <div style={{ position: 'absolute', bottom: 40, fontSize: 16, color: '#2d5bff', fontFamily: 'monospace' }}>
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
