import { useState } from 'react'
import { categories, type Category } from '../data/posts'
import { PixelButton } from './PixelButton'

interface HeaderProps {
  activeCategory: Category
  onCategoryChange: (cat: Category) => void
}

export function Header({ activeCategory, onCategoryChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.92)',
      backdropFilter: 'blur(4px)',
      borderBottom: '1.5px solid var(--accent-l)',
      padding: '6px 24px',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: 920,
        margin: '0 auto',
      }}>
        {/* 좌측: 타이틀 + 탭 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{
            fontSize: 14,
            color: 'var(--accent)',
            letterSpacing: '3px',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
          }}>
            🌸 DEV.LOG
          </span>

          {/* 탭 목록 (데스크탑) */}
          <nav style={{
            display: 'flex',
            gap: 4,
            flexWrap: 'wrap',
          }}>
            {categories.map(cat => {
              const isActive = cat === activeCategory
              return (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  style={{
                    padding: '4px 10px',
                    fontSize: '11px',
                    fontFamily: 'Mona, monospace',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    border: isActive
                      ? '1.5px solid var(--accent-dd)'
                      : '1.5px solid transparent',
                    backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                    color: isActive ? 'white' : 'var(--muted)',
                    boxShadow: isActive ? '2px 2px 0 var(--accent-dd)' : 'none',
                    transition: 'all 0.1s',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'var(--accent-bg)'
                      e.currentTarget.style.color = 'var(--accent-d)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = 'var(--muted)'
                    }
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </nav>
        </div>

        {/* 우측: 아이콘 버튼 */}
        <div style={{ display: 'flex', gap: 8 }}>
          <PixelButton
            icon="menu"
            variant="icon"
            title="메뉴"
            onClick={() => setMobileMenuOpen(o => !o)}
          />
          <PixelButton icon="settings" variant="icon" title="설정" />
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <div style={{
          borderTop: '1px solid var(--border)',
          padding: '8px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { onCategoryChange(cat); setMobileMenuOpen(false) }}
              style={{
                padding: '4px 10px',
                fontSize: '11px',
                fontFamily: 'Mona, monospace',
                fontWeight: 'bold',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                border: '1.5px solid var(--border)',
                backgroundColor: cat === activeCategory ? 'var(--accent)' : 'transparent',
                color: cat === activeCategory ? 'white' : 'var(--muted)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
