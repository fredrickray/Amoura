"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Overview", exact: true },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/requests", label: "Magazine requests" },
  { href: "/admin/appointments", label: "Appointments" },
  { href: "/admin/support", label: "Support" },
  { href: "/admin/pricing", label: "Magazine pricing" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen bg-[#f3f1ef] text-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 0% 0%, rgba(168,126,134,0.14), transparent 55%), radial-gradient(ellipse 40% 30% at 100% 100%, rgba(17,17,17,0.04), transparent 50%)",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-[1400px]">
        <aside className="hidden w-[248px] shrink-0 flex-col border-r border-[#ddd8d3] bg-[#1a1716] text-[#f7f4f1] lg:flex">
          <div className="border-b border-white/10 px-5 py-6">
            <Link href="/admin" className="block">
              <span className="font-script text-[2rem] leading-none text-[#e8d4d7]">
                Amoura
              </span>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/45">
                Studio desk
              </p>
            </Link>
          </div>

          <nav className="flex flex-1 flex-col gap-1 p-3">
            {nav.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-xl px-3.5 py-2.5 text-sm transition-colors",
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/55 hover:bg-white/5 hover:text-white/90",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-white/10 p-4">
            <p className="text-xs text-white/40">Signed in as</p>
            <p className="mt-0.5 text-sm font-medium text-white/85">
              Studio admin
            </p>
            <Link
              href="/"
              className="mt-3 inline-block text-xs text-[#e8d4d7]/70 transition-colors hover:text-[#e8d4d7]"
            >
              ← View storefront
            </Link>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-[#ddd8d3] bg-[#f3f1ef]/90 backdrop-blur-md">
            <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
              <div className="flex min-w-0 items-center gap-3 lg:hidden">
                <Link href="/admin" className="font-script text-2xl text-blush-deep">
                  Amoura
                </Link>
                <span className="truncate text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted">
                  Studio desk
                </span>
              </div>
              <p className="hidden text-sm text-ink-soft lg:block">
                Manage orders, commissions, and studio requests
              </p>
              <Link
                href="/account"
                className="shrink-0 text-sm text-ink-soft transition-colors hover:text-ink"
              >
                Customer view
              </Link>
            </div>

            <nav className="flex gap-1 overflow-x-auto border-t border-[#ddd8d3]/80 px-3 pb-2 pt-1 lg:hidden">
              {nav.map((item) => {
                const active = item.exact
                  ? pathname === item.href
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                      active
                        ? "bg-ink text-white"
                        : "bg-white/70 text-ink-soft hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </header>

          <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
