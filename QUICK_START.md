# 빠른 시작 가이드

## ⚡ 3분 안에 시작하기

### 1단계: 의존성 설치 (1분)

```bash
cd nextjs-version
pnpm install
```

### 2단계: 환경 변수 설정 (1분)

#### 기존 .env 파일이 있다면:

```bash
# 상위 폴더의 .env 파일 복사
cp ../.env .env.local
```

#### 처음 시작한다면:

```bash
# .env.example을 복사
cp .env.example .env.local

# .env.local 파일을 열어 이메일 설정을 업데이트하세요
```

최소 필수 설정:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@yourdomain.com
```

### 3단계: 개발 서버 실행 (10초)

```bash
pnpm dev
```

브라우저에서 http://localhost:3000 열기!

---

## 🔍 다음 단계

### 페이지 구현이 필요합니다

현재 프로젝트는 기본 구조와 컴포넌트만 복사된 상태입니다.
다음 파일들을 생성해야 합니다:

#### 필수 파일:

1. **루트 레이아웃** (`src/app/layout.tsx`)
   - ThemeProvider 설정
   - 전역 스타일 적용
   - 메타데이터 설정

2. **홈페이지** (`src/app/page.tsx`)
   - 기존 `Home.tsx` 내용 마이그레이션
   - Server Component로 전환

3. **블로그 목록** (`src/app/blog/page.tsx`)
   - 기존 `BlogList.tsx` 내용 마이그레이션
   - 서버에서 데이터 페칭

4. **블로그 상세** (`src/app/blog/[slug]/page.tsx`)
   - 기존 `BlogDetail.tsx` 내용 마이그레이션
   - 동적 라우팅 적용

5. **상담 신청** (`src/app/consultation/page.tsx`)
   - 기존 `Consultation.tsx` 내용 마이그레이션
   - Server Actions 연동

#### Server Actions 생성:

1. **블로그 액션** (`src/actions/blog.ts`)
   ```ts
   'use server'
   import * as db from '@/lib/db';

   export async function getBlogPosts() {
     return await db.getAllBlogPosts({ status: 'published' });
   }
   ```

2. **상담 신청 액션** (`src/actions/consultation.ts`)
   ```ts
   'use server'
   import * as db from '@/lib/db';
   import { sendEmail } from '@/lib/email';

   export async function submitConsultation(formData: FormData) {
     // 구현 필요
   }
   ```

3. **뉴스레터 구독 액션** (`src/actions/newsletter.ts`)
   ```ts
   'use server'
   export async function subscribeNewsletter(email: string) {
     // 구현 필요
   }
   ```

---

## 🎯 단계별 마이그레이션

### Phase 1: 기본 레이아웃 생성

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

export const metadata: Metadata = {
  title: '이엠마케팅 x 위딘비즈랩',
  description: '철학을 설계하고, 성과를 완성하는 병원 성장의 설계자',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="light">
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Phase 2: 홈페이지 생성

기존 `client/src/pages/Home.tsx` 내용을 `src/app/page.tsx`로 복사하되:
- Wouter의 `Link` → Next.js `Link`로 변경
- 클라이언트 컴포넌트는 별도 파일로 분리

### Phase 3: 블로그 페이지 생성

서버 컴포넌트로 데이터를 직접 페칭합니다.

```tsx
// src/app/blog/page.tsx
import * as db from '@/lib/db';

export default async function BlogPage() {
  const posts = await db.getAllBlogPosts({ status: 'published' });

  return (
    <div>
      {/* 블로그 목록 렌더링 */}
    </div>
  );
}
```

---

## 🐛 문제 해결

### "Module not found" 오류

```bash
# 의존성 재설치
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### TypeScript 오류

```bash
# 타입 체크
pnpm type-check
```

### 환경 변수가 작동하지 않음

- `.env.local` 파일이 루트 폴더(`nextjs-version/`)에 있는지 확인
- 서버를 재시작했는지 확인

---

## 📖 추가 자료

- [MIGRATION_PLAN.md](./MIGRATION_PLAN.md) - 전체 마이그레이션 계획
- [Next.js 문서](https://nextjs.org/docs)
- [shadcn/ui 문서](https://ui.shadcn.com/)

---

## ✅ 체크리스트

마이그레이션을 시작하기 전에 확인하세요:

- [ ] Node.js 18+ 설치됨
- [ ] pnpm 설치됨
- [ ] 환경 변수 설정 완료
- [ ] `pnpm install` 성공
- [ ] `pnpm dev` 실행 성공

다음 파일 생성 필요:
- [ ] `src/app/layout.tsx`
- [ ] `src/app/page.tsx`
- [ ] `src/app/blog/page.tsx`
- [ ] `src/app/blog/[slug]/page.tsx`
- [ ] `src/app/consultation/page.tsx`
- [ ] `src/actions/blog.ts`
- [ ] `src/actions/consultation.ts`
- [ ] `src/actions/newsletter.ts`

준비가 되셨나요? 시작해봅시다! 🚀
