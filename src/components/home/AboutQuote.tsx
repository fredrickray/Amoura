import { PillButton } from "@/components/PillButton";
import { Reveal } from "@/components/Reveal";

export function AboutQuote() {
  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[820px] text-center">
        <Reveal>
          <p className="badge mx-auto mb-6">About us</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.2] tracking-[-0.02em] text-ink">
            &ldquo;At Amoura, we believe beauty should feel personal — a
            signature scent, a printed story, and lashes that frame every
            moment with quiet confidence.&rdquo;
          </h2>
        </Reveal>
        <Reveal delay={0.16} className="mt-8 flex justify-center">
          <PillButton href="/store">Store</PillButton>
        </Reveal>
      </div>
    </section>
  );
}
