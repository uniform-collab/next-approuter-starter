interface PricingCardProps {
  tier: string;
  price: string;
  description: string;
  ctaLabel: string;
  ctaVariant: "primary" | "outline";
  highlighted?: boolean;
  features: string[];
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className="shrink-0 text-foreground"
    >
      <path
        d="M4 9L7.5 12.5L14 5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PricingCard({
  tier,
  price,
  description,
  ctaLabel,
  ctaVariant,
  highlighted = false,
  features,
}: PricingCardProps) {
  return (
    <div
      className={`flex flex-col rounded-2xl border p-6 ${
        highlighted
          ? "border-primary/30 shadow-sm"
          : "border-border"
      }`}
    >
      {/* Tier label */}
      <span
        className={`text-sm font-medium ${
          highlighted ? "text-primary" : "text-foreground"
        }`}
      >
        {tier}
      </span>

      {/* Price */}
      <span
        className={`mt-2 text-4xl font-bold ${
          highlighted ? "text-primary" : "text-foreground"
        }`}
      >
        {price}
      </span>

      {/* Description */}
      <span className="mt-1 text-sm text-muted">{description}</span>

      {/* CTA */}
      <a
        href="#"
        className={`mt-5 block w-full rounded-full py-2.5 text-center text-sm font-medium no-underline transition-colors ${
          ctaVariant === "primary"
            ? "bg-primary text-background hover:bg-primary-dark"
            : "border border-border text-foreground hover:bg-surface"
        }`}
      >
        {ctaLabel}
      </a>

      {/* Divider */}
      <hr className="my-5 border-border" />

      {/* Features */}
      <ul className="flex flex-col gap-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-foreground">
            <CheckIcon />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
