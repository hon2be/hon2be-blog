import { useMemo } from 'react'
import spriteUrl from '../assets/cherry-blossom.png'

// 스프라이트 실측 크기: 1178 × 896 px
// 모든 좌표는 native px 기준 (Python PIL bbox 측정값)
const SPRITE_W = 1178
const SPRITE_H = 896
const DISPLAY_SCALE = 0.45  // 화면에 표시할 배율 (55~65px 크기 꽃잎)

const PETAL_VARIANTS = [
  { x: 628,  y:  36, w: 137, h: 123 },  // R1-C2 top — 작은 타원
  { x: 838,  y:  31, w: 109, h: 133 },  // R1-C3 top — 세로 타원
  { x: 1010, y:  36, w: 146, h: 128 },  // R1-C4 top — 가로 넓은 타원
  { x: 637,  y: 204, w: 119, h: 142 },  // R1-C2 bot — 세로 긴 타원
  { x: 823,  y: 213, w: 142, h: 123 },  // R1-C3 bot — 가로 타원
  { x: 1025, y: 209, w: 122, h: 132 },  // R1-C4 bot — 비틀린 타원
  { x: 633,  y: 391, w: 118, h: 128 },  // R2-C2 — oval
  { x: 828,  y: 391, w: 128, h: 123 },  // R2-C3 — 넓은 oval
  { x: 1019, y: 386, w: 137, h: 133 },  // R2-C4 — 크레센트
  { x: 423,  y: 563, w: 142, h: 128 },  // R3-C1 — 둥근 타원
  { x: 633,  y: 558, w: 123, h: 142 },  // R3-C2 — 세로 긴
  { x: 828,  y: 559, w: 128, h: 141 },  // R3-C3 — 방울형
  { x: 1019, y: 559, w: 138, h: 141 },  // R3-C4 — 불규칙
  { x: 428,  y: 737, w: 123, h: 140 },  // R4-C1 — 둥근 oval
  { x: 628,  y: 744, w: 137, h: 134 },  // R4-C2 — 가로형
  { x: 842,  y: 735, w: 114, h: 143 },  // R4-C3 — 세로형
  { x: 1019, y: 754, w: 138, h: 109 },  // R4-C4 — 납작한 타원
]

const BG_W = Math.round(SPRITE_W * DISPLAY_SCALE)
const BG_H = Math.round(SPRITE_H * DISPLAY_SCALE)

interface Petal {
  id: number
  left: number
  duration: number
  delay: number
  scale: number
  drift: number
  spin: number
  variant: typeof PETAL_VARIANTS[0]
}

function generatePetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    duration: 12 + Math.random() * 10,
    delay: Math.random() * 8,
    scale: 0.6 + Math.random() * 0.8,
    drift: (Math.random() - 0.5) * 80,
    spin: (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 180),
    variant: PETAL_VARIANTS[i % PETAL_VARIANTS.length],
  }))
}

export function CherryBlossom() {
  const petals = useMemo(() => generatePetals(15), [])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      {petals.map(petal => {
        const dw = Math.round(petal.variant.w * DISPLAY_SCALE)
        const dh = Math.round(petal.variant.h * DISPLAY_SCALE)
        const bx = -Math.round(petal.variant.x * DISPLAY_SCALE)
        const by = -Math.round(petal.variant.y * DISPLAY_SCALE)

        return (
          <div
            key={petal.id}
            style={{
              position: 'absolute',
              left: `${petal.left}%`,
              top: '-80px',
              transform: `scale(${petal.scale})`,
              transformOrigin: 'top center',
              animation: `falling ${petal.duration}s ${petal.delay}s linear infinite`,
              '--drift': `${petal.drift}px`,
              '--spin': `${petal.spin}deg`,
            } as React.CSSProperties}
          >
            <div style={{
              width: dw,
              height: dh,
              backgroundImage: `url(${spriteUrl})`,
              backgroundSize: `${BG_W}px ${BG_H}px`,
              backgroundPosition: `${bx}px ${by}px`,
              backgroundRepeat: 'no-repeat',
              imageRendering: 'pixelated',
              opacity: 0.9,
            }} />
          </div>
        )
      })}
    </div>
  )
}
