import type { Metadata } from "next";
import { FAQSection } from "@/components/home/FAQSection";
import { PillButton } from "@/components/PillButton";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Support",
};

export default function SupportPage() {
  return (
    <div className="pt-10 md:pt-16">
      <div className="mx-auto max-w-[820px] px-5 text-center md:px-8">
        <Reveal>
          <p className="badge mx-auto mb-4">Support</p>
          <h1 className="font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] tracking-[-0.03em]">
            We&apos;re Here For Every Detail
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-ink-soft">
            Questions about scent notes, magazine briefs, shipping, or lash
            bookings — reach the atelier and we&apos;ll guide you.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-8 flex justify-center gap-3">
          <PillButton href="/contact" variant="solid">
            Get in touch
          </PillButton>
          <PillButton href="mailto:hello@amoura.studio" variant="ghost" external>
            Email Amoura
          </PillButton>
        </Reveal>
      </div>
      <FAQSection />
    </div>
  );
}
