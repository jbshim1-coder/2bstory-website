import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark text-white/60 text-sm">
      <div className="max-w-container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* 회사 정보 */}
          <div className="space-y-2">
            <p className="text-white font-bold text-base mb-4">투비스토리㈜</p>
            <p>대표: 심진보</p>
            <p>주소: 서울특별시 강남구 역삼로 123, 한양빌딩 7층</p>
            <p>전화: 070-8676-7132</p>
            <p>이메일: help@2bstory.com</p>
            {/* ⚠️ OPEN I-2: 사업자등록번호·통신판매업신고번호 확정 후 추가 */}
            <p>사업자등록번호: <span className="text-white/30">[확인 중]</span></p>
          </div>

          {/* 링크 */}
          <div className="flex flex-col gap-2">
            <Link href="/privacy" className="hover:text-white transition-colors">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              이용약관
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              문의하기
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-xs text-white/30">
          © {new Date().getFullYear()} 투비스토리㈜. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
