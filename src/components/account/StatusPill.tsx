import { cn } from "@/lib/utils";

export function StatusPill({
  tone,
  children,
}: {
  tone: "neutral" | "success" | "warning" | "danger";
  children: React.ReactNode;
}) {
  const tones = {
    neutral: "bg-surface-soft text-ink-soft",
    success: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100",
    warning: "bg-amber-50 text-amber-900 ring-1 ring-amber-100",
    danger: "bg-red-50 text-red-800 ring-1 ring-red-100",
  };

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

export function orderTone(
  status: "processing" | "shipped" | "delivered" | "cancelled",
) {
  if (status === "delivered") return "success" as const;
  if (status === "shipped") return "warning" as const;
  if (status === "cancelled") return "danger" as const;
  return "neutral" as const;
}

export function appointmentTone(
  status: "upcoming" | "completed" | "cancelled",
) {
  if (status === "upcoming") return "warning" as const;
  if (status === "completed") return "success" as const;
  return "danger" as const;
}
