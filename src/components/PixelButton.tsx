import { ReactNode, useState } from 'react'

type IconType = 'play' | 'pause' | 'skip' | 'check' | 'close' | 'music' | 'settings' | 'menu' | 'question' | 'back'
type ButtonVariant = 'primary' | 'outline' | 'icon'

interface PixelButtonProps {
  icon?: IconType
  children?: ReactNode
  variant?: ButtonVariant
  onClick?: () => void
  title?: string
}

const PIXEL_SIZE = 2.5

const ICON_PATTERNS: Record<IconType, { x: number; y: number }[]> = {
  play: [
    {x:4,y:2},{x:5,y:2},
    {x:4,y:3},{x:5,y:3},{x:6,y:3},{x:7,y:3},
    {x:4,y:4},{x:5,y:4},{x:6,y:4},{x:7,y:4},{x:8,y:4},{x:9,y:4},
    {x:4,y:5},{x:5,y:5},{x:6,y:5},{x:7,y:5},{x:8,y:5},{x:9,y:5},{x:10,y:5},{x:11,y:5},
    {x:4,y:6},{x:5,y:6},{x:6,y:6},{x:7,y:6},{x:8,y:6},{x:9,y:6},{x:10,y:6},{x:11,y:6},{x:12,y:6},
    {x:4,y:7},{x:5,y:7},{x:6,y:7},{x:7,y:7},{x:8,y:7},{x:9,y:7},{x:10,y:7},{x:11,y:7},{x:12,y:7},
    {x:4,y:8},{x:5,y:8},{x:6,y:8},{x:7,y:8},{x:8,y:8},{x:9,y:8},{x:10,y:8},{x:11,y:8},{x:12,y:8},
    {x:4,y:9},{x:5,y:9},{x:6,y:9},{x:7,y:9},{x:8,y:9},{x:9,y:9},{x:10,y:9},{x:11,y:9},
    {x:4,y:10},{x:5,y:10},{x:6,y:10},{x:7,y:10},{x:8,y:10},{x:9,y:10},
    {x:4,y:11},{x:5,y:11},{x:6,y:11},{x:7,y:11},
    {x:4,y:12},{x:5,y:12},
  ],
  pause: [
    {x:4,y:3},{x:5,y:3},{x:10,y:3},{x:11,y:3},
    {x:4,y:4},{x:5,y:4},{x:10,y:4},{x:11,y:4},
    {x:4,y:5},{x:5,y:5},{x:10,y:5},{x:11,y:5},
    {x:4,y:6},{x:5,y:6},{x:10,y:6},{x:11,y:6},
    {x:4,y:7},{x:5,y:7},{x:10,y:7},{x:11,y:7},
    {x:4,y:8},{x:5,y:8},{x:10,y:8},{x:11,y:8},
    {x:4,y:9},{x:5,y:9},{x:10,y:9},{x:11,y:9},
    {x:4,y:10},{x:5,y:10},{x:10,y:10},{x:11,y:10},
    {x:4,y:11},{x:5,y:11},{x:10,y:11},{x:11,y:11},
    {x:4,y:12},{x:5,y:12},{x:10,y:12},{x:11,y:12},
  ],
  skip: [
    {x:3,y:4},{x:4,y:4},{x:3,y:5},{x:4,y:5},{x:5,y:5},{x:6,y:5},
    {x:3,y:6},{x:4,y:6},{x:5,y:6},{x:6,y:6},{x:7,y:6},{x:8,y:6},
    {x:3,y:7},{x:4,y:7},{x:5,y:7},{x:6,y:7},{x:7,y:7},{x:8,y:7},{x:9,y:7},
    {x:3,y:8},{x:4,y:8},{x:5,y:8},{x:6,y:8},{x:7,y:8},{x:8,y:8},
    {x:3,y:9},{x:4,y:9},{x:5,y:9},{x:6,y:9},
    {x:3,y:10},{x:4,y:10},
    {x:11,y:4},{x:12,y:4},{x:11,y:5},{x:12,y:5},{x:11,y:6},{x:12,y:6},
    {x:11,y:7},{x:12,y:7},{x:11,y:8},{x:12,y:8},{x:11,y:9},{x:12,y:9},
    {x:11,y:10},{x:12,y:10},
  ],
  check: [
    {x:11,y:3},{x:12,y:3},
    {x:10,y:4},{x:11,y:4},{x:12,y:4},
    {x:9,y:5},{x:10,y:5},{x:11,y:5},
    {x:8,y:6},{x:9,y:6},{x:10,y:6},
    {x:7,y:7},{x:8,y:7},{x:9,y:7},
    {x:6,y:8},{x:7,y:8},{x:8,y:8},
    {x:5,y:9},{x:6,y:9},{x:7,y:9},
    {x:4,y:10},{x:5,y:10},{x:6,y:10},
    {x:3,y:11},{x:4,y:11},{x:5,y:11},
    {x:3,y:12},{x:4,y:12},
  ],
  close: [
    {x:3,y:3},{x:4,y:3},{x:11,y:3},{x:12,y:3},
    {x:4,y:4},{x:5,y:4},{x:10,y:4},{x:11,y:4},
    {x:5,y:5},{x:6,y:5},{x:9,y:5},{x:10,y:5},
    {x:6,y:6},{x:7,y:6},{x:8,y:6},{x:9,y:6},
    {x:7,y:7},{x:8,y:7},
    {x:6,y:8},{x:7,y:8},{x:8,y:8},{x:9,y:8},
    {x:5,y:9},{x:6,y:9},{x:9,y:9},{x:10,y:9},
    {x:4,y:10},{x:5,y:10},{x:10,y:10},{x:11,y:10},
    {x:3,y:11},{x:4,y:11},{x:11,y:11},{x:12,y:11},
  ],
  music: [
    {x:11,y:2},{x:12,y:2},
    {x:10,y:3},{x:11,y:3},{x:12,y:3},
    {x:9,y:4},{x:10,y:4},{x:12,y:4},
    {x:8,y:5},{x:9,y:5},{x:12,y:5},
    {x:8,y:6},{x:12,y:6},{x:8,y:7},{x:12,y:7},{x:8,y:8},{x:12,y:8},
    {x:6,y:9},{x:7,y:9},{x:8,y:9},{x:10,y:9},{x:11,y:9},{x:12,y:9},
    {x:5,y:10},{x:6,y:10},{x:7,y:10},{x:8,y:10},{x:9,y:10},{x:10,y:10},{x:11,y:10},{x:12,y:10},
    {x:4,y:11},{x:5,y:11},{x:6,y:11},{x:7,y:11},{x:9,y:11},{x:10,y:11},{x:11,y:11},
    {x:5,y:12},{x:6,y:12},{x:10,y:12},{x:11,y:12},
  ],
  settings: [
    {x:7,y:2},{x:8,y:2},
    {x:6,y:3},{x:7,y:3},{x:8,y:3},{x:9,y:3},
    {x:4,y:4},{x:5,y:4},{x:6,y:4},{x:9,y:4},{x:10,y:4},{x:11,y:4},
    {x:3,y:5},{x:4,y:5},{x:11,y:5},{x:12,y:5},
    {x:3,y:6},{x:4,y:6},{x:11,y:6},{x:12,y:6},
    {x:5,y:7},{x:6,y:7},{x:7,y:7},{x:8,y:7},{x:9,y:7},{x:10,y:7},
    {x:5,y:8},{x:6,y:8},{x:7,y:8},{x:8,y:8},{x:9,y:8},{x:10,y:8},
    {x:3,y:9},{x:4,y:9},{x:11,y:9},{x:12,y:9},
    {x:3,y:10},{x:4,y:10},{x:11,y:10},{x:12,y:10},
    {x:4,y:11},{x:5,y:11},{x:6,y:11},{x:9,y:11},{x:10,y:11},{x:11,y:11},
    {x:6,y:12},{x:7,y:12},{x:8,y:12},{x:9,y:12},
    {x:7,y:13},{x:8,y:13},
  ],
  menu: [
    {x:3,y:4},{x:4,y:4},{x:5,y:4},{x:6,y:4},{x:7,y:4},{x:8,y:4},{x:9,y:4},{x:10,y:4},{x:11,y:4},{x:12,y:4},
    {x:3,y:5},{x:4,y:5},{x:5,y:5},{x:6,y:5},{x:7,y:5},{x:8,y:5},{x:9,y:5},{x:10,y:5},{x:11,y:5},{x:12,y:5},
    {x:3,y:7},{x:4,y:7},{x:5,y:7},{x:6,y:7},{x:7,y:7},{x:8,y:7},{x:9,y:7},{x:10,y:7},{x:11,y:7},{x:12,y:7},
    {x:3,y:8},{x:4,y:8},{x:5,y:8},{x:6,y:8},{x:7,y:8},{x:8,y:8},{x:9,y:8},{x:10,y:8},{x:11,y:8},{x:12,y:8},
    {x:3,y:10},{x:4,y:10},{x:5,y:10},{x:6,y:10},{x:7,y:10},{x:8,y:10},{x:9,y:10},{x:10,y:10},{x:11,y:10},{x:12,y:10},
    {x:3,y:11},{x:4,y:11},{x:5,y:11},{x:6,y:11},{x:7,y:11},{x:8,y:11},{x:9,y:11},{x:10,y:11},{x:11,y:11},{x:12,y:11},
  ],
  question: [
    {x:5,y:2},{x:6,y:2},{x:7,y:2},{x:8,y:2},{x:9,y:2},{x:10,y:2},
    {x:4,y:3},{x:5,y:3},{x:10,y:3},{x:11,y:3},
    {x:3,y:4},{x:4,y:4},{x:11,y:4},{x:12,y:4},
    {x:3,y:5},{x:4,y:5},{x:11,y:5},{x:12,y:5},
    {x:10,y:6},{x:11,y:6},{x:12,y:6},
    {x:9,y:7},{x:10,y:7},{x:8,y:8},{x:9,y:8},
    {x:7,y:9},{x:8,y:9},{x:7,y:10},{x:8,y:10},
    {x:7,y:12},{x:8,y:12},{x:7,y:13},{x:8,y:13},
  ],
  back: [
    {x:8,y:3},{x:7,y:4},{x:8,y:4},{x:6,y:5},{x:7,y:5},{x:8,y:5},
    {x:5,y:6},{x:6,y:6},{x:7,y:6},{x:8,y:6},{x:9,y:6},{x:10,y:6},{x:11,y:6},{x:12,y:6},
    {x:4,y:7},{x:5,y:7},{x:6,y:7},{x:7,y:7},{x:8,y:7},{x:9,y:7},{x:10,y:7},{x:11,y:7},{x:12,y:7},
    {x:5,y:8},{x:6,y:8},{x:7,y:8},{x:8,y:8},{x:9,y:8},{x:10,y:8},{x:11,y:8},{x:12,y:8},
    {x:6,y:9},{x:7,y:9},{x:8,y:9},
    {x:7,y:10},{x:8,y:10},
    {x:8,y:11},
  ],
}

function PixelIcon({ type, color = 'white' }: { type: IconType; color?: string }) {
  const pattern = ICON_PATTERNS[type] ?? []
  return (
    <div style={{
      position: 'relative',
      width: 16 * PIXEL_SIZE,
      height: 16 * PIXEL_SIZE,
      imageRendering: 'pixelated',
      flexShrink: 0,
    }}>
      {pattern.map((px, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: px.x * PIXEL_SIZE,
            top: px.y * PIXEL_SIZE,
            width: PIXEL_SIZE,
            height: PIXEL_SIZE,
            backgroundColor: color,
            imageRendering: 'pixelated',
          }}
        />
      ))}
    </div>
  )
}

export function PixelButton({ icon, children, variant = 'primary', onClick, title }: PixelButtonProps) {
  const [pressed, setPressed] = useState(false)
  const [hovered, setHovered] = useState(false)

  const styles = (() => {
    if (variant === 'outline') return {
      bg: 'var(--surface)',
      border: 'var(--border-d)',
      shadow: '2px 2px 0 var(--border)',
      shadowHover: '1px 1px 0 var(--border)',
      shadowActive: '3px 3px 0 var(--border)',
      color: 'var(--accent)',
      iconColor: 'var(--accent)',
    }
    return {
      bg: 'var(--accent)',
      border: 'var(--accent-dd)',
      shadow: '3px 3px 0 var(--accent-dd)',
      shadowHover: '2px 2px 0 var(--accent-dd)',
      shadowActive: '4px 4px 0 var(--accent-dd)',
      color: 'white',
      iconColor: 'white',
    }
  })()

  const isIconOnly = variant === 'icon' || (icon != null && !children)
  const currentShadow = pressed ? styles.shadowActive : hovered ? styles.shadowHover : styles.shadow
  const currentTransform = pressed ? 'translate(-1px, -1px)' : hovered ? 'translate(1px, 1px)' : 'translate(0, 0)'

  return (
    <button
      title={title}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false) }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: isIconOnly ? 36 : 'auto',
        height: 36,
        padding: isIconOnly ? 0 : '0 20px',
        minWidth: isIconOnly ? 36 : 80,
        backgroundColor: styles.bg,
        border: `1.5px solid ${styles.border}`,
        boxShadow: currentShadow,
        color: styles.color,
        letterSpacing: '2px',
        fontSize: '11px',
        fontFamily: 'Mona, monospace',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        imageRendering: 'pixelated',
        cursor: 'pointer',
        transform: currentTransform,
        transition: 'box-shadow 0.05s, transform 0.05s',
        userSelect: 'none',
      }}
    >
      {icon && <PixelIcon type={icon} color={styles.iconColor} />}
      {children && <span>{children}</span>}
    </button>
  )
}
