import { formatPrice } from "@/lib/utils";

export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";
export type AppointmentStatus = "upcoming" | "completed" | "cancelled";

export type OrderItem = {
  name: string;
  catalogue: string;
  quantity: number;
  price: number;
  image: string;
  productSlug: string;
};

export type OrderTimelineStep = {
  label: string;
  detail: string;
  done: boolean;
  current?: boolean;
};

export type Order = {
  id: string;
  placedAt: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  shippingAddress: string;
  tracking?: string;
  estimatedDelivery?: string;
  timeline: OrderTimelineStep[];
};

export type Appointment = {
  id: string;
  service: string;
  status: AppointmentStatus;
  date: string;
  time: string;
  duration: string;
  artist: string;
  notes?: string;
  price: number;
  aftercare: string[];
  image: string;
};

export type CustomerProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  memberSince: string;
};

export type ProductReview = {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  body: string;
  images: string[];
  productSlug: string;
};

export const customer: CustomerProfile = {
  firstName: "Ada",
  lastName: "Okoye",
  email: "ada.okoye@email.com",
  phone: "+234 801 234 5678",
  memberSince: "March 2026",
};

export const orders: Order[] = [
  {
    id: "AMO-10428",
    placedAt: "12 Sep 2026",
    status: "shipped",
    total: 89000,
    tracking: "NG-AMO-778291",
    estimatedDelivery: "20 Sep 2026",
    shippingAddress: "14 Admiralty Way, Lekki Phase 1, Lagos",
    timeline: [
      { label: "Order placed", detail: "12 Sep · 4:12 PM", done: true },
      { label: "Confirmed", detail: "12 Sep · 4:18 PM", done: true },
      { label: "Packed at atelier", detail: "14 Sep · 11:40 AM", done: true },
      {
        label: "Shipped",
        detail: "15 Sep · In transit to Lagos",
        done: true,
        current: true,
      },
      { label: "Delivered", detail: "Est. 20 Sep", done: false },
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
    ],
  },
  {
    id: "AMO-10391",
    placedAt: "28 Aug 2026",
    status: "delivered",
    total: 100000,
    shippingAddress: "14 Admiralty Way, Lekki Phase 1, Lagos",
    timeline: [
      { label: "Order placed", detail: "28 Aug · 2:05 PM", done: true },
      { label: "Confirmed", detail: "28 Aug · 2:11 PM", done: true },
      { label: "Packed at atelier", detail: "29 Aug · 10:20 AM", done: true },
      { label: "Shipped", detail: "30 Aug", done: true },
      {
        label: "Delivered",
        detail: "2 Sep · Signed for",
        done: true,
        current: true,
      },
    ],
    items: [
      {
        name: "Amoura Edit Vol. III",
        catalogue: "Custom Magazines",
        quantity: 1,
        price: 45000,
        image:
          "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=400&q=80",
        productSlug: "amoura-edit-vol-3",
      },
      {
        name: "Hydra Lash Balm",
        catalogue: "Lashes",
        quantity: 1,
        price: 48000,
        image: "/products/hydra-balm.png",
        productSlug: "hydra-lash-balm",
      },
    ],
  },
  {
    id: "AMO-10255",
    placedAt: "4 Aug 2026",
    status: "delivered",
    total: 78000,
    shippingAddress: "14 Admiralty Way, Lekki Phase 1, Lagos",
    timeline: [
      { label: "Order placed", detail: "4 Aug", done: true },
      { label: "Confirmed", detail: "4 Aug", done: true },
      { label: "Packed at atelier", detail: "5 Aug", done: true },
      { label: "Shipped", detail: "6 Aug", done: true },
      {
        label: "Delivered",
        detail: "9 Aug · Signed for",
        done: true,
        current: true,
      },
    ],
    items: [
      {
        name: "Dew Elixir",
        catalogue: "Perfumes",
        quantity: 1,
        price: 78000,
        image: "/products/dew-elixir.png",
        productSlug: "dew-elixir",
      },
    ],
  },
];

export const appointments: Appointment[] = [
  {
    id: "APT-2201",
    service: "Silk Lash Set — Classic Volume",
    status: "upcoming",
    date: "24 Sep 2026",
    time: "11:00 AM",
    duration: "90 min",
    artist: "Chioma B.",
    price: 65000,
    notes: "Prefer soft natural taper at the outer corner.",
    image: "/methods/soft-volume.png",
    aftercare: [
      "Avoid water and steam for the first 24 hours",
      "Brush lashes gently each morning with a clean spoolie",
      "No oil-based removers around the eye area",
    ],
  },
  {
    id: "APT-2144",
    service: "Whisper Lashes — Natural Set",
    status: "completed",
    date: "2 Aug 2026",
    time: "2:30 PM",
    duration: "75 min",
    artist: "Chioma B.",
    price: 48000,
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    aftercare: [
      "Sleep on your back when possible for the first few nights",
      "Book a fill within 2–3 weeks for best longevity",
    ],
  },
];

export const productReviews: ProductReview[] = [
  {
    id: "rev-1",
    author: "Tolu A.",
    location: "Ikoyi, Lagos",
    rating: 5,
    date: "8 Sep 2026",
    body: "Lum Noir lasted through a full wedding weekend — soft on the skin, loud in the best way. The bottle feels like jewelry on my vanity.",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59db9?auto=format&fit=crop&w=500&q=80",
    ],
    productSlug: "lum-noir",
  },
  {
    id: "rev-2",
    author: "Chioma E.",
    location: "Abuja",
    rating: 5,
    date: "2 Sep 2026",
    body: "Packaging was immaculate and the scent opens with orchid before settling into warm amber. Already planning a second bottle.",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=500&q=80",
    ],
    productSlug: "lum-noir",
  },
  {
    id: "rev-3",
    author: "Nneka O.",
    location: "Lekki",
    rating: 4,
    date: "19 Aug 2026",
    body: "My custom magazine arrived looking like a boutique coffee-table piece. Friends keep asking who printed it.",
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80",
    ],
    productSlug: "amoura-edit-vol-3",
  },
  {
    id: "rev-4",
    author: "Funke B.",
    location: "Victoria Island",
    rating: 5,
    date: "11 Aug 2026",
    body: "Dew Elixir is my daytime staple — creamy florals without feeling heavy. Sprayed once and caught compliments all afternoon.",
    images: [
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=500&q=80",
    ],
    productSlug: "dew-elixir",
  },
  {
    id: "rev-5",
    author: "Amaka I.",
    location: "Port Harcourt",
    rating: 5,
    date: "5 Aug 2026",
    body: "Hydra balm keeps my extensions soft between fills. Tiny jar, huge difference after a humid week.",
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=500&q=80",
    ],
    productSlug: "hydra-lash-balm",
  },
];

export const orderStatusLabel: Record<OrderStatus, string> = {
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const appointmentStatusLabel: Record<AppointmentStatus, string> = {
  upcoming: "Upcoming",
  completed: "Completed",
  cancelled: "Cancelled",
};

export function getOrder(id: string) {
  return orders.find((o) => o.id === id);
}

export function getAppointment(id: string) {
  return appointments.find((a) => a.id === id);
}

export function formatOrderTotal(order: Order) {
  return formatPrice(order.total);
}

export function getReviewsForProduct(slug: string) {
  const matched = productReviews.filter((r) => r.productSlug === slug);
  if (matched.length > 0) return matched;
  // Fallback sample reviews so every product page still shows the section
  return productReviews.slice(0, 2).map((r, i) => ({
    ...r,
    id: `${r.id}-${slug}-${i}`,
    productSlug: slug,
  }));
}

export type MagazineProjectStatus =
  | "draft"
  | "in_review"
  | "changes_requested"
  | "approved"
  | "printed";

export type MagazineTimelineStep = {
  label: string;
  detail: string;
  done: boolean;
  current?: boolean;
};

export type MagazineProject = {
  id: string;
  title: string;
  theme: string;
  status: MagazineProjectStatus;
  updatedAt: string;
  pages: number;
  coverImage: string;
  proofImages: string[];
  brief: string;
  editorNote?: string;
  price: number;
  timeline: MagazineTimelineStep[];
  photosUploaded: number;
  photosNeeded: number;
};

export const magazineStatusLabel: Record<MagazineProjectStatus, string> = {
  draft: "Draft",
  in_review: "In review",
  changes_requested: "Changes requested",
  approved: "Approved",
  printed: "Printed",
};

export const magazineProjects: MagazineProject[] = [
  {
    id: "MAG-318",
    title: "Ada & Kelechi — Engagement Edit",
    theme: "Love story / editorial",
    status: "in_review",
    updatedAt: "18 Sep 2026",
    pages: 96,
    coverImage:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80",
    proofImages: [
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=900&q=80",
    ],
    brief:
      "Soft blush palette, Lagos engagement weekend, mix of candid and portrait. Prefer serif headlines and generous white space.",
    editorNote:
      "Proof v2 is ready. Cover crop tightened; pages 12–15 reflowed after your photo swap.",
    price: 45000,
    photosUploaded: 48,
    photosNeeded: 40,
    timeline: [
      { label: "Brief submitted", detail: "4 Sep · 6:20 PM", done: true },
      { label: "Photos uploaded", detail: "6 Sep · 48 images", done: true },
      { label: "First layout", detail: "12 Sep", done: true },
      {
        label: "Proof in review",
        detail: "Awaiting your approval",
        done: true,
        current: true,
      },
      { label: "Approved to print", detail: "Pending", done: false },
      { label: "Printed & shipped", detail: "Pending", done: false },
    ],
  },
  {
    id: "MAG-291",
    title: "Private Issue — Brand Launch",
    theme: "Lifestyle / product story",
    status: "draft",
    updatedAt: "10 Sep 2026",
    pages: 64,
    coverImage:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=900&q=80",
    proofImages: [
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e1d6431?auto=format&fit=crop&w=900&q=80",
    ],
    brief:
      "Launch keepsake for a skincare drop — matte paper, quiet typography, product flat-lays + founder note.",
    price: 55000,
    photosUploaded: 12,
    photosNeeded: 35,
    timeline: [
      { label: "Brief started", detail: "10 Sep", done: true, current: true },
      { label: "Photos uploaded", detail: "12 of 35", done: false },
      { label: "First layout", detail: "Pending", done: false },
      { label: "Proof in review", detail: "Pending", done: false },
      { label: "Approved to print", detail: "Pending", done: false },
      { label: "Printed & shipped", detail: "Pending", done: false },
    ],
  },
  {
    id: "MAG-244",
    title: "Amoura Edit Vol. II — Family Album",
    theme: "Family / milestone",
    status: "printed",
    updatedAt: "22 Jul 2026",
    pages: 120,
    coverImage:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
    proofImages: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80",
    ],
    brief: "Three generations, Christmas in Enugu — warm tones, caption space for handwritten notes.",
    editorNote: "Shipped 22 Jul. Tracking was attached to order AMO-10102.",
    price: 62000,
    photosUploaded: 76,
    photosNeeded: 60,
    timeline: [
      { label: "Brief submitted", detail: "2 Jun", done: true },
      { label: "Photos uploaded", detail: "8 Jun", done: true },
      { label: "First layout", detail: "18 Jun", done: true },
      { label: "Proof approved", detail: "28 Jun", done: true },
      { label: "Printed", detail: "10 Jul", done: true },
      {
        label: "Shipped",
        detail: "22 Jul · Delivered",
        done: true,
        current: true,
      },
    ],
  },
];

export function getMagazineProject(id: string) {
  return magazineProjects.find((p) => p.id === id);
}

export type Address = {
  id: string;
  label: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  isDefault: boolean;
};

export type SupportTicketStatus = "open" | "awaiting_you" | "resolved";

export type SupportMessage = {
  id: string;
  from: "you" | "amoura";
  body: string;
  at: string;
};

export type SupportTicket = {
  id: string;
  subject: string;
  status: SupportTicketStatus;
  relatedTo?: string;
  updatedAt: string;
  messages: SupportMessage[];
};

export type NotificationKind =
  | "order"
  | "appointment"
  | "magazine"
  | "promo";

export type AccountNotification = {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  at: string;
  href: string;
  read: boolean;
};

export const addresses: Address[] = [
  {
    id: "addr-1",
    label: "Home",
    name: "Ada Okoye",
    line1: "14 Admiralty Way",
    line2: "Lekki Phase 1",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
    phone: "+234 801 234 5678",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Office",
    name: "Ada Okoye",
    line1: "12B Adeola Odeku Street",
    line2: "Victoria Island",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
    phone: "+234 801 234 5678",
    isDefault: false,
  },
];

export const supportTickets: SupportTicket[] = [
  {
    id: "SUP-882",
    subject: "Tracking for AMO-10428",
    status: "awaiting_you",
    relatedTo: "Order AMO-10428",
    updatedAt: "18 Sep · 2:14 PM",
    messages: [
      {
        id: "m1",
        from: "you",
        body: "Hi — my Lum Noir order shows shipped. Can you confirm the courier and ETA for Lekki?",
        at: "17 Sep · 11:02 AM",
      },
      {
        id: "m2",
        from: "amoura",
        body: "Hello Ada — it’s with GIG Logistics, tracking NG-AMO-778291. Est. delivery 20 Sep. Reply if you’d like a weekend drop window.",
        at: "18 Sep · 2:14 PM",
      },
    ],
  },
  {
    id: "SUP-841",
    subject: "Magazine proof crop on cover",
    status: "resolved",
    relatedTo: "Project MAG-318",
    updatedAt: "14 Sep · 5:40 PM",
    messages: [
      {
        id: "m1",
        from: "you",
        body: "Could we soften the cover crop so more of the dress shows?",
        at: "13 Sep · 9:18 AM",
      },
      {
        id: "m2",
        from: "amoura",
        body: "Done — proof v2 reflects a wider crop. Please review in your magazine project.",
        at: "14 Sep · 5:40 PM",
      },
    ],
  },
  {
    id: "SUP-790",
    subject: "Lash fill availability",
    status: "open",
    relatedTo: "Appointment APT-2201",
    updatedAt: "12 Sep · 10:05 AM",
    messages: [
      {
        id: "m1",
        from: "you",
        body: "Can I add a fill two weeks after my Silk Lash set with Chioma?",
        at: "12 Sep · 10:05 AM",
      },
    ],
  },
];

export const notifications: AccountNotification[] = [
  {
    id: "n1",
    kind: "order",
    title: "Order AMO-10428 is on the way",
    body: "Lum Noir left the atelier. Tracking NG-AMO-778291.",
    at: "15 Sep · 4:02 PM",
    href: "/account/orders/AMO-10428",
    read: false,
  },
  {
    id: "n2",
    kind: "magazine",
    title: "Proof ready for MAG-318",
    body: "Your engagement edit proof is waiting for approval.",
    at: "18 Sep · 11:30 AM",
    href: "/account/magazines/MAG-318",
    read: false,
  },
  {
    id: "n3",
    kind: "appointment",
    title: "Reminder: lash set on 24 Sep",
    body: "Silk Lash Set with Chioma B. at 11:00 AM.",
    at: "19 Sep · 8:00 AM",
    href: "/account/appointments/APT-2201",
    read: true,
  },
  {
    id: "n4",
    kind: "promo",
    title: "AMOURA10 for your next scent",
    body: "10% off perfume orders this week — use code AMOURA10 at checkout.",
    at: "16 Sep · 9:00 AM",
    href: "/store",
    read: true,
  },
];

export const supportStatusLabel: Record<SupportTicketStatus, string> = {
  open: "Open",
  awaiting_you: "Awaiting you",
  resolved: "Resolved",
};

export function getSupportTicket(id: string) {
  return supportTickets.find((t) => t.id === id);
}

export function getAddress(id: string) {
  return addresses.find((a) => a.id === id);
}
