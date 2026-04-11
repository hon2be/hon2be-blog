import { categories, type Category } from '../data/categories'

interface HeaderProps {
  activeCategory: Category
  onCategoryChange: (cat: Category) => void
}

export function Header({ activeCategory, onCategoryChange }: HeaderProps) {
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
        gap: 12,
        flexWrap: 'wrap',
        maxWidth: 920,
        margin: '0 auto',
      }}>
        <span style={{
          fontSize: 14,
          color: 'var(--accent)',
          letterSpacing: '3px',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
        }}>
          🌸 DEV.LOG
        </span>

        <nav style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {categories.map(cat => {
            const isActive = cat === activeCategory
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                style={{
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontFamily: 'inherit',
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
    </header>
  )
}
