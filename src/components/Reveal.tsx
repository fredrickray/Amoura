"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const ease = [0.23, 1, 0.32, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  id?: string;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
  id,
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      id={id}
      className={cn(className)}
      initial={{ opacity: 0, transform: `translateY(${y}px)` }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, transform: "translateY(20px)" },
        show: {
          opacity: 1,
          transform: "translateY(0px)",
          transition: { duration: 0.6, ease },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
