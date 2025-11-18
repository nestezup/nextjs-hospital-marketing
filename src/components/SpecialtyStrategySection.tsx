'use client'

import { Eye, Smile, Heart, Bone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SpecialtyStrategySection() {
  const specialties = [
    {
      icon: Eye,
      name: "안과",
      label: "1차 핵심 타겟",
      targets: "라식/라섹, 백내장, 노안",
      strategy: "시즌별 맞춤 전략",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Smile,
      name: "치과",
      label: "핵심 타겟",
      targets: "임플란트, 교정, 심미",
      strategy: "지역 밀착 전략",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      icon: Heart,
      name: "내과",
      label: "핵심 타겟",
      targets: "건강검진, 만성질환",
      strategy: "신뢰 기반 마케팅",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      icon: Bone,
      name: "정형외과",
      label: "핵심 타겟",
      targets: "척추, 관절, 스포츠 손상",
      strategy: "비수술 치료 강조",
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
  ];

  return (
    <section id="specialty-strategy" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            우리가 가장 잘 아는 진료과목
          </h2>
          <p className="text-lg text-muted-foreground">
            20년간 성공시킨 병원들의 전문 분야
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {specialties.map((specialty, index) => {
            const Icon = specialty.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-16 h-16 ${specialty.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`h-8 w-8 ${specialty.color}`} />
                  </div>
                  <CardTitle className="text-2xl mb-2">{specialty.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{specialty.label}</p>
                </CardHeader>
                <CardContent>
                  <p className="font-medium mb-2">{specialty.targets}</p>
                  <p className="text-sm text-primary">{specialty.strategy}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-center">
                진료과목별 특화 전략
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                모든 진료과목이 같은 방식으로 마케팅되어서는 안 됩니다.
                환자의 고민, 검색 패턴, 의사결정 과정이 모두 다르기 때문입니다.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                우리는 진료과목별 특성을 정확히 이해하고, 각 과목에 최적화된 전략을 실행합니다.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-12 rounded-lg">
          <h3 className="text-3xl font-bold mb-4">
            지금 시작하지 않으면,<br />
            경쟁 병원이 당신의 환자를 가져갑니다
          </h3>
          <p className="text-xl text-muted-foreground mb-6">
            3개월 뒤, 당신 병원은 어디에 있을까요?
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center gap-2">
              <span className="text-4xl">1️⃣</span>
              <p className="text-lg">지역 검색 1위에서 환자를 맞이하고 있거나</p>
            </div>
            <span className="hidden md:inline text-2xl text-muted-foreground">또는</span>
            <div className="flex items-center gap-2">
              <span className="text-4xl">2️⃣</span>
              <p className="text-lg">여전히 경쟁 병원 뒤에서 고민하고 있거나</p>
            </div>
          </div>
          <p className="text-xl font-semibold mb-6">
            선택은 지금, 이 순간에 이루어집니다.
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h4 className="text-xl font-bold mb-4">🎁 지금 신청 시 특별 혜택</h4>
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✅</span>
                <div>
                  <p className="font-semibold">무료 블로그 진단 (30만원 상당)</p>
                  <p className="text-sm text-muted-foreground">현재 블로그 상태 + 경쟁사 분석 + 개선 방향 제시</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✅</span>
                <div>
                  <p className="font-semibold">첫 달 광고비 10% 추가 집행</p>
                  <p className="text-sm text-muted-foreground">예: 광고비 300만원 신청 시 → 330만원 집행</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✅</span>
                <div>
                  <p className="font-semibold">원장님 브랜딩 가이드북 제공</p>
                  <p className="text-sm text-muted-foreground">SNS/블로그에서 신뢰받는 원장이 되는 법 (PDF)</p>
                </div>
              </div>
            </div>
            <Link href="/consultation">
              <button
                className="mt-6 w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                무료 상담 신청하기
              </button>
            </Link>
            <p className="text-sm text-muted-foreground mt-4">
              📞 24시간 내 연락드립니다 | 💬 온라인 미팅 가능 (전국 어디서나)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
