/**
 * 블로그 카테고리 목록
 * 새 카테고리 추가 시 이 파일만 수정하면 Header 탭과 Post 필터에 자동 반영됩니다.
 */
export const categories = ['ALL', 'REACT', 'TYPESCRIPT', 'CSS', 'DESIGN', 'PIXEL', 'AI'] as const
export type Category = typeof categories[number]
