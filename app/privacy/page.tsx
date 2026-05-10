import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "투비스토리㈜ 개인정보처리방침",
};

export default function PrivacyPage() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[800px] mx-auto px-6">
        <h1 className="text-h1 font-black text-dark mb-2">개인정보처리방침</h1>
        {/* ⚠️ OPEN I-3: 시행일자·개인정보 보호책임자 확정 후 업데이트 */}
        <p className="text-sm text-text-muted mb-12">
          시행일: <span className="text-text-disabled">[확정 후 기입]</span> · 초안 v1.0
        </p>

        <div className="prose prose-sm max-w-none space-y-10 text-text-primary leading-relaxed">

          <section>
            <h2 className="text-h3 font-bold text-dark mb-4">1. 개인정보의 처리 목적</h2>
            <p>투비스토리㈜(이하 "회사")는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하는 개인정보는 다음 목적 이외의 용도로는 이용되지 않습니다.</p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-text-muted">
              <li>홈페이지 문의·상담 서비스 제공</li>
              <li>무료 진단 미팅 일정 조율 및 안내</li>
              <li>백서·회사소개서 자료 다운로드 처리</li>
              <li>세미나·교육 신청 관리</li>
              <li>마케팅·뉴스레터 발송 (별도 동의 시)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-h3 font-bold text-dark mb-4">2. 처리하는 개인정보 항목</h2>
            <p>회사는 다음의 개인정보를 수집합니다.</p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-text-muted">
              <li>필수: 이름, 연락처(전화번호), 회사명</li>
              <li>선택: 이메일, 업종, 문의 내용</li>
              <li>자동 수집: 접속 IP, 쿠키, 방문일시 (GA4)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-h3 font-bold text-dark mb-4">3. 개인정보의 처리 및 보유 기간</h2>
            <p className="text-text-muted">홈페이지 문의·상담: 문의일로부터 3년 (정보주체 동의)</p>
            <p className="mt-2 text-text-muted">자료 다운로드: 다운로드일로부터 3년 (정보주체 동의)</p>
          </section>

          <section>
            <h2 className="text-h3 font-bold text-dark mb-4">4. 개인정보의 제3자 제공</h2>
            <p className="text-text-muted">회사는 정보주체의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 단, 정보주체의 동의가 있거나 법령에 의한 경우는 예외로 합니다.</p>
          </section>

          <section>
            <h2 className="text-h3 font-bold text-dark mb-4">5. 개인정보의 파기</h2>
            <p className="text-text-muted">보유기간이 경과하거나 처리 목적이 달성된 경우 지체 없이 파기합니다. 전자적 파일은 복구 불가능한 방법으로 삭제하며, 종이 문서는 파쇄 또는 소각합니다.</p>
          </section>

          <section>
            <h2 className="text-h3 font-bold text-dark mb-4">6. 정보주체의 권리·의무</h2>
            <p className="text-text-muted">정보주체는 언제든지 개인정보 열람·정정·삭제·처리 정지를 요구할 수 있습니다. help@2bstory.com 으로 요청해 주세요.</p>
          </section>

          <section>
            <h2 className="text-h3 font-bold text-dark mb-4">7. 쿠키 운영</h2>
            <p className="text-text-muted">회사는 Google Analytics 4를 통해 방문 통계를 수집합니다. 브라우저 설정에서 쿠키 수집을 거부할 수 있으나 서비스 이용에 제한이 생길 수 있습니다.</p>
          </section>

          <section>
            <h2 className="text-h3 font-bold text-dark mb-4">8. 개인정보 보호책임자</h2>
            {/* ⚠️ OPEN I-3: 보호책임자 이름·직함 확정 후 업데이트 */}
            <p className="text-text-muted">
              성명: <span className="text-text-disabled">[확인 필요]</span><br />
              직책: <span className="text-text-disabled">[확인 필요]</span><br />
              이메일: help@2bstory.com<br />
              전화: 070-8676-7132
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-bold text-dark mb-4">9. 방침 변경</h2>
            <p className="text-text-muted">개인정보처리방침이 변경될 경우 홈페이지를 통해 공지합니다.</p>
          </section>

        </div>
      </div>
    </section>
  );
}
