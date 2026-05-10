import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관",
  description: "투비스토리㈜ 홈페이지 이용약관",
};

export default function TermsPage() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[800px] mx-auto px-6">
        <h1 className="text-h1 font-black text-dark mb-2">이용약관</h1>
        <p className="text-sm text-text-muted mb-12">시행일: 2026년 5월 1일</p>

        <div className="space-y-10 text-text-primary leading-relaxed">

          <section>
            <h2 className="text-h3 font-bold text-dark mb-4">제1조 (목적)</h2>
            <p className="text-text-muted">이 약관은 투비스토리㈜(이하 "회사")가 운영하는 홈페이지(www.2bstory.com)에서 제공하는 서비스의 이용조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.</p>
          </section>

          <section>
            <h2 className="text-h3 font-bold text-dark mb-4">제2조 (약관의 효력 및 변경)</h2>
            <p className="text-text-muted">이 약관은 홈페이지에 게시함으로써 효력이 발생합니다. 회사는 필요한 경우 약관을 변경할 수 있으며, 변경 시 홈페이지를 통해 공지합니다.</p>
          </section>

          <section>
            <h2 className="text-h3 font-bold text-dark mb-4">제3조 (서비스 내용)</h2>
            <p className="text-text-muted">회사는 다음 서비스를 제공합니다.</p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-text-muted">
              <li>디지털 마케팅 정보 및 인사이트 제공</li>
              <li>마케팅 진단 문의 접수</li>
              <li>백서·자료 다운로드</li>
              <li>세미나·교육 프로그램 안내 및 신청</li>
            </ul>
          </section>

          <section>
            <h2 className="text-h3 font-bold text-dark mb-4">제4조 (이용자의 의무)</h2>
            <p className="text-text-muted">이용자는 다음 행위를 해서는 안 됩니다.</p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-text-muted">
              <li>타인의 정보를 도용하는 행위</li>
              <li>홈페이지 운영을 방해하는 행위</li>
              <li>회사의 저작권 등 지식재산권을 침해하는 행위</li>
            </ul>
          </section>

          <section>
            <h2 className="text-h3 font-bold text-dark mb-4">제5조 (저작권)</h2>
            <p className="text-text-muted">홈페이지에 게시된 콘텐츠(텍스트, 이미지, 저서 등)의 저작권은 회사에 귀속됩니다. 무단 복제·배포를 금합니다.</p>
          </section>

          <section>
            <h2 className="text-h3 font-bold text-dark mb-4">제6조 (면책조항)</h2>
            <p className="text-text-muted">회사는 천재지변, 시스템 장애 등 불가항력으로 인한 서비스 중단에 대해 책임을 지지 않습니다.</p>
          </section>

          <section>
            <h2 className="text-h3 font-bold text-dark mb-4">제7조 (준거법 및 관할법원)</h2>
            <p className="text-text-muted">이 약관은 대한민국 법률에 따라 규율됩니다. 분쟁 발생 시 회사 소재지 관할 법원을 제1심 관할법원으로 합니다.</p>
          </section>

          <p className="text-xs text-text-disabled pt-8 border-t border-line">
            투비스토리㈜ | 서울특별시 강남구 역삼로 123, 한양빌딩 7층 | help@2bstory.com
          </p>
        </div>
      </div>
    </section>
  );
}
