import { type Category } from './categories'

export type { Category }
export { categories } from './categories'

export interface Post {
  slug: string
  title: string
  date: string
  category: Exclude<Category, 'ALL'>
  excerpt: string
  content: string
}

// Glob으로 posts/ 폴더의 모든 JSON 파일 동적 로드
const postModules = import.meta.glob<{ default: Post }>('./posts/*.json', {
  eager: true,
})

// JSON 파일들을 Post 배열로 변환
const loadedPosts = Object.values(postModules).map(module => module.default)

// 날짜 역순 정렬 (최신 글이 먼저)
export const posts: Post[] = loadedPosts.sort((a, b) => {
  const dateA = new Date(a.date.replace(/\./g, '-')).getTime()
  const dateB = new Date(b.date.replace(/\./g, '-')).getTime()
  return dateB - dateA
})
