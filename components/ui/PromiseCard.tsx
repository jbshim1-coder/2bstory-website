import { cn } from "@/lib/utils";

interface PromiseCardProps {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  description: string;
  className?: string;
}

export default function PromiseCard({
  icon: Icon,
  title,
  description,
  className,
}: PromiseCardProps) {
  return (
    <div
      className={cn(
        "p-8 bg-white border border-line rounded-sm",
        "transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-brand",
        className
      )}
    >
      <Icon size={32} className="text-brand mb-4" />
      <h3 className="text-h3 font-semibold text-dark mb-3 leading-snug">
        {title}
      </h3>
      <p className="text-sm text-text-muted leading-relaxed">{description}</p>
    </div>
  );
}
