interface TestimonialCardProps {
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

export default function TestimonialCard({ name, role, avatar, quote }: TestimonialCardProps) {
  return (
    <div className="flex flex-col rounded-2xl bg-surface p-5 min-w-[240px] max-w-[280px] shrink-0">
      {/* Author */}
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-foreground leading-tight">{name}</p>
          <p className="text-xs text-muted leading-tight mt-0.5">{role}</p>
        </div>
      </div>

      {/* Quote */}
      <p className="mt-4 text-sm text-foreground leading-relaxed">{quote}</p>
    </div>
  );
}
