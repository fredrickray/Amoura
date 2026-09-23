"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { StatusPill, supportTone } from "@/components/account/StatusPill";
import type { SupportTicketStatus } from "@/data/account";
import { adminSupportStatusLabel } from "@/data/admin";
import { useAdminStore } from "@/context/AdminStoreContext";
import { cn } from "@/lib/utils";

const STATUSES: SupportTicketStatus[] = ["open", "awaiting_you", "resolved"];

export default function AdminSupportDetailPage() {
  const params = useParams<{ id: string }>();
  const { getTicket, replyToTicket, updateTicketStatus, ready } =
    useAdminStore();
  const ticket = getTicket(params.id);
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState<SupportTicketStatus | null>(null);
  const [flash, setFlash] = useState<string | null>(null);

  if (!ready) return null;
  if (!ticket) notFound();

  const currentStatus = status ?? ticket.status;

  function sendReply() {
    if (!reply.trim()) return;
    replyToTicket(ticket!.id, reply);
    setReply("");
    setFlash("Reply sent");
    window.setTimeout(() => setFlash(null), 2000);
  }

  function saveStatus() {
    updateTicketStatus(ticket!.id, currentStatus);
    setFlash("Status updated");
    window.setTimeout(() => setFlash(null), 2000);
  }

  return (
    <div>
      <Link
        href="/admin/support"
        className="text-sm text-ink-soft transition-colors hover:text-ink"
      >
        ← Back to support
      </Link>

      <div className="mt-4 mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="badge mb-2">{ticket.id}</p>
          <h1 className="font-display text-[clamp(1.85rem,3.5vw,2.5rem)] tracking-tight">
            {ticket.subject}
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            {ticket.customerName} · {ticket.customerEmail}
            {ticket.relatedTo ? ` · ${ticket.relatedTo}` : ""}
          </p>
        </div>
        <StatusPill tone={supportTone(ticket.status)}>
          {adminSupportStatusLabel[ticket.status]}
        </StatusPill>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border border-[#ddd8d3] bg-white p-5">
          <h2 className="font-display text-xl tracking-tight">Thread</h2>
          <ul className="mt-4 space-y-3">
            {ticket.messages.map((msg) => (
              <li
                key={msg.id}
                className={cn(
                  "rounded-xl px-3.5 py-3 text-sm",
                  msg.from === "amoura"
                    ? "bg-ink text-white"
                    : "bg-[#faf8f6] text-ink",
                )}
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] opacity-60">
                  {msg.from === "amoura" ? "Studio" : ticket.customerName} ·{" "}
                  {msg.at}
                </p>
                <p className="mt-1.5 leading-relaxed">{msg.body}</p>
              </li>
            ))}
          </ul>

          <label className="mt-5 block text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
            Reply
          </label>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            rows={3}
            placeholder="Write a reply to the customer…"
            className="mt-1.5 w-full resize-y rounded-xl border border-[#ddd8d3] bg-[#faf8f6] px-3 py-2.5 text-sm outline-none focus:border-ink/40"
          />
          <button
            type="button"
            onClick={sendReply}
            disabled={!reply.trim()}
            className="pill pill-solid mt-3 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Send reply
          </button>
        </section>

        <section className="rounded-2xl border border-[#ddd8d3] bg-white p-5">
          <h2 className="font-display text-xl tracking-tight">Status</h2>
          <select
            value={currentStatus}
            onChange={(e) => setStatus(e.target.value as SupportTicketStatus)}
            className="mt-4 w-full rounded-xl border border-[#ddd8d3] bg-[#faf8f6] px-3 py-2.5 text-sm outline-none focus:border-ink/40"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {adminSupportStatusLabel[s]}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={saveStatus}
            className="pill pill-ghost mt-4 w-full"
          >
            Update status
          </button>
          {flash ? (
            <p className="mt-3 text-center text-sm text-emerald-700">{flash}</p>
          ) : null}
        </section>
      </div>
    </div>
  );
}
