"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { StatusPill, orderTone } from "@/components/account/StatusPill";
import { orderStatusLabel, type OrderStatus } from "@/data/account";
import { ORDER_STATUSES } from "@/data/admin";
import { useAdminStore } from "@/context/AdminStoreContext";
import { cn, formatPrice } from "@/lib/utils";

export default function AdminOrderDetailPage() {
  const params = useParams<{ id: string }>();
  const { getOrder, updateOrderStatus, ready } = useAdminStore();
  const order = getOrder(params.id);

  const [status, setStatus] = useState<OrderStatus | null>(null);
  const [tracking, setTracking] = useState("");
  const [saved, setSaved] = useState(false);

  const currentStatus = status ?? order?.status ?? "processing";

  const canSave = useMemo(() => {
    if (!order) return false;
    const statusChanged = currentStatus !== order.status;
    const trackingChanged =
      tracking.trim().length > 0 && tracking.trim() !== (order.tracking ?? "");
    return statusChanged || trackingChanged;
  }, [order, currentStatus, tracking]);

  if (!ready) return null;
  if (!order) notFound();

  function handleSave() {
    updateOrderStatus(
      order!.id,
      currentStatus,
      tracking.trim() || order!.tracking,
    );
    setSaved(true);
    setTracking("");
    window.setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="min-w-0">
      <Link
        href="/admin/orders"
        className="text-sm text-ink-soft transition-colors hover:text-ink"
      >
        ← Back to orders
      </Link>

      <div className="mt-4 mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="badge mb-2">Order</p>
          <h1 className="font-display text-[clamp(1.85rem,3.5vw,2.5rem)] tracking-tight">
            {order.id}
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            {order.customerName} · {order.customerEmail} · Placed {order.placedAt}
          </p>
        </div>
        <StatusPill tone={orderTone(order.status)}>
          {orderStatusLabel[order.status]}
        </StatusPill>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-[#ddd8d3] bg-white p-5">
            <h2 className="font-display text-xl tracking-tight">Items</h2>
            <ul className="mt-4 space-y-3">
              {order.items.map((item) => (
                <li
                  key={`${item.productSlug}-${item.name}`}
                  className="flex items-center gap-3 border-b border-[#eeeae6] pb-3 last:border-0 last:pb-0"
                >
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-[#f3f1ef]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                      sizes="56px"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-ink-soft">
                      {item.catalogue} · Qty {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium">{formatPrice(item.price)}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between border-t border-[#eeeae6] pt-4 text-sm">
              <span className="text-ink-soft">Total</span>
              <span className="font-medium">{formatPrice(order.total)}</span>
            </div>
          </section>

          <section className="rounded-2xl border border-[#ddd8d3] bg-white p-5">
            <h2 className="font-display text-xl tracking-tight">Timeline</h2>
            <ol className="mt-4 space-y-3">
              {order.timeline.map((step) => (
                <li key={step.label} className="flex gap-3">
                  <span
                    className={cn(
                      "mt-1.5 size-2 shrink-0 rounded-full",
                      step.done ? "bg-ink" : "bg-[#ddd8d3]",
                      step.current && "ring-4 ring-blush/40",
                    )}
                  />
                  <div>
                    <p className={cn("text-sm font-medium", !step.done && "text-ink-muted")}>
                      {step.label}
                    </p>
                    <p className="text-xs text-ink-soft">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-[#ddd8d3] bg-white p-5">
            <h2 className="font-display text-xl tracking-tight">Fulfillment</h2>
            <label className="mt-4 block text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
              Status
            </label>
            <select
              value={currentStatus}
              onChange={(e) => setStatus(e.target.value as OrderStatus)}
              className="mt-1.5 w-full rounded-xl border border-[#ddd8d3] bg-[#faf8f6] px-3 py-2.5 text-sm outline-none focus:border-ink/40"
            >
              {ORDER_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {orderStatusLabel[s]}
                </option>
              ))}
            </select>

            <label className="mt-4 block text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
              Tracking code
            </label>
            <input
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              placeholder={order.tracking ?? "e.g. NG-AMO-…"}
              className="mt-1.5 w-full rounded-xl border border-[#ddd8d3] bg-[#faf8f6] px-3 py-2.5 text-sm outline-none focus:border-ink/40"
            />
            {order.tracking ? (
              <p className="mt-1.5 text-xs text-ink-soft">
                Current: {order.tracking}
              </p>
            ) : null}

            <button
              type="button"
              disabled={!canSave}
              onClick={handleSave}
              className="pill pill-solid mt-5 w-full disabled:cursor-not-allowed disabled:opacity-40"
            >
              {saved ? "Saved" : "Update order"}
            </button>
          </section>

          <section className="rounded-2xl border border-[#ddd8d3] bg-white p-5">
            <h2 className="font-display text-xl tracking-tight">Ship to</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {order.shippingAddress}
            </p>
            {order.estimatedDelivery ? (
              <p className="mt-3 text-sm text-ink">
                Est. delivery {order.estimatedDelivery}
              </p>
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
}
