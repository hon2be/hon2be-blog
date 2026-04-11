import { useState, useEffect } from 'react'
import { CherryBlossom } from './components/CherryBlossom'
import { LoadingScreen } from './components/LoadingScreen'
import { Home } from './pages/Home'
import { PostDetail } from './pages/PostDetail'

type Route =
  | { type: 'home' }
  | { type: 'post'; slug: string }

function parseHash(hash: string): Route {
  const path = hash.replace(/^#/, '') || '/'
  const match = path.match(/^\/post\/(.+)$/)
  if (match) return { type: 'post', slug: match[1] }
  return { type: 'home' }
}

export function App() {
  const [loading, setLoading] = useState(true)
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash))

  // 해시 변경 감지
  useEffect(() => {
    const handler = () => setRoute(parseHash(window.location.hash))
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  // 페이지 전환 시 상단으로 스크롤
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [route])

  const navigate = (to: string) => {
    window.location.hash = to
  }

  const handlePostClick = (slug: string) => navigate(`/post/${slug}`)
  const handleBack = () => navigate('/')

  return (
    <>
      {/* 항상 렌더링 — z-0 배경 */}
      <CherryBlossom />

      {/* 로딩 화면 */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* 메인 콘텐츠 */}
      {!loading && (
        <>
          {route.type === 'home' && (
            <Home onNavigate={handlePostClick} />
          )}
          {route.type === 'post' && (
            <PostDetail slug={route.slug} onBack={handleBack} />
          )}
        </>
      )}
    </>
  )
}
