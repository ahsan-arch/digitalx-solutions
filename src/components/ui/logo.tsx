/**
 * DX Logo Component
 * Replicates the interlocking "DX" monogram.
 */
export function Logo({ className = "w-12 h-12" }: { className?: string }) {
    return (
        <div className={className}>
            <svg
                viewBox="0 0 100 100"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
            >
                {/* D Path */}
                <path
                    d="M 20 20 L 20 80 L 50 80 C 70 80 80 60 80 50 C 80 40 70 20 50 20 Z M 35 35 L 50 35 C 60 35 65 45 65 50 C 65 55 60 65 50 65 L 35 65 Z"
                    fill="currentColor"
                />
                {/* X Path - Interlocking style */}
                <path
                    d="M 60 20 L 75 20 L 55 50 L 75 80 L 60 80 L 45 50 L 60 20 Z"
                    fill="currentColor"
                // Using a mix-blend-mode or mask might be needed for true interlocking 
                // but for a simple monochrome SVG, direct paths are clearer.
                // Adjusting X to overlap properly:
                // We can use a stroke or negative space cut if needed.
                // For now, simple overlay.
                />
                {/* Refined "DX" paths to match the user's specific geometric style more closely if needed */}
                {/* Replacing with the specific geometric shapes based on visual approximation of the user's image */}
                <path d="M 25 25 V 75 H 55 Q 80 75 80 50 Q 80 25 55 25 H 25 Z M 40 40 H 50 Q 65 40 65 50 Q 65 60 50 60 H 40 V 40 Z" fill="currentColor" />
                <path d="M 70 25 L 90 25 L 60 75 L 40 75 L 70 25 Z" fill="currentColor" style={{ mixBlendMode: 'difference' }} />
                {/* Correction: The user image shows a specific "cut" style. Let's try a simpler robust geometric approach */}
            </svg>
            {/* 
         Since I can't see the render, I will use a simplified robust text-based SVG 
         that guarantees legibility while mimicking the monogram.
      */}
        </div>
    );
}

// Redefining to be safer and cleaner based on standard geometric fonts
export function DigitalXLogo({ className = "w-auto h-8" }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* D shape */}
            <path d="M50 50 H90 C145.228 50 190 94.7715 190 150 C190 205.228 145.228 250 90 250 H50 V50 Z" stroke="currentColor" strokeWidth="35" />

            {/* X shape */}
            <path d="M180 50 L320 250" stroke="currentColor" strokeWidth="35" />
            <path d="M320 50 L180 250" stroke="currentColor" strokeWidth="35" />
        </svg>
    );
}
