# Deployment — GitHub Pages 배포 설명

이 블로그는 **GitHub Actions**로 자동 빌드하고, **GitHub Pages**로 정적 호스팅합니다.

---

## 전체 흐름

```
로컬에서 코드 작성
       ↓
git push origin main
       ↓
GitHub Actions 워크플로우 자동 실행
  1) 코드 체크아웃
  2) Node.js 설치
  3) npm ci (의존성 설치)
  4) npm run build (Vite 빌드 → dist/ 생성)
  5) dist/ 를 Pages artifact로 업로드
       ↓
GitHub Pages가 artifact를 받아서 서빙
       ↓
https://hon2be.github.io/hon2be-blog/ 에서 라이브
```

---

## GitHub Actions

### 워크플로우 파일 위치

```
.github/workflows/deploy.yml
```

### 트리거 조건

```yaml
on:
  push:
    branches: [main]   # main 브랜치에 push 될 때마다 자동 실행
  workflow_dispatch:   # GitHub 웹에서 수동 실행도 가능
```

### 권한 설정

```yaml
permissions:
  contents: read   # 코드 읽기
  pages: write     # Pages에 배포 쓰기
  id-token: write  # OIDC 토큰 (인증용)
```

GitHub Pages에 배포하려면 이 세 가지 권한이 반드시 필요합니다.
`GITHUB_TOKEN`은 별도 설정 없이 Actions가 자동으로 발급합니다.

### 잡(Job) 구조

워크플로우는 두 개의 job으로 나뉩니다.

#### Job 1: `build`

| 스텝 | 역할 |
|------|------|
| `actions/checkout@v4` | 레포 코드를 runner에 내려받음 |
| `actions/setup-node@v4` | Node.js 20 설치, npm 캐시 활성화 |
| `npm ci` | `package-lock.json` 기준으로 의존성 설치 (재현 가능) |
| `npm run build` | `tsc -b && vite build` 실행 → `dist/` 생성 |
| `actions/upload-pages-artifact@v3` | `dist/` 폴더를 GitHub Pages용 artifact로 업로드 |

#### Job 2: `deploy`

```yaml
needs: build   # build job이 성공해야만 실행
```

| 스텝 | 역할 |
|------|------|
| `actions/deploy-pages@v4` | 업로드된 artifact를 GitHub Pages에 배포 |

deploy job이 완료되면 `environment.url`로 배포 URL이 출력됩니다.

### 동시 배포 방지

```yaml
concurrency:
  group: pages
  cancel-in-progress: false
```

여러 커밋이 연속으로 push되어도 배포가 꼬이지 않도록, 진행 중인 배포를 완료한 뒤 다음 배포를 시작합니다.

---

## GitHub Pages 설정

### 활성화 방법

GitHub Actions 워크플로우 방식을 사용하려면 레포 설정에서 Pages 소스를 `GitHub Actions`로 지정해야 합니다.

```
GitHub 레포 → Settings → Pages
  → Build and deployment
  → Source: GitHub Actions  ← 이것으로 선택
```

이 프로젝트는 아래 API 호출로 자동 설정했습니다.

```bash
gh api --method POST repos/hon2be/hon2be-blog/pages \
  -f build_type=workflow
```

### 배포 URL

```
https://hon2be.github.io/hon2be-blog/
```

GitHub Pages 프로젝트 페이지 URL 규칙: `https://{유저명}.github.io/{레포명}/`

---

## Vite base 설정

GitHub Pages 프로젝트 페이지는 루트(`/`)가 아닌 서브경로(`/hon2be-blog/`)에서 서빙됩니다.
Vite의 `base`를 맞춰주지 않으면 JS·CSS·이미지 경로가 틀려서 빈 화면이 됩니다.

```ts
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: '/hon2be-blog/',  // ← 레포 이름과 일치시켜야 함
})
```

빌드 결과물의 `index.html`을 보면 아래처럼 경로가 들어갑니다.

```html
<script src="/hon2be-blog/assets/index-xxxx.js"></script>
<link href="/hon2be-blog/assets/index-xxxx.css" />
```

### 레포 이름이 바뀌면?

`vite.config.ts`의 `base` 값을 새 레포 이름으로 변경하고 다시 push하면 됩니다.

```ts
base: '/새-레포-이름/',
```

---

## dist/ 와 .gitignore

`dist/`는 빌드 산출물이므로 git에 커밋하지 않습니다.  
GitHub Actions가 CI 환경에서 직접 빌드하고 Pages에 올립니다.

```gitignore
# .gitignore
node_modules/
dist/         ← 빌드 결과물, git 추적 제외
.DS_Store
```

---

## 로컬 개발

```bash
npm run dev      # 개발 서버 (localhost:5173)
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과물 로컬 미리보기
```

`npm run preview`는 `base: '/hon2be-blog/'`가 적용된 상태로 서빙되므로
`http://localhost:4173/hon2be-blog/` 에서 확인됩니다.

---

## 배포 상태 확인

```bash
# 최근 워크플로우 실행 목록
gh run list --repo hon2be/hon2be-blog

# 특정 run 실시간 로그
gh run watch {run-id} --repo hon2be/hon2be-blog
```
