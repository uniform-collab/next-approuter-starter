interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  logo: string;
  columns: FooterColumn[];
  socialIcons: string[];
}

function LogoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
      <path d="M10 2L4 6V14L10 18L16 14V6L10 2Z" fill="#CC3A00" />
      <path d="M10 2L16 6L10 10L4 6L10 2Z" fill="#E8501A" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const iconMap: Record<string, () => React.ReactElement> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  x: XIcon,
};

export default function Footer({ logo, columns, socialIcons }: FooterProps) {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Top row: logo + columns */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Logo */}
          <div className="shrink-0">
            <a href="/" className="flex items-center gap-2 no-underline">
              <LogoIcon />
              <span className="text-lg font-bold text-primary">{logo}</span>
            </a>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.href}
                        className="text-sm text-muted no-underline hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row: social icons */}
        <div className="mt-10 flex items-center gap-4">
          {socialIcons.map((icon) => {
            const Icon = iconMap[icon];
            if (!Icon) return null;
            return (
              <a
                key={icon}
                href="#"
                className="text-muted no-underline hover:text-foreground transition-colors"
                aria-label={icon}
              >
                <Icon />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
