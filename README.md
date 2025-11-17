# 병원 마케팅 웹사이트 (Next.js 버전)

이엠마케팅 x 위딘비즈랩 병원 마케팅 웹사이트의 Next.js 15 마이그레이션 버전입니다.

## 🚀 시작하기

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 환경 변수 설정

`.env.example` 파일을 복사하여 `.env.local` 파일을 생성합니다:

```bash
cp .env.example .env.local
```

그리고 필요한 환경 변수를 설정하세요:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM_EMAIL=noreply@yourdomain.com
SMTP_FROM_NAME=이엠마케팅 x 위딘비즈랩

# Admin Email
ADMIN_EMAIL=admin@yourdomain.com
```

### 3. 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📁 프로젝트 구조

```
nextjs-version/
├── src/
│   ├── app/                    # App Router (페이지)
│   │   ├── layout.tsx          # 루트 레이아웃
│   │   ├── page.tsx            # 홈페이지
│   │   ├── blog/               # 블로그 관련 페이지
│   │   └── consultation/       # 상담 신청 페이지
│   ├── components/             # 재사용 가능한 컴포넌트
│   │   └── ui/                 # shadcn/ui 컴포넌트
│   ├── lib/                    # 유틸리티 함수
│   │   ├── db.ts              # 데이터베이스 레이어
│   │   ├── email.ts           # 이메일 발송
│   │   └── utils.ts           # 헬퍼 함수
│   ├── actions/                # Server Actions
│   ├── contexts/              # React Contexts
│   └── hooks/                 # 커스텀 훅
├── data/                       # JSON 데이터 파일
│   ├── blog-posts.json
│   └── categories.json
└── public/                     # 정적 파일
```

## 🛠️ 주요 기술 스택

- **Framework**: Next.js 15 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS 4
- **UI 컴포넌트**: shadcn/ui + Radix UI
- **폼 관리**: React Hook Form + Zod
- **애니메이션**: Framer Motion
- **테마**: next-themes

## 📝 개발 가이드

### 페이지 추가하기

Next.js App Router를 사용합니다. `src/app/` 폴더에 새 폴더를 만들고 `page.tsx` 파일을 추가하세요.

```tsx
// src/app/new-page/page.tsx
export default function NewPage() {
  return (
    <div>
      <h1>새 페이지</h1>
    </div>
  );
}
```

### Server Actions 추가하기

Server Actions는 `src/actions/` 폴더에 추가합니다.

```tsx
// src/actions/example.ts
'use server'

import { z } from 'zod';

const ExampleSchema = z.object({
  name: z.string(),
});

export async function exampleAction(formData: FormData) {
  const validated = ExampleSchema.parse({
    name: formData.get('name'),
  });

  // 로직 처리
  return { success: true };
}
```

### 컴포넌트 추가하기

클라이언트 상호작용이 필요한 컴포넌트는 `'use client'` 지시어를 추가하세요.

```tsx
// src/components/InteractiveButton.tsx
'use client'

import { useState } from 'react';

export function InteractiveButton() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      클릭 횟수: {count}
    </button>
  );
}
```

## 🔧 사용 가능한 명령어

```bash
# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start

# 린팅
pnpm lint

# 타입 체크
pnpm type-check
```

## 📚 마이그레이션 가이드

자세한 마이그레이션 가이드는 [MIGRATION_PLAN.md](./MIGRATION_PLAN.md)를 참조하세요.

주요 변경사항:
- Wouter → Next.js App Router
- tRPC → Server Actions
- Vite → Next.js 빌드 시스템
- Express 서버 제거

## 🚢 배포

### Vercel (권장)

```bash
# Vercel CLI 설치
pnpm add -g vercel

# 배포
vercel
```

### 기타 플랫폼

```bash
# 프로덕션 빌드
pnpm build

# 정적 파일은 .next 폴더에 생성됩니다
```

## ⚠️ 주의사항

1. **환경 변수**: `.env.local` 파일은 git에 커밋하지 마세요.
2. **클라이언트 컴포넌트**: 상태나 이벤트 핸들러를 사용하는 컴포넌트에만 `'use client'`를 추가하세요.
3. **데이터베이스**: 현재 JSON 파일 기반입니다. 프로덕션에서는 실제 데이터베이스 사용을 권장합니다.

## 📞 문의

- 이엠마케팅: [웹사이트](https://emmarketing.co.kr)
- 위딘비즈랩: [웹사이트](https://withinbizlab.com)

## 📄 라이선스

MIT
