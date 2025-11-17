# 디자인 시스템 가이드

이엠마케팅 x 위딘비즈랩 병원 마케팅 웹사이트의 디자인 시스템입니다.

## 디자인 프레임워크

- **Tailwind CSS 4** - 유틸리티 기반 CSS 프레임워크
- **shadcn/ui** - Radix UI 기반 접근성 컴포넌트
- **Noto Sans KR + Inter** - 한글/영문 폰트 조합

## 브랜드 컬러

### Primary Colors

```css
--brand-deep-blue: #0A2463    /* 딥 블루 - 메인 브랜드 컬러 */
--brand-cerulean: #3E92CC     /* 세리우리안 블루 - 세컨더리 */
--brand-amber: #F18F01         /* 앰버 - 액센트 */
--brand-turquoise: #4ECDC4    /* 터코이즈 - 보조 액센트 */
```

### 사용 예시

```tsx
// Tailwind 클래스
<div className="bg-brand-deep-blue text-white">
<div className="bg-brand-cerulean">
<div className="text-brand-amber">

// Gradient
<div className="bg-gradient-to-r from-brand-deep-blue to-brand-cerulean">
```

### Semantic Colors

```css
--primary: Deep Blue (#0A2463)
--secondary: Cerulean Blue (#3E92CC)
--accent: Amber (#F18F01)
--muted: Light Gray (#F5F5F5)
```

## 타이포그래피

### 폰트 크기

| 크기 | Tailwind | 픽셀 | 용도 |
|------|----------|------|------|
| h1 | `text-5xl` | 48px | 페이지 타이틀 |
| h2 | `text-4xl` | 36px | 섹션 제목 |
| h3 | `text-3xl` | 30px | 서브섹션 제목 |
| h4 | `text-2xl` | 24px | 카드 제목 |
| body | `text-base` | 16px | 본문 |
| large | `text-lg` | 18px | 강조 본문 |
| small | `text-sm` | 14px | 캡션, 메타 정보 |

### 폰트 두께

- **제목**: `font-bold` (700)
- **강조**: `font-semibold` (600)
- **본문**: `font-normal` (400)

### Line Height

- **제목**: `leading-tight` (1.2)
- **본문**: `leading-relaxed` (1.7)

## Spacing

### Container

```tsx
<div className="container mx-auto px-4">
  {/* 최대 너비 자동 조정, 좌우 패딩 16px */}
</div>
```

### Section Padding

```tsx
<section className="py-20">  {/* 상하 80px */}
<section className="py-16">  {/* 상하 64px */}
<section className="py-12">  {/* 상하 48px */}
```

### Card Spacing

```tsx
<Card className="p-6">   {/* 24px 패딩 */}
<Card className="p-8">   {/* 32px 패딩 */}
```

## Border Radius

```css
--radius: 0.75rem  /* 12px - 기본 라운드 */
```

```tsx
<div className="rounded-lg">   {/* 12px */}
<div className="rounded-xl">   {/* 16px */}
<div className="rounded-2xl">  {/* 24px */}
```

## Shadows

### Card Shadows

```tsx
<Card className="shadow-sm">        {/* 작은 그림자 */}
<Card className="shadow-md">        {/* 중간 그림자 */}
<Card className="shadow-lg">        {/* 큰 그림자 */}
<Card className="shadow-xl">        {/* 매우 큰 그림자 */}
```

### Hover Effects

```tsx
<Card className="hover:shadow-lg transition-all duration-300">
<Button className="hover:scale-105 transition-transform">
```

## 컴포넌트 패턴

### Buttons

```tsx
// Primary Button
<Button className="bg-brand-deep-blue hover:bg-brand-cerulean">
  클릭하기
</Button>

// Secondary Button
<Button variant="outline" className="border-brand-cerulean text-brand-cerulean">
  더 알아보기
</Button>

// Accent Button
<Button className="bg-brand-amber hover:bg-brand-amber/90">
  지금 시작하기
</Button>
```

### Cards

```tsx
<Card className="hover:shadow-lg transition-all duration-300">
  <CardHeader>
    <CardTitle className="text-2xl text-brand-deep-blue">
      제목
    </CardTitle>
    <CardDescription>
      설명
    </CardDescription>
  </CardHeader>
  <CardContent>
    내용
  </CardContent>
</Card>
```

### Gradients

```tsx
// Hero Background
<div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">

// Button Gradient
<Button className="bg-gradient-to-r from-brand-deep-blue to-brand-cerulean">

// Text Gradient
<span className="bg-gradient-to-r from-brand-cerulean via-brand-turquoise to-brand-amber bg-clip-text text-transparent">
```

## 반응형 디자인

### Breakpoints

```css
sm: 640px   /* 모바일 가로 */
md: 768px   /* 태블릿 */
lg: 1024px  /* 데스크톱 */
xl: 1280px  /* 큰 데스크톱 */
```

### 사용 예시

```tsx
<div className="
  text-2xl      /* 모바일: 24px */
  md:text-3xl   /* 태블릿: 30px */
  lg:text-4xl   /* 데스크톱: 36px */
">
  반응형 제목
</div>

<div className="
  grid
  grid-cols-1       /* 모바일: 1열 */
  md:grid-cols-2    /* 태블릿: 2열 */
  lg:grid-cols-3    /* 데스크톱: 3열 */
  gap-6
">
```

## 애니메이션

### Transition

```tsx
<div className="transition-all duration-300">
<div className="transition-transform duration-200">
<div className="transition-colors duration-150">
```

### Hover Effects

```tsx
<Card className="hover:-translate-y-1 transition-transform">
<Button className="hover:scale-105 transition-transform">
<Link className="hover:text-brand-cerulean transition-colors">
```

## 접근성

### 색상 대비

- **텍스트**: 최소 4.5:1 대비율
- **큰 텍스트**: 최소 3:1 대비율
- **인터랙티브 요소**: 최소 3:1 대비율

### 포커스 표시

```tsx
<Button className="focus:ring-2 focus:ring-brand-cerulean focus:ring-offset-2">
<Input className="focus:border-brand-cerulean focus:ring-brand-cerulean">
```

### ARIA 레이블

```tsx
<button aria-label="메뉴 열기">
<img alt="병원 마케팅 이미지">
```

## 다크 모드

현재 라이트 모드만 지원하지만, 향후 다크 모드 추가 가능:

```tsx
<ThemeProvider defaultTheme="light" switchable={false}>
```

다크 모드 색상은 `globals.css`의 `.dark` 클래스에 정의되어 있습니다.

## Best Practices

### DO ✅

- 브랜드 컬러를 일관되게 사용
- 충분한 여백과 간격 유지
- 반응형 디자인 적용
- 접근성 고려 (ARIA, 대비, 키보드 네비게이션)
- 부드러운 트랜지션 효과

### DON'T ❌

- 너무 많은 컬러 사용
- 작은 글씨 크기 (14px 미만)
- 일관성 없는 spacing
- 과도한 애니메이션
- 접근성 무시

## 예시 페이지 구조

```tsx
export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-brand-deep-blue via-brand-cerulean to-brand-deep-blue">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-6">
            페이지 타이틀
          </h1>
          <p className="text-xl text-white/90 mb-8">
            설명 문구
          </p>
          <Button size="lg" className="bg-brand-amber hover:bg-brand-amber/90">
            시작하기
          </Button>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            섹션 제목
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cards */}
          </div>
        </div>
      </section>
    </div>
  );
}
```
