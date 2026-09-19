import type { Metadata } from "next";
import { CataloguePage } from "@/components/CataloguePage";
import { getByCatalogue } from "@/data/catalog";
import { PillButton } from "@/components/PillButton";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Lash Studio",
  description:
    "Book Amoura lash sets — soft volume, natural length, and lasting comfort.",
};

export default function LashesPage() {
  return (
    <>
      <CataloguePage
        active="lashes"
        products={getByCatalogue("lashes")}
        eyebrow="Lashes"
        title="Lash"
        titleMuted="Studio"
        description="Salon sets tailored to your eye shape — soft volume, natural length, and aftercare that lasts between appointments."
      />
      <section className="border-t border-line px-5 py-16 md:px-8 md:pb-24">
        <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
          <Reveal>
            <h2 className="font-display text-3xl tracking-tight md:text-4xl">
              Prefer to book directly?
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
              Tell us your preferred set and timing — we&apos;ll confirm your
              studio appointment within one business day.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <PillButton href="/contact" variant="solid">
              Book a consultation
            </PillButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
