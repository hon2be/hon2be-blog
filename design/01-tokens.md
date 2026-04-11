# 01. Design Tokens

> 소스: `src/styles/theme.css`

---

## 컬러

### 색상 기준

UI 색상 팔레트는 벚꽃 스프라이트 이미지(`design/Gemini_Generated_Image_canyhgcanyhgcany.png`)의
꽃잎 중간 분홍(#F07098)과 짙은 마룬 외곽선(#7A1038)을 기준으로 도출한다.

### 액센트 (Cherry Pink)

| 토큰 | 값 | 근거 |
|------|-----|------|
| `--accent` | `#f07098` | 꽃잎 중간 분홍 — 스프라이트 주 fill 색상 |
| `--accent-d` | `#c04870` | 꽃잎 그림자 분홍 (#d44080 대비 UI용으로 조정) |
| `--accent-dd` | `#7a1038` | 꽃잎 외곽선 마룬 — 그림자, 테두리, 가장 어두운 강조 |
| `--accent-l` | `#f9a8c4` | 꽃잎 밝은 분홍 (#ffb3d9 계열) |
| `--accent-xl` | `#ffd6e8` | 꽃잎 연밝음 (#ffd0e8 계열) |
| `--accent-bg` | `#fef0f5` | 매우 연한 배경 핑크 |

### 중립 (Neutral)

| 토큰 | 값 | 사용처 |
|------|-----|--------|
| `--bg` | `#fdf5fb` | 페이지 배경 |
| `--surface` | `#ffffff` | 카드, 패널, 드롭다운 배경 |
| `--border` | `#f9c0d8` | 기본 테두리 (스프라이트 연분홍 계열) |
| `--border-d` | `#f09ab8` | 호버 시 테두리 |
| `--text` | `#2a1020` | 본문 텍스트 (기본) |
| `--muted` | `#8a5070` | 보조 텍스트, 플레이스홀더 |
| `--faint` | `#c090b0` | 날짜, 메타 정보 등 희미한 텍스트 |

### 픽셀 아트 전용 컬러 (하드코딩)

꽃잎 스프라이트는 4단계 분홍 + 외곽선 + 하이라이트, 총 6색 팔레트를 사용한다.

```
꽃잎 외곽선(outline): #6B0830  (짙은 마룬 — 두꺼운 픽셀 테두리, 필수)
꽃잎 그림자(shadow):  #d44080  (진한 분홍 — 외곽선 안쪽)
꽃잎 중간(mid):       #f472a8  (중간 분홍 — 주 채움 색상)
꽃잎 밝음(light):     #ffb3d9  (연분홍 — 밝은 영역)
꽃잎 하이라이트(hi):  #ffffff  (흰색 — 상단 좌측 광택 블롭, 꽃잎 면적의 ~30%)
꽃잎 연밝음(xlight):  #ffd0e8  (매우 연한 분홍 — 하이라이트 주변 전환)

꽃 수술:  #f5c518  (노란 수술 — cherry blossom 정면 스프라이트 전용)
          #e8a800  (어두운 노랑 — 수술 그림자)

로딩 트리 줄기 어둠:   #2C1810  (거의 검정에 가까운 갈색 — 외곽선)
로딩 트리 줄기 중간:   #4A2815, #5C3825
로딩 트리 줄기 밝음:   #7A4828  (하이라이트)
로딩 트리 수관(층1):   #ffd0e8  (가장 밝은 분홍 — 수관 상단)
로딩 트리 수관(층2):   #ffb3d9  (연분홍)
로딩 트리 수관(층3):   #f48fb1  (중간 분홍)
로딩 트리 수관(층4):   #e879a0  (진한 분홍 — 수관 하단 그림자)
로딩 트리 하이라이트:  #ffffff  (수관 내 반짝임 점)
```

### 규칙

- CSS 변수(`--accent` 등)를 사용한다. 하드코딩된 핑크 hex 값을 컴포넌트에 직접 쓰지 않는다.
- 픽셀 아트 그래픽(꽃잎, 로딩 트리)에 한해 인라인 hex 값 허용.
- 어두운 테마(dark mode)는 현재 지원하지 않는다. `dark:` Tailwind 클래스를 추가하지 않는다.

---

## 타이포그래피

### 폰트

```css
font-family: 'Mona', monospace;
```

- CDN: `https://cdn.jsdelivr.net/gh/MonadABXY/mona-font/web/mona.css`
- 예외 없이 모든 요소에 단일 폰트 패밀리를 적용한다.
- `*` 셀렉터로 전역 적용되므로 개별 컴포넌트에서 재정의하지 않는다.

### 폰트 사이즈 스케일

| 용도 | 크기 | 추가 속성 |
|------|------|-----------|
| 헤더 타이틀 | `14px` | `letterSpacing: 3px`, bold |
| 섹션 헤딩 (h2) | `18px` | `letterSpacing: 2px`, bold |
| 카드 타이틀 (h3) | `16px` | bold |
| 버튼 텍스트 | `11px` | `letterSpacing: 2px`, bold, uppercase |
| 본문 | `12px` | `lineHeight: 1.6` |
| 탭 레이블 | `11px` | `letterSpacing: 1px` |
| 카테고리 배지 | `10px` | `letterSpacing: 1px` |
| 날짜/메타 | `10px` | `color: var(--faint)` |

### 규칙

- 텍스트는 항상 `uppercase` + `letterSpacing` 조합으로 픽셀 레트로 느낌을 유지한다.
- `font-weight: bold`가 기본. normal weight는 본문 excerpt에만 허용.
- `line-height: 1.6`은 본문 텍스트 전용. UI 레이블은 기본값 사용.

---

## 스페이싱

### 핵심 단위

스페이싱은 Tailwind 유틸리티 또는 인라인 스타일 px 값으로 지정한다. 암묵적 기본 단위는 `4px`.

| 역할 | 값 | 예시 |
|------|----|------|
| 아이콘 내부 패딩 (icon 버튼) | `0` | PixelButton icon-only |
| 버튼 좌우 패딩 | `20px` | PixelButton with text |
| 버튼 높이 | `36px` | 모든 PixelButton |
| 버튼 최소 너비 | `80px` | 텍스트 포함 버튼 |
| 카드 내부 패딩 | `28px` (BlogPost), `32px` (Profile) | |
| 헤더 세로 패딩 | `6px` | |
| 헤더 가로 패딩 | `24px` | |
| 메인 컨텐츠 패딩 | `32px 24px` | |
| 그리드 갭 | `18px` | 블로그 포스트 그리드 |
| 섹션 간격 | `32px` | 구분선 하단 여백 |
| 컴포넌트 내 갭 | `16px` | 버튼/태그 그룹 |

### 규칙

- 스페이싱을 임의 값으로 추가하지 않는다. 위 표의 값 중 가장 가까운 것을 사용한다.
- Tailwind arbitrary values(`p-[13px]` 등)는 사용하지 않는다.

---

## 테두리 & 그림자

### 테두리

```css
border-width: 1.5px;
border-radius: 0 !important;  /* 전역 강제 적용 */
```

- 모든 요소의 모서리는 `0`이다. `rounded-*` Tailwind 클래스를 사용하지 않는다.
- 테두리 너비는 `1.5px`이 표준. 구분선(divider)은 `2px`.

### 박스 그림자 (픽셀 오프셋 스타일)

| 컨텍스트 | 기본 | 호버 | 클릭(active) |
|----------|------|------|--------------|
| Primary 버튼 | `3px 3px 0 var(--accent-dd)` | `2px 2px 0 var(--accent-dd)` | `4px 4px 0 var(--accent-dd)` |
| Outline 버튼 | `2px 2px 0 var(--border)` | `1px 1px 0 var(--border)` | `3px 3px 0 var(--border)` |
| 카드 (기본) | `3px 3px 0 var(--border)` | `4px 4px 0 var(--border-d)` | — |
| 카테고리 배지 탭 | `2px 0 0 var(--accent-dd)` | — | — |

- 그림자는 항상 blur 없이 단색 오프셋(`0 blur`)만 사용한다.
- `box-shadow: 0 4px 6px rgba(...)` 같은 부드러운 그림자는 사용하지 않는다.

### 배경 폴카닷

```css
/* --accent 색상 변경에 따라 hex 값 업데이트 */
background-image: radial-gradient(circle, #f0709818 1px, transparent 1px);
background-size: 20px 20px;
```

- `#f07098` = `--accent` 값, `18` = 10% 투명도 hex.
- `body`에만 적용. `--accent` 값이 바뀌면 이 hex도 함께 업데이트한다.
