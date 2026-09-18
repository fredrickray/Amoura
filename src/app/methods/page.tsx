import type { Metadata } from "next";
import { MethodsSection } from "@/components/home/MethodsSection";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our methods",
};

export default function MethodsPage() {
  return (
    <div className="pt-10 md:pt-16">
      <div className="mx-auto max-w-[820px] px-5 text-center md:px-8">
        <Reveal>
          <p className="badge mx-auto mb-4">Our methods</p>
          <h1 className="font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] tracking-[-0.03em]">
            Crafted Across Three Catalogues
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-ink-soft">
            From scent composition to editorial print and lash mapping — every
            Amoura experience is intentional, tactile, and personal.
          </p>
        </Reveal>
      </div>
      <MethodsSection />
    </div>
  );
}
