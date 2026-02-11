interface SplitContentProps {
  eyebrow: string;
  body: string;
}

export default function SplitContent({ eyebrow, body }: SplitContentProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-16 border-t border-border pt-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight md:w-1/2 text-balance">
          {eyebrow}
        </h2>
        <p className="text-base md:text-lg text-foreground leading-relaxed md:w-1/2">
          {body}
        </p>
      </div>
    </section>
  );
}
