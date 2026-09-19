import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getOrder,
  orderStatusLabel,
  orders,
} from "@/data/account";
import { StatusPill, orderTone } from "@/components/account/StatusPill";
import { PillButton } from "@/components/PillButton";
import { cn, formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return orders.map((order) => ({ id: order.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return { title: `Order ${id}` };
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = getOrder(id);
  if (!order) notFound();

  return (
    <div className="min-w-0">
      <Link
        href="/account/orders"
        className="text-sm text-ink-soft transition-colors hover:text-ink"
      >
        ← Back to orders
      </Link>

      <div className="mt-4 mb-8 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="badge mb-3">Order tracking</p>
          <h1 className="font-display text-[clamp(2rem,4vw,2.75rem)] tracking-tight">
            {order.id}
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            Placed {order.placedAt}
            {order.estimatedDelivery
              ? ` · Est. delivery ${order.estimatedDelivery}`
              : ""}
          </p>
        </div>
        <StatusPill tone={orderTone(order.status)}>
          {orderStatusLabel[order.status]}
        </StatusPill>
      </div>

      <div className="grid min-w-0 gap-6 lg:grid-cols-2">
        <section className="min-w-0 rounded-[22px] border border-line bg-surface p-5 md:p-6">
          <h2 className="font-display text-2xl tracking-tight">Items ordered</h2>
          <ul className="mt-5 flex flex-col gap-4">
            {order.items.map((item) => (
              <li
                key={item.name}
                className="flex min-w-0 items-center gap-4 border-b border-line pb-4 last:border-b-0 last:pb-0"
              >
                <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-surface-soft">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-1.5"
                    sizes="64px"
                    unoptimized={item.image.startsWith("/")}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{item.name}</p>
                  <p className="text-sm text-ink-soft">
                    {item.catalogue} · Qty {item.quantity}
                  </p>
                  <Link
                    href={`/product/${item.productSlug}`}
                    className="mt-1 inline-block text-sm font-medium text-blush-deep underline-offset-2 hover:underline"
                  >
                    View product
                  </Link>
                </div>
                <p className="shrink-0 text-sm font-medium">
                  {formatPrice(item.price)}
                </p>
              </li>
            ))}
          </ul>

          <dl className="mt-6 flex flex-col gap-3 border-t border-line pt-5 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-ink-soft">Subtotal</dt>
              <dd className="font-medium">{formatPrice(order.total)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-soft">Shipping</dt>
              <dd className="font-medium">Included</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-line pt-3">
              <dt className="font-medium">Total</dt>
              <dd className="font-medium">{formatPrice(order.total)}</dd>
            </div>
          </dl>
        </section>

        <div className="flex min-w-0 flex-col gap-6">
          <section className="rounded-[22px] border border-line bg-surface p-5 md:p-6">
            <h2 className="font-display text-2xl tracking-tight">
              Delivery status
            </h2>
            <ol className="relative mt-6">
              {order.timeline.map((step, index) => (
                <li
                  key={step.label}
                  className="relative flex gap-4 pb-6 last:pb-0"
                >
                  {index < order.timeline.length - 1 ? (
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-[9px] top-5 h-[calc(100%-8px)] w-px",
                        step.done ? "bg-blush" : "bg-line",
                      )}
                    />
                  ) : null}
                  <span
                    className={cn(
                      "relative z-[1] mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full border-2",
                      step.current
                        ? "border-ink bg-ink"
                        : step.done
                          ? "border-blush-deep bg-blush-deep"
                          : "border-line bg-surface",
                    )}
                  >
                    {step.current ? (
                      <span className="size-1.5 rounded-full bg-white" />
                    ) : null}
                  </span>
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        step.done || step.current
                          ? "text-ink"
                          : "text-ink-muted",
                      )}
                    >
                      {step.label}
                    </p>
                    <p className="mt-0.5 text-sm text-ink-soft">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-[22px] border border-line bg-surface p-5 md:p-6">
            <h2 className="font-display text-2xl tracking-tight">
              Shipping address
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              {order.shippingAddress}
            </p>
            {order.tracking ? (
              <p className="mt-3 text-sm">
                <span className="text-ink-soft">Tracking: </span>
                <span className="font-medium">{order.tracking}</span>
              </p>
            ) : null}
            <div className="mt-6">
              <PillButton href="/contact" variant="ghost" arrow={false}>
                Need help with this order?
              </PillButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
