"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AdminPageHeader, EmptyState, FilterTabs } from "@/components/admin/AdminUi";
import { StatusPill, orderTone } from "@/components/account/StatusPill";
import { orderStatusLabel, type OrderStatus } from "@/data/account";
import { useAdminStore } from "@/context/AdminStoreContext";
import { formatPrice } from "@/lib/utils";

type Filter = "all" | OrderStatus;

export default function AdminOrdersPage() {
  const { orders, ready } = useAdminStore();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return orders;
    return orders.filter((o) => o.status === filter);
  }, [orders, filter]);

  if (!ready) return null;

  const counts = {
    all: orders.length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  return (
    <div>
      <AdminPageHeader
        eyebrow="Commerce"
        title="Orders"
        description="Fulfill perfume and product orders — update status and tracking from each detail."
      />

      <FilterTabs
        value={filter}
        onChange={setFilter}
        options={[
          { value: "all", label: "All", count: counts.all },
          { value: "processing", label: "Processing", count: counts.processing },
          { value: "shipped", label: "Shipped", count: counts.shipped },
          { value: "delivered", label: "Delivered", count: counts.delivered },
          { value: "cancelled", label: "Cancelled", count: counts.cancelled },
        ]}
      />

      <div className="mt-5 overflow-hidden rounded-2xl border border-[#ddd8d3] bg-white">
        {filtered.length === 0 ? (
          <EmptyState message="No orders in this filter." />
        ) : (
          <ul className="divide-y divide-[#ddd8d3]">
            {filtered.map((order) => (
              <li key={order.id}>
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="flex flex-col gap-3 px-4 py-4 transition-colors hover:bg-[#faf8f6] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-[#f3f1ef]">
                      <Image
                        src={order.items[0]?.image ?? "/products/lum-parfum.png"}
                        alt=""
                        fill
                        className="object-contain p-1"
                        sizes="48px"
                        unoptimized
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium text-ink">{order.id}</p>
                        <StatusPill tone={orderTone(order.status)}>
                          {orderStatusLabel[order.status]}
                        </StatusPill>
                      </div>
                      <p className="mt-0.5 truncate text-sm text-ink-soft">
                        {order.customerName} · {order.placedAt} ·{" "}
                        {order.items.length} item
                        {order.items.length === 1 ? "" : "s"}
                      </p>
                    </div>
                  </div>
                  <p className="shrink-0 text-sm font-medium sm:text-right">
                    {formatPrice(order.total)}
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
