# 02. Layout

> 소스: `src/app/App-2.tsx`, `src/app/components/Header.tsx`

---

## 페이지 구조

```
<div>  (min-h-screen, position: relative)
  │
  ├── <CherryBlossom />   — fixed, z-0, 포인터 이벤트 없음
  │
  ├── <Header />          — sticky, top-0, z-10
  │
  └── <main>              — max-width: 920px, z-10, relative
        ├── <Profile />
        ├── <Divider />
        ├── <BlogPost Grid />
        ├── <Divider />
        └── <Action Buttons Row />
```

---

## 레이어 시스템

| z-index | 레이어 | 요소 |
|---------|--------|------|
| `0` | 배경 | CherryBlossom (낙하 꽃잎) |
| `10` | 콘텐츠 | Header, main 컨텐츠 |
| (auto) | 기본 | 카드, 컴포넌트 |

- `pointerEvents: 'none'`을 배경 애니메이션 레이어에 반드시 적용해 클릭을 차단하지 않는다.

---

## 메인 컨테이너

```css
max-width: 920px;
margin: 0 auto;
padding: 32px 24px;
position: relative;
z-index: 10;
```

- 최대 너비는 `920px`로 고정.
- 좌우 패딩은 `24px`, 상하 패딩은 `32px`.
- 세로 스크롤 중에도 콘텐츠가 배경 위에 표시되도록 `z-index` 유지.

---

## 헤더

```css
position: sticky;
top: 0;
z-index: 10;
padding: 6px 24px;
border-bottom: 1.5px solid var(--accent-l);
background: rgba(255, 255, 255, 0.9);  /* 반투명 */
```

- sticky 헤더는 항상 `z-10` 이상.
- 헤더 내부 레이아웃: `flex`, `justify-between`, `align-center`.
- 좌측: 타이틀 + 탭 그룹, 우측: 아이콘 버튼 그룹.

### 탭 레이아웃

```
[TITLE] [ALL] [REACT] [TYPESCRIPT] [CSS] [DESIGN]    [menu] [settings]
```

- 탭 사이 간격: `gap: 2` (8px).
- 활성 탭: `background: var(--accent)`, 텍스트 흰색.
- 비활성 탭: 배경 없음, 텍스트 `var(--muted)`.

---

## 블로그 포스트 그리드

```css
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 18px;
margin-bottom: 32px;
```

- 2컬럼 고정 그리드.
- 갭은 `18px`.
- 컬럼 수를 바꾸거나 auto-fill을 사용하지 않는다. 레이아웃 일관성을 위해 고정 2열 유지.

---

## 구분선 (Divider)

```css
height: 2px;
background: linear-gradient(
  90deg,
  transparent,
  var(--accent) 30%,
  var(--accent-l) 70%,
  transparent
);
margin-bottom: 32px;
```

- 구분선은 좌우 끝이 투명하게 페이드.
- 두께 `2px`, 하단 여백 `32px`.
- 수직 구분선은 사용하지 않는다.

---

## 액션 버튼 행

```css
display: flex;
justify-content: center;
gap: 16px;  /* gap-4 */
```

- 페이지 하단 버튼 그룹은 항상 중앙 정렬.
- 버튼 간 간격: `16px`.

---

## 반응형

현재 구현은 데스크탑 우선 단일 레이아웃.

- 반응형 브레이크포인트 분기는 정의되어 있지 않다.
- 모바일 대응 추가 시 2컬럼 → 1컬럼 전환 외 다른 레이아웃 변경은 금지.
- 새 브레이크포인트를 추가할 경우 `max-width: 920px` 컨테이너의 좌우 패딩을 `16px`로 줄이는 것만 허용.
