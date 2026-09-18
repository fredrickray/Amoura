import Link from "next/link";

const main = [
  { href: "/", label: "Home" },
  { href: "/store", label: "Store" },
  { href: "/blog", label: "Blog" },
  { href: "/methods", label: "Our methods" },
  { href: "/support", label: "Support" },
];

const other = [
  { href: "/store", label: "Product" },
  { href: "/blog", label: "Blog" },
  { href: "/methods", label: "Expert" },
  { href: "/support", label: "404" },
];

const info = [
  { href: "/support", label: "Privacy policy" },
  { href: "/support", label: "Terms & conditions" },
  { href: "/support", label: "Return policy" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-[#111] text-white">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-16 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:px-8 md:py-20">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-[10px] bg-white text-ink">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M8 1.5C5.2 4.1 3.5 6.4 3.5 8.7a4.5 4.5 0 0 0 9 0C12.5 6.4 10.8 4.1 8 1.5Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="font-script text-[2.4rem] leading-none text-blush">Amoura</span>
          </div>
          <p className="max-w-xs text-[15px] leading-relaxed text-white/65">
            Amoura crafts perfumes, custom magazines, and lash experiences for
            people who want beauty that feels personal.
          </p>
          <p className="mt-10 font-script text-6xl leading-none text-blush md:text-7xl">
            Amoura
          </p>
        </div>

        <FooterCol title="Main Pages" links={main} />
        <FooterCol title="Other Pages" links={other} />
        <FooterCol title="Information" links={info} />
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-2 px-5 py-6 text-sm text-white/45 md:flex-row md:items-center md:justify-between md:px-8">
          <p>Copyright © {new Date().getFullYear()} Amoura. All rights reserved.</p>
          <p>Perfumes · Magazines · Lashes</p>
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
      <p className="mb-4 text-sm font-medium text-white/40">{title}</p>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link
              href={link.href}
              className="text-[15px] text-white/75 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
