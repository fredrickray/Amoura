import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  appointmentStatusLabel,
  appointments,
  getAppointment,
} from "@/data/account";
import {
  StatusPill,
  appointmentTone,
} from "@/components/account/StatusPill";
import { PillButton } from "@/components/PillButton";
import { formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return appointments.map((a) => ({ id: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const apt = getAppointment(id);
  return { title: apt ? apt.service : "Appointment" };
}

export default async function AppointmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const apt = getAppointment(id);
  if (!apt) notFound();

  return (
    <div>
      <Link
        href="/account/appointments"
        className="text-sm text-ink-soft transition-colors hover:text-ink"
      >
        ← Back to appointments
      </Link>

      <div className="mt-4 mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="badge mb-3">Appointment</p>
          <h1 className="font-display text-[clamp(1.85rem,4vw,2.5rem)] leading-[1.1] tracking-tight">
            {apt.service}
          </h1>
          <p className="mt-2 text-sm text-ink-soft">{apt.id}</p>
        </div>
        <StatusPill tone={appointmentTone(apt.status)}>
          {appointmentStatusLabel[apt.status]}
        </StatusPill>
      </div>

      <div className="mb-6 overflow-hidden rounded-[28px] border border-line/80">
        <div className="relative aspect-[21/9] min-h-[180px] bg-surface-soft">
          <Image
            src={apt.image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 900px"
            unoptimized={apt.image.startsWith("/")}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-3 text-white">
            <div>
              <p className="text-sm text-white/80">With {apt.artist}</p>
              <p className="mt-1 font-display text-2xl tracking-tight md:text-3xl">
                {apt.date} · {apt.time}
              </p>
            </div>
            <p className="rounded-full bg-white/15 px-3 py-1 text-sm backdrop-blur-sm">
              {apt.duration}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-[24px] border border-line/80 bg-surface/90 p-5 shadow-[0_18px_40px_-32px_rgba(17,17,17,0.35)] md:p-6">
          <h2 className="font-display text-2xl tracking-tight">Details</h2>
          <dl className="mt-5 flex flex-col gap-4 text-sm">
            <Row label="Date" value={apt.date} />
            <Row label="Time" value={apt.time} />
            <Row label="Duration" value={apt.duration} />
            <Row label="Artist" value={apt.artist} />
            <Row label="Price" value={formatPrice(apt.price)} />
          </dl>
          {apt.notes ? (
            <div className="mt-6 rounded-[16px] bg-[#f7efef] px-4 py-3 text-sm text-ink-soft">
              <p className="mb-1 font-medium text-ink">Your note</p>
              {apt.notes}
            </div>
          ) : null}
          {apt.status === "upcoming" ? (
            <div className="mt-6 flex flex-wrap gap-3">
              <PillButton href="/contact" variant="solid" arrow={false}>
                Reschedule
              </PillButton>
              <PillButton href="/contact" variant="ghost" arrow={false}>
                Cancel booking
              </PillButton>
            </div>
          ) : null}
        </section>

        <section className="rounded-[24px] border border-line/80 bg-surface/90 p-5 shadow-[0_18px_40px_-32px_rgba(17,17,17,0.35)] md:p-6">
          <h2 className="font-display text-2xl tracking-tight">Aftercare</h2>
          <ul className="mt-5 flex flex-col gap-3">
            {apt.aftercare.map((tip) => (
              <li
                key={tip}
                className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-soft"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#efe4e6] text-xs text-ink">
                  ✓
                </span>
                {tip}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <PillButton href="/lashes" variant="ghost">
              Book another set
            </PillButton>
          </div>
        </section>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-line pb-3 last:border-b-0 last:pb-0">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}
