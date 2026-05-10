import { BookOpen, GraduationCap, Building2, BarChart3 } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import PromiseCard from "@/components/ui/PromiseCard";

const promises = [
  {
    icon: BookOpen,
    title: "광고대행사 중 유일하게,\n책으로 검증되었습니다.",
    description: "단독 저서 11권. 매일경제 교육센터 8년 강의.",
  },
  {
    icon: GraduationCap,
    title: "운영자가 강의하고,\n강사가 운영합니다.",
    description: "매일경제·서강대·숙명여대 현역 강사 + 매주 캠페인 직접 검토.",
  },
  {
    icon: Building2,
    title: "산업을 압니다.\n100여 개의 케이스로 압니다.",
    description: "병원 100+, 가맹 200호점, B2B SaaS, 교육 18년.",
  },
  {
    icon: BarChart3,
    title: "데이터로 답합니다.\n18년의 데이터입니다.",
    description: "GA·GTM·픽셀 직접 세팅. 매체 기여도까지 수치로.",
  },
];

interface PromiseSectionProps {
  bg?: "white" | "soft";
}

export default function PromiseSection({ bg = "soft" }: PromiseSectionProps) {
  return (
    <section className={`py-24 ${bg === "soft" ? "bg-soft" : "bg-white"}`}>
      <div className="max-w-container mx-auto px-6">
        <SectionTitle
          eyebrow="Our Promise"
          title="투비스토리가 다른 이유"
          description="자화자찬이 아닌 검증 가능한 사실입니다."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {promises.map((p) => (
            <PromiseCard
              key={p.title}
              icon={p.icon}
              title={p.title}
              description={p.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
