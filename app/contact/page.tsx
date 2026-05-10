import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "문의하기",
  description: "30분 무료 마케팅 진단 신청. 투비스토리㈜ 070-8676-7132.",
};

const faqs = [
  {
    q: "계약 기간이 있나요?",
    a: "없습니다. 1개월 전 통보로 해지 가능합니다. 성과로만 관계를 유지합니다.",
  },
  {
    q: "최소 광고 예산이 있나요?",
    a: "업종·목표에 따라 다릅니다. 무료 진단에서 적정 예산을 함께 산정합니다.",
  },
  {
    q: "병원이 아니어도 되나요?",
    a: "네. B2B·가맹·교육·NGO·공공기관 등 다양한 산업을 운영하고 있습니다.",
  },
  {
    q: "30분 무료 진단은 어떻게 진행되나요?",
    a: "현재 마케팅 현황 공유 → 문제 진단 → 개선 방향 제안 순으로 진행됩니다. 비용·계약 없이 솔직하게 이야기합니다.",
  },
  {
    q: "GA·GTM 세팅도 해주나요?",
    a: "네. 캠페인 운영 시 GA·GTM·픽셀 세팅을 포함합니다.",
  },
  {
    q: "대행사 없이 인하우스로 전환하고 싶은데 컨설팅도 되나요?",
    a: "됩니다. 인하우스 전환 컨설팅과 교육 프로그램이 별도로 있습니다.",
  },
  {
    q: "책 집필 대행도 가능한가요?",
    a: "가능합니다. '원장님 책 출간 서비스'로 기획부터 출판까지 진행합니다.",
  },
  {
    q: "서울 외 지역도 가능한가요?",
    a: "전국 가능합니다. 비대면 미팅으로 진행하는 경우가 많습니다.",
  },
  {
    q: "세미나 자료는 어디서 받나요?",
    a: "B2B마케팅 페이지에서 백서를 무료로 다운로드할 수 있습니다.",
  },
  {
    q: "포트폴리오를 볼 수 있나요?",
    a: "클라이언트 동의 범위 내에서 미팅 시 공유드립니다. 무료 진단 신청 후 요청해 주세요.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* 히어로 */}
      <section className="bg-dark py-24">
        <div className="max-w-container mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand mb-4">
            Contact Us
          </p>
          <h1 className="text-h1 font-black text-white leading-tight mb-4">
            먼저 30분 이야기해 보세요.
          </h1>
          <p className="text-white/70 text-lg max-w-lg">
            비용도, 계약도 없습니다. 현재 마케팅의 문제를 솔직하게 짚어드립니다.
          </p>
        </div>
      </section>

      {/* 연락처 + 폼 */}
      <section className="py-24 bg-white">
        <div className="max-w-container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* 연락처 정보 */}
            <div>
              <h2 className="text-h2 font-bold text-dark mb-8">연락처</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone size={20} className="text-brand mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-dark mb-1">전화</p>
                    <a href="tel:070-8676-7132" className="text-base text-text-muted hover:text-brand transition-colors">
                      070-8676-7132
                    </a>
                    <p className="text-sm text-text-disabled mt-1">
                      대표 직통: <a href="tel:010-8718-5000" className="hover:text-brand transition-colors">010-8718-5000</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail size={20} className="text-brand mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-dark mb-1">이메일</p>
                    <a href="mailto:help@2bstory.com" className="text-base text-text-muted hover:text-brand transition-colors">
                      help@2bstory.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  {/* ⚠️ OPEN I-1: 카카오채널 확정 후 링크 업데이트 */}
                  <MessageCircle size={20} className="text-brand mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-dark mb-1">카카오톡</p>
                    <a href="tel:070-8676-7132" className="text-base text-text-muted hover:text-brand transition-colors">
                      준비 중 (전화로 문의해 주세요)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-brand mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-dark mb-1">주소</p>
                    <p className="text-base text-text-muted">
                      서울특별시 강남구 역삼로 123, 한양빌딩 7층
                    </p>
                    {/* ⚠️ OPEN I-4: 지하철·버스 정보 확정 후 추가 */}
                    <p className="text-sm text-text-disabled mt-1">[교통 정보 준비 중]</p>
                    <a
                      href="https://map.kakao.com/link/search/서울특별시 강남구 역삼로 123"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-brand hover:underline mt-2 inline-block"
                    >
                      카카오맵으로 보기 →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 문의 폼 */}
            <div>
              <h2 className="text-h2 font-bold text-dark mb-8">무료 진단 신청</h2>
              {/* ⚠️ OPEN B-3: Formspree ID 발급 후 ContactForm에 연동 */}
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-soft">
        <div className="max-w-container mx-auto px-6">
          <SectionTitle eyebrow="FAQ" title="자주 묻는 질문" align="left" />
          <div className="max-w-3xl space-y-0 divide-y divide-line">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-6">
                <p className="text-base font-semibold text-dark mb-2">{faq.q}</p>
                <p className="text-sm text-text-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
