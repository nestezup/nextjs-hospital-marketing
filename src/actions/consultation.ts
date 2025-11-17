'use server'

import { z } from 'zod';
import * as email from '@/lib/email';

const ConsultationSchema = z.object({
  hospitalName: z.string().min(1, '병원명을 입력해주세요'),
  location: z.string().min(1, '지역을 입력해주세요'),
  contactName: z.string().min(1, '담당자명을 입력해주세요'),
  phone: z.string().min(1, '연락처를 입력해주세요'),
  email: z.string().email('올바른 이메일 주소를 입력해주세요').optional().or(z.literal('')),
  consultationType: z.enum([
    'free_consultation',
    'marketing_diagnosis',
    'roadmap_consultation',
    'crm_consultation',
    'blog_diagnosis',
  ]),
  message: z.string().optional(),
});

export type ConsultationFormState = {
  success?: boolean;
  error?: string;
  errors?: {
    hospitalName?: string[];
    location?: string[];
    contactName?: string[];
    phone?: string[];
    email?: string[];
    consultationType?: string[];
    message?: string[];
  };
};

export async function submitConsultation(
  prevState: ConsultationFormState | null,
  formData: FormData
): Promise<ConsultationFormState> {
  try {
    // 폼 데이터 파싱
    const rawData = {
      hospitalName: formData.get('hospitalName'),
      location: formData.get('location'),
      contactName: formData.get('contactName'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      consultationType: formData.get('consultationType'),
      message: formData.get('message'),
    };

    // 유효성 검사
    const validated = ConsultationSchema.safeParse(rawData);

    if (!validated.success) {
      return {
        success: false,
        error: '입력 내용을 확인해주세요',
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const data = validated.data;

    // 관리자에게 알림 이메일 발송
    await email.sendConsultationNotificationToAdmin({
      hospitalName: data.hospitalName,
      location: data.location,
      contactName: data.contactName,
      phone: data.phone,
      email: data.email || undefined,
      consultationType: data.consultationType,
      message: data.message || undefined,
    });

    // 신청자에게 확인 이메일 발송 (이메일이 제공된 경우)
    if (data.email) {
      await email.sendEmail({
        to: data.email,
        toName: data.contactName,
        subject: '상담 신청이 접수되었습니다',
        html: email.getConsultationConfirmationEmailTemplate({
          hospitalName: data.hospitalName,
          contactName: data.contactName,
          consultationType: data.consultationType,
        }),
        templateType: 'consultation_confirmation',
      });
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('[Consultation] Error:', error);
    return {
      success: false,
      error: '상담 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    };
  }
}
