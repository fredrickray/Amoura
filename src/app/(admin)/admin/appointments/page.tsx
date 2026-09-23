"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AdminPageHeader, EmptyState, FilterTabs } from "@/components/admin/AdminUi";
import { StatusPill, appointmentTone } from "@/components/account/StatusPill";
import {
  appointmentStatusLabel,
  type AppointmentStatus,
} from "@/data/account";
import { useAdminStore } from "@/context/AdminStoreContext";
import { formatPrice } from "@/lib/utils";

type Filter = "all" | AppointmentStatus;

export default function AdminAppointmentsPage() {
  const { appointments, ready } = useAdminStore();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return appointments;
    return appointments.filter((a) => a.status === filter);
  }, [appointments, filter]);

  if (!ready) return null;

  const count = (s?: AppointmentStatus) =>
    s ? appointments.filter((a) => a.status === s).length : appointments.length;

  return (
    <div>
      <AdminPageHeader
        eyebrow="Lash studio"
        title="Appointments"
        description="Confirm, complete, or cancel booked lash services."
      />

      <FilterTabs
        value={filter}
        onChange={setFilter}
        options={[
          { value: "all", label: "All", count: count() },
          { value: "upcoming", label: "Upcoming", count: count("upcoming") },
          { value: "completed", label: "Completed", count: count("completed") },
          { value: "cancelled", label: "Cancelled", count: count("cancelled") },
        ]}
      />

      <div className="mt-5 overflow-hidden rounded-2xl border border-[#ddd8d3] bg-white">
        {filtered.length === 0 ? (
          <EmptyState message="No appointments in this filter." />
        ) : (
          <ul className="divide-y divide-[#ddd8d3]">
            {filtered.map((apt) => (
              <li key={apt.id}>
                <Link
                  href={`/admin/appointments/${apt.id}`}
                  className="flex flex-col gap-2 px-4 py-4 transition-colors hover:bg-[#faf8f6] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-ink">{apt.service}</p>
                      <StatusPill tone={appointmentTone(apt.status)}>
                        {appointmentStatusLabel[apt.status]}
                      </StatusPill>
                    </div>
                    <p className="mt-0.5 text-sm text-ink-soft">
                      {apt.id} · {apt.date} · {apt.time} · {apt.artist} ·{" "}
                      {apt.customerName}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-medium">
                    {formatPrice(apt.price)}
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
