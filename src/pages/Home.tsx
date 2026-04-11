import { useState } from 'react'
import { Header } from '../components/Header'
import { Profile } from '../components/Profile'
import { BlogPost } from '../components/BlogPost'
import { PixelButton } from '../components/PixelButton'
import { posts, categories, type Category } from '../data/posts'

interface HomeProps {
  onNavigate: (slug: string) => void
}

function Divider() {
  return (
    <div style={{
      height: 2,
      background: 'linear-gradient(90deg, transparent, var(--accent) 30%, var(--accent-l) 70%, transparent)',
      margin: '0 0 32px 0',
    }} />
  )
}

export function Home({ onNavigate }: HomeProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('ALL')
  const [visibleCount, setVisibleCount] = useState(6)

  const filtered = activeCategory === 'ALL'
    ? posts
    : posts.filter(p => p.category === activeCategory)

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat)
    setVisibleCount(6)
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <Header
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <main style={{
        maxWidth: 920,
        margin: '0 auto',
        padding: '32px 24px',
        position: 'relative',
        zIndex: 1,
      }}>
        <Profile />
        <Divider />

        {/* 포스트 그리드 */}
        {visible.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 18,
            marginBottom: 32,
          }}>
            {visible.map(post => (
              <BlogPost
                key={post.slug}
                post={post}
                onClick={() => onNavigate(post.slug)}
              />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '64px 0',
            color: 'var(--faint)',
            fontSize: 13,
            letterSpacing: '1px',
          }}>
            해당 카테고리의 글이 없습니다.
          </div>
        )}

        {hasMore && (
          <>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
              <PixelButton onClick={() => setVisibleCount(c => c + 4)}>
                LOAD MORE
              </PixelButton>
            </div>
          </>
        )}

        {/* 푸터 */}
        <footer style={{
          marginTop: 48,
          textAlign: 'center',
          fontSize: 10,
          color: 'var(--faint)',
          letterSpacing: '2px',
          paddingBottom: 24,
        }}>
          🌸 CHERRY.DEV — {categories.length - 1} CATEGORIES · {posts.length} POSTS
        </footer>
      </main>
    </div>
  )
}
