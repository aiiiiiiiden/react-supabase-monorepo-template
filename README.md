# React + Supabase Monorepo Template

프로덕션 환경을 위한 React 19 + Supabase 모노레포 템플릿입니다. pnpm workspaces를 사용하여 패키지를 효율적으로 관리합니다.

## ✨ 주요 특징

- **React 19** - 최신 React with Concurrent Features
- **Vite 7** - 빠른 HMR과 최적화된 빌드
- **Tailwind CSS 4** - Vite 플러그인 방식의 유틸리티 CSS
- **TypeScript 5.9** - Strict 모드의 타입 안전성
- **Supabase** - 인증, 데이터베이스, 스토리지, Edge Functions
- **pnpm Workspaces** - 효율적인 모노레포 패키지 관리
- **ESLint 9** - Flat Config 기반 린팅
- **Prettier** - 일관된 코드 포맷팅

## 📁 디렉토리 구조

```
react-supabase-monorepo-template/
├── apps/
│   └── web/                      # 메인 React 애플리케이션
│       ├── src/
│       │   ├── hooks/            # React 커스텀 훅
│       │   │   └── useSupabase.ts
│       │   ├── App.tsx           # 루트 컴포넌트
│       │   ├── main.tsx          # 엔트리 포인트
│       │   └── index.css         # 글로벌 스타일 (Tailwind)
│       ├── .env.example          # 환경변수 템플릿
│       ├── vite.config.ts        # Vite 설정
│       └── tsconfig.json         # TypeScript 설정
│
├── packages/
│   ├── shared/                   # 공유 유틸리티 & Supabase 클라이언트
│   │   └── src/
│   │       ├── client.ts         # Supabase 클라이언트 팩토리
│   │       ├── types/
│   │       │   └── database.ts   # 자동 생성되는 DB 타입
│   │       └── index.ts          # 패키지 엔트리
│   │
│   ├── ui/                       # 공유 UI 컴포넌트 라이브러리
│   │   └── src/
│   │       ├── components/
│   │       │   ├── Button.tsx    # 버튼 컴포넌트
│   │       │   ├── Card.tsx      # 카드 컴포넌트
│   │       │   └── Input.tsx     # 입력 컴포넌트
│   │       └── index.ts
│   │
│   ├── tsconfig/                 # 공유 TypeScript 설정
│   │   ├── base.json             # 기본 설정
│   │   ├── react-app.json        # React 앱용
│   │   └── react-library.json    # React 라이브러리용
│   │
│   └── eslint-config/            # 공유 ESLint 설정
│       ├── base.js               # 기본 설정
│       └── react.js              # React 프로젝트용
│
├── supabase/                     # Supabase CLI 구성 (supabase init 필요)
│   ├── functions/                # Edge Functions
│   ├── migrations/               # 데이터베이스 마이그레이션
│   └── seeds/                    # 시드 데이터
│
├── pnpm-workspace.yaml           # 워크스페이스 정의
├── package.json                  # 루트 패키지 & 스크립트
└── .prettierrc                   # Prettier 설정
```

## 🔧 사전 요구사항

- **Node.js** >= 20.0.0
- **pnpm** >= 9.0.0
- **Docker** (로컬 Supabase 실행 시 필요)

```bash
# pnpm 설치 (없는 경우)
npm install -g pnpm
```

## 🚀 시작하기

### 1. 저장소 클론 & 의존성 설치

```bash
git clone <repository-url>
cd react-supabase-monorepo-template
pnpm install
```

### 2. Supabase 초기화

```bash
cd supabase
pnpm dlx supabase init --force
cd ..
```

> `--force` 옵션은 기존 디렉토리 구조를 유지하면서 `config.toml`을 생성합니다.

### 3. 환경변수 설정

```bash
cp apps/web/.env.example apps/web/.env
```

`apps/web/.env` 파일을 열고 Supabase 자격 증명을 입력합니다:

```env
# Supabase 프로젝트 URL
VITE_SUPABASE_URL=https://your-project-ref.supabase.co

# Supabase Publishable Key (새 형식: sb_publishable_xxx)
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your-key-here
```

> 💡 자격 증명은 [Supabase Dashboard](https://supabase.com/dashboard/project/_/settings/api) > Project Settings > API Keys에서 확인할 수 있습니다.

### 4. 개발 서버 시작

```bash
pnpm dev
```

브라우저에서 `http://localhost:3000`으로 접속합니다.

### 5. (선택) 로컬 Supabase 시작

```bash
pnpm db:start
```

> Docker가 필요합니다. Supabase Studio는 `http://localhost:54323`에서 접속할 수 있습니다.

## 📜 사용 가능한 스크립트

### 개발 & 빌드

| 명령어         | 설명                       |
| -------------- | -------------------------- |
| `pnpm dev`     | 개발 서버 시작 (포트 3000) |
| `pnpm build`   | 모든 패키지 프로덕션 빌드  |
| `pnpm preview` | 빌드된 앱 미리보기         |

### 코드 품질

| 명령어              | 설명                             |
| ------------------- | -------------------------------- |
| `pnpm type-check`   | 모든 패키지 TypeScript 타입 검사 |
| `pnpm lint`         | 모든 패키지 ESLint 검사          |
| `pnpm format`       | Prettier로 코드 포맷팅           |
| `pnpm format:check` | 포맷팅 검사 (CI용)               |

### 데이터베이스 (Supabase)

| 명령어                   | 설명                                    |
| ------------------------ | --------------------------------------- |
| `pnpm db:start`          | 로컬 Supabase 시작 (Docker 필요)        |
| `pnpm db:stop`           | 로컬 Supabase 중지                      |
| `pnpm db:status`         | Supabase 상태 확인                      |
| `pnpm db:reset`          | 데이터베이스 리셋 (마이그레이션 + 시드) |
| `pnpm db:generate-types` | TypeScript 타입 자동 생성               |

### Edge Functions

| 명령어                  | 설명                     |
| ----------------------- | ------------------------ |
| `pnpm functions:serve`  | Edge Functions 로컬 실행 |
| `pnpm functions:deploy` | Edge Functions 배포      |

### 유틸리티

| 명령어       | 설명                          |
| ------------ | ----------------------------- |
| `pnpm clean` | 모든 node_modules & dist 삭제 |

## 📦 패키지 상세 설명

### `@repo/web` (apps/web)

메인 React 애플리케이션입니다.

**주요 의존성:**

- `react` / `react-dom` ^19.2.3
- `vite` ^7.3.0
- `tailwindcss` ^4.1.18 (Vite 플러그인)
- `@vitejs/plugin-react` ^5.1.2

**경로 별칭:**

```typescript
// vite.config.ts에서 설정
import Component from "@/components/Component"; // = ./src/components/Component
```

### `@repo/shared` (packages/shared)

Supabase 클라이언트와 타입을 관리합니다.

**주요 기능:**

```typescript
import {
  createBrowserClient,
  type SupabaseClient,
  type Database,
} from "@repo/shared";

// 브라우저용 클라이언트 (환경변수 자동 사용)
const supabase = createBrowserClient();

// 커스텀 클라이언트
const supabase = createSupabaseClient(url, key);
```

### `@repo/ui` (packages/ui)

재사용 가능한 UI 컴포넌트 라이브러리입니다.

**제공 컴포넌트:**

```typescript
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from "@repo/ui";

// Button variants: primary | secondary | outline
// Button sizes: sm | md | lg
<Button variant="primary" size="md">Click me</Button>

// Card 구조
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// Input with label
<Input label="Email" type="email" placeholder="you@example.com" />
```

### `@repo/tsconfig` (packages/tsconfig)

공유 TypeScript 설정입니다.

| 설정 파일            | 용도                            |
| -------------------- | ------------------------------- |
| `base.json`          | 기본 설정 (strict 모드, ES2022) |
| `react-app.json`     | React 애플리케이션용            |
| `react-library.json` | React 라이브러리용              |
| `node.json`          | Node.js 환경용                  |

**사용 예시:**

```json
{
  "extends": "@repo/tsconfig/react-app.json"
}
```

### `@repo/eslint-config` (packages/eslint-config)

공유 ESLint 설정입니다 (Flat Config).

```javascript
// eslint.config.js
import reactConfig from "@repo/eslint-config/react.js";
export default reactConfig;
```

### `@repo/supabase` (supabase/)

Supabase CLI 구성 및 데이터베이스 관리입니다.

## 🗄️ Supabase 로컬 개발

### 로컬 환경 시작

```bash
# Supabase 초기화 (최초 1회)
cd supabase && pnpm dlx supabase init --force && cd ..

# Docker가 실행 중인지 확인
docker info

# Supabase 시작
pnpm db:start
```

시작 후 사용 가능한 서비스:

| 서비스                   | URL                    |
| ------------------------ | ---------------------- |
| Supabase Studio          | http://localhost:54323 |
| API                      | http://localhost:54321 |
| Inbucket (이메일 테스트) | http://localhost:54324 |
| PostgreSQL               | localhost:54322        |

### 마이그레이션 생성 & 적용

```bash
# 새 마이그레이션 파일 생성
cd supabase
pnpm migration:new create_users_table

# 마이그레이션 적용
pnpm migration:up

# 데이터베이스 전체 리셋 (마이그레이션 + 시드)
pnpm reset
```

### TypeScript 타입 생성

로컬 Supabase에서 타입을 자동 생성합니다:

```bash
pnpm db:generate-types
```

`packages/shared/src/types/database.ts` 파일이 업데이트됩니다.

## ⚡ Edge Functions

### 새 함수 생성

```bash
cd supabase
supabase functions new hello-world
```

### 로컬 테스트

```bash
pnpm functions:serve

# 다른 터미널에서 테스트
curl -i --location --request POST 'http://localhost:54321/functions/v1/hello-world' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"name":"World"}'
```

### 배포

```bash
pnpm functions:deploy
```

## 🆕 새 패키지 추가

### 1. 디렉토리 생성

```bash
mkdir -p packages/my-package/src
```

### 2. package.json 생성

```json
{
  "name": "@repo/my-package",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  },
  "scripts": {
    "type-check": "tsc --noEmit"
  },
  "devDependencies": {
    "@repo/tsconfig": "workspace:*",
    "typescript": "^5.9.3"
  }
}
```

### 3. tsconfig.json 생성

```json
{
  "extends": "@repo/tsconfig/base.json",
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 4. 다른 패키지에서 사용

```json
{
  "dependencies": {
    "@repo/my-package": "workspace:*"
  }
}
```

```bash
pnpm install
```

## 🚢 배포

### Vercel (권장)

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

**Build 설정:**

- Framework Preset: Vite
- Root Directory: `apps/web`
- Build Command: `cd ../.. && pnpm build`
- Output Directory: `dist`

### 환경변수 설정

Vercel 대시보드에서 다음 환경변수를 설정합니다:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

## 🔍 트러블슈팅

### pnpm install 실패

```bash
# 캐시 삭제 후 재설치
pnpm store prune
rm -rf node_modules
pnpm install
```

### 타입 오류 발생

```bash
# TypeScript 빌드 캐시 삭제
find . -name "*.tsbuildinfo" -delete
pnpm type-check
```

### Supabase 로컬 연결 실패

```bash
# Docker 상태 확인
docker ps

# Supabase 재시작
pnpm db:stop
pnpm db:start
```

### 환경변수가 인식되지 않음

- `.env` 파일이 `apps/web/` 디렉토리에 있는지 확인
- Vite 환경변수는 반드시 `VITE_` 접두사 필요
- 개발 서버 재시작 필요

## 🛠️ 기술 스택 상세

| 카테고리        | 기술         | 버전   |
| --------------- | ------------ | ------ |
| Framework       | React        | 19.2.3 |
| Build Tool      | Vite         | 7.3.0  |
| Styling         | Tailwind CSS | 4.1.18 |
| Language        | TypeScript   | 5.9.3  |
| Backend         | Supabase JS  | 2.89.0 |
| CLI             | Supabase CLI | 2.70.5 |
| Linting         | ESLint       | 9.39.2 |
| Formatting      | Prettier     | 3.7.4  |
| Package Manager | pnpm         | 9.15.0 |

## 📄 라이선스

MIT

---

Made with ❤️ using React + Supabase
