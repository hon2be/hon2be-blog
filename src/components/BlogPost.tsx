import type { Post } from '../data/posts'

interface BlogPostProps {
  post: Post
  onClick: () => void
}

const CATEGORY_COLORS: Record<string, string> = {
  REACT:      '#61dafb',
  TYPESCRIPT: '#3178c6',
  CSS:        '#f07098',
  DESIGN:     '#c04870',
  PIXEL:      '#7a1038',
}

export function BlogPost({ post, onClick }: BlogPostProps) {
  const badgeColor = CATEGORY_COLORS[post.category] ?? 'var(--accent)'

  return (
    <article
      onClick={onClick}
      style={{
        backgroundColor: 'var(--surface)',
        border: '1.5px solid var(--border)',
        padding: '28px',
        boxShadow: '3px 3px 0 var(--border)',
        position: 'relative',
        cursor: 'pointer',
        transition: 'box-shadow 0.15s, transform 0.15s, border-color 0.15s',
        animation: 'fadeIn 0.4s ease both',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.boxShadow = '4px 4px 0 var(--border-d)'
        el.style.transform = 'translateY(-2px)'
        el.style.borderColor = 'var(--border-d)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.boxShadow = '3px 3px 0 var(--border)'
        el.style.transform = 'translateY(0)'
        el.style.borderColor = 'var(--border)'
      }}
    >
      {/* 카테고리 배지 */}
      <div style={{
        position: 'absolute',
        top: -1,
        right: -1,
        backgroundColor: badgeColor,
        color: 'white',
        fontSize: '10px',
        fontWeight: 'bold',
        letterSpacing: '1px',
        padding: '4px 10px',
        textTransform: 'uppercase',
        boxShadow: `2px 2px 0 rgba(0,0,0,0.25)`,
      }}>
        {post.category}
      </div>

      {/* 제목 */}
      <h3 style={{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'var(--accent-d)',
        marginBottom: 10,
        marginTop: 8,
        lineHeight: 1.4,
        letterSpacing: '0.5px',
      }}>
        {post.title}
      </h3>

      {/* 요약 */}
      <p style={{
        fontSize: 12,
        lineHeight: 1.7,
        color: 'var(--text)',
        marginBottom: 14,
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {post.excerpt}
      </p>

      {/* 날짜 */}
      <time style={{
        fontSize: 10,
        color: 'var(--faint)',
        letterSpacing: '1px',
      }}>
        {post.date}
      </time>
    </article>
  )
}
