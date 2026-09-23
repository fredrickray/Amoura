"use client";

import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminUi";
import {
  StatusPill,
  appointmentTone,
  magazineTone,
  orderTone,
  supportTone,
} from "@/components/account/StatusPill";
import {
  appointmentStatusLabel,
  magazineStatusLabel,
  orderStatusLabel,
} from "@/data/account";
import { adminSupportStatusLabel } from "@/data/admin";
import { useAdminStore } from "@/context/AdminStoreContext";
import { formatPrice } from "@/lib/utils";

export default function AdminOverviewPage() {
  const { orders, requests, appointments, tickets, ready } = useAdminStore();

  if (!ready) {
    return <p className="text-sm text-ink-soft">Loading studio desk…</p>;
  }

  const openOrders = orders.filter(
    (o) => o.status === "processing" || o.status === "shipped",
  );
  const activeRequests = requests.filter(
    (r) =>
      r.status === "draft" ||
      r.status === "in_review" ||
      r.status === "changes_requested" ||
      r.status === "approved",
  );
  const upcoming = appointments.filter((a) => a.status === "upcoming");
  const openTickets = tickets.filter((t) => t.status !== "resolved");

  const queues = [
    {
      label: "Orders to move",
      count: openOrders.length,
      href: "/admin/orders",
      hint: "Pack, ship, or cancel",
    },
    {
      label: "Magazine queue",
      count: activeRequests.length,
      href: "/admin/requests",
      hint: "Layouts, proofs, print",
    },
    {
      label: "Upcoming appointments",
      count: upcoming.length,
      href: "/admin/appointments",
      hint: "Lash studio diary",
    },
    {
      label: "Open support",
      count: openTickets.length,
      href: "/admin/support",
      hint: "Customer threads",
    },
  ];

  return (
    <div>
      <AdminPageHeader
        eyebrow="Today"
        title="Studio desk"
        description="What needs attention across orders, custom magazines, appointments, and support."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {queues.map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="group rounded-2xl border border-[#ddd8d3] bg-white px-5 py-4 transition-colors hover:border-ink/20"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted">
              {q.label}
            </p>
            <p className="mt-2 font-display text-4xl tracking-tight transition-transform group-hover:translate-x-0.5">
              {q.count}
            </p>
            <p className="mt-1 text-sm text-ink-soft">{q.hint}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="font-display text-2xl tracking-tight">Recent orders</h2>
            <Link href="/admin/orders" className="text-sm text-ink-soft hover:text-ink">
              All orders
            </Link>
          </div>
          <ul className="divide-y divide-[#ddd8d3] overflow-hidden rounded-2xl border border-[#ddd8d3] bg-white">
            {orders.slice(0, 4).map((order) => (
              <li key={order.id}>
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="flex items-center justify-between gap-3 px-4 py-3.5 transition-colors hover:bg-[#faf8f6]"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-ink">{order.id}</p>
                    <p className="truncate text-sm text-ink-soft">
                      {order.customerName} · {formatPrice(order.total)}
                    </p>
                  </div>
                  <StatusPill tone={orderTone(order.status)}>
                    {orderStatusLabel[order.status]}
                  </StatusPill>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="font-display text-2xl tracking-tight">Magazine requests</h2>
            <Link href="/admin/requests" className="text-sm text-ink-soft hover:text-ink">
              All requests
            </Link>
          </div>
          <ul className="divide-y divide-[#ddd8d3] overflow-hidden rounded-2xl border border-[#ddd8d3] bg-white">
            {requests.slice(0, 4).map((req) => (
              <li key={req.id}>
                <Link
                  href={`/admin/requests/${req.id}`}
                  className="flex items-center justify-between gap-3 px-4 py-3.5 transition-colors hover:bg-[#faf8f6]"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-ink">{req.title}</p>
                    <p className="truncate text-sm text-ink-soft">
                      {req.id} · {req.customerName}
                    </p>
                  </div>
                  <StatusPill tone={magazineTone(req.status)}>
                    {magazineStatusLabel[req.status]}
                  </StatusPill>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="font-display text-2xl tracking-tight">Appointments</h2>
            <Link
              href="/admin/appointments"
              className="text-sm text-ink-soft hover:text-ink"
            >
              Diary
            </Link>
          </div>
          <ul className="divide-y divide-[#ddd8d3] overflow-hidden rounded-2xl border border-[#ddd8d3] bg-white">
            {appointments.map((apt) => (
              <li key={apt.id}>
                <Link
                  href={`/admin/appointments/${apt.id}`}
                  className="flex items-center justify-between gap-3 px-4 py-3.5 transition-colors hover:bg-[#faf8f6]"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-ink">{apt.service}</p>
                    <p className="text-sm text-ink-soft">
                      {apt.date} · {apt.time} · {apt.customerName}
                    </p>
                  </div>
                  <StatusPill tone={appointmentTone(apt.status)}>
                    {appointmentStatusLabel[apt.status]}
                  </StatusPill>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="font-display text-2xl tracking-tight">Support</h2>
            <Link href="/admin/support" className="text-sm text-ink-soft hover:text-ink">
              Inbox
            </Link>
          </div>
          <ul className="divide-y divide-[#ddd8d3] overflow-hidden rounded-2xl border border-[#ddd8d3] bg-white">
            {tickets.map((ticket) => (
              <li key={ticket.id}>
                <Link
                  href={`/admin/support/${ticket.id}`}
                  className="flex items-center justify-between gap-3 px-4 py-3.5 transition-colors hover:bg-[#faf8f6]"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-ink">{ticket.subject}</p>
                    <p className="text-sm text-ink-soft">
                      {ticket.id} · {ticket.customerName}
                    </p>
                  </div>
                  <StatusPill tone={supportTone(ticket.status)}>
                    {adminSupportStatusLabel[ticket.status]}
                  </StatusPill>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
