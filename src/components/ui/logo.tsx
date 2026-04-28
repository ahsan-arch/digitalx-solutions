import { cn } from "@/lib/utils";

export function DigitalXLogo({ className }: { className?: string }) {
    return (
        <div className={cn("flex items-center justify-center", className)}>
            <svg
                viewBox="0 0 300 240"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                {/* Thin L-Bracket outline framing the Left & Bottom */}
                <path
                    d="M 40 40 V 190 H 200"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="square"
                    className="text-foreground"
                />

                {/* --- The 'D' Shape --- */}
                {/* Top part of D */}
                <path
                    d="M 65 40 H 130 C 165 40 190 60 190 100 C 190 140 165 160 130 160 H 65 V 125 H 125 C 145 125 155 115 155 100 C 155 85 145 75 125 75 H 65 V 40 Z"
                    fill="currentColor"
                    className="text-foreground"
                />
                
                {/* Middle line of D (where it connects inward) */}
                <rect x="40" y="85" width="45" height="30" fill="currentColor" className="text-foreground" />

                {/* --- The 'X' Shape --- */}
                {/* The X is made of two diagonal crossing bars.
                    It sits to the right, slightly overlapping or next to the D. 
                */}
                <path
                    d="M 150 50 L 205 105 L 175 160 H 220 L 240 120 L 260 160 H 305 L 255 70 L 285 30 H 240 L 220 60 L 200 30 H 150 Z"
                    fill="currentColor"
                    className="text-brand"
                />
                
                <text x="160" y="225" textAnchor="middle" className="fill-foreground font-display font-bold" fontSize="26" letterSpacing="0.05em">
                    Digitalx-Solutions
                </text>
            </svg>
        </div>
    );
}

export function Logo({ className }: { className?: string }) {
    return <DigitalXLogo className={className} />;
}
