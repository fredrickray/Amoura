import { AccountShell } from "@/components/account/AccountShell";
import { RequireAuth } from "@/components/auth/RequireAuth";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RequireAuth>
      <AccountShell>{children}</AccountShell>
    </RequireAuth>
  );
}
