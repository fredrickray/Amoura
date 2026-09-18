import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "ghost" | "solid" | "soft";

const variants: Record<Variant, string> = {
  ghost: "pill-ghost",
  solid: "pill-solid",
  soft: "pill-soft",
};

export function PillButton({
  href,
  children,
  variant = "ghost",
  className,
  arrow = true,
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn("pill", variants[variant], className)}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span>{children}</span>
      {arrow ? (
        <span
          aria-hidden
          className={cn(
            "inline-flex size-5 items-center justify-center rounded-full text-[11px]",
            variant === "solid"
              ? "bg-white/15 text-white"
              : "bg-ink text-white",
          )}
        >
          {external ? "↗" : "→"}
        </span>
      ) : null}
    </Link>
  );
}
