"use client";

import Link from "next/link";
import { useState } from "react";
import {
  supportStatusLabel,
  type SupportMessage,
  type SupportTicket,
} from "@/data/account";
import { StatusPill, supportTone } from "@/components/account/StatusPill";
import { cn } from "@/lib/utils";

export function SupportThread({ ticket: initial }: { ticket: SupportTicket }) {
  const [ticket, setTicket] = useState(initial);
  const [draft, setDraft] = useState("");

  function send() {
    if (!draft.trim()) return;
    const message: SupportMessage = {
      id: `m-${Date.now()}`,
      from: "you",
      body: draft.trim(),
      at: "Just now",
    };
    setTicket((t) => ({
      ...t,
      updatedAt: "Just now",
      status: "open",
      messages: [...t.messages, message],
    }));
    setDraft("");
  }

  return (
    <div className="min-w-0">
      <Link
        href="/account/support"
        className="text-sm text-ink-soft transition-colors hover:text-ink"
      >
        ← Back to messages
      </Link>

      <div className="mt-4 mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="badge mb-3">Support</p>
          <h1 className="font-display text-[clamp(1.75rem,3.5vw,2.35rem)] tracking-tight">
            {ticket.subject}
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            {ticket.id}
            {ticket.relatedTo ? ` · ${ticket.relatedTo}` : ""}
          </p>
        </div>
        <StatusPill tone={supportTone(ticket.status)}>
          {supportStatusLabel[ticket.status]}
        </StatusPill>
      </div>

      <div className="rounded-[24px] border border-line/80 bg-surface/90 shadow-[0_18px_40px_-32px_rgba(17,17,17,0.35)]">
        <div className="flex max-h-[480px] flex-col gap-4 overflow-y-auto p-5 md:p-6">
          {ticket.messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed",
                msg.from === "you"
                  ? "ml-auto bg-ink text-white"
                  : "bg-[#f3ecee] text-ink",
              )}
            >
              <p>{msg.body}</p>
              <p
                className={cn(
                  "mt-2 text-xs",
                  msg.from === "you" ? "text-white/70" : "text-ink-muted",
                )}
              >
                {msg.from === "you" ? "You" : "Amoura"} · {msg.at}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-line p-4 md:p-5">
          <div className="flex gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Write a reply…"
              className="h-12 min-w-0 flex-1 rounded-full border border-line bg-[#fafafa] px-4 text-sm outline-none focus:border-ink/30"
            />
            <button
              type="button"
              onClick={send}
              disabled={!draft.trim()}
              className="h-12 shrink-0 rounded-full bg-ink px-5 text-sm font-semibold text-white disabled:opacity-40"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
