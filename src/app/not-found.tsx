import Link from "next/link";
import { PillButton } from "@/components/PillButton";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-canvas">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(201,163,168,0.22), transparent 55%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(168,126,134,0.08), transparent 50%)",
        }}
      />

      <header className="relative z-10 mx-auto flex w-full max-w-[1240px] items-center justify-between px-5 py-6 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-transform duration-160 active:scale-[0.98]"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-ink text-white">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M8 1.5C5.2 4.1 3.5 6.4 3.5 8.7a4.5 4.5 0 0 0 9 0C12.5 6.4 10.8 4.1 8 1.5Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="font-script text-[2rem] leading-none text-blush-deep">
            Amoura
          </span>
        </Link>
        <PillButton href="/store" variant="ghost" arrow>
          Store
        </PillButton>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-24 pt-8 text-center">
        <p className="font-script text-[clamp(5rem,18vw,9rem)] leading-none text-blush/50">
          404
        </p>

        <h1 className="mt-2 font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.1] tracking-[-0.03em] text-ink">
          This page got lost
        </h1>

        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft md:text-base">
          The page you’re looking for isn’t in our catalogue — it may have moved,
          or the link might be outdated.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <PillButton href="/" variant="solid" arrow>
            Back home
          </PillButton>
          <PillButton href="/store" variant="ghost" arrow>
            Browse store
          </PillButton>
        </div>

        <nav className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-muted">
          <Link href="/login" className="transition-colors hover:text-ink">
            Sign in
          </Link>
          <span aria-hidden className="text-line">
            ·
          </span>
          <Link href="/support" className="transition-colors hover:text-ink">
            Support
          </Link>
          <span aria-hidden className="text-line">
            ·
          </span>
          <Link href="/blog" className="transition-colors hover:text-ink">
            Blog
          </Link>
        </nav>
      </main>
    </div>
  );
}
