'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function LetterSection() {
  return (
    <section id="letter" className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  원장님께 드리는 편지
                </h2>
                <p className="text-muted-foreground">
                  20년간 병원 마케팅을 해온 우리의 진심
                </p>
              </div>

              <div className="space-y-6 text-lg leading-relaxed">
                <p>
                  안녕하세요, 원장님.
                </p>

                <p>
                  저희는 20년간 병원 마케팅만 해온 팀입니다.<br />
                  그동안 수많은 병원을 성공시켰고, 또 실패한 사례도 봤습니다.
                </p>

                <p className="font-semibold text-primary">
                  성공한 병원과 실패한 병원의 차이는 단 하나였습니다.<br />
                  &ldquo;철학이 있는가, 없는가&rdquo;
                </p>

                <p>
                  단순히 환자를 많이 모으는 것이 목표가 아니라,<br />
                  <strong>&ldquo;어떤 병원으로 기억되고 싶은가&rdquo;</strong>를 먼저 정의한 병원들이 살아남았습니다.
                </p>

                <p>
                  저희는 원장님의 철학을 이해하고,<br />
                  그것을 환자들에게 전달하는 일을 합니다.
                </p>

                <div className="bg-muted/50 p-6 rounded-lg my-8">
                  <p className="font-semibold mb-4">우리는 이렇게 믿습니다:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>병원은 단순한 사업장이 아니라, 지역 사회의 건강을 책임지는 곳입니다.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>마케팅은 환자를 속이는 것이 아니라, 진심을 전달하는 것입니다.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>단기 매출이 아닌, 장기적 브랜드 가치를 만들어야 합니다.</span>
                    </li>
                  </ul>
                </div>

                <p>
                  원장님이 환자를 진료하는 동안,<br />
                  저희는 원장님의 철학이 더 많은 사람에게 닿을 수 있도록 돕겠습니다.
                </p>

                <p className="font-semibold">
                  함께 만들어가요.<br />
                  지역에서 가장 신뢰받는 병원, 철학이 있는 브랜드 병원을.
                </p>

                <div className="text-right mt-8 pt-8 border-t">
                  <p className="font-semibold text-xl mb-2">
                    (주)이엠마케팅 x 위딘비즈랩(주)
                  </p>
                  <p className="text-muted-foreground">
                    대표 드림
                  </p>
                </div>
              </div>

              <div className="mt-12 text-center">
                <Link href="/consultation">
                  <button
                    className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold text-lg shadow-lg"
                  >
                    함께 시작하기
                  </button>
                </Link>
                <p className="text-sm text-muted-foreground mt-4">
                  무료 상담으로 시작하세요. 부담 없이 이야기 나눠요.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
