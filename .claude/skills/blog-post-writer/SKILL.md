---
name: 블로그 글쓰기
description: 블로그에 새 포스트를 추가하고 Git에 자동 커밋합니다. JSON 파일 자동 생성 + 커밋 + 선택적 push.
---

# 블로그 글쓰기

블로그에 새 포스트를 추가합니다. JSON 파일 자동 생성 + Git 커밋까지 한 번에.

## 사용법

Claude에게 다음과 같이 말하세요:

- "블로그에 noop 글 올려줘"
- "블로그에 새 포스트 추가"
- "/blog-post-writer"

## 입력 정보

스킬은 다음을 물어봅니다:

1. **제목** (title): 포스트 제목
2. **슬러그** (slug): URL에 사용할 슬러그 (예: `noop-intro`)
3. **카테고리** (category): 포스트 카테고리 (AI, REACT, TYPESCRIPT, CSS, DESIGN, PIXEL)
4. **발행일** (date): 발행 날짜 (YYYY.MM.DD 형식)
5. **요약** (excerpt): 짧은 설명 (한 두 문장)
6. **본문** (content): HTML 형식의 포스트 본문

## 실행 결과

- ✅ `src/data/posts/{slug}.json` 파일 생성
- ✅ Git commit ("✨ Add post: {title}")
- ✅ 선택: 자동 push (origin/main)

## 주의사항

- 슬러그는 **영문 소문자 + 하이픈**만 사용
- 날짜 형식은 반드시 `YYYY.MM.DD`
- HTML 본문에 마크업 포함 가능

## 예시

```json
{
  "slug": "noop-intro",
  "title": "noop — Claude Code 유휴 시간에 배우기",
  "date": "2026.04.27",
  "category": "AI",
  "excerpt": "빌드 대기 시간을 미니게임으로 채우는 Claude Code 스킬을 소개합니다.",
  "content": "<h2>noop이란</h2>\n<p>...</p>"
}
```

## 설치

이 파일과 `main.py`를 다음 위치에 복사하세요:

```
/Users/honeybee/projects/cherry-blog/.claude/skills/blog-post-writer/
```
