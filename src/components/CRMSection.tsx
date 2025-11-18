'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, BarChart3, Bell, Calendar, Target, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CRMSection() {
  const features = [
    {
      icon: Users,
      title: "환자 여정 관리",
      description: "첫 상담부터 수술 후 관리까지 모든 단계를 자동으로 추적하고 관리합니다"
    },
    {
      icon: MessageSquare,
      title: "자동 메시지 발송",
      description: "예약 확인, 수술 전 안내, 사후 관리 메시지를 적절한 타이밍에 자동 발송합니다"
    },
    {
      icon: Calendar,
      title: "재방문 관리",
      description: "정기 검진 시기를 자동으로 알려주고 재방문율을 높입니다"
    },
    {
      icon: Bell,
      title: "리뷰 요청 자동화",
      description: "수술 후 만족도가 높은 시점에 자동으로 리뷰를 요청합니다"
    },
    {
      icon: BarChart3,
      title: "실시간 대시보드",
      description: "환자 유입 경로, 전환율, ROI를 한눈에 파악할 수 있습니다"
    },
    {
      icon: Target,
      title: "맞춤형 마케팅",
      description: "환자 데이터 기반으로 개인화된 마케팅 메시지를 전송합니다"
    }
  ];

  return (
    <section id="crm" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 text-center">환자 관리 CRM</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              환자 한 명 한 명의 여정을 추적하고, 적절한 타이밍에 소통하며,<br />
              재방문율을 높이는 스마트한 CRM 시스템을 제공합니다.
            </p>
          </div>

          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-8 space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center">환자 여정 → 자동화 → 성과 (한 눈에 보기)</h3>

              {/* Flow chips with connectors - 3 items per row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {features.map((feature, idx) => (
                  <div key={feature.title} className="flex items-center justify-center">
                    <div className="flex items-center gap-3 bg-primary-50 border border-primary-100 rounded-full px-4 py-3 shadow-sm w-full">
                      <feature.icon className="h-5 w-5 text-primary flex-shrink-0" />
                      <div className="text-left">
                        <div className="text-sm font-semibold text-primary-800">{feature.title}</div>
                        <div className="text-xs text-gray-600 leading-snug">
                          {feature.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-primary-50 to-white h-full border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary-800">여정 추적 & 메시지</CardTitle>
                    <CardDescription className="text-sm text-gray-600">첫 상담 → 수술 → 사후 관리까지 자동 안내</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-gray-700">
                    <div className="flex gap-2"><span className="text-primary">•</span>환자 여정 관리</div>
                    <div className="flex gap-2"><span className="text-primary">•</span>자동 메시지 발송</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-secondary-50 to-white h-full border-secondary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-secondary-800">재방문 & 리뷰 자동화</CardTitle>
                    <CardDescription className="text-sm text-gray-600">재방문 알림과 만족도 높은 시점에 리뷰 요청</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-gray-700">
                    <div className="flex gap-2"><span className="text-secondary-600">•</span>재방문 관리</div>
                    <div className="flex gap-2"><span className="text-secondary-600">•</span>리뷰 요청 자동화</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-accent-50 to-white h-full border-accent/30">
                  <CardHeader>
                    <CardTitle className="text-lg text-amber-800">실시간 데이터 & 개인화</CardTitle>
                    <CardDescription className="text-sm text-gray-600">유입·전환을 즉시 확인하고 맞춤 메시지 발송</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-gray-700">
                    <div className="flex gap-2"><span className="text-amber-600">•</span>실시간 대시보드</div>
                    <div className="flex gap-2"><span className="text-amber-600">•</span>맞춤형 마케팅</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 text-gray-900 border border-gray-200">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">왜 CRM이 중요한가요?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-2xl">✓</span>
                      <span>신규 환자 유치 비용은 기존 환자 유지 비용의 5배입니다</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-2xl">✓</span>
                      <span>재방문율 5% 증가 시 수익은 25-95% 증가합니다</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-2xl">✓</span>
                      <span>만족한 환자 1명은 평균 3명의 신규 환자를 소개합니다</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h4 className="text-xl font-bold mb-4">CRM 도입 후 평균 성과</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold">재방문율</span>
                        <span className="font-bold text-blue-600">+35%</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out" style={{width: '35%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold">리뷰 수집률</span>
                        <span className="font-bold text-emerald-600">+50%</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-1000 ease-out" style={{width: '50%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold">환자 만족도</span>
                        <span className="font-bold text-amber-600">+40%</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-1000 ease-out" style={{width: '40%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <Link href="/consultation">
              <Button size="lg" className="text-lg px-8 py-6">
                CRM 도입 상담 신청하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
