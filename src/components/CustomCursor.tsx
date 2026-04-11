import { useEffect, useRef, useState } from 'react'
import spriteUrl from '../assets/cherry-blossom.png'

const SIZE = 32

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [spinning, setSpinning] = useState(false)
  const [dataUrl, setDataUrl] = useState('')

  // 스프라이트에서 blossom 잘라 dataURL 생성
  useEffect(() => {
    const img = new Image()
    img.src = spriteUrl
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = SIZE
      canvas.height = SIZE
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 191, 531, 216, 197, 0, 0, SIZE, SIZE)
      setDataUrl(canvas.toDataURL())
    }
  }, [])

  // 마우스 위치 추적 (React state 없이 DOM 직접 업데이트 — 렌더 0회)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
    }

    const onOver = (e: MouseEvent) => {
      const interactive = (e.target as HTMLElement).closest(
        'button, a, [role="button"], input, select, textarea, label'
      )
      setSpinning(!!interactive)
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [])

  if (!dataUrl) return null

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 99999,
        width: SIZE,
        height: SIZE,
        transform: 'translate(-50%, -50%)',
        animation: spinning ? 'cursorSpin 0.7s linear infinite' : 'none',
        imageRendering: 'pixelated',
      }}
    >
      <img
        src={dataUrl}
        width={SIZE}
        height={SIZE}
        style={{ imageRendering: 'pixelated', display: 'block' }}
      />
    </div>
  )
}
