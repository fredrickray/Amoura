import Image from "next/image";
import { PillButton } from "@/components/PillButton";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";

const pillars = [
  {
    badge: "Scent",
    title: "Signature Fragrance",
    body: "Thoughtfully blended perfumes that linger softly — built for presence without excess.",
    cards: [
      {
        title: "Hand blended",
        image:
          "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Long wear",
        image:
          "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    badge: "Print",
    title: "Custom Magazines",
    body: "Editorial keepsakes designed around your photos, milestones, and brand story.",
    cards: [
      {
        title: "Personal edit",
        image:
          "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Premium paper",
        image:
          "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    badge: "Lashes",
    title: "Lash Artistry",
    body: "Salon sets tailored to your eye shape — soft volume, natural length, lasting comfort.",
    cards: [
      {
        title: "Soft volume",
        image: "/methods/soft-volume.png",
      },
      {
        title: "Studio finish",
        image:
          "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
];

export function MethodsSection() {
  return (
    <section className="px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-14 text-center">
          <Reveal>
            <p className="badge mx-auto mb-5">Features</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.03em]">
              Where Timeless Values Meet Modern Vision
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-4 max-w-xl text-[15px] text-ink-soft">
              Behind every bottle, page, and set lies a story of dedication.
            </p>
          </Reveal>
          <Reveal delay={0.16} className="mt-7 flex justify-center">
            <PillButton href="/methods" variant="solid">
              Our Methods
            </PillButton>
          </Reveal>
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
            >
              <Reveal>
                <p className="badge mb-4">{pillar.badge}</p>
                <h3 className="font-display text-3xl tracking-tight md:text-4xl">
                  {pillar.title}
                </h3>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
                  {pillar.body}
                </p>
              </Reveal>

              <Stagger
                className={`grid gap-4 sm:grid-cols-2 ${
                  index % 2 === 1 ? "lg:order-first" : ""
                }`}
              >
                {pillar.cards.map((card) => (
                  <StaggerItem key={card.title}>
                    <div className="overflow-hidden rounded-[22px] border border-line bg-surface p-4">
                      <p className="mb-3 text-center text-sm font-medium text-ink-soft">
                        {card.title}
                      </p>
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[16px]">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className="object-cover transition-transform duration-700 ease-[var(--ease-out-strong)] hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, 280px"
                        />
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
