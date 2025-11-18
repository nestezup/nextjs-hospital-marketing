'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTASection() {
  return (
    <section id="cta" className="py-20 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div id="contact" className="sr-only" aria-hidden="true" />
          <div className="text-center bg-white p-12 rounded-lg shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 text-center">
              지금 시작하지 않으면,<br />
              경쟁 병원이 당신의 환자를 가져갑니다
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              3개월 뒤, 당신 병원은 어디에 있을까요?
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center gap-2">
                <span className="text-4xl">1️⃣</span>
                <p className="text-lg text-gray-700">지역 검색 1위에서 환자를 맞이하고 있거나</p>
              </div>
              <span className="hidden md:inline text-2xl text-gray-600">또는</span>
              <div className="flex items-center gap-2">
                <span className="text-4xl">2️⃣</span>
                <p className="text-lg text-gray-700">여전히 경쟁 병원 뒤에서 고민하고 있거나</p>
              </div>
            </div>
            <p className="text-xl font-semibold mb-8 text-gray-900">
              선택은 지금, 이 순간에 이루어집니다.
            </p>

            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-8 rounded-lg border border-primary-200 max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold mb-6 text-primary-900">🎁 지금 신청 시 특별 혜택</h3>
              <div className="space-y-6 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-primary-600 font-bold text-2xl">✅</span>
                  <div>
                    <p className="font-bold text-lg text-gray-900">무료 블로그 진단 (30만원 상당)</p>
                    <p className="text-base text-gray-600">현재 블로그 상태 + 경쟁사 분석 + 개선 방향 제시</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary-600 font-bold text-2xl">✅</span>
                  <div>
                    <p className="font-bold text-lg text-gray-900">첫 달 광고비 10% 추가 집행</p>
                    <p className="text-base text-gray-600">예: 광고비 300만원 신청 시 → 330만원 집행</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary-600 font-bold text-2xl">✅</span>
                  <div>
                    <p className="font-bold text-lg text-gray-900">원장님 브랜딩 가이드북 제공</p>
                    <p className="text-base text-gray-600">SNS/블로그에서 신뢰받는 원장이 되는 법 (PDF)</p>
                  </div>
                </div>
              </div>
              <Link href="/consultation">
                <Button
                  size="lg"
                  className="mt-8 w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  무료 상담 신청하기
                </Button>
              </Link>
              <p className="text-base text-gray-600 mt-4">
                📞 24시간 내 연락드립니다 | 💬 온라인 미팅 가능 (전국 어디서나)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
