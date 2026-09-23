"use client";

import Image from "next/image";
import Link from "next/link";
import { StatusPill, orderTone } from "@/components/account/StatusPill";
import { useAccountData } from "@/context/AccountDataContext";
import { orderStatusLabel } from "@/data/account";
import { formatPrice } from "@/lib/utils";

export default function OrdersPage() {
  const { orders, ready } = useAccountData();

  if (!ready) {
    return <p className="text-sm text-ink-soft">Loading orders…</p>;
  }

  return (
    <div>
      <div className="mb-8">
        <p className="badge mb-3">Orders</p>
        <h1 className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-[1.05] tracking-[-0.03em]">
          Your orders
        </h1>
        <p className="mt-2 text-[15px] text-ink-soft">
          Track perfume and magazine purchases in one place.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/account/orders/${order.id}`}
            className="group overflow-hidden rounded-[24px] border border-line/80 bg-surface/90 shadow-[0_16px_36px_-30px_rgba(17,17,17,0.4)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-strong)] hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-28px_rgba(17,17,17,0.35)]"
          >
            <div className="grid md:grid-cols-[140px_1fr]">
              <div className="relative min-h-[120px] bg-gradient-to-b from-[#f0e6e8] to-[#e4d5d8] md:min-h-full">
                <Image
                  src={order.items[0]?.image ?? "/products/lum-parfum.png"}
                  alt=""
                  fill
                  className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                  sizes="140px"
                  unoptimized={
                    (order.items[0]?.image ?? "").startsWith("/") ||
                    (order.items[0]?.image ?? "").startsWith("blob:")
                  }
                />
              </div>
              <div className="p-5 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-ink">{order.id}</p>
                    <p className="mt-1 text-sm text-ink-soft">
                      Placed {order.placedAt} · {order.items.length} item
                      {order.items.length > 1 ? "s" : ""}
                    </p>
                    <p className="mt-2 text-sm text-ink">
                      {order.items.map((i) => i.name).join(" · ")}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <StatusPill tone={orderTone(order.status)}>
                      {orderStatusLabel[order.status]}
                    </StatusPill>
                    <p className="text-sm font-medium">
                      {formatPrice(order.total)}
                    </p>
                  </div>
                </div>
                {order.items.length > 1 ? (
                  <div className="mt-4 flex gap-2">
                    {order.items.slice(1).map((item) => (
                      <div
                        key={`${item.productSlug}-${item.name}`}
                        className="relative size-12 overflow-hidden rounded-xl bg-[#efe6e8]"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-1.5"
                          sizes="48px"
                          unoptimized={
                            item.image.startsWith("/") ||
                            item.image.startsWith("blob:")
                          }
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
