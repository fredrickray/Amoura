"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const nav = [
  { href: "/account", label: "Home", exact: true },
  { href: "/account/orders", label: "Orders" },
  { href: "/account/appointments", label: "Appointments" },
  { href: "/account/magazines", label: "Magazines" },
  { href: "/account/wishlist", label: "Wishlist" },
  { href: "/account/addresses", label: "Addresses" },
  { href: "/account/support", label: "Support" },
  { href: "/account/notifications", label: "Alerts" },
  { href: "/account/profile", label: "Profile" },
];

export function AccountShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAdmin } = useAuth();
  const firstName = user?.firstName ?? "Guest";
  const lastName = user?.lastName ?? "";
  const email = user?.email ?? "";
  const initials = `${firstName[0] ?? "G"}${lastName[0] ?? ""}`.toUpperCase();

  function signOut() {
    logout();
    router.push("/login");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-canvas">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 0% 0%, rgba(201,163,168,0.22), transparent 55%), radial-gradient(ellipse 55% 45% at 100% 10%, rgba(168,126,134,0.12), transparent 50%), radial-gradient(ellipse 40% 35% at 80% 90%, rgba(201,163,168,0.1), transparent 45%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
        }}
      />

      <header className="relative border-b border-line/80 bg-surface/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 md:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-[9px] bg-ink text-white">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M8 1.5C5.2 4.1 3.5 6.4 3.5 8.7a4.5 4.5 0 0 0 9 0C12.5 6.4 10.8 4.1 8 1.5Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="font-script text-[1.75rem] leading-none text-blush-deep">
              Amoura
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            {isAdmin ? (
              <Link
                href="/admin"
                className="hidden text-sm text-ink-soft transition-colors hover:text-ink sm:inline"
              >
                Studio desk
              </Link>
            ) : null}
            <Link
              href="/account/notifications"
              aria-label="Notifications"
              className="relative flex size-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-surface-soft hover:text-ink"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6 9a6 6 0 1 1 12 0c0 3.5 1.5 5 1.5 5H4.5S6 12.5 6 9Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 18a2 2 0 0 0 4 0"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-star" />
            </Link>
            <Link
              href="/store"
              className="hidden text-sm text-ink-soft transition-colors hover:text-ink sm:inline"
            >
              Continue shopping
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="relative mx-auto grid max-w-[1240px] gap-8 px-5 py-8 md:px-8 lg:grid-cols-[240px_1fr] lg:gap-10 lg:py-12">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-[24px] border border-line/80 bg-surface/80 p-5 shadow-[0_20px_50px_-36px_rgba(17,17,17,0.35)] backdrop-blur-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#e8d4d7] to-[#c9a3a8] font-display text-lg text-ink">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="truncate font-medium text-ink">
                  {firstName} {lastName}
                </p>
                <p className="truncate text-sm text-ink-soft">{email}</p>
              </div>
            </div>

            <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0">
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
                      "shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-[background-color,color,transform] duration-200 ease-[var(--ease-out-strong)] lg:rounded-2xl",
                      active
                        ? "bg-[#efe4e6] text-ink ring-1 ring-[#d9c0c4]/70"
                        : "bg-surface-soft/80 text-ink-soft hover:bg-[#f3ecee] hover:text-ink lg:bg-transparent",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
