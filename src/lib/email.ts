import { ENV } from "./_core/env";
import * as db from "./db";

interface EmailOptions {
  to: string;
  toName?: string;
  subject: string;
  html: string;
  templateType: string;
  relatedId?: number;
  relatedType?: string;
}

/**
 * 이메일 발송 함수
 * Manus 내장 Forge API를 사용하여 이메일 발송
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // Forge API를 사용한 이메일 발송
    const response = await fetch(`${ENV.forgeApiUrl}/email/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ENV.forgeApiKey}`,
      },
      body: JSON.stringify({
        to: options.to,
        subject: options.subject,
        html: options.html,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Email] Failed to send email:", errorText);
      
      // 실패 로그 저장
      await db.createEmailLog({
        recipientEmail: options.to,
        recipientName: options.toName,
        subject: options.subject,
        templateType: options.templateType,
        relatedId: options.relatedId,
        relatedType: options.relatedType,
        status: "failed",
        errorMessage: errorText,
      });
      
      return false;
    }

    // 성공 로그 저장
    await db.createEmailLog({
      recipientEmail: options.to,
      recipientName: options.toName,
      subject: options.subject,
      templateType: options.templateType,
      relatedId: options.relatedId,
      relatedType: options.relatedType,
      status: "sent",
      sentAt: new Date(),
    });

    return true;
  } catch (error) {
    console.error("[Email] Error sending email:", error);
    
    // 에러 로그 저장
    await db.createEmailLog({
      recipientEmail: options.to,
      recipientName: options.toName,
      subject: options.subject,
      templateType: options.templateType,
      relatedId: options.relatedId,
      relatedType: options.relatedType,
      status: "failed",
      errorMessage: error instanceof Error ? error.message : String(error),
    });
    
    return false;
  }
}

/**
 * 상담 신청 확인 이메일 템플릿
 */
export function getConsultationConfirmationEmailTemplate(data: {
  hospitalName: string;
  contactName: string;
  consultationType: string;
}): string {
  const consultationTypeMap: Record<string, string> = {
    free_consultation: "무료 상담",
    marketing_diagnosis: "병원 마케팅 진단",
    roadmap_consultation: "12개월 로드맵 상담",
    crm_consultation: "CRM 시스템 구축 상담",
    blog_diagnosis: "블로그 무료 진단",
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Noto Sans KR', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; }
        .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #667eea; }
        .footer { background: #1e293b; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>상담 신청이 접수되었습니다</h1>
        </div>
        <div class="content">
          <p><strong>${data.contactName}</strong>님, 안녕하세요!</p>
          <p><strong>${data.hospitalName}</strong>의 상담 신청이 정상적으로 접수되었습니다.</p>
          
          <div class="info-box">
            <h3>신청 내용</h3>
            <p><strong>상담 유형:</strong> ${consultationTypeMap[data.consultationType] || data.consultationType}</p>
            <p><strong>병원명:</strong> ${data.hospitalName}</p>
          </div>
          
          <p>담당자가 <strong>24시간 내</strong>에 연락드릴 예정입니다.</p>
          <p>빠른 시일 내에 연락드리도록 하겠습니다.</p>
        </div>
        <div class="footer">
          <p><strong>이엠마케팅 x 위딘비즈랩</strong></p>
          <p>병원 성장의 설계자</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * 뉴스레터 구독 확인 이메일 템플릿
 */
export function getNewsletterSubscriptionEmailTemplate(data: {
  name?: string;
  email: string;
}): string {
  const displayName = data.name || "구독자";
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Noto Sans KR', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; }
        .footer { background: #1e293b; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>뉴스레터 구독을 환영합니다!</h1>
        </div>
        <div class="content">
          <p><strong>${displayName}</strong>님, 안녕하세요!</p>
          <p>병원 마케팅 뉴스레터 구독을 신청해 주셔서 감사합니다.</p>
          <p>매주 최신 병원 마케팅 인사이트와 성공 사례를 <strong>${data.email}</strong>로 보내드리겠습니다.</p>
          <p>앞으로 유익한 정보를 제공하도록 노력하겠습니다.</p>
        </div>
        <div class="footer">
          <p><strong>이엠마케팅 x 위딘비즈랩</strong></p>
          <p>병원 성장의 설계자</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * 관리자에게 새 상담 신청 알림 이메일 전송
 */
export async function sendConsultationNotificationToAdmin(data: {
  hospitalName: string;
  location: string;
  contactName: string;
  phone: string;
  email?: string;
  consultationType: string;
  message?: string;
}): Promise<boolean> {
  const consultationTypeMap: Record<string, string> = {
    free_consultation: "무료 상담",
    marketing_diagnosis: "병원 마케팅 진단",
    roadmap_consultation: "12개월 로드맵 상담",
    crm_consultation: "CRM 시스템 구축 상담",
    blog_diagnosis: "블로그 무료 진단",
  };

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Noto Sans KR', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f59e0b; color: white; padding: 20px; text-align: center; }
        .content { background: #f8f9fa; padding: 30px; }
        .info-box { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🔔 새로운 상담 신청이 접수되었습니다</h2>
        </div>
        <div class="content">
          <div class="info-box">
            <p><strong>상담 유형:</strong> ${consultationTypeMap[data.consultationType]}</p>
            <p><strong>병원명:</strong> ${data.hospitalName}</p>
            <p><strong>지역:</strong> ${data.location}</p>
            <p><strong>담당자:</strong> ${data.contactName}</p>
            <p><strong>연락처:</strong> ${data.phone}</p>
            ${data.email ? `<p><strong>이메일:</strong> ${data.email}</p>` : ''}
            ${data.message ? `<p><strong>메시지:</strong><br>${data.message}</p>` : ''}
          </div>
          <p>빠른 시일 내에 연락 부탁드립니다.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // 관리자 이메일로 발송 (ENV.ownerName 사용)
  return await sendEmail({
    to: process.env.OWNER_EMAIL || "admin@example.com", // 실제 관리자 이메일로 변경 필요
    subject: `[새 상담 신청] ${data.hospitalName} - ${consultationTypeMap[data.consultationType]}`,
    html,
    templateType: "admin_consultation_notification",
  });
}
