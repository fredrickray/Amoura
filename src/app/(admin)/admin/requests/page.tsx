"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AdminPageHeader, EmptyState, FilterTabs } from "@/components/admin/AdminUi";
import { StatusPill, magazineTone } from "@/components/account/StatusPill";
import {
  magazineStatusLabel,
  type MagazineProjectStatus,
} from "@/data/account";
import { useAdminStore } from "@/context/AdminStoreContext";
import { formatPrice } from "@/lib/utils";

type Filter = "all" | MagazineProjectStatus;

export default function AdminRequestsPage() {
  const { requests, ready } = useAdminStore();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return requests;
    return requests.filter((r) => r.status === filter);
  }, [requests, filter]);

  if (!ready) return null;

  const count = (s?: MagazineProjectStatus) =>
    s ? requests.filter((r) => r.status === s).length : requests.length;

  return (
    <div>
      <AdminPageHeader
        eyebrow="Commissions"
        title="Magazine requests"
        description="Custom magazine builds — briefs, proofs, approvals, and print handoff."
      />

      <FilterTabs
        value={filter}
        onChange={setFilter}
        options={[
          { value: "all", label: "All", count: count() },
          { value: "draft", label: "Draft", count: count("draft") },
          { value: "in_review", label: "In review", count: count("in_review") },
          {
            value: "changes_requested",
            label: "Changes",
            count: count("changes_requested"),
          },
          { value: "approved", label: "Approved", count: count("approved") },
          { value: "printed", label: "Printed", count: count("printed") },
        ]}
      />

      <div className="mt-5 overflow-hidden rounded-2xl border border-[#ddd8d3] bg-white">
        {filtered.length === 0 ? (
          <EmptyState message="No magazine requests in this filter." />
        ) : (
          <ul className="divide-y divide-[#ddd8d3]">
            {filtered.map((req) => (
              <li key={req.id}>
                <Link
                  href={`/admin/requests/${req.id}`}
                  className="flex flex-col gap-3 px-4 py-4 transition-colors hover:bg-[#faf8f6] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-[#f3f1ef]">
                      <Image
                        src={req.coverImage}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate font-medium text-ink">{req.title}</p>
                        <StatusPill tone={magazineTone(req.status)}>
                          {magazineStatusLabel[req.status]}
                        </StatusPill>
                      </div>
                      <p className="mt-0.5 truncate text-sm text-ink-soft">
                        {req.id} · {req.customerName} · {req.pages} pages ·{" "}
                        {req.photosUploaded}/{req.photosNeeded} photos
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 text-sm sm:text-right">
                    <p className="font-medium">{formatPrice(req.price)}</p>
                    <p className="text-ink-soft">
                      Deposit {formatPrice(req.depositPaid)}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
