# Design System Guide
## 병원 마케팅 웹사이트 디자인 시스템

> 전문적이고 신뢰감 있는 병원 마케팅 웹사이트를 위한 디자인 가이드

---

## 📐 Design Principles

### 1. 전문성 (Professionalism)
- 깔끔하고 정돈된 레이아웃
- 명확한 정보 위계
- 신뢰를 주는 비주얼

### 2. 명료성 (Clarity)
- 읽기 쉬운 타이포그래피
- 충분한 여백과 간격
- 명확한 콜투액션

### 3. 일관성 (Consistency)
- 통일된 컬러 팔레트
- 일관된 컴포넌트 스타일
- 예측 가능한 인터랙션

### 4. 접근성 (Accessibility)
- WCAG 2.1 AA 준수
- 충분한 색상 대비
- 키보드 네비게이션 지원

---

## 🎨 Color System

### Primary Colors (주요 색상)

병원 마케팅에 적합한 전문적이고 신뢰감 있는 색상 팔레트:

```css
/* Primary - Medical Blue (의료 블루) */
--color-primary-50: #EFF6FF;    /* 매우 밝은 배경용 */
--color-primary-100: #DBEAFE;   /* 밝은 배경용 */
--color-primary-200: #BFDBFE;   /* 호버 상태 */
--color-primary-300: #93C5FD;   /* 비활성 상태 */
--color-primary-400: #60A5FA;   /* 보조 요소 */
--color-primary-500: #3B82F6;   /* 메인 브랜드 컬러 */
--color-primary-600: #2563EB;   /* 호버 상태 (진하게) */
--color-primary-700: #1D4ED8;   /* 액티브 상태 */
--color-primary-800: #1E40AF;   /* 텍스트용 */
--color-primary-900: #1E3A8A;   /* 헤딩용 */
--color-primary-950: #172554;   /* 다크 텍스트 */

/* Secondary - Trust Green (신뢰 그린) */
--color-secondary-500: #10B981;  /* 성공, 긍정적 액션 */
--color-secondary-600: #059669;  /* 호버 상태 */

/* Accent - Warm Orange (따뜻한 오렌지) */
--color-accent-500: #F59E0B;     /* CTA, 강조 */
--color-accent-600: #D97706;     /* 호버 상태 */
```

### Neutral Colors (중립 색상)

```css
/* Gray Scale - Professional Grays */
--color-gray-50: #F9FAFB;       /* 배경 */
--color-gray-100: #F3F4F6;      /* 카드 배경 */
--color-gray-200: #E5E7EB;      /* 보더 */
--color-gray-300: #D1D5DB;      /* 비활성 요소 */
--color-gray-400: #9CA3AF;      /* 플레이스홀더 */
--color-gray-500: #6B7280;      /* 보조 텍스트 */
--color-gray-600: #4B5563;      /* 일반 텍스트 */
--color-gray-700: #374151;      /* 강조 텍스트 */
--color-gray-800: #1F2937;      /* 헤딩 */
--color-gray-900: #111827;      /* 다크 헤딩 */
```

### Semantic Colors (의미론적 색상)

```css
/* Success */
--color-success: #10B981;
--color-success-bg: #D1FAE5;
--color-success-text: #065F46;

/* Warning */
--color-warning: #F59E0B;
--color-warning-bg: #FEF3C7;
--color-warning-text: #92400E;

/* Error */
--color-error: #EF4444;
--color-error-bg: #FEE2E2;
--color-error-text: #991B1B;

/* Info */
--color-info: #3B82F6;
--color-info-bg: #DBEAFE;
--color-info-text: #1E40AF;
```

### Color Usage Guidelines

**Primary Blue 사용:**
- 주요 CTA 버튼
- 링크 색상
- 브랜드 요소
- 네비게이션 하이라이트

**Secondary Green 사용:**
- 성공 메시지
- 완료 상태
- 긍정적 피드백

**Accent Orange 사용:**
- 중요한 액션 버튼 (무료 상담 등)
- 주의 환기가 필요한 요소
- 제한적으로 사용 (과다 사용 금지)

---

## 📝 Typography System

### Font Family

```css
/* Primary Font - Pretendard (한글) */
font-family: 'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;

/* Monospace (코드용) */
font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

### Type Scale

명확한 시각적 위계를 위한 타이포그래피 스케일:

```css
/* Display - 랜딩 페이지 메인 헤딩 */
.text-display-2xl { font-size: 4.5rem; line-height: 1.1; }   /* 72px */
.text-display-xl  { font-size: 3.75rem; line-height: 1.1; }  /* 60px */
.text-display-lg  { font-size: 3rem; line-height: 1.2; }     /* 48px */

/* Heading - 섹션 헤딩 */
.text-h1 { font-size: 2.25rem; line-height: 1.2; }  /* 36px */
.text-h2 { font-size: 1.875rem; line-height: 1.3; } /* 30px */
.text-h3 { font-size: 1.5rem; line-height: 1.4; }   /* 24px */
.text-h4 { font-size: 1.25rem; line-height: 1.4; }  /* 20px */
.text-h5 { font-size: 1.125rem; line-height: 1.5; } /* 18px */

/* Body - 본문 텍스트 */
.text-body-xl { font-size: 1.25rem; line-height: 1.7; }   /* 20px - 큰 본문 */
.text-body-lg { font-size: 1.125rem; line-height: 1.7; }  /* 18px - 기본 본문 */
.text-body    { font-size: 1rem; line-height: 1.7; }      /* 16px - 표준 */
.text-body-sm { font-size: 0.875rem; line-height: 1.6; }  /* 14px - 작은 본문 */
.text-body-xs { font-size: 0.75rem; line-height: 1.5; }   /* 12px - 캡션 */
```

### Font Weights

```css
.font-light     { font-weight: 300; }  /* 부제목, 보조 텍스트 */
.font-normal    { font-weight: 400; }  /* 일반 본문 */
.font-medium    { font-weight: 500; }  /* 강조 텍스트, 버튼 */
.font-semibold  { font-weight: 600; }  /* 소제목 */
.font-bold      { font-weight: 700; }  /* 헤딩 */
.font-extrabold { font-weight: 800; }  /* 특별 강조 (제한적 사용) */
```

### Typography Guidelines

**헤딩 (Headings):**
- H1-H3: Bold (700)
- H4-H5: Semibold (600)
- 색상: `gray-900` (기본) 또는 `primary-900` (강조)
- Letter spacing: -0.02em (타이트하게)

**본문 (Body Text):**
- Font weight: Normal (400)
- 색상: `gray-700` (기본 본문)
- Line height: 1.7 (읽기 쉽게)
- 최대 너비: 65-75자 (가독성)

**링크 (Links):**
- 색상: `primary-600`
- Hover: `primary-700`
- Underline: 호버 시에만 또는 항상 (컨텍스트에 따라)

---

## 📏 Spacing System

8px 기반 스페이싱 시스템:

```css
/* Spacing Scale */
--space-0: 0;           /* 0px */
--space-1: 0.25rem;     /* 4px */
--space-2: 0.5rem;      /* 8px */
--space-3: 0.75rem;     /* 12px */
--space-4: 1rem;        /* 16px */
--space-5: 1.25rem;     /* 20px */
--space-6: 1.5rem;      /* 24px */
--space-8: 2rem;        /* 32px */
--space-10: 2.5rem;     /* 40px */
--space-12: 3rem;       /* 48px */
--space-16: 4rem;       /* 64px */
--space-20: 5rem;       /* 80px */
--space-24: 6rem;       /* 96px */
--space-32: 8rem;       /* 128px */
```

### Spacing Guidelines

**컴포넌트 내부:**
- 작은 요소 간격: 8-12px (space-2, space-3)
- 중간 요소 간격: 16-24px (space-4, space-6)
- 큰 요소 간격: 32-48px (space-8, space-12)

**섹션 간격:**
- 모바일: 64px (space-16)
- 데스크톱: 96-128px (space-24, space-32)

**컨테이너 패딩:**
- 모바일: 16-24px
- 태블릿: 32-48px
- 데스크톱: 48-64px

---

## 🎯 Component Patterns

### Buttons

```tsx
/* Primary Button - 주요 액션 */
className="
  px-6 py-3
  bg-primary-600 hover:bg-primary-700
  text-white font-medium
  rounded-lg
  shadow-sm hover:shadow-md
  transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
"

/* Secondary Button - 보조 액션 */
className="
  px-6 py-3
  bg-white hover:bg-gray-50
  text-gray-700 font-medium
  border border-gray-300
  rounded-lg
  shadow-sm hover:shadow
  transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
"

/* Accent Button - 강조 액션 (무료 상담 등) */
className="
  px-8 py-4
  bg-accent-500 hover:bg-accent-600
  text-white font-semibold
  rounded-lg
  shadow-lg hover:shadow-xl
  transition-all duration-200
  hover:scale-105
  focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2
"
```

### Cards

```tsx
/* Standard Card */
className="
  bg-white
  border border-gray-200
  rounded-xl
  p-6
  shadow-sm hover:shadow-md
  transition-shadow duration-200
"

/* Featured Card */
className="
  bg-white
  border-2 border-primary-200
  rounded-xl
  p-8
  shadow-lg
  relative
  overflow-hidden
"
```

### Input Fields

```tsx
/* Text Input */
className="
  w-full
  px-4 py-3
  border border-gray-300
  rounded-lg
  text-gray-900
  placeholder:text-gray-400
  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
  transition-all duration-200
"
```

---

## 🎭 Animation & Interaction

### Animation Principles

1. **Subtle & Purposeful** - 과도한 애니메이션 지양
2. **Fast & Responsive** - 200-300ms 이내
3. **Consistent** - 동일한 인터랙션은 동일한 애니메이션

### Transitions

```css
/* Standard transition */
transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);

/* Smooth transition */
transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);

/* Bounce (제한적 사용) */
transition: all 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Hover States

- **Buttons**: Scale (1.02-1.05), Shadow elevation
- **Cards**: Shadow elevation, Border color change
- **Links**: Color change, Underline
- **Icons**: Color change, Slight rotation (선택적)

### Focus States

- **Always visible**: Ring 효과 (2px, primary-500)
- **Offset**: 2px
- **Never remove**: outline-none 사용 시 반드시 대체 포커스 스타일 제공

---

## 📐 Layout System

### Container Widths

```css
/* Max widths */
--container-sm: 640px;   /* 작은 콘텐츠 */
--container-md: 768px;   /* 중간 콘텐츠 */
--container-lg: 1024px;  /* 일반 콘텐츠 */
--container-xl: 1280px;  /* 넓은 콘텐츠 */
--container-2xl: 1536px; /* 최대 너비 */
```

### Grid System

```tsx
/* 2 Column Grid */
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

/* 3 Column Grid */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

/* 4 Column Grid (작은 카드) */
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
```

### Breakpoints

```css
sm: 640px   /* 모바일 가로 */
md: 768px   /* 태블릿 */
lg: 1024px  /* 작은 데스크톱 */
xl: 1280px  /* 데스크톱 */
2xl: 1536px /* 큰 데스크톱 */
```

---

## 🎨 Component Library (ShadCN/ui)

이미 설치된 ShadCN/ui 컴포넌트를 일관되게 사용:

### 주요 컴포넌트

- **Button**: 모든 버튼 액션
- **Card**: 콘텐츠 그룹핑
- **Input, Textarea**: 폼 입력
- **Select**: 드롭다운 선택
- **Dialog**: 모달 팝업
- **Accordion**: FAQ, 펼치기/접기
- **Tabs**: 탭 네비게이션
- **Badge**: 상태 표시, 라벨
- **Alert**: 알림, 안내 메시지

### Customization

ShadCN/ui 컴포넌트는 Tailwind로 완전히 커스터마이징 가능:

```tsx
import { Button } from "@/components/ui/button";

<Button
  variant="default"  // default, secondary, outline, ghost
  size="lg"          // sm, md, lg
  className="..."    // 추가 커스텀 스타일
>
  버튼 텍스트
</Button>
```

---

## 🌓 Dark Mode (Optional)

현재는 **라이트 모드 우선**이지만, 향후 다크 모드 지원 시:

```css
.dark {
  --background: 15 23 42;      /* slate-900 */
  --foreground: 248 250 252;   /* slate-50 */
  --primary: 59 130 246;       /* blue-500 */
  /* ... */
}
```

---

## ✅ Implementation Checklist

### Phase 1: Foundation
- [ ] Update globals.css with new color system
- [ ] Define typography classes
- [ ] Set up spacing utilities
- [ ] Configure Tailwind config

### Phase 2: Components
- [ ] Redesign Hero section (light mode, minimal animation)
- [ ] Update Button components
- [ ] Redesign Card components
- [ ] Update Form components

### Phase 3: Pages
- [ ] Homepage redesign
- [ ] Blog page redesign
- [ ] Consultation page redesign

### Phase 4: Polish
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Responsive testing

---

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [ShadCN/ui Components](https://ui.shadcn.com/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## 🎯 Key Takeaways

1. **라이트 모드 우선** - 밝고 깔끔한 배경
2. **3가지 주요 색상** - Blue (Primary), Green (Secondary), Orange (Accent)
3. **명확한 타이포그래피** - 일관된 스케일과 위계
4. **절제된 애니메이션** - 빠르고 부드럽게
5. **ShadCN/ui 활용** - 검증된 컴포넌트 라이브러리 사용
6. **접근성 우선** - WCAG 2.1 AA 준수

---

**Last Updated**: 2025-11-17
**Version**: 1.0.0
