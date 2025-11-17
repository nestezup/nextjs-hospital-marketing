# Next.js 마이그레이션 계획서

## 📋 마이그레이션 개요

**목적**: React (Vite) + Express + tRPC → Next.js 15 App Router
**예상 기간**: 7-10일
**주요 변경사항**:
- Wouter → Next.js App Router
- tRPC → Server Actions
- Express 서버 제거 (Next.js API Routes/Server Actions로 통합)
- Vite → Next.js 빌드 시스템

---

## 🗂️ 프로젝트 구조 비교

### 기존 구조 (Vite + React)
```
hospital-marketing-website-legacy/
├── client/src/
│   ├── components/
│   ├── pages/
│   ├── contexts/
│   └── hooks/
├── server/
│   ├── _core/
│   ├── routers.ts (tRPC)
│   ├── db.ts
│   └── email.ts
├── shared/
└── data/
```

### 새 구조 (Next.js 15)
```
nextjs-version/
├── src/
│   ├── app/                    # App Router (페이지)
│   │   ├── layout.tsx
│   │   ├── page.tsx           # 홈
│   │   ├── blog/
│   │   │   ├── page.tsx       # 블로그 목록
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # 블로그 상세
│   │   └── consultation/
│   │       └── page.tsx       # 상담 신청
│   ├── components/            # UI 컴포넌트
│   │   └── ui/               # shadcn/ui
│   ├── lib/                  # 유틸리티
│   │   ├── db.ts            # 데이터베이스 레이어
│   │   ├── email.ts         # 이메일 발송
│   │   └── utils.ts         # 헬퍼 함수
│   ├── actions/              # Server Actions
│   │   ├── blog.ts
│   │   ├── consultation.ts
│   │   └── newsletter.ts
│   ├── contexts/            # React Contexts
│   └── hooks/               # 커스텀 훅
├── data/                    # JSON 데이터
│   ├── blog-posts.json
│   └── categories.json
└── public/                  # 정적 파일
```

---

## 🔄 주요 변경사항

### 1. 라우팅 시스템

**Before (Wouter):**
```tsx
// client/src/App.tsx
import { Route, Switch } from "wouter";

<Switch>
  <Route path="/" component={Home} />
  <Route path="/blog" component={BlogList} />
  <Route path="/blog/:slug" component={BlogDetail} />
</Switch>
```

**After (Next.js App Router):**
```
src/app/
├── page.tsx              # / → Home
├── blog/
│   ├── page.tsx         # /blog → BlogList
│   └── [slug]/
│       └── page.tsx     # /blog/:slug → BlogDetail
```

### 2. API 레이어

**Before (tRPC):**
```ts
// server/routers.ts
blog: router({
  list: publicProcedure
    .input(z.object({ ... }))
    .query(async ({ input }) => {
      return await db.getAllBlogPosts(input);
    }),
})

// client에서 호출
const { data } = trpc.blog.list.useQuery({ ... });
```

**After (Server Actions):**
```ts
// src/actions/blog.ts
'use server'

export async function getBlogPosts(params) {
  const validated = BlogPostsSchema.parse(params);
  return await db.getAllBlogPosts(validated);
}

// 또는 Server Component에서 직접 호출
// src/app/blog/page.tsx
export default async function BlogPage() {
  const posts = await db.getAllBlogPosts({ status: 'published' });
  return <div>...</div>;
}
```

### 3. 데이터 페칭

**Before (React Query + tRPC):**
```tsx
// 클라이언트 컴포넌트에서 데이터 페칭
const { data: posts } = trpc.blog.list.useQuery();
```

**After (Server Components):**
```tsx
// 서버 컴포넌트에서 직접 데이터 페칭
export default async function BlogPage() {
  const posts = await db.getAllBlogPosts();
  return <BlogList posts={posts} />;
}
```

### 4. 폼 처리

**Before (React Hook Form + tRPC Mutation):**
```tsx
const mutation = trpc.consultation.create.useMutation();
const onSubmit = (data) => {
  mutation.mutate(data);
};
```

**After (Server Actions + useFormState):**
```tsx
'use client'

import { useFormState } from 'react-dom';
import { submitConsultation } from '@/actions/consultation';

export default function ConsultationForm() {
  const [state, formAction] = useFormState(submitConsultation, null);

  return (
    <form action={formAction}>
      {/* form fields */}
    </form>
  );
}
```

---

## 📦 파일 마이그레이션 맵

### 컴포넌트 마이그레이션

| 기존 파일 | 새 위치 | 변경사항 |
|----------|--------|---------|
| `client/src/components/ui/*` | `src/components/ui/*` | 그대로 복사 |
| `client/src/components/EnhancedHero.tsx` | `src/components/EnhancedHero.tsx` | 'use client' 추가 |
| `client/src/components/FAQSection.tsx` | `src/components/FAQSection.tsx` | 'use client' 추가 |
| `client/src/components/Map.tsx` | `src/components/Map.tsx` | 'use client' 추가 |
| `client/src/contexts/ThemeContext.tsx` | `src/contexts/ThemeContext.tsx` | 'use client' 추가 |
| `client/src/hooks/useMobile.tsx` | `src/hooks/useMobile.tsx` | 'use client' 추가 |

### 페이지 마이그레이션

| 기존 파일 | 새 위치 | 변경 방식 |
|----------|--------|---------|
| `client/src/pages/Home.tsx` | `src/app/page.tsx` | Server Component로 전환 |
| `client/src/pages/BlogList.tsx` | `src/app/blog/page.tsx` | Server Component로 전환 |
| `client/src/pages/BlogDetail.tsx` | `src/app/blog/[slug]/page.tsx` | Server Component + Dynamic Route |
| `client/src/pages/Consultation.tsx` | `src/app/consultation/page.tsx` | Client Component 유지 |

### 서버 로직 마이그레이션

| 기존 파일 | 새 위치 | 변경사항 |
|----------|--------|---------|
| `server/db.ts` | `src/lib/db.ts` | 그대로 복사 |
| `server/email.ts` | `src/lib/email.ts` | 그대로 복사 |
| `server/routers.ts` → `blog.*` | `src/actions/blog.ts` | Server Actions로 변환 |
| `server/routers.ts` → `consultation.*` | `src/actions/consultation.ts` | Server Actions로 변환 |
| `server/routers.ts` → `newsletter.*` | `src/actions/newsletter.ts` | Server Actions로 변환 |

### 데이터 파일

| 기존 파일 | 새 위치 | 변경사항 |
|----------|--------|---------|
| `data/blog-posts.json` | `data/blog-posts.json` | 그대로 복사 |
| `data/categories.json` | `data/categories.json` | 그대로 복사 |

---

## 🚀 단계별 마이그레이션 가이드

### Phase 1: 프로젝트 셋업 (Day 1)

1. **Next.js 프로젝트 초기화**
   ```bash
   cd nextjs-version
   pnpm install
   ```

2. **환경 변수 설정**
   ```bash
   cp ../.env .env.local
   ```

3. **기본 설정 확인**
   - `package.json` - 의존성 확인
   - `tsconfig.json` - TypeScript 설정
   - `next.config.ts` - Next.js 설정
   - `tailwind.config.ts` - Tailwind CSS 설정

### Phase 2: UI 컴포넌트 마이그레이션 (Day 2-3)

1. **shadcn/ui 컴포넌트 복사**
   ```bash
   # 이미 복사됨: src/components/ui/
   ```

2. **기존 컴포넌트에 'use client' 지시어 추가**
   - 상태를 사용하는 컴포넌트
   - 이벤트 핸들러가 있는 컴포넌트
   - useEffect, useState 등 훅을 사용하는 컴포넌트

3. **Link 컴포넌트 변경**
   ```tsx
   // Before
   import { Link } from 'wouter';

   // After
   import Link from 'next/link';
   ```

### Phase 3: 페이지 생성 (Day 3-4)

1. **루트 레이아웃 생성**
   ```tsx
   // src/app/layout.tsx
   import { ThemeProvider } from '@/contexts/ThemeContext';

   export default function RootLayout({ children }) {
     return (
       <html lang="ko">
         <body>
           <ThemeProvider>
             {children}
           </ThemeProvider>
         </body>
       </html>
     );
   }
   ```

2. **각 페이지 생성**
   - `src/app/page.tsx` (홈)
   - `src/app/blog/page.tsx` (블로그 목록)
   - `src/app/blog/[slug]/page.tsx` (블로그 상세)
   - `src/app/consultation/page.tsx` (상담 신청)

### Phase 4: Server Actions 구현 (Day 4-6)

1. **블로그 액션**
   ```tsx
   // src/actions/blog.ts
   'use server'

   import * as db from '@/lib/db';
   import { z } from 'zod';

   export async function getBlogPosts(params) {
     return await db.getAllBlogPosts(params);
   }
   ```

2. **상담 신청 액션**
   ```tsx
   // src/actions/consultation.ts
   'use server'

   export async function submitConsultation(formData: FormData) {
     // 유효성 검사
     // DB 저장
     // 이메일 발송
   }
   ```

3. **뉴스레터 구독 액션**
   ```tsx
   // src/actions/newsletter.ts
   'use server'

   export async function subscribeNewsletter(email: string) {
     // 구독 처리
   }
   ```

### Phase 5: SEO 최적화 (Day 6-7)

1. **메타데이터 생성**
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

2. **정적 경로 생성 (SSG)**
   ```tsx
   export async function generateStaticParams() {
     const posts = await db.getAllBlogPosts();
     return posts.map(post => ({ slug: post.slug }));
   }
   ```

### Phase 6: 테스트 및 배포 (Day 7-10)

1. **로컬 테스트**
   ```bash
   pnpm dev
   ```

2. **프로덕션 빌드 테스트**
   ```bash
   pnpm build
   pnpm start
   ```

3. **Vercel 배포**
   ```bash
   vercel deploy
   ```

---

## ⚠️ 주의사항

### 1. 클라이언트/서버 컴포넌트 구분

- **Server Components (기본)**
  - 데이터 페칭
  - SEO가 중요한 컴포넌트
  - 정적 콘텐츠

- **Client Components ('use client' 필요)**
  - useState, useEffect 사용
  - 이벤트 핸들러 (onClick 등)
  - 브라우저 전용 API (window, document)
  - next-themes, framer-motion 등 클라이언트 라이브러리

### 2. 데이터베이스 동시성

현재 JSON 파일 기반 DB는 동시성 문제가 있을 수 있습니다.
향후 MySQL/PostgreSQL로 마이그레이션 권장.

### 3. 이미지 최적화

Next.js의 `<Image>` 컴포넌트 사용 권장:
```tsx
import Image from 'next/image';

<Image src="/hero.jpg" width={1200} height={600} alt="Hero" />
```

### 4. 환경 변수

Next.js는 환경 변수 접두사 규칙이 있습니다:
- `NEXT_PUBLIC_*` - 클라이언트에서 접근 가능
- 기타 - 서버에서만 접근 가능

---

## 📚 참고 자료

- [Next.js 15 공식 문서](https://nextjs.org/docs)
- [App Router 가이드](https://nextjs.org/docs/app)
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)

---

## ✅ 마이그레이션 체크리스트

### 프로젝트 셋업
- [ ] Next.js 프로젝트 초기화
- [ ] 의존성 설치
- [ ] 환경 변수 설정
- [ ] Tailwind CSS 설정
- [ ] TypeScript 설정

### 컴포넌트 마이그레이션
- [ ] shadcn/ui 컴포넌트 복사
- [ ] 비즈니스 컴포넌트 복사
- [ ] 'use client' 지시어 추가
- [ ] Link 컴포넌트 변경
- [ ] Context Providers 설정

### 페이지 생성
- [ ] 루트 레이아웃
- [ ] 홈 페이지
- [ ] 블로그 목록 페이지
- [ ] 블로그 상세 페이지
- [ ] 상담 신청 페이지
- [ ] 404 페이지

### Server Actions
- [ ] 블로그 액션
- [ ] 상담 신청 액션
- [ ] 뉴스레터 구독 액션
- [ ] HTML 변환 액션

### 데이터 레이어
- [ ] db.ts 복사
- [ ] email.ts 복사
- [ ] JSON 데이터 파일 복사
- [ ] 타입 정의 복사

### SEO 최적화
- [ ] 메타데이터 생성
- [ ] sitemap.xml
- [ ] robots.txt
- [ ] Open Graph 이미지

### 테스트
- [ ] 로컬 개발 서버 테스트
- [ ] 프로덕션 빌드 테스트
- [ ] 폼 제출 테스트
- [ ] 이메일 발송 테스트
- [ ] 블로그 CRUD 테스트

### 배포
- [ ] Vercel 프로젝트 설정
- [ ] 환경 변수 설정
- [ ] 도메인 연결
- [ ] 프로덕션 배포
