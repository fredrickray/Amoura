import type { Metadata } from "next";
import Link from "next/link";
import {
  supportStatusLabel,
  supportTickets,
} from "@/data/account";
import { StatusPill, supportTone } from "@/components/account/StatusPill";

export const metadata: Metadata = {
  title: "Support",
};

export default function SupportInboxPage() {
  return (
    <div className="min-w-0">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="badge mb-3">Support</p>
          <h1 className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-[1.05] tracking-[-0.03em]">
            Messages
          </h1>
          <p className="mt-2 text-[15px] text-ink-soft">
            Conversations about orders, bookings, and magazine projects.
          </p>
        </div>
        <Link
          href="/contact"
          className="pill pill-solid px-5 py-2.5 text-sm"
        >
          New message
        </Link>
      </div>

      <ul className="flex flex-col gap-3">
        {supportTickets.map((ticket) => {
          const last = ticket.messages[ticket.messages.length - 1];
          return (
            <li key={ticket.id}>
              <Link
                href={`/account/support/${ticket.id}`}
                className="block rounded-[22px] border border-line/80 bg-surface/90 p-5 transition-colors hover:bg-white md:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-ink">{ticket.subject}</p>
                    <p className="mt-1 text-sm text-ink-muted">
                      {ticket.id}
                      {ticket.relatedTo ? ` · ${ticket.relatedTo}` : ""}
                    </p>
                  </div>
                  <StatusPill tone={supportTone(ticket.status)}>
                    {supportStatusLabel[ticket.status]}
                  </StatusPill>
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-ink-soft">
                  {last?.body}
                </p>
                <p className="mt-3 text-xs text-ink-muted">{ticket.updatedAt}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
