'use client'

import { FileSearch, FileText, FileCheck, Rocket, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function ContractProcessSection() {
  const steps = [
    {
      number: "1",
      icon: FileSearch,
      title: "무료 진단",
      subtitle: "(첫 상담)",
      description: "온라인 또는 현장 방문 (선택)",
      details: [
        "✓ 현재 마케팅 현황 파악",
        "✓ 경쟁 환경 간단 분석",
        "✓ 목표 설정 (매출, 환자 수 등)",
        "✓ 예산 협의",
      ],
      duration: "소요 시간: 1~2시간",
    },
    {
      number: "2",
      icon: FileText,
      title: "제안서 제출",
      subtitle: "(상담 후 3일 내)",
      description: "맞춤형 전략 제안",
      details: [
        "✓ 병원 상황 분석 리포트",
        "✓ 3~6개월 마케팅 로드맵",
        "✓ 채널별 예산 배분안",
        "✓ 예상 성과 시뮬레이션",
        "✓ 패키지 선택 및 견적",
      ],
      duration: "",
    },
    {
      number: "3",
      icon: FileCheck,
      title: "계약 체결",
      subtitle: "",
      description: "명확한 계약서 작성",
      details: [
        "✓ 서비스 범위 명시",
        "✓ 성과 목표 설정",
        "✓ 계약 기간 (3개월/6개월/1년)",
        "✓ 중도 해지 조항",
        "✓ 블로그 양도 조건 (1년 계약 시)",
      ],
      duration: "",
    },
    {
      number: "4",
      icon: Rocket,
      title: "킥오프 미팅",
      subtitle: "(계약 후 1주일 내)",
      description: "본격 시작",
      details: [
        "✓ 전담팀 소개",
        "✓ 세부 일정 수립",
        "✓ 필요 자료 요청 (로고, 사진 등)",
        "✓ 블로그/광고 계정 세팅",
        "✓ 첫 달 액션 플랜 확정",
      ],
      duration: "",
    },
    {
      number: "5",
      icon: BarChart3,
      title: "월간 리포팅 & 미팅",
      subtitle: "",
      description: "지속적 최적화",
      details: [
        "✓ 매월 말 성과 리포트 발송",
        "✓ 온라인 미팅 (타지역) 또는 방문",
        "✓ 다음 달 전략 수정/보완",
        "✓ 추가 니즈 발굴",
      ],
      duration: "",
    },
  ];

  return (
    <section id="contract-process" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            투명한 계약 프로세스
          </h2>
          <p className="text-lg text-muted-foreground">
            상담부터 시작까지, 5단계 프로세스
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0 flex flex-col items-center md:items-start">
                      <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mb-3">
                        {step.number}
                      </div>
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-1">
                        {step.title}
                        {step.subtitle && (
                          <span className="text-lg text-muted-foreground ml-2">
                            {step.subtitle}
                          </span>
                        )}
                      </h3>
                      <p className="text-primary font-semibold mb-4">{step.description}</p>

                      <div className="space-y-2">
                        {step.details.map((detail, i) => (
                          <p key={i} className="text-muted-foreground">
                            {detail}
                          </p>
                        ))}
                      </div>

                      {step.duration && (
                        <p className="text-sm text-primary font-medium mt-4">
                          {step.duration}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/consultation">
            <button
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold text-lg"
            >
              지금 무료 진단 신청하기
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
