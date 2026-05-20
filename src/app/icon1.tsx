import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
    width: 192,
    height: 192,
}
export const contentType = 'image/png'

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#f7f2e8',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#8f5632',
                }}
            >
                <div
                    style={{
                        width: '70%',
                        height: '70%',
                        border: '10px solid #8f5632',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 88,
                        fontFamily: 'sans-serif',
                        fontWeight: 600,
                        paddingBottom: '8px',
                    }}
                >
                    D
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
