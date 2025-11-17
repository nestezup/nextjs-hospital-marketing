'use server'

import { z } from 'zod';
import * as email from '@/lib/email';

const NewsletterSchema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
  name: z.string().optional(),
});

export type NewsletterFormState = {
  success?: boolean;
  error?: string;
  errors?: {
    email?: string[];
    name?: string[];
  };
};

export async function subscribeNewsletter(
  prevState: NewsletterFormState | null,
  formData: FormData
): Promise<NewsletterFormState> {
  try {
    // 폼 데이터 파싱
    const rawData = {
      email: formData.get('email'),
      name: formData.get('name'),
    };

    // 유효성 검사
    const validated = NewsletterSchema.safeParse(rawData);

    if (!validated.success) {
      return {
        success: false,
        error: '입력 내용을 확인해주세요',
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const data = validated.data;

    // TODO: 실제 뉴스레터 구독 처리 (DB 저장 등)
    // await db.createNewsletterSubscription(data);

    // 구독 확인 이메일 발송
    await email.sendEmail({
      to: data.email,
      toName: data.name,
      subject: '뉴스레터 구독을 환영합니다',
      html: email.getNewsletterSubscriptionEmailTemplate({
        email: data.email,
        name: data.name,
      }),
      templateType: 'newsletter_subscription',
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error('[Newsletter] Error:', error);
    return {
      success: false,
      error: '구독 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    };
  }
}
