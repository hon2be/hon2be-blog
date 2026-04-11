import { useEffect, useState } from 'react'
import spriteUrl from '../assets/cherry-blossom.png'

interface Props {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: Props) {
  const [phase, setPhase] = useState<'tree' | 'bloom' | 'done'>('tree')
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('bloom'), 1600)
    const t2 = setTimeout(() => {
      setFadeOut(true)
    }, 2800)
    const t3 = setTimeout(() => onComplete(), 3400)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 32,
      animation: fadeOut ? 'screenFadeOut 0.6s forwards' : undefined,
    }}>
      {/* 벚꽃 나무 — 스프라이트 좌상단 영역 */}
      <div style={{
        position: 'relative',
        width: 220,
        height: 310,
        overflow: 'hidden',
      }}>
        {/* 트리 reveal 애니메이션 */}
        <img
          src={spriteUrl}
          alt="벚꽃 나무"
          style={{
            width: 220,
            height: 310,
            objectFit: 'none',
            objectPosition: '0px 0px',
            imageRendering: 'pixelated',
            display: 'block',
            animation: 'treeReveal 1.4s ease-out forwards',
          }}
        />
        {/* 꽃 개화 — 수관 영역에 bloom 오버레이 */}
        {phase === 'bloom' && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '60%',
            background: 'radial-gradient(circle at 50% 60%, var(--accent-xl) 0%, transparent 70%)',
            animation: 'bloomPop 0.6s ease-out forwards',
            pointerEvents: 'none',
          }} />
        )}
      </div>

      {/* 타이틀 */}
      <div style={{
        textAlign: 'center',
        animation: 'fadeIn 0.8s 0.5s both',
      }}>
        <div style={{
          fontSize: 14,
          color: 'var(--accent)',
          letterSpacing: '4px',
          fontWeight: 'bold',
          marginBottom: 12,
        }}>
          🌸 DEV.LOG
        </div>
        {/* 로딩 도트 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              style={{
                width: 6,
                height: 16,
                backgroundColor: 'var(--accent)',
                animation: `loadingDot 1s ${i * 0.2}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
