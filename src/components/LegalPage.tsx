import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PillButton } from "@/components/PillButton";

export function LegalPage({
  badge,
  title,
  updated,
  children,
}: {
  badge: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-5 pb-24 pt-10 md:px-8 md:pt-16">
      <div className="mx-auto max-w-[760px]">
        <Reveal>
          <p className="badge mb-4">{badge}</p>
          <h1 className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.03em]">
            {title}
          </h1>
          <p className="mt-3 text-sm text-ink-muted">Last updated {updated}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="legal-prose mt-10 flex flex-col gap-8 text-[15px] leading-relaxed text-ink-soft">
            {children}
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mt-12 flex flex-wrap gap-3">
          <PillButton href="/support" variant="solid">
            Contact support
          </PillButton>
          <PillButton href="/store" variant="ghost">
            Back to store
          </PillButton>
        </Reveal>

        <p className="mt-10 text-sm text-ink-muted">
          Questions?{" "}
          <Link
            href="/contact"
            className="text-ink underline-offset-4 hover:underline"
          >
            Reach the atelier
          </Link>{" "}
          or email{" "}
          <a
            href="mailto:hello@amoura.studio"
            className="text-ink underline-offset-4 hover:underline"
          >
            hello@amoura.studio
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 font-display text-2xl tracking-tight text-ink">{title}</h2>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}
