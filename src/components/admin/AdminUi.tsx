"use client";

import { cn } from "@/lib/utils";

export function FilterTabs<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (next: T) => void;
  options: { value: T; label: string; count?: number }[];
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
              active
                ? "bg-ink text-white"
                : "bg-white text-ink-soft ring-1 ring-[#ddd8d3] hover:text-ink",
            )}
          >
            {opt.label}
            {typeof opt.count === "number" ? (
              <span className={cn("ml-1.5", active ? "text-white/60" : "text-ink-muted")}>
                {opt.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow ? <p className="badge mb-2">{eyebrow}</p> : null}
        <h1 className="font-display text-[clamp(1.85rem,3.5vw,2.5rem)] tracking-tight">
          {title}
        </h1>
        {description ? (
          <p className="mt-1.5 max-w-xl text-sm text-ink-soft">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#ddd8d3] bg-white/50 px-6 py-14 text-center text-sm text-ink-soft">
      {message}
    </div>
  );
}
