"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  AppointmentStatus,
  MagazineProjectStatus,
  OrderStatus,
  SupportTicketStatus,
} from "@/data/account";
import {
  buildSeedAppointments,
  buildSeedMagazineRequests,
  buildSeedOrders,
  buildSeedPricing,
  buildSeedTickets,
  orderTimelineForStatus,
  type AdminAppointment,
  type AdminMagazineRequest,
  type AdminOrder,
  type AdminSupportTicket,
} from "@/data/admin";
import type { MagazinePageTier } from "@/data/magazineConfig";

const STORAGE_KEY = "amoura-admin-store-v1";

type AdminState = {
  orders: AdminOrder[];
  requests: AdminMagazineRequest[];
  appointments: AdminAppointment[];
  tickets: AdminSupportTicket[];
  pricing: MagazinePageTier[];
};

type AdminStoreValue = AdminState & {
  ready: boolean;
  updateOrderStatus: (id: string, status: OrderStatus, tracking?: string) => void;
  updateRequestStatus: (
    id: string,
    status: MagazineProjectStatus,
    editorNote?: string,
  ) => void;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  replyToTicket: (id: string, body: string) => void;
  updateTicketStatus: (id: string, status: SupportTicketStatus) => void;
  savePricing: (tiers: MagazinePageTier[]) => void;
  getOrder: (id: string) => AdminOrder | undefined;
  getRequest: (id: string) => AdminMagazineRequest | undefined;
  getAppointment: (id: string) => AdminAppointment | undefined;
  getTicket: (id: string) => AdminSupportTicket | undefined;
};

const AdminStoreContext = createContext<AdminStoreValue | null>(null);

function seedState(): AdminState {
  return {
    orders: buildSeedOrders(),
    requests: buildSeedMagazineRequests(),
    appointments: buildSeedAppointments(),
    tickets: buildSeedTickets(),
    pricing: buildSeedPricing(),
  };
}

function todayLabel() {
  return new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function AdminStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AdminState>(seedState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<AdminState>;
        setState({
          orders: parsed.orders ?? buildSeedOrders(),
          requests: parsed.requests ?? buildSeedMagazineRequests(),
          appointments: parsed.appointments ?? buildSeedAppointments(),
          tickets: parsed.tickets ?? buildSeedTickets(),
          pricing: parsed.pricing ?? buildSeedPricing(),
        });
      }
    } catch {
      // keep seed
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, ready]);

  const updateOrderStatus = useCallback(
    (id: string, status: OrderStatus, tracking?: string) => {
      setState((prev) => ({
        ...prev,
        orders: prev.orders.map((order) => {
          if (order.id !== id) return order;
          return {
            ...order,
            status,
            tracking: tracking?.trim() || order.tracking,
            timeline: orderTimelineForStatus(status, order.placedAt),
          };
        }),
      }));
    },
    [],
  );

  const updateRequestStatus = useCallback(
    (id: string, status: MagazineProjectStatus, editorNote?: string) => {
      setState((prev) => ({
        ...prev,
        requests: prev.requests.map((req) => {
          if (req.id !== id) return req;
          return {
            ...req,
            status,
            updatedAt: todayLabel(),
            editorNote:
              editorNote !== undefined ? editorNote : req.editorNote,
          };
        }),
      }));
    },
    [],
  );

  const updateAppointmentStatus = useCallback(
    (id: string, status: AppointmentStatus) => {
      setState((prev) => ({
        ...prev,
        appointments: prev.appointments.map((apt) =>
          apt.id === id ? { ...apt, status } : apt,
        ),
      }));
    },
    [],
  );

  const replyToTicket = useCallback((id: string, body: string) => {
    const trimmed = body.trim();
    if (!trimmed) return;
    setState((prev) => ({
      ...prev,
      tickets: prev.tickets.map((ticket) => {
        if (ticket.id !== id) return ticket;
        return {
          ...ticket,
          status: "awaiting_you" as const,
          updatedAt: `${todayLabel()} · Studio reply`,
          messages: [
            ...ticket.messages,
            {
              id: `m-${Date.now()}`,
              from: "amoura" as const,
              body: trimmed,
              at: todayLabel(),
            },
          ],
        };
      }),
    }));
  }, []);

  const updateTicketStatus = useCallback(
    (id: string, status: SupportTicketStatus) => {
      setState((prev) => ({
        ...prev,
        tickets: prev.tickets.map((ticket) =>
          ticket.id === id
            ? { ...ticket, status, updatedAt: todayLabel() }
            : ticket,
        ),
      }));
    },
    [],
  );

  const savePricing = useCallback((tiers: MagazinePageTier[]) => {
    setState((prev) => ({ ...prev, pricing: tiers }));
  }, []);

  const value = useMemo<AdminStoreValue>(
    () => ({
      ...state,
      ready,
      updateOrderStatus,
      updateRequestStatus,
      updateAppointmentStatus,
      replyToTicket,
      updateTicketStatus,
      savePricing,
      getOrder: (id) => state.orders.find((o) => o.id === id),
      getRequest: (id) => state.requests.find((r) => r.id === id),
      getAppointment: (id) => state.appointments.find((a) => a.id === id),
      getTicket: (id) => state.tickets.find((t) => t.id === id),
    }),
    [
      state,
      ready,
      updateOrderStatus,
      updateRequestStatus,
      updateAppointmentStatus,
      replyToTicket,
      updateTicketStatus,
      savePricing,
    ],
  );

  return (
    <AdminStoreContext.Provider value={value}>
      {children}
    </AdminStoreContext.Provider>
  );
}

export function useAdminStore() {
  const ctx = useContext(AdminStoreContext);
  if (!ctx) {
    throw new Error("useAdminStore must be used within AdminStoreProvider");
  }
  return ctx;
}
