import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
    width: 512,
    height: 512,
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
                        border: '24px solid #8f5632',
                        borderRadius: '56px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 240,
                        fontFamily: 'sans-serif',
                        fontWeight: 600,
                        paddingBottom: '20px',
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
