"use client";

import { useEffect, useRef, useState } from "react";

interface CounterCardProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel?: string;
}

export default function CounterCard({
  value,
  suffix = "",
  prefix = "",
  label,
  sublabel,
}: CounterCardProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center py-8">
      <p className="text-display font-black text-brand leading-none">
        {prefix}{count}{suffix}
      </p>
      <p className="mt-2 text-base font-semibold text-dark">{label}</p>
      {sublabel && (
        <p className="mt-1 text-sm text-text-muted">{sublabel}</p>
      )}
    </div>
  );
}
