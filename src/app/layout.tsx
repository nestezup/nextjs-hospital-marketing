import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { FontProvider } from "@/contexts/FontContext";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

const pretended = {
  variable: "--font-pretended",
  display: "swap",
};

export const metadata: Metadata = {
  title: {
    default: "병원 마케팅 전문가 | 이엠마케팅 x 위딘비즈랩",
    template: "%s | 이엠마케팅 x 위딘비즈랩",
  },
  description: "병원 성장의 설계자. 체계적인 마케팅 전략으로 병원의 브랜드 가치를 높이고 환자 유입을 극대화합니다.",
  keywords: ["병원 마케팅", "의료 마케팅", "병원 광고", "병원 브랜딩", "환자 유치", "병원 CRM"],
  authors: [{ name: "이엠마케팅 x 위딘비즈랩" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: "병원 마케팅 전문가 | 이엠마케팅 x 위딘비즈랩",
    description: "병원 성장의 설계자. 체계적인 마케팅 전략으로 병원의 브랜드 가치를 높이고 환자 유입을 극대화합니다.",
    siteName: "이엠마케팅 x 위딘비즈랩",
  },
  twitter: {
    card: "summary_large_image",
    title: "병원 마케팅 전문가 | 이엠마케팅 x 위딘비즈랩",
    description: "병원 성장의 설계자. 체계적인 마케팅 전략으로 병원의 브랜드 가치를 높이고 환자 유입을 극대화합니다.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${notoSansKr.variable} ${pretended.variable} font-sans antialiased`}>
        <ThemeProvider defaultTheme="light" switchable={false}>
          <FontProvider>
            <Navbar />
            {children}
          </FontProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
