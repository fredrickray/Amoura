"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "amoura-admin-sidebar-collapsed";

type NavItem = {
  href: string;
  label: string;
  exact?: boolean;
  icon: React.ReactNode;
};

const iconClass = "size-[18px] shrink-0";

const nav: NavItem[] = [
  {
    href: "/admin",
    label: "Overview",
    exact: true,
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/admin/orders",
    label: "Orders",
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M6 7h12l-1 12H7L6 7Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9 7V5.5A3 3 0 0 1 12 2.5v0a3 3 0 0 1 3 3V7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/admin/requests",
    label: "Magazine requests",
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5 4.5h10.5A2.5 2.5 0 0 1 18 7v13H7.5A2.5 2.5 0 0 1 5 17.5v-13Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M18 7h1a2 2 0 0 1 2 2v10.5a1.5 1.5 0 0 1-1.5 1.5H18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 9h6M8.5 12.5h6M8.5 16h3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/admin/appointments",
    label: "Appointments",
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect
          x="3.5"
          y="5"
          width="17"
          height="15"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M3.5 9.5h17M8 3.5v3M16 3.5v3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/admin/support",
    label: "Support",
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5 18.5 6.2 15A7.5 7.5 0 1 1 12 19.5H7.5L5 18.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/admin/pricing",
    label: "Magazine pricing",
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M12 7.5v1.2M12 15.3V16.5M9.6 14.2c.4.7 1.2 1.1 2.4 1.1 1.4 0 2.4-.7 2.4-1.8S13.4 11.8 12 11.8s-2.4-.5-2.4-1.6c0-1 .9-1.7 2.2-1.7 1.1 0 1.9.4 2.3 1.1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

function isActive(pathname: string, item: NavItem) {
  return item.exact
    ? pathname === item.href
    : pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      // ignore
    }
    setReady(true);
  }, []);

  function toggleCollapsed() {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {
        // ignore
      }
      return next;
    });
  }

  return (
    <div className="relative flex min-h-screen bg-[#f3f1ef] text-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 0% 0%, rgba(168,126,134,0.14), transparent 55%), radial-gradient(ellipse 40% 30% at 100% 100%, rgba(17,17,17,0.04), transparent 50%)",
        }}
      />

      <aside
        className={cn(
          "relative z-30 hidden shrink-0 flex-col border-r border-white/10 bg-[#1a1716] text-[#f7f4f1] transition-[width] duration-200 ease-out lg:flex",
          ready ? (collapsed ? "w-[72px]" : "w-[248px]") : "w-[248px]",
        )}
      >
        <div
          className={cn(
            "flex items-center border-b border-white/10",
            collapsed ? "justify-center px-2 py-5" : "justify-between gap-2 px-4 py-5",
          )}
        >
          <Link
            href="/admin"
            className={cn("min-w-0", collapsed && "flex justify-center")}
            title="Amoura Studio desk"
          >
            {collapsed ? (
              <span className="flex size-9 items-center justify-center rounded-lg bg-white/10 font-script text-xl text-[#e8d4d7]">
                A
              </span>
            ) : (
              <span className="block">
                <span className="font-script text-[2rem] leading-none text-[#e8d4d7]">
                  Amoura
                </span>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/45">
                  Studio desk
                </p>
              </span>
            )}
          </Link>

          {!collapsed ? (
            <button
              type="button"
              onClick={toggleCollapsed}
              aria-label="Collapse sidebar"
              title="Collapse sidebar"
              className="flex size-8 shrink-0 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            >
              <CollapseIcon />
            </button>
          ) : null}
        </div>

        {collapsed ? (
          <div className="flex justify-center border-b border-white/10 py-2">
            <button
              type="button"
              onClick={toggleCollapsed}
              aria-label="Expand sidebar"
              title="Expand sidebar"
              className="flex size-9 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ExpandIcon />
            </button>
          </div>
        ) : null}

        <nav className={cn("flex flex-1 flex-col gap-1", collapsed ? "p-2" : "p-3")}>
          {nav.map((item) => {
            const active = isActive(pathname, item);
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className={cn(
                  "flex items-center rounded-xl text-sm transition-colors",
                  collapsed ? "justify-center px-0 py-2.5" : "gap-3 px-3.5 py-2.5",
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/55 hover:bg-white/5 hover:text-white/90",
                )}
              >
                {item.icon}
                {!collapsed ? <span className="truncate">{item.label}</span> : null}
              </Link>
            );
          })}
        </nav>

        <div
          className={cn(
            "border-t border-white/10",
            collapsed ? "flex flex-col items-center gap-2 p-2" : "p-4",
          )}
        >
          {collapsed ? (
            <Link
              href="/"
              title="View storefront"
              className="flex size-9 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-[#e8d4d7]"
            >
              <StorefrontIcon />
            </Link>
          ) : (
            <>
              <p className="text-xs text-white/40">Signed in as</p>
              <p className="mt-0.5 text-sm font-medium text-white/85">Studio admin</p>
              <Link
                href="/"
                className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#e8d4d7]/70 transition-colors hover:text-[#e8d4d7]"
              >
                <StorefrontIcon className="size-3.5" />
                View storefront
              </Link>
            </>
          )}
        </div>
      </aside>

      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
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
              const active = isActive(pathname, item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "bg-ink text-white"
                      : "bg-white/70 text-ink-soft hover:text-ink",
                  )}
                >
                  {item.icon}
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
  );
}

function CollapseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 6 9 12l6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 4v16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="m9 6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 4v16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StorefrontIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "size-[18px]"}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 9.5 5.5 4h13L20 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M4 9.5h16V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 20v-6h5v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
