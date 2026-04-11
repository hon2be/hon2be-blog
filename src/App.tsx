import { Suspense, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { CherryBlossom } from './components/CherryBlossom'
import { CustomCursor } from './components/CustomCursor'
import { LoadingScreen } from './components/LoadingScreen'

const MIN_LOADING_MS = 3000

const delay = (ms: number) =>
  new Promise<void>(resolve => {
    setTimeout(resolve, ms)
  })

type Route =
  | { type: 'home' }
  | { type: 'post'; slug: string }

type RouteHandlers = {
  onNavigate: (slug: string) => void
  onBack: () => void
}

type RouteReadResource = { read: () => ReactNode }

function parseHash(hash: string): Route {
  const path = hash.replace(/^#/, '') || '/'
  const match = path.match(/^\/post\/(.+)$/)
  if (match) return { type: 'post', slug: match[1] }
  return { type: 'home' }
}

/**
 * 동적 import + 최소 대기를 하나의 Promise로 묶음 → Suspense fallback 하나만 쓰면 됨.
 * Strict Mode 이중 마운트에서 서로 다른 Promise가 생기지 않도록 슬롯을 하나만 둠.
 */
let routeResourceSlot: { cacheKey: string; resource: RouteReadResource } | null = null

function getRouteResource(cacheKey: string, create: () => RouteReadResource): RouteReadResource {
  if (!routeResourceSlot || routeResourceSlot.cacheKey !== cacheKey) {
    routeResourceSlot = { cacheKey, resource: create() }
  }
  return routeResourceSlot.resource
}

function createRouteReadResource(
  route: Route,
  loadStartedAt: number,
  minMs: number,
  handlers: RouteHandlers,
): RouteReadResource {
  let status: 'pending' | 'success' | 'error' = 'pending'
  let node: ReactNode = null
  let err: unknown

  const waitMs = Math.max(0, minMs - (Date.now() - loadStartedAt))

  const promise = Promise.all([
    route.type === 'home'
      ? import('./pages/Home')
      : import('./pages/PostDetail'),
    delay(waitMs),
  ])
    .then(([mod]) => {
      if (route.type === 'home') {
        const { Home } = mod as typeof import('./pages/Home')
        node = <Home onNavigate={handlers.onNavigate} />
      } else {
        const { PostDetail } = mod as typeof import('./pages/PostDetail')
        node = <PostDetail slug={route.slug} onBack={handlers.onBack} />
      }
      status = 'success'
    })
    .catch(e => {
      status = 'error'
      err = e
    })

  return {
    read() {
      if (status === 'pending') throw promise
      if (status === 'error') throw err
      return node!
    },
  }
}

function ReadRoute({
  route,
  loadStartedAt,
  minMs,
  handlers,
}: {
  route: Route
  loadStartedAt: number
  minMs: number
  handlers: RouteHandlers
}) {
  const routeKey = route.type === 'post' ? `post:${route.slug}` : 'home'
  const cacheKey = `${routeKey}@${loadStartedAt}`

  const resource = useMemo(
    () =>
      getRouteResource(cacheKey, () =>
        createRouteReadResource(route, loadStartedAt, minMs, handlers),
      ),
    [cacheKey, route, loadStartedAt, minMs, handlers],
  )

  return resource.read()
}

export function App() {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash))
  const [loadStartedAt, setLoadStartedAt] = useState(() => Date.now())

  // 해시 변경 감지 (로딩 구간 기준 시각)
  useEffect(() => {
    const handler = () => {
      setLoadStartedAt(Date.now())
      setRoute(parseHash(window.location.hash))
    }
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  // 페이지 전환 시 상단으로 스크롤
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [route])

  const navigate = useCallback((to: string) => {
    window.location.hash = to
  }, [])

  const handlePostClick = useCallback(
    (slug: string) => {
      navigate(`/post/${slug}`)
    },
    [navigate],
  )

  const handleBack = useCallback(() => {
    navigate('/')
  }, [navigate])

  const handlers = useMemo<RouteHandlers>(
    () => ({
      onNavigate: handlePostClick,
      onBack: handleBack,
    }),
    [handlePostClick, handleBack],
  )

  const routeKey = route.type === 'post' ? `post:${route.slug}` : 'home'

  return (
    <>
      <CustomCursor />
      <CherryBlossom />

      <Suspense fallback={<LoadingScreen />}>
        <ReadRoute
          key={routeKey}
          route={route}
          loadStartedAt={loadStartedAt}
          minMs={MIN_LOADING_MS}
          handlers={handlers}
        />
      </Suspense>
    </>
  )
}
