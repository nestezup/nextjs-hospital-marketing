import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function BooksSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">책으로 증명된 전문성</h2>
        <p className="text-center text-gray-600 mb-16 text-lg">
          병원 경영의 교과서를 집필한 전문가가 직접 설계합니다
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-primary-600 mb-4" />
              <CardTitle className="text-xl text-gray-900">📘 병원 경영 & 마케팅</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p className="font-semibold mb-2">『나는 행복한 병원에 출근한다』</p>
              <p className="font-semibold mb-4">『병원을 살리는 뇌과학 이야기』</p>
              <p className="text-sm">
                병원 내부 운영, 리더십, 직원 교육 및 마케팅 전략에 대한 깊이 있는 통찰력을 갖춘 &lsquo;병원 내부 설계자&rsquo;
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-secondary-600 mb-4" />
              <CardTitle className="text-xl text-gray-900">📗 자기계발 & 교육</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p className="font-semibold mb-4">『나쁜 습관은 없다』</p>
              <p className="text-sm">
                병원 성장의 핵심인 &lsquo;직원과 리더의 의식 성장&rsquo; 교육까지 책임질 수 있는 &lsquo;실무 교육가&rsquo;
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
