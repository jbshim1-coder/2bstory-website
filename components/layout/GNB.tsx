"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "회사소개", href: "/about" },
  {
    label: "서비스",
    href: "#",
    children: [
      { label: "병원마케팅", href: "/hospital" },
      { label: "B2B마케팅", href: "/b2b" },
      { label: "가맹마케팅", href: "/franchise" },
      { label: "교육마케팅", href: "/education" },
      { label: "홈페이지·영상 제작", href: "/web" },
      { label: "NGO마케팅", href: "/ngo" },
      { label: "기타·공공기관", href: "/etc" },
      { label: "교육·컨설팅", href: "/consulting" },
      { label: "정부과제", href: "/gov" },
    ],
  },
  { label: "도서출판", href: "/books" },
  { label: "대표소개", href: "/about/ceo" },
  { label: "문의하기", href: "/contact" },
];

export default function GNB() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-sm h-16" : "bg-white/95 h-[72px]"
        }`}
      >
        <div className="max-w-container mx-auto px-6 h-full flex items-center justify-between">
          {/* 로고 */}
          <Link href="/" className="flex items-center">
            {/* ⚠️ OPEN B-2: SVG 로고 준비 전 텍스트 사용 */}
            <span className="font-black text-xl text-brand tracking-tight">
              2BSTORY
            </span>
          </Link>

          {/* PC 네비게이션 */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-brand ${
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "text-brand"
                    : "text-text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* PC CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center px-5 py-2.5 bg-brand text-white text-sm font-medium rounded-sm hover:bg-brand-hover transition-colors"
          >
            무료 마케팅 진단
          </Link>

          {/* 모바일 햄버거 */}
          <button
            className="md:hidden p-2 text-dark"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="메뉴"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* 모바일 오버레이 */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-[72px] overflow-y-auto">
          <nav className="flex flex-col px-6 py-8 gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`py-3 text-base font-medium border-b border-line transition-colors hover:text-brand ${
                  pathname === item.href ? "text-brand" : "text-text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-6 py-4 bg-brand text-white text-center font-semibold rounded-sm"
            >
              무료 마케팅 진단 신청
            </Link>
          </nav>
        </div>
      )}

      {/* GNB 높이만큼 여백 */}
      <div className="h-[72px]" />
    </>
  );
}
