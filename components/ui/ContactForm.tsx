"use client";

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /* ⚠️ OPEN B-3: Formspree ID 발급 후 실제 제출 로직 추가 */
    alert("문의가 접수되었습니다. 영업일 기준 24시간 이내 연락드리겠습니다.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-dark mb-2">이름 *</label>
        <input
          type="text"
          required
          placeholder="홍길동"
          className="w-full px-4 py-3 border border-line rounded-sm text-sm focus:outline-none focus:border-brand transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-dark mb-2">회사명 *</label>
        <input
          type="text"
          required
          placeholder="(주)투비스토리"
          className="w-full px-4 py-3 border border-line rounded-sm text-sm focus:outline-none focus:border-brand transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-dark mb-2">연락처 *</label>
        <input
          type="tel"
          required
          placeholder="010-0000-0000"
          className="w-full px-4 py-3 border border-line rounded-sm text-sm focus:outline-none focus:border-brand transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-dark mb-2">업종</label>
        <select className="w-full px-4 py-3 border border-line rounded-sm text-sm focus:outline-none focus:border-brand transition-colors bg-white">
          <option value="">선택해 주세요</option>
          <option>병원·의료</option>
          <option>B2B·SaaS</option>
          <option>가맹·프랜차이즈</option>
          <option>교육·학원</option>
          <option>NGO·공공기관</option>
          <option>기타</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-dark mb-2">문의 내용</label>
        <textarea
          rows={4}
          placeholder="현재 마케팅 상황이나 고민을 간략히 적어주세요."
          className="w-full px-4 py-3 border border-line rounded-sm text-sm focus:outline-none focus:border-brand transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full py-4 bg-brand text-white font-semibold rounded-sm hover:bg-brand-hover transition-colors"
      >
        무료 진단 신청하기
      </button>
      <p className="text-xs text-text-disabled text-center">
        영업일 기준 24시간 이내 연락드립니다.
      </p>
    </form>
  );
}
