"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { PillButton } from "./PillButton";

const links = [
  { href: "/store", label: "Store" },
  { href: "/blog", label: "Blog" },
  { href: "/methods", label: "Our methods" },
  { href: "/support", label: "Support" },
];

export function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ease-[var(--ease-out-strong)]",
        scrolled
          ? "border-b border-line/80 bg-canvas/85 backdrop-blur-md"
          : "border-b border-transparent bg-canvas/0",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5 md:px-8">
        <Link
          href="/"
          aria-label="Amoura home"
          className="relative z-10 flex items-center gap-2.5 transition-transform duration-160 ease-[var(--ease-out-strong)] active:scale-[0.98]"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-ink text-white">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M8 1.5C5.2 4.1 3.5 6.4 3.5 8.7a4.5 4.5 0 0 0 9 0C12.5 6.4 10.8 4.1 8 1.5Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="font-script text-[2rem] leading-none text-blush-deep md:text-[2.15rem]">
            Amoura
          </span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[15px] transition-colors duration-200",
                  active ? "text-ink" : "text-ink-soft hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="relative z-10 flex items-center gap-2 sm:gap-3">
          <Link
            href="/cart"
            aria-label={`Cart${count ? `, ${count} items` : ""}`}
            className="relative inline-flex size-10 items-center justify-center rounded-full border border-ink/15 transition-colors hover:bg-surface-soft"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 7h12l-1 12H7L6 7Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M9 7V5.5a3 3 0 0 1 6 0V7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            {count > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-ink px-1 text-[10px] font-semibold text-white">
                {count > 9 ? "9+" : count}
              </span>
            ) : null}
          </Link>
          <Link
            href="/login"
            className="hidden text-[15px] text-ink-soft transition-colors hover:text-ink sm:inline"
          >
            Sign in
          </Link>
          <PillButton href="/signup" className="hidden sm:inline-flex" arrow>
            Join
          </PillButton>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-ink/15 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex w-4 flex-col gap-1">
              <span
                className={cn(
                  "h-px w-full bg-ink transition-transform duration-200",
                  open && "translate-y-[2.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-px w-full bg-ink transition-transform duration-200",
                  open && "-translate-y-[2.5px] -rotate-45",
                )}
              />
            </div>
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-line bg-canvas transition-[max-height,opacity] duration-300 ease-[var(--ease-out-strong)] md:hidden",
          open ? "max-h-72 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="flex flex-col gap-1 px-5 py-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-3 py-3 text-[15px] text-ink-soft hover:bg-surface-soft hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/cart"
            className="rounded-xl px-3 py-3 text-[15px] text-ink-soft hover:bg-surface-soft hover:text-ink"
          >
            Cart{count > 0 ? ` (${count})` : ""}
          </Link>
          <Link
            href="/login"
            className="rounded-xl px-3 py-3 text-[15px] text-ink-soft hover:bg-surface-soft hover:text-ink"
          >
            Sign in
          </Link>
          <PillButton href="/signup" className="mt-2 w-full" arrow>
            Join
          </PillButton>
        </div>
      </div>
    </header>
  );
}
