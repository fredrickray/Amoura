"use client";

import Link from "next/link";
import { useState } from "react";
import {
  notifications as initialNotifications,
  type AccountNotification,
  type NotificationKind,
} from "@/data/account";
import { cn } from "@/lib/utils";

const kindLabel: Record<NotificationKind, string> = {
  order: "Order",
  appointment: "Appointment",
  magazine: "Magazine",
  promo: "Offer",
};

export default function NotificationsPage() {
  const [items, setItems] = useState<AccountNotification[]>(initialNotifications);
  const unread = items.filter((n) => !n.read).length;

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function markRead(id: string) {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }

  return (
    <div className="min-w-0">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="badge mb-3">Alerts</p>
          <h1 className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-[1.05] tracking-[-0.03em]">
            Notifications
          </h1>
          <p className="mt-2 text-[15px] text-ink-soft">
            {unread === 0
              ? "You’re all caught up."
              : `${unread} unread update${unread === 1 ? "" : "s"}.`}
          </p>
        </div>
        {unread > 0 ? (
          <button
            type="button"
            onClick={markAllRead}
            className="text-sm font-medium text-ink-soft hover:text-ink"
          >
            Mark all as read
          </button>
        ) : null}
      </div>

      <ul className="flex flex-col gap-3">
        {items.map((n) => (
          <li key={n.id}>
            <Link
              href={n.href}
              onClick={() => markRead(n.id)}
              className={cn(
                "block rounded-[22px] border p-5 transition-colors md:p-6",
                n.read
                  ? "border-line/80 bg-surface/80 hover:bg-white"
                  : "border-ink/15 bg-white shadow-[0_12px_28px_-20px_rgba(17,17,17,0.35)] hover:bg-[#faf6f6]",
              )}
            >
              <div className="flex items-start gap-3">
                {!n.read ? (
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-blush-deep" />
                ) : (
                  <span className="mt-1.5 size-2 shrink-0" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-surface-soft px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-ink-muted">
                      {kindLabel[n.kind]}
                    </span>
                    <span className="text-xs text-ink-muted">{n.at}</span>
                  </div>
                  <p className="mt-2 font-medium text-ink">{n.title}</p>
                  <p className="mt-1 text-sm text-ink-soft">{n.body}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
