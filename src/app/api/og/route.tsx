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
                    backgroundColor: "#070a11",
                    backgroundImage: "radial-gradient(circle at 20% 10%, rgba(56, 189, 248, 0.16), transparent 40%), radial-gradient(circle at 80% 18%, rgba(37, 99, 235, 0.18), transparent 40%)",
                    color: "#f8fafc",
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
                    <div style={{ width: "60px", height: "3px", backgroundColor: "#38bdf8", marginRight: "20px" }} />
                    <div
                        style={{
                            fontSize: 32,
                            fontWeight: 800,
                            letterSpacing: "-0.02em",
                            textTransform: "uppercase",
                            fontFamily: 'sans-serif',
                            color: "#f8fafc",
                        }}
                    >
                        DigitalX Solutions
                    </div>
                    <div style={{ width: "60px", height: "3px", backgroundColor: "#38bdf8", marginLeft: "20px" }} />
                </div>

                {/* Dynamic title */}
                <div
                    style={{
                        fontSize: 48,
                        fontWeight: 800,
                        letterSpacing: "-0.03em",
                        fontFamily: 'sans-serif',
                        textAlign: "center",
                        maxWidth: "900px",
                        lineHeight: 1.12,
                        marginTop: "10px",
                        color: "#ffffff",
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
                        color: "#cbd5e1",
                        letterSpacing: "0.02em",
                        textAlign: "center",
                        marginTop: "20px",
                        maxWidth: "740px",
                    }}
                >
                    {subtitle}
                </div>

                {/* Geo badges */}
                <div style={{ display: "flex", gap: "16px", marginTop: "30px" }}>
                    <div style={{
                        fontSize: 14,
                        fontFamily: 'monospace',
                        color: "#38bdf8",
                        backgroundColor: "rgba(56, 189, 248, 0.1)",
                        border: "1px solid rgba(56, 189, 248, 0.3)",
                        padding: "6px 16px",
                        borderRadius: "6px",
                    }}>
                        United States
                    </div>
                    <div style={{
                        fontSize: 14,
                        fontFamily: 'monospace',
                        color: "#38bdf8",
                        backgroundColor: "rgba(56, 189, 248, 0.1)",
                        border: "1px solid rgba(56, 189, 248, 0.3)",
                        padding: "6px 16px",
                        borderRadius: "6px",
                    }}>
                        Australia
                    </div>
                </div>

                <div style={{ position: 'absolute', bottom: 40, fontSize: 16, color: '#94a3b8', fontFamily: 'monospace' }}>
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
