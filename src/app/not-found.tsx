import Link from "next/link";
import { PillButton } from "@/components/PillButton";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 py-24 text-center">
      <p className="badge mb-4">404</p>
      <h1 className="font-display text-5xl tracking-tight">Page not found</h1>
      <p className="mt-4 max-w-sm text-[15px] text-ink-soft">
        This page drifted out of the catalogue. Head back to the store or home.
      </p>
      <div className="mt-8 flex gap-3">
        <PillButton href="/" variant="ghost">
          Home
        </PillButton>
        <PillButton href="/store" variant="solid">
          Store
        </PillButton>
      </div>
      <Link href="/support" className="mt-6 text-sm text-ink-muted hover:text-ink">
        Contact support
      </Link>
    </div>
  );
}
