import type { Metadata } from "next";
import Script from "next/script";
import GNB from "@/components/layout/GNB";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "투비스토리㈜ | 디지털 마케팅 대행사",
    template: "%s | 투비스토리㈜",
  },
  description:
    "2008년부터 100여 개 기업과 함께한 디지털 마케팅 대행사. 병원마케팅·B2B·가맹·교육 전문. 단독 저서 11권, 매일경제 강의 8년.",
  keywords: ["병원마케팅", "B2B마케팅", "가맹마케팅", "디지털마케팅", "투비스토리"],
  authors: [{ name: "투비스토리㈜" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "투비스토리㈜",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="ko" className="h-full">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <GNB />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingCTA />

        {/* ⚠️ OPEN I-7: GA4 측정 ID 확정 후 활성화 */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
