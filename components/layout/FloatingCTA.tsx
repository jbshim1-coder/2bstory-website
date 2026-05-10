"use client";

import { useState, useEffect } from "react";
import { Phone, ChevronUp, MessageCircle } from "lucide-react";

export default function FloatingCTA() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  /* ⚠️ OPEN I-1: 카카오 채널 ID 확정 전 전화 연결로 대체 */
  const kakaoUrl = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL || "tel:070-8676-7132";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* 카카오톡 */}
      <a
        href={kakaoUrl}
        className="group relative flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        style={{ backgroundColor: "#FEE500" }}
        aria-label="카카오톡 문의"
      >
        <MessageCircle size={22} className="text-[#3C1E1E]" />
        <span className="absolute right-14 whitespace-nowrap bg-dark text-white text-xs px-3 py-1.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          카카오 문의
        </span>
      </a>

      {/* 전화 */}
      <a
        href="tel:070-8676-7132"
        className="group relative flex items-center justify-center w-12 h-12 bg-brand rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="전화 문의"
      >
        <Phone size={20} className="text-white" />
        <span className="absolute right-14 whitespace-nowrap bg-dark text-white text-xs px-3 py-1.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          070-8676-7132
        </span>
      </a>

      {/* 맨위로 */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="group relative flex items-center justify-center w-12 h-12 bg-[#333333] rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="맨 위로"
        >
          <ChevronUp size={20} className="text-white" />
          <span className="absolute right-14 whitespace-nowrap bg-dark text-white text-xs px-3 py-1.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            맨 위로
          </span>
        </button>
      )}
    </div>
  );
}
