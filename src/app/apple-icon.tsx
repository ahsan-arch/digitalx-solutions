import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
    width: 180,
    height: 180,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    background: '#050505',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                }}
            >
                <svg
                    width="120"
                    height="90"
                    viewBox="0 0 400 300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M50 50 H90 C145.228 50 190 94.7715 190 150 C190 205.228 145.228 250 90 250 H50 V50 Z" stroke="white" strokeWidth="35" />
                    <path d="M180 50 L320 250" stroke="white" strokeWidth="35" />
                    <path d="M320 50 L180 250" stroke="white" strokeWidth="35" />
                </svg>
            </div>
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported icons size metadata
            // config to also set the ImageResponse's width and height.
            ...size,
        }
    )
}
