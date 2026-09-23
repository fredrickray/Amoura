"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  magazineProjects as seedMagazines,
  orders as seedOrders,
  type MagazineProject,
  type Order,
  type OrderItem,
} from "@/data/account";
import type { CartItem } from "@/context/CartContext";

const STORAGE_KEY = "amoura-account-data-v1";

type AccountDataValue = {
  ready: boolean;
  orders: Order[];
  magazines: MagazineProject[];
  getOrder: (id: string) => Order | undefined;
  getMagazine: (id: string) => MagazineProject | undefined;
  placeCheckout: (input: {
    items: CartItem[];
    shippingAddress: string;
    shippingFee: number;
  }) => { orderId: string; magazineIds: string[] };
  payMagazineBalance: (id: string) => void;
  updateMagazineStatus: (
    id: string,
    status: MagazineProject["status"],
    editorNote?: string,
  ) => void;
};

const AccountDataContext = createContext<AccountDataValue | null>(null);

function todayLabel() {
  return new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function nextOrderId(existing: Order[]) {
  const nums = existing
    .map((o) => Number(o.id.replace(/\D/g, "")))
    .filter((n) => !Number.isNaN(n));
  const next = (nums.length ? Math.max(...nums) : 10400) + 1;
  return `AMO-${next}`;
}

function nextMagazineId(existing: MagazineProject[]) {
  const nums = existing
    .map((m) => Number(m.id.replace(/\D/g, "")))
    .filter((n) => !Number.isNaN(n));
  const next = (nums.length ? Math.max(...nums) : 300) + 1;
  return `MAG-${next}`;
}

export function AccountDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [orders, setOrders] = useState<Order[]>(seedOrders);
  const [magazines, setMagazines] = useState<MagazineProject[]>(seedMagazines);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          orders?: Order[];
          magazines?: MagazineProject[];
        };
        if (parsed.orders?.length) setOrders(parsed.orders);
        if (parsed.magazines?.length) setMagazines(parsed.magazines);
      }
    } catch {
      // keep seed
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ orders, magazines }));
  }, [orders, magazines, ready]);

  const placeCheckout = useCallback(
    (input: {
      items: CartItem[];
      shippingAddress: string;
      shippingFee: number;
    }) => {
      const placedAt = todayLabel();
      const orderId = nextOrderId(orders);
      const magazineIds: string[] = [];
      const newMagazines: MagazineProject[] = [];

      const orderItems: OrderItem[] = input.items.map((item) => ({
        name: item.name,
        catalogue:
          item.kind === "magazine"
            ? "Custom Magazines"
            : item.name.toLowerCase().includes("lash")
              ? "Lashes"
              : "Perfumes",
        quantity: item.quantity,
        price: item.price * item.quantity,
        image: item.image,
        productSlug: item.slug,
      }));

      for (const item of input.items) {
        if (item.kind !== "magazine" || !item.magazine) continue;
        const magId = nextMagazineId([...magazines, ...newMagazines]);
        magazineIds.push(magId);
        newMagazines.push({
          id: magId,
          title: item.name,
          theme: "Custom commission",
          status: "draft",
          updatedAt: placedAt,
          pages: item.magazine.pages,
          coverImage: item.image,
          proofImages: item.magazine.previewImage
            ? [item.magazine.previewImage]
            : [item.image],
          brief:
            item.magazine.notes?.trim() ||
            `Custom ${item.magazine.pages}-page magazine. ${item.magazine.photoCount} photos uploaded, ${item.magazine.inspoCount} inspo files.`,
          price: item.magazine.fullPrice,
          photosUploaded: item.magazine.photoCount,
          photosNeeded: item.magazine.pages,
          timeline: [
            {
              label: "Deposit paid",
              detail: `${placedAt} · ${item.magazine.deposit.toLocaleString("en-NG")} NGN`,
              done: true,
              current: true,
            },
            {
              label: "Photos uploaded",
              detail: `${item.magazine.photoCount} files`,
              done: item.magazine.photoCount > 0,
            },
            { label: "First layout", detail: "Pending", done: false },
            { label: "Proof in review", detail: "Pending", done: false },
            { label: "Approved to print", detail: "Pending", done: false },
            {
              label: "Balance due before print",
              detail: `${item.magazine.balance.toLocaleString("en-NG")} NGN remaining`,
              done: false,
            },
          ],
          editorNote: `Balance of ₦${item.magazine.balance.toLocaleString("en-NG")} due before print.`,
        });
      }

      const productTotal = input.items.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0,
      );

      const order: Order = {
        id: orderId,
        placedAt,
        status: "processing",
        total: productTotal + input.shippingFee,
        shippingAddress: input.shippingAddress,
        estimatedDelivery: "Est. 5–7 days",
        timeline: [
          {
            label: "Order placed",
            detail: placedAt,
            done: true,
            current: true,
          },
          { label: "Confirmed", detail: "Pending", done: false },
          { label: "Packed at atelier", detail: "Pending", done: false },
          { label: "Shipped", detail: "Pending", done: false },
          { label: "Delivered", detail: "Pending", done: false },
        ],
        items: orderItems,
      };

      setOrders((prev) => [order, ...prev]);
      if (newMagazines.length) {
        setMagazines((prev) => [...newMagazines, ...prev]);
      }

      return { orderId, magazineIds };
    },
    [orders, magazines],
  );

  const payMagazineBalance = useCallback((id: string) => {
    setMagazines((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        return {
          ...m,
          updatedAt: todayLabel(),
          editorNote: "Balance paid. Ready for layout / print queue.",
          timeline: m.timeline.map((step) =>
            step.label.toLowerCase().includes("balance")
              ? {
                  ...step,
                  done: true,
                  detail: `Paid ${todayLabel()}`,
                  current: false,
                }
              : step,
          ),
        };
      }),
    );
  }, []);

  const updateMagazineStatus = useCallback(
    (
      id: string,
      status: MagazineProject["status"],
      editorNote?: string,
    ) => {
      setMagazines((prev) =>
        prev.map((m) =>
          m.id === id
            ? {
                ...m,
                status,
                updatedAt: todayLabel(),
                editorNote:
                  editorNote !== undefined ? editorNote : m.editorNote,
              }
            : m,
        ),
      );
    },
    [],
  );

  const value = useMemo<AccountDataValue>(
    () => ({
      ready,
      orders,
      magazines,
      getOrder: (id) => orders.find((o) => o.id === id),
      getMagazine: (id) => magazines.find((m) => m.id === id),
      placeCheckout,
      payMagazineBalance,
      updateMagazineStatus,
    }),
    [
      ready,
      orders,
      magazines,
      placeCheckout,
      payMagazineBalance,
      updateMagazineStatus,
    ],
  );

  return (
    <AccountDataContext.Provider value={value}>
      {children}
    </AccountDataContext.Provider>
  );
}

export function useAccountData() {
  const ctx = useContext(AccountDataContext);
  if (!ctx) {
    throw new Error("useAccountData must be used within AccountDataProvider");
  }
  return ctx;
}
