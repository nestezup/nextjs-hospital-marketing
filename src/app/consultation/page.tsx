'use client'

import { useFormState } from 'react-dom';
import { useEffect, useRef } from 'react';
import { submitConsultation, type ConsultationFormState } from '@/actions/consultation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

const consultationTypes = [
  { value: 'free_consultation', label: '무료 상담' },
  { value: 'marketing_diagnosis', label: '병원 마케팅 진단' },
  { value: 'roadmap_consultation', label: '12개월 로드맵 상담' },
  { value: 'crm_consultation', label: 'CRM 시스템 구축 상담' },
  { value: 'blog_diagnosis', label: '블로그 무료 진단' },
];

export default function ConsultationPage() {
  const [state, formAction] = useFormState(submitConsultation, null);
  const formRef = useRef<HTMLFormElement>(null);

  // 성공 시 폼 리셋
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state?.success]);

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              무료 <span className="text-primary">상담 신청</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              병원에 맞는 맞춤형 마케팅 전략을 전문가와 함께 수립하세요
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">상담 신청 정보</CardTitle>
                <CardDescription>
                  아래 정보를 입력해주시면 24시간 내에 연락드리겠습니다
                </CardDescription>
              </CardHeader>
              <CardContent>
                {state?.success && (
                  <Alert className="mb-6 border-green-500 bg-green-50 dark:bg-green-950">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-600 dark:text-green-400">
                      상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.
                    </AlertDescription>
                  </Alert>
                )}

                {state?.error && !state?.success && (
                  <Alert className="mb-6 border-red-500 bg-red-50 dark:bg-red-950">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-600 dark:text-red-400">
                      {state.error}
                    </AlertDescription>
                  </Alert>
                )}

                <form ref={formRef} action={formAction} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="hospitalName">
                      병원명 <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="hospitalName"
                      name="hospitalName"
                      placeholder="예: 강남안과의원"
                      required
                    />
                    {state?.errors?.hospitalName && (
                      <p className="text-sm text-destructive">{state.errors.hospitalName[0]}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">
                      지역 <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="예: 서울 강남구"
                      required
                    />
                    {state?.errors?.location && (
                      <p className="text-sm text-destructive">{state.errors.location[0]}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contactName">
                        담당자명 <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="contactName"
                        name="contactName"
                        placeholder="예: 홍길동"
                        required
                      />
                      {state?.errors?.contactName && (
                        <p className="text-sm text-destructive">{state.errors.contactName[0]}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        연락처 <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="예: 010-1234-5678"
                        required
                      />
                      {state?.errors?.phone && (
                        <p className="text-sm text-destructive">{state.errors.phone[0]}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">이메일</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="예: contact@hospital.com"
                    />
                    {state?.errors?.email && (
                      <p className="text-sm text-destructive">{state.errors.email[0]}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="consultationType">
                      상담 유형 <span className="text-destructive">*</span>
                    </Label>
                    <Select name="consultationType" required>
                      <SelectTrigger>
                        <SelectValue placeholder="상담 유형을 선택해주세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {consultationTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {state?.errors?.consultationType && (
                      <p className="text-sm text-destructive">{state.errors.consultationType[0]}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">상담 내용 (선택)</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="궁금하신 내용이나 요청사항을 자유롭게 작성해주세요"
                      rows={5}
                    />
                    {state?.errors?.message && (
                      <p className="text-sm text-destructive">{state.errors.message[0]}</p>
                    )}
                  </div>

                  <Button type="submit" size="lg" className="w-full text-lg text-white font-bold py-7 bg-gradient-to-r from-brand-deep-blue to-brand-cerulean hover:from-brand-cerulean hover:to-brand-turquoise shadow-2xl hover:shadow-brand-cerulean/50 transition-all duration-300">
                    상담 신청하기
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl mb-2">📞</div>
                  <h3 className="font-bold mb-2">빠른 응답</h3>
                  <p className="text-sm text-muted-foreground">
                    24시간 내 연락드립니다
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl mb-2">💡</div>
                  <h3 className="font-bold mb-2">맞춤 전략</h3>
                  <p className="text-sm text-muted-foreground">
                    병원에 최적화된 솔루션
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl mb-2">✅</div>
                  <h3 className="font-bold mb-2">무료 상담</h3>
                  <p className="text-sm text-muted-foreground">
                    비용 부담 없이 시작하세요
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
