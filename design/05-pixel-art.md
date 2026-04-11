# 05. Pixel Art — Sprite Usage Guide

> 참조 이미지: `design/Gemini_Generated_Image_canyhgcanyhgcany.png`

---

## 원칙

- 꽃잎, 꽃, 나무 등 **장식 그래픽은 스프라이트 이미지를 그대로 사용**한다.
- 코드로 div 픽셀을 직접 그리는 방식은 사용하지 않는다.
- UI 아이콘(PixelButton)은 별도 규칙(`06-pixel-art-generation.md`)을 따른다.

---

## 스프라이트 시트 레이아웃

```
파일: design/Gemini_Generated_Image_canyhgcanyhgcany.png
크기: 약 600 × 460 px
배경: 투명 (체커보드로 표시됨)
```

### 영역 맵

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  [트리]          [P01] [P02]  [P03] [P04]           │
│  (좌상단)        [P05] [P06]  [P07] [P08]           │
│                  [P09] [P10]  [P11] [P12]           │
│  [꽃blossom]     [P13] [P14]  [P15] [P16]           │
│  (좌하단)        [P17] [P18]  [P19] [P20]           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

| 영역 | 내용 | 사용처 |
|------|------|--------|
| 좌상단 (0,0 ~ 220,300) | 벚꽃 나무 전체 | LoadingScreen |
| 좌하단 (30,320 ~ 200,450) | 5-petal blossom | 장식, 아이콘 대체 |
| 우측 격자 (230,30 ~ 580,450) | 꽃잎 20여 종 variant | CherryBlossom 낙하 |

---

## 렌더링 규칙

```css
image-rendering: pixelated;   /* Chrome, Edge */
image-rendering: crisp-edges; /* Firefox fallback */
```

모든 스프라이트 `<img>` 또는 `<canvas>`에 반드시 적용.

---

## 꽃잎 스프라이트 사용

### 단일 꽃잎 렌더링

```tsx
// objectPosition으로 스프라이트 시트의 해당 꽃잎 위치를 지정한다
<img
  src="/design/Gemini_Generated_Image_canyhgcanyhgcany.png"
  style={{
    width: 32,
    height: 32,
    objectFit: 'none',
    objectPosition: `-${spriteX}px -${spriteY}px`,
    imageRendering: 'pixelated',
    opacity: 0.8,
    transform: `scale(${scale}) rotate(${rotation}deg)`,
  }}
/>
```

### 꽃잎 Variant 목록

각 variant는 마운트 시 랜덤 선택된다. 다양한 형태를 혼합해 자연스러운 낙하 연출.

| variant | 형태 설명 | 특징 |
|---------|-----------|------|
| oval-flat | 정면 타원형 | 가장 기본, 크기 큼 |
| oval-small | 작은 정면 타원 | 원거리 느낌 |
| crescent | 초승달형 (측면) | 떨어지며 뒤집힘 표현 |
| tear-wide | 넓은 물방울 | 좌우로 퍼진 형태 |
| tear-tall | 세로 긴 물방울 | 위에서 떨어지는 느낌 |
| curl-left | 왼쪽이 말린 형태 | 바람에 휘어진 느낌 |
| curl-right | 오른쪽이 말린 형태 | 반대 방향 바람 |
| fold | 반으로 접힌 형태 | 가장자리 꽃잎 |

### 색상 특성 (스프라이트 원본 기준)

스프라이트를 변형하지 않는다. 아래 색상은 참고용.

```
외곽선:     #7A1038 (짙은 마룬, 2픽셀 두께)
그림자:     #d44080
중간:       #f472a8
밝음:       #ffb3d9
연밝음:     #ffd0e8
하이라이트: #ffffff (상단 좌측 큰 블롭)
```

---

## 나무 스프라이트 사용

### LoadingScreen에서 사용

```tsx
// 스프라이트 시트에서 나무 영역만 잘라서 표시
<img
  src="/design/Gemini_Generated_Image_canyhgcanyhgcany.png"
  style={{
    width: 220,
    height: 300,
    objectFit: 'none',
    objectPosition: '0px 0px',   // 좌상단 나무 영역
    imageRendering: 'pixelated',
  }}
/>
```

### 나무 색상 특성 (참고용)

```
줄기 외곽선: #2C1810 (거의 검정)
줄기 중간:   #4A2815, #5C3825
줄기 하이라이트: #7A4828
수관 층1 (밝음): #ffd0e8
수관 층2:        #ffb3d9
수관 층3:        #f48fb1
수관 층4 (어둠): #e879a0
반짝임 도트:     #ffffff
```

---

## 스프라이트 ≠ 코드 드로잉

| 방식 | 허용 | 용도 |
|------|------|------|
| `<img>` + objectPosition | ✅ | 꽃잎, 나무, 꽃 blossom |
| CSS sprite (background-position) | ✅ | 동일 (대안적 구현) |
| div 픽셀 배열 | ❌ | CherryBlossom, LoadingScreen에 사용 금지 |
| Canvas drawRect 픽셀 | ❌ | 동일 |
| PixelButton 아이콘 | ✅ (div 배열) | UI 아이콘만 예외 허용 |

---

## UI 아이콘 (PixelButton) — 별도 규칙

PixelButton 내부 아이콘은 스프라이트 없이 div 좌표 배열로 구현한다.
상세 규칙은 `06-pixel-art-generation.md` 참조.

- 그리드: 16×16, 배율 PIXEL_SIZE=2.5
- 단색 실루엣, 외곽선 없음, 하이라이트 없음
- 색상은 variant에서 전달된 단일 color 값만 사용
