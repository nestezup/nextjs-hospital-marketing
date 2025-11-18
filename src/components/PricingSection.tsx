'use client'

import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PricingSection() {
  const packages = [
    {
      name: "BASIC",
      price: "250만원/월",
      subtitle: "\"처음 시작하는 병원에게\"",
      description: "가장 기본적인 패키지",
      features: [
        "블로그 월 12회 포스팅",
        "네이버 GFA (검색광고) 100만원 집행",
        "네이버 플레이스 관리",
        "월간 리포트 제공",
        "온라인 미팅 (월 1회)",
      ],
      benefits: [
        "블로그 양도",
        "13개월 요금으로 14개월 서비스",
      ],
      highlight: false,
    },
    {
      name: "STANDARD",
      price: "400만원/월",
      subtitle: "\"제대로 성장하고 싶은 병원에게\"",
      description: "가장 인기 있는 패키지",
      features: [
        "BASIC 패키지 전체 포함",
        "네이버 디스플레이 광고 추가",
        "카카오모먼트 광고",
        "구글 디스플레이 광고",
        "리뷰/후기 관리 대행",
        "현장 방문 컨설팅 (분기 1회)",
        "직원 교육 (월 1회, 온라인)",
      ],
      benefits: [
        "블로그 양도 (준최적 이상)",
        "무료 병원 촬영 (연 1회)",
        "광고 소재 무제한 제작",
      ],
      highlight: true,
    },
    {
      name: "PREMIUM",
      price: "600만원~/월",
      subtitle: "\"지역 1위를 목표하는 병원에게\"",
      description: "",
      features: [
        "STANDARD 패키지 전체 포함",
        "전담 PM 배정 (1:1 전담 관리)",
        "현장 방문 컨설팅 (월 1회)",
        "원장 브랜딩 전략 (개인 SNS 관리)",
        "AI 기반 CRM 시스템 구축/운영",
        "영상 콘텐츠 제작 (분기별)",
        "직원 교육 (현장 방문, 월 1회)",
        "경쟁사 분석 리포트 (분기별)",
        "장기 경영 로드맵 수립",
      ],
      benefits: [
        "블로그 양도 (최적 블로그)",
        "무료 병원 촬영 (연 2회)",
        "홈페이지 리뉴얼 50% 할인",
      ],
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 text-center">
            병원 상황에 맞는 맞춤 예산 설계
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            병원의 성장 단계와 목표에 따라 최적의 패키지를 선택하세요
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`relative transition-all duration-300 bg-white ${
                pkg.highlight
                  ? "border-2 border-primary-500 shadow-2xl md:-translate-y-4"
                  : "border border-gray-200 hover:border-primary-200 hover:shadow-lg hover:-translate-y-2"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                  ⭐ 가장 인기
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold mb-3 text-gray-900">{pkg.name}</CardTitle>
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-3">{pkg.price}</div>
                <CardDescription className="text-lg font-semibold text-gray-700">{pkg.subtitle}</CardDescription>
                {pkg.description && (
                  <p className="text-sm text-gray-500 mt-2">{pkg.description}</p>
                )}
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-gray-900">포함 내용:</h4>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-semibold mb-3 text-gray-900">1년 계약 시 혜택:</h4>
                  <ul className="space-y-2">
                    {pkg.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-secondary-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/consultation">
                  <Button
                    className={`w-full mt-6 font-bold transition-all duration-200 ${
                      pkg.highlight
                        ? "bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl"
                        : "bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white"
                    }`}
                    size="lg"
                  >
                    상담 신청하기
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">
            * 패키지 금액은 관리 대행비이며, 실제 광고비(네이버/카카오/구글 집행비)는 별도입니다.
          </p>
        </div>
      </div>
    </section>
  );
}
