import spriteUrl from '../assets/cherry-blossom.png'

/** 라우트 청크 로드 등 Suspense fallback용 — 타이머로 콘텐츠를 막지 않음 */
export function LoadingScreen() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="페이지 로딩 중"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
      }}
    >
      <div style={{
        position: 'relative',
        width: 220,
        height: 195,
        overflow: 'hidden',
      }}>
        <div style={{
          width: 220,
          height: 195,
          backgroundImage: `url(${spriteUrl})`,
          backgroundSize: `${Math.round(1178 * 0.4)}px ${Math.round(896 * 0.4)}px`,
          backgroundPosition: `${-Math.round(19 * 0.4)}px ${-Math.round(40 * 0.4)}px`,
          backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated',
          animation: 'treeReveal 1.4s ease-out forwards',
        }} />
      </div>

      <div style={{
        textAlign: 'center',
        animation: 'fadeIn 0.8s 0.2s both',
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
