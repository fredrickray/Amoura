import {
  appointments as seedAppointments,
  magazineProjects as seedMagazines,
  orders as seedOrders,
  supportTickets as seedTickets,
  type Appointment,
  type MagazineProject,
  type Order,
  type OrderStatus,
  type SupportTicket,
  type SupportTicketStatus,
} from "@/data/account";
import {
  magazinePageTiers as seedTiers,
  type MagazinePageTier,
} from "@/data/magazineConfig";

export type AdminOrder = Order & {
  customerName: string;
  customerEmail: string;
};

export type AdminMagazineRequest = MagazineProject & {
  customerName: string;
  customerEmail: string;
  depositPaid: number;
  balanceDue: number;
};

export type AdminAppointment = Appointment & {
  customerName: string;
  customerEmail: string;
};

export type AdminSupportTicket = SupportTicket & {
  customerName: string;
  customerEmail: string;
};

const customerByOrder: Record<string, { name: string; email: string }> = {
  "AMO-10428": { name: "Ada Okoye", email: "ada.okoye@email.com" },
  "AMO-10391": { name: "Ada Okoye", email: "ada.okoye@email.com" },
  "AMO-10255": { name: "Tolu Adebayo", email: "tolu.a@email.com" },
};

const customerByMagazine: Record<string, { name: string; email: string }> = {
  "MAG-318": { name: "Ada Okoye", email: "ada.okoye@email.com" },
  "MAG-291": { name: "Nneka Obi", email: "nneka@studio.co" },
  "MAG-244": { name: "Ada Okoye", email: "ada.okoye@email.com" },
};

const customerByAppointment: Record<string, { name: string; email: string }> = {
  "APT-2201": { name: "Ada Okoye", email: "ada.okoye@email.com" },
  "APT-2144": { name: "Ada Okoye", email: "ada.okoye@email.com" },
};

const customerByTicket: Record<string, { name: string; email: string }> = {
  "SUP-882": { name: "Ada Okoye", email: "ada.okoye@email.com" },
  "SUP-841": { name: "Ada Okoye", email: "ada.okoye@email.com" },
  "SUP-790": { name: "Ada Okoye", email: "ada.okoye@email.com" },
};

const extraProcessingOrder: AdminOrder = {
  id: "AMO-10451",
  placedAt: "21 Sep 2026",
  status: "processing",
  total: 167000,
  shippingAddress: "7 Banana Island Road, Ikoyi, Lagos",
  estimatedDelivery: "28 Sep 2026",
  customerName: "Chioma Eze",
  customerEmail: "chioma.eze@email.com",
  timeline: [
    { label: "Order placed", detail: "21 Sep · 9:40 AM", done: true, current: true },
    { label: "Confirmed", detail: "Pending", done: false },
    { label: "Packed at atelier", detail: "Pending", done: false },
    { label: "Shipped", detail: "Pending", done: false },
    { label: "Delivered", detail: "Est. 28 Sep", done: false },
  ],
  items: [
    {
      name: "Lum Noir",
      catalogue: "Perfumes",
      quantity: 1,
      price: 89000,
      image: "/products/lum-parfum.png",
      productSlug: "lum-noir",
    },
    {
      name: "Hydra Lash Balm",
      catalogue: "Lashes",
      quantity: 1,
      price: 48000,
      image: "/products/hydra-balm.png",
      productSlug: "hydra-lash-balm",
    },
    {
      name: "Dew Elixir",
      catalogue: "Perfumes",
      quantity: 1,
      price: 30000,
      image: "/products/dew-elixir.png",
      productSlug: "dew-elixir",
    },
  ],
};

function withCustomer<T extends { id: string }>(
  item: T,
  map: Record<string, { name: string; email: string }>,
  fallback = { name: "Guest", email: "guest@amoura.test" },
): T & { customerName: string; customerEmail: string } {
  const c = map[item.id] ?? fallback;
  return { ...item, customerName: c.name, customerEmail: c.email };
}

export function buildSeedOrders(): AdminOrder[] {
  const seeded = seedOrders.map((o) => withCustomer(o, customerByOrder));
  return [extraProcessingOrder, ...seeded];
}

export function buildSeedMagazineRequests(): AdminMagazineRequest[] {
  return seedMagazines.map((m) => {
    const base = withCustomer(m, customerByMagazine);
    const depositPaid = Math.round(m.price * 0.5);
    return {
      ...base,
      depositPaid,
      balanceDue: m.price - depositPaid,
    };
  });
}

export function buildSeedAppointments(): AdminAppointment[] {
  return seedAppointments.map((a) => withCustomer(a, customerByAppointment));
}

export function buildSeedTickets(): AdminSupportTicket[] {
  return seedTickets.map((t) => withCustomer(t, customerByTicket));
}

export function buildSeedPricing(): MagazinePageTier[] {
  return seedTiers.map((t) => ({ ...t }));
}

export const ORDER_STATUSES: OrderStatus[] = [
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export const adminSupportStatusLabel: Record<SupportTicketStatus, string> = {
  open: "Open",
  awaiting_you: "Awaiting customer",
  resolved: "Resolved",
};

export function orderTimelineForStatus(status: OrderStatus, placedAt: string) {
  const steps = [
    { label: "Order placed", detail: placedAt, done: true },
    { label: "Confirmed", detail: "", done: false },
    { label: "Packed at atelier", detail: "", done: false },
    { label: "Shipped", detail: "", done: false },
    { label: "Delivered", detail: "", done: false },
  ];

  if (status === "cancelled") {
    return [
      { label: "Order placed", detail: placedAt, done: true },
      { label: "Cancelled", detail: "Order cancelled", done: true, current: true },
    ];
  }

  const doneThrough =
    status === "processing" ? 1 : status === "shipped" ? 3 : 4;

  return steps.map((step, i) => ({
    ...step,
    done: i <= doneThrough,
    current: i === doneThrough,
    detail:
      step.detail ||
      (i <= doneThrough ? "Updated by studio" : "Pending"),
  }));
}
