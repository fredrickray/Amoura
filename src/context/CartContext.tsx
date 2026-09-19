"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/data/catalog";

export type MagazineCartDetails = {
  pages: number;
  fullPrice: number;
  deposit: number;
  balance: number;
  photoCount: number;
  inspoCount: number;
  notes: string;
  /** Preview URLs (blob) for cart display — first page photo if any */
  previewImage?: string;
};

export type CartItem = {
  slug: string;
  name: string;
  /** Amount charged now (full price for products; 50% deposit for magazines) */
  price: number;
  image: string;
  quantity: number;
  kind?: "product" | "magazine";
  magazine?: MagazineCartDetails;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  hasMagazineDeposit: boolean;
  magazineBalanceDue: number;
  addItem: (product: Product, quantity?: number) => void;
  addMagazine: (details: MagazineCartDetails & { title?: string }) => void;
  removeItem: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "amoura-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.slug === product.slug && i.kind !== "magazine",
      );
      if (existing) {
        return prev.map((i) =>
          i.slug === product.slug && i.kind !== "magazine"
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        );
      }
      return [
        ...prev,
        {
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
          kind: "product" as const,
        },
      ];
    });
  }, []);

  const addMagazine = useCallback(
    (details: MagazineCartDetails & { title?: string }) => {
      const slug = `magazine-${details.pages}-${Date.now()}`;
      setItems((prev) => [
        ...prev,
        {
          slug,
          name: details.title ?? `Custom magazine · ${details.pages} pages`,
          price: details.deposit,
          image:
            details.previewImage ??
            "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=400&q=80",
          quantity: 1,
          kind: "magazine",
          magazine: details,
        },
      ]);
    },
    [],
  );

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.slug !== slug) return i;
          if (i.kind === "magazine") return { ...i, quantity: 1 };
          return { ...i, quantity: Math.max(0, quantity) };
        })
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const count = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const magazineBalanceDue = items.reduce(
      (sum, i) => sum + (i.magazine?.balance ?? 0) * i.quantity,
      0,
    );
    const hasMagazineDeposit = items.some((i) => i.kind === "magazine");
    return {
      items,
      count,
      subtotal,
      hasMagazineDeposit,
      magazineBalanceDue,
      addItem,
      addMagazine,
      removeItem,
      setQuantity,
      clear,
    };
  }, [items, addItem, addMagazine, removeItem, setQuantity, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
