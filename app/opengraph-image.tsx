import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const runtime = 'nodejs'
export const alt = 'Critical Mass — Find, Start, and Sustain Rides Worldwide'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  const svgPath = join(process.cwd(), 'public', 'bike-fist.svg')
  const svgContent = readFileSync(svgPath, 'utf-8')
  const svgBase64 = Buffer.from(svgContent).toString('base64')
  const svgDataUri = `data:image/svg+xml;base64,${svgBase64}`

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#111',
          padding: '60px',
          gap: '30px',
        }}
      >
        <img src={svgDataUri} width={250} height={250} style={{ filter: 'invert(1)' }} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              fontSize: '64px',
              fontWeight: 800,
              color: '#fff',
              textAlign: 'center',
            }}
          >
            Critical Mass
          </div>
          <div
            style={{
              fontSize: '28px',
              color: '#aaa',
              textAlign: 'center',
            }}
          >
            Find, start, and sustain rides worldwide
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
