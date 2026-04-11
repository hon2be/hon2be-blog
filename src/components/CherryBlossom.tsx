import { useMemo } from 'react'
import spriteUrl from '../assets/cherry-blossom.png'

// 스프라이트 시트의 꽃잎 위치 (추정치 — 실측 시 조정 가능)
// 이미지 크기: ~600×460px, 꽃잎 격자는 우측에 배치
const PETAL_VARIANTS = [
  { x: 228, y: 32,  w: 72, h: 78 },  // oval-flat
  { x: 310, y: 32,  w: 72, h: 78 },  // crescent
  { x: 400, y: 32,  w: 82, h: 78 },  // side-view
  { x: 490, y: 32,  w: 82, h: 78 },  // wide-oval
  { x: 228, y: 118, w: 72, h: 82 },  // oval-medium
  { x: 310, y: 118, w: 72, h: 82 },  // tear-drop
  { x: 400, y: 118, w: 82, h: 82 },  // curl-left
  { x: 490, y: 118, w: 82, h: 82 },  // folded
]

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
    scale: 0.5 + Math.random() * 0.9,
    drift: (Math.random() - 0.5) * 80,
    spin: (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 180),
    variant: PETAL_VARIANTS[Math.floor(Math.random() * PETAL_VARIANTS.length)],
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
      {petals.map(petal => (
        <div
          key={petal.id}
          style={{
            position: 'absolute',
            left: `${petal.left}%`,
            top: '-60px',
            transform: `scale(${petal.scale})`,
            transformOrigin: 'top center',
            animation: `falling ${petal.duration}s ${petal.delay}s linear infinite`,
            '--drift': `${petal.drift}px`,
            '--spin': `${petal.spin}deg`,
          } as React.CSSProperties}
        >
          <img
            src={spriteUrl}
            alt=""
            style={{
              width: petal.variant.w,
              height: petal.variant.h,
              objectFit: 'none',
              objectPosition: `-${petal.variant.x}px -${petal.variant.y}px`,
              imageRendering: 'pixelated',
              opacity: 0.85,
              display: 'block',
            }}
          />
        </div>
      ))}
    </div>
  )
}
