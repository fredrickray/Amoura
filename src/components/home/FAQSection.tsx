"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PillButton } from "@/components/PillButton";
import { Reveal } from "@/components/Reveal";
import { faqs } from "@/data/catalog";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="badge mb-4">FAQs</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
              Your Questions Answered
            </h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-soft">
              Here are the most common questions clients ask before shopping or
              booking with Amoura.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <PillButton href="/support" variant="solid">
              Get In Touch
            </PillButton>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="rounded-[24px] border border-line bg-surface px-2 py-2 md:px-4">
            {faqs.map((item, index) => {
              const isOpen = open === index;
              return (
                <div
                  key={item.q}
                  className={cn(
                    "border-b border-line last:border-b-0",
                  )}
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-3 py-5 text-left transition-colors hover:text-ink md:px-4"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-[15px] font-medium md:text-base">
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-soft text-sm transition-transform duration-250 ease-[var(--ease-out-strong)]",
                        isOpen && "rotate-180",
                      )}
                    >
                      ↓
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-3 pb-5 text-[15px] leading-relaxed text-ink-soft md:px-4">
                          {item.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
