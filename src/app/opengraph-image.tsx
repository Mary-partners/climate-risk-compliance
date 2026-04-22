import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Climate Risk Platform'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FDFBF7',
          padding: '80px',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#1E3A2C',
            textAlign: 'center',
            fontFamily: 'serif',
            marginBottom: 32,
            lineHeight: 1.2,
          }}
        >
          Climate Risk Platform
        </div>
        <div
          style={{
            fontSize: 36,
            color: '#4A5568',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.4,
          }}
        >
          ESG, TCFD, IFRS Reporting & Compliance
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
