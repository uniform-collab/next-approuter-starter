"use client";

import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

interface ActionItem {
  label: string;
  href: string;
  variant: "link" | "primary";
}

interface HeaderProps {
  logo: string;
  navigation: NavItem[];
  actions: ActionItem[];
}

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-1">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LogoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
      <path d="M10 2L4 6V14L10 18L16 14V6L10 2Z" fill="#CC3A00" />
      <path d="M10 2L16 6L10 10L4 6L10 2Z" fill="#E8501A" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function Header({ logo, navigation, actions }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 no-underline">
          <LogoIcon />
          <span className="text-lg font-bold text-primary">{logo}</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center text-sm text-foreground no-underline hover:text-primary transition-colors"
            >
              {item.label}
              {item.hasDropdown && <ChevronDown />}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-4">
          {actions.map((action) =>
            action.variant === "primary" ? (
              <a
                key={action.label}
                href={action.href}
                className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-background no-underline hover:bg-primary-dark transition-colors"
              >
                {action.label}
              </a>
            ) : (
              <a
                key={action.label}
                href={action.href}
                className="text-sm text-foreground no-underline hover:text-primary transition-colors"
              >
                {action.label}
              </a>
            )
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-1 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-6 pb-4">
          <nav className="flex flex-col gap-3 py-3" aria-label="Mobile navigation">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-foreground no-underline hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-2 border-t border-border pt-3">
            {actions.map((action) =>
              action.variant === "primary" ? (
                <a
                  key={action.label}
                  href={action.href}
                  className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-background no-underline text-center hover:bg-primary-dark transition-colors"
                >
                  {action.label}
                </a>
              ) : (
                <a
                  key={action.label}
                  href={action.href}
                  className="text-sm text-foreground no-underline hover:text-primary py-1"
                >
                  {action.label}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
