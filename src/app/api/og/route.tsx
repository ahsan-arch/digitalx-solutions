import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

export const runtime = "edge";

export async function GET() {
    // Oswald font data would ideal to load here, but for simplicity/speed 
    // we will use a system font stack that mimics the brutalist feel or a default sans.

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
                    backgroundColor: "#050505", // Deep Charcoal
                    backgroundImage: "radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.1) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.1) 2%, transparent 0%)",
                    backgroundSize: "100px 100px",
                    color: "white",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "20px",
                    }}
                >
                    {/* Cobalt Accent Bar */}
                    <div style={{ width: "60px", height: "4px", backgroundColor: "#2d5bff", marginRight: "20px" }} />
                    <div
                        style={{
                            fontSize: 60,
                            fontWeight: 900,
                            letterSpacing: "-0.05em",
                            textTransform: "uppercase",
                            fontFamily: 'sans-serif', // Fallback to system sans
                        }}
                    >
                        DigitalX Solutions
                    </div>
                    {/* Cobalt Accent Bar */}
                    <div style={{ width: "60px", height: "4px", backgroundColor: "#2d5bff", marginLeft: "20px" }} />
                </div>

                <div
                    style={{
                        fontSize: 24,
                        fontWeight: 400,
                        fontFamily: 'monospace',
                        color: "rgba(255, 255, 255, 0.6)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginTop: "10px",
                    }}
                >
                    We Build What Performs
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
