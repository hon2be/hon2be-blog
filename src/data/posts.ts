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

export const posts: Post[] = [
  {
    slug: 'css-design-tokens',
    title: 'CSS 커스텀 프로퍼티로 디자인 시스템 구축하기',
    date: '2025.04.08',
    category: 'CSS',
    excerpt: 'CSS 변수를 활용해 일관된 디자인 토큰을 정의하고, 컴포넌트 간 색상·스페이싱을 중앙에서 관리하는 방법을 살펴봅니다.',
    content: `
<h2>왜 디자인 토큰인가</h2>
<p>프로젝트 규모가 커질수록 <code>#f07098</code> 같은 하드코딩 값이 수십 곳에 흩어지기 시작합니다. 브랜드 색상 하나를 바꾸려면 파일을 수십 개 열어야 하는 상황이 됩니다. CSS 커스텀 프로퍼티(변수)는 이 문제를 근본적으로 해결합니다.</p>

<h2>토큰 정의</h2>
<pre><code>:root {
  --accent:    #f07098;
  --accent-d:  #c04870;
  --accent-dd: #7a1038;
  --bg:        #fdf5fb;
  --surface:   #ffffff;
  --text:      #2a1020;
}</code></pre>

<p><code>:root</code>에 정의된 변수는 전체 문서에서 상속됩니다. <code>var(--accent)</code>로 어디서든 참조할 수 있고, 값을 바꾸면 모든 참조처가 자동으로 갱신됩니다.</p>

<h2>스케일 설계 원칙</h2>
<p>이 블로그의 액센트 팔레트처럼, 하나의 색상에서 파생 토큰을 만드는 방식이 효과적입니다.</p>
<ul>
  <li><strong>base</strong> — 주 사용처</li>
  <li><strong>-d (dark)</strong> — 호버, 텍스트 강조</li>
  <li><strong>-dd (darker)</strong> — 테두리, 그림자</li>
  <li><strong>-l (light)</strong> — 밝은 배경, 호버 배경</li>
  <li><strong>-xl / -bg</strong> — 아주 연한 배경, 선택 상태</li>
</ul>

<h2>컴포넌트에서 활용</h2>
<pre><code>.button-primary {
  background: var(--accent);
  border: 1.5px solid var(--accent-dd);
  box-shadow: 3px 3px 0 var(--accent-dd);
  color: white;
}</code></pre>

<p>이제 <code>--accent</code> 하나만 바꾸면 버튼의 배경, 테두리, 그림자가 모두 연동됩니다. 다크 모드 전환도 <code>@media (prefers-color-scheme: dark)</code> 안에서 변수값만 재정의하면 됩니다.</p>

<h2>마치며</h2>
<p>디자인 토큰은 단순한 변수 모음이 아닙니다. 디자이너와 개발자 사이의 공통 언어이고, 코드베이스 전체의 일관성을 보장하는 계약입니다. 오늘부터 하드코딩 값 대신 <code>var(--)</code>를 습관화해보세요.</p>
`,
  },
  {
    slug: 'react-rendering-optimization',
    title: 'React 렌더링 최적화 — useMemo와 useCallback',
    date: '2025.03.25',
    category: 'REACT',
    excerpt: 'React 컴포넌트가 불필요하게 다시 렌더링되는 원인을 파악하고, useMemo와 useCallback으로 성능을 개선하는 실전 전략을 정리합니다.',
    content: `
<h2>렌더링이 일어나는 조건</h2>
<p>React 컴포넌트는 세 가지 경우에 리렌더링됩니다.</p>
<ol>
  <li>state가 변경될 때</li>
  <li>props가 변경될 때</li>
  <li>부모 컴포넌트가 리렌더링될 때</li>
</ol>
<p>세 번째가 가장 많이 간과됩니다. 부모가 렌더링되면 자식도 모두 렌더링됩니다 — props가 바뀌지 않아도요.</p>

<h2>문제: 함수와 객체의 참조 동일성</h2>
<pre><code>function Parent() {
  const [count, setCount] = useState(0)
  const options = { theme: 'cherry' }  // 매 렌더마다 새 객체
  const handleClick = () => console.log('clicked')  // 매 렌더마다 새 함수

  return <Child options={options} onClick={handleClick} />
}</code></pre>
<p>React.memo로 감싼 Child도, options와 handleClick이 매번 새 참조이므로 리렌더링됩니다.</p>

<h2>useMemo — 값을 메모이제이션</h2>
<pre><code>const options = useMemo(
  () => ({ theme: 'cherry' }),
  [] // 의존성 없음 — 마운트 시 1회만 생성
)</code></pre>
<p>deps 배열의 값이 바뀔 때만 새 객체를 만듭니다. 같은 참조가 유지되므로 자식은 리렌더링되지 않습니다.</p>

<h2>useCallback — 함수를 메모이제이션</h2>
<pre><code>const handleClick = useCallback(
  () => console.log('clicked'),
  [] // 의존성 없음
)</code></pre>
<p>useCallback은 useMemo(() => fn, deps)의 단축형입니다.</p>

<h2>언제 쓰면 안 되는가</h2>
<p>모든 값과 함수에 memoization을 적용하면 오히려 성능이 나빠집니다. deps 비교와 메모리 비용이 발생하기 때문입니다.</p>
<ul>
  <li>계산 비용이 크지 않은 단순 값 → 그냥 계산하세요</li>
  <li>자식이 React.memo로 감싸지지 않은 경우 → 효과 없음</li>
  <li>deps 배열이 너무 자주 바뀌는 경우 → 의미 없음</li>
</ul>

<h2>프로파일러로 측정하기</h2>
<p>React DevTools의 Profiler 탭에서 실제로 렌더링이 얼마나 자주, 오래 걸리는지 측정한 뒤 최적화하세요. 측정 없는 최적화는 추측일 뿐입니다.</p>
`,
  },
  {
    slug: 'typescript-generics',
    title: 'TypeScript Generics 실전 활용법',
    date: '2025.03.10',
    category: 'TYPESCRIPT',
    excerpt: 'any 없이 타입 안전성을 유지하면서 재사용 가능한 유틸리티를 만드는 Generic 패턴을 실제 예제로 정리합니다.',
    content: `
<h2>Generics가 필요한 순간</h2>
<p>로직은 동일한데 타입만 다른 함수를 여러 개 만들고 있다면, Generic으로 합칠 수 있습니다.</p>
<pre><code>// Before — 중복
function firstString(arr: string[]): string { return arr[0] }
function firstNumber(arr: number[]): number { return arr[0] }

// After — Generic
function first&lt;T&gt;(arr: T[]): T { return arr[0] }</code></pre>

<h2>제약 조건 extends</h2>
<pre><code>// T는 반드시 { id: number }를 포함해야 함
function findById&lt;T extends { id: number }&gt;(
  items: T[],
  id: number
): T | undefined {
  return items.find(item => item.id === id)
}</code></pre>
<p>extends로 Generic에 제약을 걸면 T의 특정 프로퍼티에 안전하게 접근할 수 있습니다.</p>

<h2>keyof와 조합</h2>
<pre><code>function pluck&lt;T, K extends keyof T&gt;(
  objects: T[],
  key: K
): T[K][] {
  return objects.map(obj => obj[key])
}

const titles = pluck(posts, 'title')  // string[]
const dates  = pluck(posts, 'date')   // string[]</code></pre>

<h2>유틸리티 타입 만들기</h2>
<pre><code>// 특정 키를 필수로 만드는 타입
type RequireFields&lt;T, K extends keyof T&gt; =
  Omit&lt;T, K&gt; & Required&lt;Pick&lt;T, K&gt;&gt;

// slug와 title은 필수, 나머지는 선택
type PostPreview = RequireFields&lt;Post, 'slug' | 'title'&gt;</code></pre>

<h2>조건부 타입</h2>
<pre><code>type IsArray&lt;T&gt; = T extends any[] ? 'array' : 'not-array'

type A = IsArray&lt;string[]&gt;  // 'array'
type B = IsArray&lt;string&gt;    // 'not-array'</code></pre>
<p>조건부 타입은 타입 레벨의 if-else입니다. 복잡한 타입 변환 로직을 표현할 때 활용됩니다.</p>

<h2>정리</h2>
<p>Generic은 any의 올바른 대안입니다. 타입 안전성을 잃지 않으면서 코드 재사용성을 높이는 핵심 도구입니다. 처음엔 낯설지만, 패턴이 눈에 익으면 타입스크립트의 진짜 힘을 느낄 수 있습니다.</p>
`,
  },
  {
    slug: 'pixel-art-css',
    title: 'CSS로 픽셀 아트 UI 만들기',
    date: '2025.02.20',
    category: 'PIXEL',
    excerpt: 'border-radius 제거와 box-shadow 오프셋만으로 레트로 픽셀 아트 느낌을 내는 CSS 기법을 소개합니다.',
    content: `
<h2>픽셀 아트 UI의 핵심 원칙</h2>
<p>현대 UI에서 픽셀 아트 스타일을 구현하는 건 생각보다 간단합니다. 핵심은 딱 두 가지입니다.</p>
<ol>
  <li><strong>border-radius: 0</strong> — 모든 둥근 모서리를 제거합니다</li>
  <li><strong>blur 없는 box-shadow</strong> — 흐림 없는 단색 오프셋 그림자로 입체감을 줍니다</li>
</ol>

<h2>3D 프레스 버튼</h2>
<pre><code>.pixel-button {
  border-radius: 0;
  border: 1.5px solid #7a1038;
  box-shadow: 3px 3px 0 #7a1038;
  transition: all 0.05s;
}

.pixel-button:hover {
  box-shadow: 2px 2px 0 #7a1038;
  transform: translate(1px, 1px);
}

.pixel-button:active {
  box-shadow: 4px 4px 0 #7a1038;
  transform: translate(-1px, -1px);
}</code></pre>
<p>hover 시 버튼이 아래로 내려가고 그림자가 줄어들어 눌리는 느낌을 줍니다. active 시에는 반대로 튀어오릅니다.</p>

<h2>픽셀 아이콘</h2>
<p>SVG 없이 div 격자로 아이콘을 그릴 수 있습니다.</p>
<pre><code>// 16x16 픽셀 그리드, 각 픽셀은 2.5px 사각형
const pixels = [
  { x: 4, y: 2 }, { x: 5, y: 2 },
  // ...
]

pixels.map(px => (
  &lt;div style={{
    position: 'absolute',
    left: px.x * 2.5,
    top:  px.y * 2.5,
    width: 2.5,
    height: 2.5,
    background: 'white',
    imageRendering: 'pixelated',
  }} /&gt;
))</code></pre>

<h2>image-rendering: pixelated</h2>
<p>픽셀 스프라이트 이미지를 확대할 때 브라우저가 흐릿하게 보간하지 않도록 이 CSS 속성이 필수입니다.</p>
<pre><code>img.sprite {
  image-rendering: pixelated;   /* Chrome, Edge */
  image-rendering: crisp-edges; /* Firefox */
}</code></pre>

<h2>모노스페이스 폰트</h2>
<p>픽셀 아트 UI의 분위기를 완성하는 건 폰트입니다. 고정 폭 모노스페이스 폰트가 레트로 감성을 더합니다.</p>
<pre><code>* {
  font-family: 'Mona', 'Courier New', monospace;
  letter-spacing: 1px;
}</code></pre>

<h2>마치며</h2>
<p>이 블로그 자체가 이 기법으로 만들어졌습니다. 픽셀 아트는 단순하지만, 일관성 있게 적용하면 독특하고 기억에 남는 UI가 됩니다.</p>
`,
  },
  {
    slug: 'design-system-principles',
    title: '좋은 디자인 시스템의 조건',
    date: '2025.02.05',
    category: 'DESIGN',
    excerpt: '디자인 시스템이 오래 살아남으려면 무엇이 필요한가. 토큰, 컴포넌트, 문서화까지 실전에서 배운 원칙들을 정리합니다.',
    content: `
<h2>디자인 시스템이란</h2>
<p>디자인 시스템은 UI를 만드는 데 필요한 모든 것의 집합입니다. 색상, 타이포그래피, 스페이싱 같은 토큰부터 버튼, 카드, 모달 같은 컴포넌트, 그리고 이것들을 사용하는 방법을 설명하는 문서까지 포함됩니다.</p>

<h2>토큰이 먼저다</h2>
<p>컴포넌트를 만들기 전에 토큰을 설계하세요. 컴포넌트는 토큰 위에 서야 합니다. 토큰 없이 만들어진 컴포넌트는 값이 제각각이고, 일관성을 잃습니다.</p>
<ul>
  <li>색상 토큰: <code>--accent</code>, <code>--text</code>, <code>--surface</code></li>
  <li>스페이싱: 4의 배수 체계 (4, 8, 12, 16, 20, 24, 32...)</li>
  <li>타이포그래피: 크기 스케일과 weight 규칙</li>
</ul>

<h2>컴포넌트의 단일 책임</h2>
<p>좋은 컴포넌트는 하나의 일을 잘 합니다. 버튼은 클릭을 처리하고, 카드는 콘텐츠를 담습니다. 컴포넌트가 너무 많은 역할을 하면 재사용이 어려워집니다.</p>

<h2>Variant 설계</h2>
<p>같은 컴포넌트의 다른 모습은 variant로 표현합니다. props를 잔뜩 늘리는 것보다 명확한 variant 이름이 낫습니다.</p>
<pre><code>// 나쁜 예
&lt;Button
  isPrimary
  isLarge
  hasOutline={false}
  darkBackground
/&gt;

// 좋은 예
&lt;Button variant="primary" size="lg" /&gt;</code></pre>

<h2>문서화는 코드만큼 중요하다</h2>
<p>아무도 읽지 않는 디자인 시스템은 존재하지 않는 것과 같습니다. 컴포넌트의 props, 사용 예제, "하지 말아야 할 것"까지 문서화하세요.</p>
<p>이 블로그의 <code>design/</code> 디렉토리가 그 예입니다. 토큰, 레이아웃, 컴포넌트, 모션, 픽셀 아트 규칙을 모두 문서로 남겼습니다.</p>

<h2>진화를 허용하라</h2>
<p>완벽한 디자인 시스템은 처음부터 나오지 않습니다. 사용하면서 불편한 점을 고치고, 필요가 생기면 추가하세요. 단, 변경 시에는 기존 사용처를 모두 확인하고, 하위 호환성을 고려해야 합니다.</p>
`,
  },
]

