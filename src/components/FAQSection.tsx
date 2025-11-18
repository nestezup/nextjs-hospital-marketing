'use client'

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Q1. 타지역인데 가능한가요?",
      answer: "네, 전국 어디든 가능합니다! 온라인 미팅(Zoom, Google Meet)으로 상담부터 리포팅까지 모두 진행됩니다. 필요 시 현장 방문도 협의 가능합니다.",
    },
    {
      question: "Q2. 블로그 양도는 정확히 어떤 방식인가요?",
      answer: "1년 계약 완료 시, 저희가 운영하던 네이버 블로그를 원장님 명의로 소유권 이전합니다. 그동안 쌓인 모든 콘텐츠와 검색 순위가 그대로 유지됩니다. 이후 다른 업체와 계약하시거나 직접 운영하셔도 됩니다.",
    },
    {
      question: "Q3. 광고비는 별도인가요?",
      answer: "네, 패키지 금액은 '관리 대행비'이며, 실제 광고비(네이버/카카오/구글 집행비)는 별도입니다. 예를 들어 STANDARD 패키지(400만원) + 광고비 300만원 = 월 700만원 총 비용입니다.",
    },
    {
      question: "Q4. 최소 계약 기간은?",
      answer: "3개월이 최소이지만, 블로그 자산화와 장기 성과를 위해 1년 계약을 권장합니다. 1년 계약 시 블로그 양도 + 추가 혜택이 있습니다.",
    },
    {
      question: "Q5. 경쟁 병원이 많은데도 효과가 있을까요?",
      answer: "오히려 경쟁이 심한 지역일수록 '전략적 차별화'가 중요합니다. 저희는 단순 가격 경쟁이 아닌, 병원만의 철학과 강점을 부각시켜 브랜드 병원으로 포지셔닝합니다.",
    },
    {
      question: "Q6. 의료광고법 위반 걱정은 없나요?",
      answer: "저희는 의료광고법을 철저히 준수합니다. 과장 광고, 비포/애프터 부적절 노출, 환자 후기 과도한 유도 등을 하지 않으며, 필요 시 법률 자문을 거쳐 진행합니다.",
    },
    {
      question: "Q7. 중간에 효과가 없으면 해지할 수 있나요?",
      answer: "3개월 단위로 성과를 평가하며, 목표 미달 시 원인 분석 및 전략 수정을 먼저 제안드립니다. 그래도 개선이 없다면 위약금 없이 해지 가능합니다. (단, 최소 3개월 이후)",
    },
    {
      question: "Q8. 다른 업체와 함께 쓰고 있는데 전환이 가능한가요?",
      answer: "네, 기존 업체와의 계약 만료 시점에 맞춰 전환하시면 됩니다. 저희가 인수인계를 도와드리며, 블로그/광고 계정 이관도 지원합니다.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">자주 묻는 질문 (FAQ)</h2>
          <p className="text-lg text-muted-foreground">
            궁금하신 점을 확인하세요
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => toggleFAQ(index)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
                
                {openIndex === index && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6">
            더 궁금하신 점이 있으신가요?
          </p>
          <Link href="/consultation">
            <Button
              size="lg"
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold px-10 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              무료 상담 신청하기
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
