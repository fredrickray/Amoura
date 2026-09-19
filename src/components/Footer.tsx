import Link from "next/link";

const shop = [
  { href: "/store", label: "All products" },
  { href: "/perfumes", label: "Perfumes" },
  { href: "/magazines", label: "Custom magazines" },
  { href: "/lashes", label: "Lash studio" },
];

const company = [
  { href: "/methods", label: "Our methods" },
  { href: "/blog", label: "Blog" },
  { href: "/support", label: "Support" },
  { href: "/contact", label: "Contact" },
];

const account = [
  { href: "/login", label: "Sign in" },
  { href: "/signup", label: "Create account" },
  { href: "/forgot-password", label: "Forgot password" },
  { href: "/verify-email", label: "Verify email" },
];

const legal = [
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms & conditions" },
  { href: "/returns", label: "Return policy" },
  { href: "/shipping", label: "Shipping" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-[#111] text-white">
      <div className="mx-auto max-w-[1240px] px-5 pt-16 md:px-8 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr_1fr_1fr_1fr] lg:gap-10">
          <div className="max-w-sm">
            <Link
              href="/"
              className="mb-5 inline-flex items-center gap-3 transition-opacity hover:opacity-90"
            >
              <span className="flex size-10 items-center justify-center rounded-[10px] bg-white text-ink">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M8 1.5C5.2 4.1 3.5 6.4 3.5 8.7a4.5 4.5 0 0 0 9 0C12.5 6.4 10.8 4.1 8 1.5Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className="font-script text-[2.35rem] leading-none text-blush">
                Amoura
              </span>
            </Link>
            <p className="text-[15px] leading-relaxed text-white/60">
              Signature perfumes, custom magazines, and lash artistry — curated
              goods and services for beauty that feels personal.
            </p>
            <a
              href="mailto:hello@amoura.studio"
              className="mt-6 inline-block text-[15px] text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              hello@amoura.studio
            </a>
            <div className="mt-8 flex items-center gap-3">
              <SocialLink href="#" label="Instagram">
                <InstagramIcon />
              </SocialLink>
              <SocialLink href="#" label="TikTok">
                <TikTokIcon />
              </SocialLink>
              <SocialLink href="#" label="Pinterest">
                <PinterestIcon />
              </SocialLink>
            </div>
          </div>

          <FooterCol title="Shop" links={shop} />
          <FooterCol title="Company" links={company} />
          <FooterCol title="Account" links={account} />
          <FooterCol title="Legal" links={legal} />
        </div>

        <div className="mt-16 border-t border-white/10 pt-10 md:mt-20">
          <p className="font-script text-[clamp(3.5rem,12vw,7.5rem)] leading-none tracking-tight text-white/[0.08] select-none">
            Amoura
          </p>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© {year} Amoura. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-white/80">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white/80">
              Terms
            </Link>
            <Link href="/returns" className="transition-colors hover:text-white/80">
              Returns
            </Link>
            <span className="hidden text-white/25 sm:inline">·</span>
            <span>Perfumes · Magazines · Lashes</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-white/40">
        {title}
      </p>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link
              href={link.href}
              className="text-[15px] text-white/70 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-200 hover:border-white/35 hover:text-white"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .56.04.82.12v-3.4a6.27 6.27 0 0 0-.82-.05A6.33 6.33 0 0 0 3.16 15.8a6.33 6.33 0 0 0 6.33 6.33 6.33 6.33 0 0 0 6.33-6.33V9.3a8.16 8.16 0 0 0 4.77 1.52V7.37a4.85 4.85 0 0 1-1-.68Z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.22 2.62 7.84 6.34 9.34-.09-.79-.17-2.01.03-2.87.19-.8 1.22-5.16 1.22-5.16s-.31-.62-.31-1.54c0-1.44.84-2.52 1.88-2.52.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.87 3.48-.25 1.05.52 1.91 1.56 1.91 1.87 0 3.31-1.97 3.31-4.81 0-2.52-1.81-4.28-4.4-4.28-3 0-4.76 2.25-4.76 4.57 0 .9.35 1.87.78 2.4a.31.31 0 0 1 .07.3c-.08.32-.25 1.05-.28 1.2-.05.19-.15.23-.35.14-1.31-.61-2.13-2.53-2.13-4.07 0-3.31 2.41-6.36 6.95-6.36 3.65 0 6.49 2.6 6.49 6.08 0 3.63-2.29 6.55-5.47 6.55-1.07 0-2.07-.55-2.42-1.21l-.66 2.5c-.24.92-.89 2.08-1.32 2.78A10 10 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Z" />
    </svg>
  );
}
