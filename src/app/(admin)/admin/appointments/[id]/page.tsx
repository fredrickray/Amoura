"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { StatusPill, appointmentTone } from "@/components/account/StatusPill";
import {
  appointmentStatusLabel,
  type AppointmentStatus,
} from "@/data/account";
import { useAdminStore } from "@/context/AdminStoreContext";
import { formatPrice } from "@/lib/utils";

const STATUSES: AppointmentStatus[] = ["upcoming", "completed", "cancelled"];

export default function AdminAppointmentDetailPage() {
  const params = useParams<{ id: string }>();
  const { getAppointment, updateAppointmentStatus, ready } = useAdminStore();
  const apt = getAppointment(params.id);
  const [status, setStatus] = useState<AppointmentStatus | null>(null);
  const [saved, setSaved] = useState(false);

  if (!ready) return null;
  if (!apt) notFound();

  const current = status ?? apt.status;

  function handleSave() {
    updateAppointmentStatus(apt!.id, current);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <Link
        href="/admin/appointments"
        className="text-sm text-ink-soft transition-colors hover:text-ink"
      >
        ← Back to appointments
      </Link>

      <div className="mt-4 mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="badge mb-2">{apt.id}</p>
          <h1 className="font-display text-[clamp(1.85rem,3.5vw,2.5rem)] tracking-tight">
            {apt.service}
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            {apt.customerName} · {apt.customerEmail}
          </p>
        </div>
        <StatusPill tone={appointmentTone(apt.status)}>
          {appointmentStatusLabel[apt.status]}
        </StatusPill>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-[#ddd8d3] bg-white p-5">
          <h2 className="font-display text-xl tracking-tight">Details</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-ink-soft">Date</dt>
              <dd className="font-medium">
                {apt.date} · {apt.time}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-soft">Duration</dt>
              <dd className="font-medium">{apt.duration}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-soft">Artist</dt>
              <dd className="font-medium">{apt.artist}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-soft">Price</dt>
              <dd className="font-medium">{formatPrice(apt.price)}</dd>
            </div>
          </dl>
          {apt.notes ? (
            <p className="mt-4 rounded-xl bg-[#faf8f6] px-3 py-2.5 text-sm text-ink-soft">
              {apt.notes}
            </p>
          ) : null}
        </section>

        <section className="rounded-2xl border border-[#ddd8d3] bg-white p-5">
          <h2 className="font-display text-xl tracking-tight">Update status</h2>
          <select
            value={current}
            onChange={(e) => setStatus(e.target.value as AppointmentStatus)}
            className="mt-4 w-full rounded-xl border border-[#ddd8d3] bg-[#faf8f6] px-3 py-2.5 text-sm outline-none focus:border-ink/40"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {appointmentStatusLabel[s]}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleSave}
            className="pill pill-solid mt-5 w-full"
          >
            {saved ? "Saved" : "Save appointment"}
          </button>
        </section>
      </div>
    </div>
  );
}
