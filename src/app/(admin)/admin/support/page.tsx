"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AdminPageHeader, EmptyState, FilterTabs } from "@/components/admin/AdminUi";
import { StatusPill, supportTone } from "@/components/account/StatusPill";
import type { SupportTicketStatus } from "@/data/account";
import { adminSupportStatusLabel } from "@/data/admin";
import { useAdminStore } from "@/context/AdminStoreContext";

type Filter = "all" | SupportTicketStatus;

export default function AdminSupportPage() {
  const { tickets, ready } = useAdminStore();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return tickets;
    return tickets.filter((t) => t.status === filter);
  }, [tickets, filter]);

  if (!ready) return null;

  const count = (s?: SupportTicketStatus) =>
    s ? tickets.filter((t) => t.status === s).length : tickets.length;

  return (
    <div>
      <AdminPageHeader
        eyebrow="Inbox"
        title="Support"
        description="Reply to customers and close threads when resolved."
      />

      <FilterTabs
        value={filter}
        onChange={setFilter}
        options={[
          { value: "all", label: "All", count: count() },
          { value: "open", label: "Open", count: count("open") },
          {
            value: "awaiting_you",
            label: "Awaiting customer",
            count: count("awaiting_you"),
          },
          { value: "resolved", label: "Resolved", count: count("resolved") },
        ]}
      />

      <div className="mt-5 overflow-hidden rounded-2xl border border-[#ddd8d3] bg-white">
        {filtered.length === 0 ? (
          <EmptyState message="No tickets in this filter." />
        ) : (
          <ul className="divide-y divide-[#ddd8d3]">
            {filtered.map((ticket) => (
              <li key={ticket.id}>
                <Link
                  href={`/admin/support/${ticket.id}`}
                  className="flex flex-col gap-2 px-4 py-4 transition-colors hover:bg-[#faf8f6] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-ink">{ticket.subject}</p>
                      <StatusPill tone={supportTone(ticket.status)}>
                        {adminSupportStatusLabel[ticket.status]}
                      </StatusPill>
                    </div>
                    <p className="mt-0.5 text-sm text-ink-soft">
                      {ticket.id} · {ticket.customerName}
                      {ticket.relatedTo ? ` · ${ticket.relatedTo}` : ""} ·{" "}
                      {ticket.updatedAt}
                    </p>
                  </div>
                  <p className="shrink-0 text-xs text-ink-muted">
                    {ticket.messages.length} message
                    {ticket.messages.length === 1 ? "" : "s"}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
