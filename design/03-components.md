# 03. Components

> 소스: `src/app/components/`

---

## PixelButton

### 변형(Variant)

| Variant | 배경 | 테두리 | 텍스트 | 그림자 색상 |
|---------|------|--------|--------|-------------|
| `primary` | `var(--accent)` | `var(--accent-dd)` | white | `var(--accent-dd)` |
| `outline` | `var(--surface)` | `var(--border-d)` | `var(--accent)` | `var(--border)` |
| `icon` | `var(--accent)` | `var(--accent-dd)` | — | `var(--accent-dd)` |

### 치수

```
height: 36px
min-width (텍스트 포함): 80px
width (icon-only): 36px
padding (텍스트 포함): 0 20px
padding (icon-only): 0
border: 1.5px solid
```

### 텍스트 스타일

```
font-size: 11px
font-weight: bold
text-transform: uppercase
letter-spacing: 2px
```

### 3D 프레스 인터랙션

```
기본:     box-shadow: {offset}px {offset}px 0 {color},  transform: translate(0, 0)
hover:    box-shadow: 줄어듦,                            transform: translate(1px, 1px)
mousedown: box-shadow: 늘어남,                           transform: translate(-1px, -1px)
mouseup:  hover 상태로 복귀
```

### 픽셀 아이콘

- 16×16 그리드 기반, `PIXEL_SIZE = 2.5` 배율 → 렌더 크기 40×40px
- `imageRendering: 'pixelated'` 필수
- 지원 아이콘: `play`, `pause`, `skip`, `check`, `close`, `music`, `settings`, `menu`, `question`
- 아이콘 색상은 variant에 따라 자동 결정 (primary/icon → white, outline → `var(--accent)`)

### 규칙

- 버튼에 `border-radius`를 절대 추가하지 않는다.
- 그림자는 blur 없이 단색 오프셋만 사용한다.
- 새 아이콘 추가 시 동일한 16×16 픽셀 그리드 패턴을 따른다.

---

## Header

### 구조

```
<header sticky>
  <div flex justify-between>
    <div flex align-center gap-4>
      <span title>🌸 DEV.LOG</span>
      <nav flex gap-2>
        {tabs.map(tab => <TabButton />)}
      </nav>
    </div>
    <div flex gap-2>
      <PixelButton icon="menu" />
      <PixelButton icon="settings" />
    </div>
  </div>
</header>
```

### 타이틀 스타일

```
font-size: 14px
color: var(--accent)
letter-spacing: 3px
font-weight: bold
```

### 탭 버튼 스타일

```
기본:   background: none,        color: var(--muted)
활성:   background: var(--accent), color: white
```

- 탭 패딩: `4px 10px`
- 탭 폰트: `11px`, `letterSpacing: 1px`, `bold`, `uppercase`
- 활성 탭 우측 하단 그림자: `2px 0 0 var(--accent-dd)` (카테고리 배지처럼)

---

## Profile

### 구조

```
<article card>
  <header flex justify-between>
    <div>
      <span emoji>👩‍💻</span>
      <h2>이름</h2>
      <p role="DEVELOPER" color=accent>DEVELOPER</p>
    </div>
    <div action-buttons>
      <PixelButton primary>FOLLOW</PixelButton>
      <PixelButton icon="check" />
      <PixelButton icon="question" />
    </div>
  </header>
  <p description>...</p>
  <div skill-tags flex gap-2>
    {skills.map(skill => <SkillTag />)}
  </div>
</article>
```

### 카드 스타일

```
background: var(--surface)
border: 1.5px solid var(--border)
padding: 32px
box-shadow: 3px 3px 0 var(--border)
margin-bottom: 32px
```

### 호버

```
box-shadow: 4px 4px 0 var(--border-d)
transform: translateY(-2px)
```

### 스킬 태그

```
background: var(--accent-xl)
border: 1px solid var(--accent-l)
color: var(--accent-d)
font-size: 10px
letter-spacing: 1px
padding: 3px 8px
```

---

## BlogPost

### 구조

```
<article card>
  <div category-badge position=top-right>
    {category}
  </div>
  <h3 title>{title}</h3>
  <p excerpt>{excerpt}</p>
  <time date>{date}</time>
</article>
```

### 카드 스타일

```
background: var(--surface)
border: 1.5px solid var(--border)
padding: 28px
box-shadow: 3px 3px 0 var(--border)
position: relative
```

### 호버

```
border-color: var(--border-d)
box-shadow: 4px 4px 0 var(--border-d)
transform: translateY(-2px)
```

### 카테고리 배지

```
position: absolute
top: -1px
right: -1px
background: var(--accent)
color: white
font-size: 10px
letter-spacing: 1px
padding: 4px 10px
box-shadow: 2px 0 0 var(--accent-dd)  /* 우하단 방향 */
```

### 텍스트 스타일

```
title:   font-size: 16px, color: var(--accent), font-weight: bold
excerpt: font-size: 12px, color: var(--text), line-height: 1.6
date:    font-size: 10px, color: var(--faint)
```

---

## CherryBlossom (배경)

### 스프라이트 소스

```
파일: design/Gemini_Generated_Image_canyhgcanyhgcany.png
사용 영역: 이미지 우측 격자 — 다양한 각도의 꽃잎 20여 종
```

꽃잎은 코드로 픽셀을 직접 그리지 않고 **스프라이트 이미지를 `<img>` 태그로 참조**한다.

### 배치

```
position: fixed
inset: 0
z-index: 0
pointer-events: none   ← 필수
overflow: hidden
```

### 꽃잎 사양

```
소스:    스프라이트 이미지에서 각도별 variant 중 랜덤 선택
개수:    15개 (마운트 시 고정 생성)
크기:    32 × 32px 기준, CSS scale로 변형
불투명도: 80%
스케일 범위: 0.6 ~ 1.4 (랜덤)
image-rendering: pixelated  ← 필수
```

### 스프라이트 사용 방식

```tsx
// 각 꽃잎은 <img>로 스프라이트를 참조한다
<img
  src="/design/Gemini_Generated_Image_canyhgcanyhgcany.png"
  style={{
    width: 32,
    height: 32,
    objectFit: 'none',
    objectPosition: `${-spriteX}px ${-spriteY}px`,   // 해당 꽃잎 위치
    imageRendering: 'pixelated',
    opacity: 0.8,
    transform: `scale(${scale}) rotate(${rotation}deg)`,
  }}
/>
```

### 꽃잎 variant 참조 영역 (근사값)

스프라이트 이미지 크기 기준 (600×460px 내):

| variant | 형태 | 스프라이트 영역(x, y) |
|---------|------|----------------------|
| 1 | oval 정면 | 우측 그리드 1열 1행 |
| 2 | crescent 측면 | 우측 그리드 1열 2행 |
| 3 | 뒤집힌 oval | 우측 그리드 2열 1행 |
| 4 | 비틀린 형태 | 우측 그리드 2열 2행 |
| … | … | … |

정확한 좌표는 `05-pixel-art.md` 스프라이트 맵 참조.

### 규칙

- 꽃잎을 div 픽셀 배열로 직접 구현하지 않는다. 스프라이트 이미지만 사용.
- 꽃잎 생성은 컴포넌트 마운트 시 1회. 리렌더링에 재계산 없음.
- `pointer-events: none`을 제거하지 않는다.

---

## LoadingScreen

### 스프라이트 소스

```
파일: design/Gemini_Generated_Image_canyhgcanyhgcany.png
사용 영역: 이미지 좌상단 — 벚꽃 나무 전체
```

로딩 화면의 나무는 코드로 픽셀을 그리지 않고 **스프라이트 이미지를 clip**하여 사용한다.

### 상태 전이

```
단계 1 (0~1.5s):   나무 이미지 아래에서 위로 reveal  — clip-path 또는 scaleY
단계 2 (1.5~2.5s): 수관 fade-in + scale
단계 3 (2.5~3s):   전체 밝기 상승 (opacity 0.8 → 1.0)
완료    (3.5s):    onComplete() 호출 → 메인 화면 전환
```

### 캔버스

```
트리 스프라이트 표시 크기: 약 200px 너비 (원본 비율 유지)
배경: white (#ffffff)
image-rendering: pixelated  ← 필수
```

### 규칙

- 로딩 화면은 앱 진입 시 1회만 표시.
- 픽셀을 코드로 그리지 않는다. 스프라이트 이미지 참조만 허용.
- 총 애니메이션 시간(3.5s) 유지.
