import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  appointmentStatusLabel,
  appointments,
} from "@/data/account";
import {
  StatusPill,
  appointmentTone,
} from "@/components/account/StatusPill";
import { PillButton } from "@/components/PillButton";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Appointments",
};

export default function AppointmentsPage() {
  const upcoming = appointments.filter((a) => a.status === "upcoming");
  const past = appointments.filter((a) => a.status !== "upcoming");

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="badge mb-3">Appointments</p>
          <h1 className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-[1.05] tracking-[-0.03em]">
            Lash studio
          </h1>
          <p className="mt-2 text-[15px] text-ink-soft">
            Upcoming and past bookings with Amoura Lash Studio.
          </p>
        </div>
        <PillButton href="/lashes" variant="solid">
          Book a set
        </PillButton>
      </div>

      <section className="mb-10">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-ink-muted">
          Upcoming
        </h2>
        {upcoming.length === 0 ? (
          <p className="rounded-[18px] bg-surface-soft/80 px-4 py-8 text-center text-sm text-ink-soft">
            No upcoming appointments.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {upcoming.map((apt) => (
              <AppointmentCard key={apt.id} id={apt.id} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-ink-muted">
          Past
        </h2>
        <div className="flex flex-col gap-4">
          {past.map((apt) => (
            <AppointmentCard key={apt.id} id={apt.id} />
          ))}
        </div>
      </section>
    </div>
  );
}

function AppointmentCard({ id }: { id: string }) {
  const apt = appointments.find((a) => a.id === id)!;
  return (
    <Link
      href={`/account/appointments/${apt.id}`}
      className="group grid overflow-hidden rounded-[24px] border border-line/80 bg-surface/90 shadow-[0_16px_36px_-30px_rgba(17,17,17,0.4)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-strong)] hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-28px_rgba(17,17,17,0.35)] sm:grid-cols-[160px_1fr]"
    >
      <div className="relative min-h-[140px] bg-surface-soft sm:min-h-full">
        <Image
          src={apt.image}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="160px"
          unoptimized={apt.image.startsWith("/")}
        />
      </div>
      <div className="flex flex-wrap items-start justify-between gap-3 p-5 md:p-6">
        <div>
          <p className="font-medium text-ink">{apt.service}</p>
          <p className="mt-1 text-sm text-ink-soft">
            {apt.date} · {apt.time} · {apt.duration}
          </p>
          <p className="mt-1 text-sm text-ink-soft">With {apt.artist}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <StatusPill tone={appointmentTone(apt.status)}>
            {appointmentStatusLabel[apt.status]}
          </StatusPill>
          <p className="text-sm font-medium">{formatPrice(apt.price)}</p>
        </div>
      </div>
    </Link>
  );
}
