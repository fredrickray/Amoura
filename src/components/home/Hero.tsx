"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { PillButton } from "@/components/PillButton";

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Hold at 0 after fade-out so opacity never "comes back" while still in the hero pin
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.28, 0.48, 1],
    [1, 0.55, 0, 0],
  );
  const textY = useTransform(scrollYProgress, [0, 0.48, 1], [0, -36, -36]);
  const textScale = useTransform(scrollYProgress, [0, 0.48, 1], [1, 0.97, 0.97]);
  const textVisibility = useTransform(textOpacity, (v) =>
    v < 0.02 ? "hidden" : "visible",
  );

  const bottleScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.55, 0.85, 1],
    [0.72, 0.9, 1.35, 1.5, 1.5],
  );
  const bottleY = useTransform(
    scrollYProgress,
    [0, 0.45, 0.85, 1],
    [180, 40, -10, -10],
  );

  return (
    <section ref={sectionRef} className="relative h-[220vh]">
      {/* Use fixed vh — svh changes when browser chrome shows/hides and jittered scroll progress */}
      <div className="sticky top-0 flex h-screen flex-col items-center overflow-hidden px-5 pt-16 text-center md:px-8 md:pt-20">
        <motion.div
          className="relative z-10 mx-auto flex max-w-3xl flex-col items-center will-change-[opacity,transform]"
          style={
            reduce
              ? undefined
              : {
                  opacity: textOpacity,
                  y: textY,
                  scale: textScale,
                  visibility: textVisibility,
                }
          }
        >
          {/* Entrance only on an inner layer — never animate opacity here (fights scroll fade) */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.div
              className="mb-7 flex items-center justify-center gap-3"
              variants={fadeUp}
            >
              <div className="flex -space-x-2">
                {avatars.map((src) => (
                  <Image
                    key={src}
                    src={src}
                    alt=""
                    width={32}
                    height={32}
                    className="size-8 rounded-full border-2 border-canvas object-cover"
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-ink-soft">
                <span className="tracking-tight text-star" aria-label="5 stars">
                  ★★★★★
                </span>
                <span>12k+ Happy clients</span>
              </div>
            </motion.div>

            <motion.h1
              className="font-display text-[clamp(2.75rem,8vw,5.75rem)] leading-[0.95] tracking-[-0.03em]"
              variants={fadeUp}
            >
              <span className="block text-ink">Scented To Stay,</span>
              <span className="mt-1 block text-ink-soft/80">Styled To Delight</span>
            </motion.h1>

            <motion.p
              className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft md:text-base"
              variants={fadeUp}
            >
              Perfumes, custom magazines, and lash artistry — curated goods and
              services made to elevate everyday beauty.
            </motion.p>

            <motion.div className="mt-8 flex justify-center" variants={fadeUp}>
              <PillButton href="/store" className="min-w-[120px]">
                Store
              </PillButton>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-[-8%] z-20 flex justify-center md:bottom-[-12%]"
          style={
            reduce
              ? undefined
              : {
                  scale: bottleScale,
                  y: bottleY,
                }
          }
        >
          <div className="relative h-[58vh] w-[min(380px,72vw)] md:h-[70vh] md:w-[min(420px,46vw)]">
            <Image
              src="/hero/bottle.png"
              alt="Amoura signature perfume"
              fill
              priority
              unoptimized
              className="object-contain object-bottom drop-shadow-[0_28px_60px_rgba(0,0,0,0.18)]"
              sizes="(max-width: 768px) 55vw, 320px"
            />
            <span className="hotspot absolute left-1/2 top-[8%] size-2.5 -translate-x-1/2 rounded-full bg-ink" />
          </div>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-24 bg-gradient-to-t from-canvas to-transparent" />
      </div>
    </section>
  );
}

/** Transform-only entrance — opacity is owned exclusively by the scroll layer */
const fadeUp = {
  hidden: { transform: "translateY(18px)" },
  show: {
    transform: "translateY(0px)",
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as const },
  },
};
