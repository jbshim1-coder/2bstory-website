import CounterCard from "@/components/ui/CounterCard";

const counters = [
  { value: 18, suffix: "년", label: "업력", sublabel: "2008년 창립" },
  { value: 100, suffix: "+", label: "광고주", sublabel: "병원·B2B·가맹·교육" },
  { value: 11, suffix: "권", label: "단독 저서", sublabel: "심진보 대표 저서" },
  { value: 15, suffix: "명", label: "전문 인력", sublabel: "운영·기획·제작" },
];

export default function CounterSection() {
  return (
    <section className="bg-dark py-16">
      <div className="max-w-container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {counters.map((c) => (
            <CounterCard
              key={c.label}
              value={c.value}
              suffix={c.suffix}
              label={c.label}
              sublabel={c.sublabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
