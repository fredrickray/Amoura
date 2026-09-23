import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { RequireAdmin } from "@/components/auth/RequireAuth";
import { AdminStoreProvider } from "@/context/AdminStoreContext";

export const metadata: Metadata = {
  title: {
    default: "Studio desk",
    template: "%s · Studio desk",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAdmin>
      <AdminStoreProvider>
        <AdminShell>{children}</AdminShell>
      </AdminStoreProvider>
    </RequireAdmin>
  );
}
