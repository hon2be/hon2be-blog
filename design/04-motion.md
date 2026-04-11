# 04. Motion & Interaction

> 소스: `src/app/components/` (motion/react 사용)

---

## 원칙

1. **물리적 피드백** — 버튼은 누르면 실제로 눌리는 것처럼 움직인다. (3D 프레스)
2. **목적 있는 애니메이션** — 장식용 모션은 꽃잎 배경으로 제한. UI 요소는 상태 변화 표현에만 애니메이션.
3. **즉각적 응답** — hover/press는 transition duration 최소화 (`transition-all` 기본값 사용).
4. **무한 루프는 배경만** — CherryBlossom 꽃잎만 무한 반복. 카드·버튼 등 UI 요소는 1회성 전환만.

---

## 버튼 3D 프레스

모든 PixelButton에 동일하게 적용.

```
기본 상태:
  transform: translate(0, 0)
  box-shadow: Npx Npx 0 color

onMouseEnter (hover):
  transform: translate(1px, 1px)    ← 오른쪽 아래로 1px
  box-shadow: (N-1)px (N-1)px 0 color  ← 그림자 줄어듦

onMouseDown (press):
  transform: translate(-1px, -1px)  ← 왼쪽 위로 1px (튀어나옴)
  box-shadow: (N+1)px (N+1)px 0 color ← 그림자 늘어남

onMouseUp → onMouseLeave:
  hover 상태 → 기본 상태로 복귀
```

**해석**: hover 시 버튼이 눌리기 시작하고, mousedown 시 스프링처럼 반발하는 효과.

---

## 카드 호버 리프트

BlogPost, Profile 카드에 적용.

```
기본:
  transform: translateY(0)
  box-shadow: 3px 3px 0 var(--border)

hover:
  transform: translateY(-2px)
  box-shadow: 4px 4px 0 var(--border-d)
```

- `transition: all 0.15s ease` 또는 Tailwind `transition-all`.
- 수평 이동 없이 수직(Y축) 리프트만.
- 이동 거리는 `-2px`로 고정. 더 크게 움직이지 않는다.

---

## 탭 버튼 호버

Header 탭에 적용.

```
기본:   background: none
hover:  background: var(--accent-bg)
        box-shadow: 1px 1px 0 var(--border)
        transform: translate(1px, 1px)
활성:   background: var(--accent), color: white (호버 효과 없음)
```

---

## CherryBlossom 낙하 애니메이션

각 꽃잎에 독립적으로 적용.

```
keyframes falling:
  from: translateY(-10vh) translateX(0)   rotate(0deg)
  to:   translateY(110vh) translateX(랜덤드리프트) rotate(랜덤각도)

duration:  12~20초 (랜덤)
delay:     0~5초 (랜덤)
easing:    linear
iteration: infinite
```

### 꽃잎 개별 속성 (마운트 시 랜덤 결정)

| 속성 | 범위 |
|------|------|
| `left` | 0% ~ 100% |
| `animationDuration` | 12s ~ 20s |
| `animationDelay` | 0s ~ 5s |
| `scale` | 0.6 ~ 1.4 |
| 수평 드리프트 | -50px ~ +50px (CSS transform 또는 애니메이션 keyframe) |

- 꽃잎 속성은 마운트 시 1회 결정되어 `useState`에 저장. 리렌더링 시 재계산하지 않는다.

---

## LoadingScreen 시퀀스

`motion/react` (또는 직접 타이머)로 단계적 reveal.

```
t=0.0s  : 화면 표시, 흰 배경
t=0.0s → 1.5s : 줄기 픽셀 scaleY(0→1) 위에서 아래로
t=1.5s → 2.5s : 꽃 픽셀 scale(0→1) 각 꽃잎 순차 bloom
t=2.5s → 3.0s : 잎 픽셀 scale(0→1)
t=3.5s  : onComplete() 호출 → 메인 화면 전환
```

- 각 단계는 이전 단계 완료 후 시작 (병렬 금지).
- 총 시간 3.5초. 단축하지 않는다.

---

## 사용 금지 패턴

- `transition-duration > 300ms` — UI 피드백이 느려짐
- `ease-in-out` 이징 for press effects — linear 또는 ease 사용
- CSS `animation: spin` 같은 무한 회전 — UI 요소에 사용 금지
- `opacity: 0 → 1` fade-in — 꽃잎 배경 외 UI 요소에 사용 금지
- `scale > 1.0` hover effect on cards — 카드는 Y축 이동만 허용
