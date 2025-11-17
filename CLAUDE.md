# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

병원 마케팅 웹사이트의 Next.js 15 마이그레이션 버전. React (Vite) + Express + tRPC 스택에서 Next.js App Router + Server Actions로 마이그레이션된 프로젝트.

**Package Manager**: pnpm (10.4.1+)

## Development Commands

```bash
# Development server
pnpm dev                 # Start dev server on http://localhost:3000

# Production
pnpm build              # Build for production
pnpm start              # Run production server

# Code quality
pnpm lint               # Run ESLint
pnpm type-check         # TypeScript type checking (tsc --noEmit)
```

## Architecture

### App Router Structure

Next.js 15 App Router를 사용하며, **아직 페이지가 구현되지 않았습니다**. 파일 기반 라우팅으로 작동:

```
src/app/
├── layout.tsx         # Root layout (ThemeProvider 등)
├── page.tsx           # / → 홈페이지
├── blog/
│   ├── page.tsx      # /blog → 블로그 목록
│   └── [slug]/
│       └── page.tsx  # /blog/:slug → 블로그 상세
└── consultation/
    └── page.tsx      # /consultation → 상담 신청
```

### Data Layer (JSON-based)

**중요**: 현재 데이터베이스 대신 **JSON 파일**을 사용합니다:

- `data/blog-posts.json` - 블로그 포스트
- `data/categories.json` - 카테고리

데이터 접근은 `src/lib/db.ts`를 통해서만 수행:
```ts
import * as db from '@/lib/db';

// Server Components 또는 Server Actions에서만 사용
const posts = await db.getAllBlogPosts({ status: 'published' });
const post = await db.getBlogPostBySlug(slug);
await db.createBlogPost(postData);
await db.incrementBlogViewCount(slug);
```

**동시성 주의**: JSON 파일 기반이므로 동시 쓰기 시 데이터 손실 가능. 프로덕션에서는 MySQL/PostgreSQL 사용 권장.

### Server Actions Pattern

Server Actions는 `src/actions/` 디렉토리에 위치하며 **아직 구현되지 않았습니다**:

```tsx
// src/actions/consultation.ts
'use server'

import { z } from 'zod';
import * as db from '@/lib/db';

const Schema = z.object({ ... });

export async function submitConsultation(formData: FormData) {
  const validated = Schema.parse(Object.fromEntries(formData));
  // DB 저장 및 비즈니스 로직
  return { success: true };
}
```

### Client vs Server Components

**Server Components (기본)**:
- 데이터 페칭이 필요한 페이지
- SEO가 중요한 콘텐츠
- `'use client'` 지시어 없음

**Client Components (`'use client'` 필수)**:
- `useState`, `useEffect` 등 React 훅 사용
- 이벤트 핸들러 (onClick, onChange)
- 브라우저 API (window, document)
- 라이브러리: `next-themes`, `framer-motion`, `react-hook-form`

### Email System

이메일 발송은 Forge API 통합:
```ts
import { sendEmail } from '@/lib/email';

await sendEmail({
  to: 'user@example.com',
  subject: '제목',
  html: '<html>...</html>',
  templateType: 'consultation_confirmation'
});
```

템플릿 함수:
- `getConsultationConfirmationEmailTemplate()` - 상담 확인 이메일
- `getNewsletterSubscriptionEmailTemplate()` - 뉴스레터 구독 확인
- `sendConsultationNotificationToAdmin()` - 관리자 알림

### Type System

TypeScript path aliases:
- `@/*` → `src/*`
- `@shared/*` → `src/shared/*`

공유 타입은 `src/shared/types.ts`에서 import:
```ts
export type * from "../drizzle/schema";  // 향후 DB 마이그레이션용
export * from "./_core/errors";
```

HTTP 에러 처리:
```ts
import { BadRequestError, NotFoundError } from '@shared/_core/errors';

throw NotFoundError('Post not found');
```

## Component Architecture

### UI Components (shadcn/ui)

`src/components/ui/`에 shadcn/ui 컴포넌트 집합 포함. 모두 Radix UI 기반.

### Business Components

주요 컴포넌트 (모두 `'use client'` 필요):
- `EnhancedHero` - 메인 히어로 섹션
- `FAQSection` - FAQ 아코디언
- `Map` - 지도 컴포넌트
- `PricingSection` - 가격 테이블
- `SpecialtiesSection` - 전문 분야
- `DashboardLayout` - 대시보드 레이아웃

### Contexts

- `ThemeContext` - 다크모드 테마 관리 (`next-themes` 사용)

## Environment Variables

`.env.local` 파일에 설정 (`.env.example` 참고):

```env
# Database (현재 미사용)
DATABASE_URL=

# Email (Forge API)
FORGE_API_URL=
FORGE_API_KEY=

# Admin
OWNER_EMAIL=admin@example.com

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**중요**:
- `NEXT_PUBLIC_*` 접두사 = 클라이언트 접근 가능
- 나머지 = 서버 전용

## Migration Context

기존 스택에서 마이그레이션:
- Wouter → Next.js App Router
- tRPC → Server Actions
- Express → Next.js API Routes
- React Query → Server Components 직접 데이터 페칭

자세한 내용은 `MIGRATION_PLAN.md` 참조.

## Next.js Specific Patterns

### Metadata Generation

```tsx
// src/app/blog/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const post = await db.getBlogPostBySlug(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
  };
}
```

### Static Generation

```tsx
export async function generateStaticParams() {
  const posts = await db.getAllBlogPosts();
  return posts.map(post => ({ slug: post.slug }));
}
```

### Image Optimization

Next.js Image 컴포넌트 사용:
```tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  width={1200}
  height={600}
  alt="Description"
/>
```

## Common Patterns

### Form Handling

Server Actions + React Hook Form:
```tsx
'use client'

import { useFormState } from 'react-dom';
import { submitForm } from '@/actions/forms';

export default function MyForm() {
  const [state, formAction] = useFormState(submitForm, null);

  return (
    <form action={formAction}>
      {/* fields */}
    </form>
  );
}
```

### Data Fetching in Server Components

```tsx
// Server Component - no 'use client'
export default async function BlogPage() {
  const posts = await db.getAllBlogPosts({ status: 'published' });

  return <BlogList posts={posts} />;
}
```

### Link Navigation

```tsx
import Link from 'next/link';

<Link href="/blog">블로그</Link>
```

## Testing & Quality

현재 테스트는 구성되지 않았지만, 린트와 타입 체크 필수:
```bash
pnpm lint        # 모든 커밋 전 실행
pnpm type-check  # 빌드 전 실행
```

## Deployment

Vercel 권장:
```bash
vercel deploy
```

환경 변수는 Vercel 대시보드에서 설정.

## Blog API

외부에서 블로그 포스트를 관리할 수 있는 REST API가 제공됩니다. 모든 데이터는 `data/blog-posts.json`에 저장됩니다.

### API 엔드포인트

- `POST /api/blog` - 새 블로그 포스트 생성
- `GET /api/blog` - 모든 블로그 포스트 조회 (쿼리: status, category)
- `GET /api/blog/[slug]` - 특정 블로그 포스트 조회
- `PUT /api/blog` - 블로그 포스트 수정
- `PATCH /api/blog/[slug]` - 조회수 증가
- `DELETE /api/blog?slug=[slug]` - 블로그 포스트 삭제

자세한 사용법은 `API_USAGE.md` 참조.

### 사용 예시

```bash
# 새 블로그 포스트 생성
curl -X POST http://localhost:3000/api/blog \
  -H "Content-Type: application/json" \
  -d '{
    "title": "병원 마케팅 가이드",
    "excerpt": "효과적인 병원 마케팅 전략",
    "content": "<p>본문...</p>",
    "author": "이엠마케팅",
    "category": "마케팅 전략",
    "status": "published"
  }'
```

## Navigation

모든 페이지에 Navbar가 표시됩니다:
- 홈 (/)
- 블로그 (/blog)
- 상담 신청 (/consultation)

## Current Status

**마이그레이션 완료** ✅:
- ✅ 프로젝트 셋업 완료
- ✅ 컴포넌트 복사 완료
- ✅ 데이터 레이어 (JSON) 완료
- ✅ 페이지 생성 완료 (홈, 블로그, 상담)
- ✅ Server Actions 구현 완료
- ✅ Navbar 추가 완료
- ✅ 블로그 API 구현 완료
- ✅ 프로덕션 빌드 성공

프로젝트가 정상적으로 작동합니다!
