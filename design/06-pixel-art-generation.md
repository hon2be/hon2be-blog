# 06. Pixel Art Generation Guide

> 기존 스프라이트와 일관된 새 애셋 생성을 위한 프롬프트 가이드  
> 참조 이미지: `design/Gemini_Generated_Image_canyhgcanyhgcany.png`

---

## 이 디자인 시스템의 핵심

> **"클린한 16-비트 스타일, 고정된 외곽선, 명확한 3-톤 음영"**

기존 스프라이트와 동일한 스타일로 새 애셋(나뭇잎, 다른 꽃, 캐릭터 등)을 생성할 때 이 가이드를 사용한다.

---

## 공통 스타일 프롬프트 (Core Style Tags)

모든 생성 프롬프트 맨 앞에 반드시 포함하는 고정 태그.

```
pixel art, 16-bit style,
solid single-pixel dark colored outline,
clean and polished look no rough edges,
minimalistic and structured shading,
transparent background
```

---

## 색상 및 음영 규칙

### 3-톤 팔레트 구조

모든 객체는 동일 색상 계열의 3톤으로 구성한다.

| 레이어 | 역할 | 배치 위치 |
|--------|------|-----------|
| **Highlight (하이라이트)** | 가장 밝은 부분 | 상단/빛 받는 면, 1×1픽셀 점 |
| **Base (기본)** | 주 색상 | 객체 전체 채움 |
| **Shadow (그림자)** | 더 어두운 톤 | 하단, 외곽선 안쪽, 굴곡 부분 |

### 꽃잎(Petal) 팔레트 값

```
Highlight dot: #FFFFFF  (1×1픽셀 흰 점, 상단에 하나)
Base:          #FAD7E9  (연분홍)
Shadow:        #F8B6D9  (진분홍, 외곽선 안쪽)
Outline:       #7A1038  (짙은 마룬, 1~2픽셀)
```

### 나무 줄기(Trunk) 팔레트 값

```
Highlight: #9C7A63  (밝은 갈색)
Base:      #6E5545  (중간 갈색)
Shadow:    #4A2815  (어두운 갈색)
Outline:   #2C1810  (거의 검정, 외곽선)
```

### 규칙

- 한 객체에 사용하는 색상은 최대 5~6개(외곽선 + 3톤 + 하이라이트 + 전환색).
- 그라디언트 렌더링을 사용하지 않는다. 모든 전환은 픽셀 1칸 단위.
- 투명 배경 — 외부 영역은 반드시 투명(transparent)으로 처리.

---

## 하이라이트 도트 규칙

이 스타일의 **가장 특징적인 디테일**.

- 모든 꽃잎이나 유광 표면에 `1×1픽셀` 흰색 점을 하나 배치한다.
- 위치: 객체 **상단 좌측** 1/4 영역.
- 여러 개 배치하지 않는다. 정확히 1개.

---

## 프롬프트 템플릿

새 애셋 생성 시 아래 구조를 사용한다.

```
[Subject] + [Shape & Orientation] + [Core Style Tags] + [Color/Shading Application] + [Unique Detail]
```

---

## 예시 프롬프트

### 벚꽃잎 (Petal)

```
single cherry blossom petal,
variety of shapes (some flat, some curled) in different orientations
(top-down, profile, front-on),
pixel art, 16-bit, solid single-pixel dark outline,
clean and polished, transparent background,
base color pale pink (#FAD7E9),
shadow color soft rose (#F8B6D9) applied to lower edge and inside outline,
a single 1x1 pixel white highlight dot near the top-left edge of each petal
```

### 완성된 벚꽃 (Complete Flower)

```
a single fully opened cherry blossom flower,
symmetrical front-facing view, five rounded petals,
pixel art, 16-bit, solid single-pixel dark outline,
clean and polished, transparent background,
petals: base pale pink (#FAD7E9), shadow soft rose (#F8B6D9),
center stamens: yellow (#FFD700) and pink (#FF69B4),
tiny 1x1 yellow pixel dots for stamen tips,
a single 1x1 white highlight dot on the largest petal
```

### 벚꽃 나무 (Cherry Blossom Tree)

```
a mature cherry blossom tree in full bloom,
clear dark wood trunk with branches,
large wide rounded cloud-like canopy,
pixel art, 16-bit, solid single-pixel dark outline,
clean and polished, transparent background,
canopy: structured into clustered rounded forms,
canopy shading: bright pink (#FFD0E8) top, mid pink (#FFB3D9),
deep pink (#F48FB1) lower shadow, dark border (#7A1038),
trunk: dark brown to near-black (#2C1810 outline, #5C3825 base),
small 1x1 white dot clusters scattered across canopy (flower highlight details)
```

### 나뭇잎 (Leaves) — 새 애셋 예시

```
a cluster of three small cherry tree leaves,
oval shape, slightly pointed tip, small stem visible,
pixel art, 16-bit, solid single-pixel dark outline,
clean and polished, transparent background,
base color mid-green (#66BB6A),
shadow color dark-green (#388E3C) applied to lower half and inside outline,
a single 1x1 pixel light-green (#A5D6A7) highlight dot on the largest leaf
```

### 떨어지는 꽃잎 애니메이션 프레임 (Falling Petal Frames)

```
sprite sheet of 8 cherry blossom petal rotation frames,
showing a single petal rotating 360 degrees in 8 steps (0°, 45°, 90°, 135°, 180°, 225°, 270°, 315°),
arranged in 2 rows of 4,
each frame 32x32 pixels,
pixel art, 16-bit, solid single-pixel dark outline (#7A1038),
clean and polished, transparent background,
consistent shading across all frames: base (#FAD7E9), shadow (#F8B6D9),
single white 1x1 highlight dot visible when facing front
```

---

## 스타일 일관성 체크리스트

새로 생성한 스프라이트를 기존 애셋과 비교 시 확인:

- [ ] 외곽선이 짙은 단일 색상 (마룬 `#7A1038` 또는 동일 톤)으로 1~2픽셀 두께
- [ ] 3톤 이상 음영 (highlight + base + shadow)
- [ ] 1×1 흰색 하이라이트 점이 상단 좌측에 있음
- [ ] 배경이 투명 (체커보드 패턴 = 투명)
- [ ] 거친 잔여 픽셀 없음
- [ ] 기존 꽃잎과 같은 크기 그리드 (32×32 기준)
- [ ] `imageRendering: pixelated` 적용 시 선명하게 보임

---

## 생성 도구 권장사항

| 도구 | 용도 |
|------|------|
| AI 이미지 생성 (Midjourney, DALL-E, Gemini) | 새 스프라이트 초안 생성 |
| Aseprite | 픽셀 단위 후보정, 팔레트 정리 |
| Pixilart / Piskel | 브라우저 기반 픽셀 편집 |
| ImageMagick | 스프라이트 시트 자르기/합치기 자동화 |

AI 생성 후 반드시 픽셀 편집 툴에서 외곽선 두께 및 하이라이트 도트를 수동으로 보정한다.
