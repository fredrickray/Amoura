"use client";

import { useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminUi";
import { useAdminStore } from "@/context/AdminStoreContext";
import type { MagazinePageTier } from "@/data/magazineConfig";
import { formatPrice } from "@/lib/utils";

export default function AdminPricingPage() {
  const { pricing, savePricing, ready } = useAdminStore();
  const [tiers, setTiers] = useState<MagazinePageTier[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (ready) setTiers(pricing.map((t) => ({ ...t })));
  }, [ready, pricing]);

  if (!ready) return null;

  function updatePrice(pages: number, price: number) {
    setTiers((prev) =>
      prev.map((t) => (t.pages === pages ? { ...t, price } : t)),
    );
  }

  function handleSave() {
    savePricing(tiers);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <AdminPageHeader
        eyebrow="Config"
        title="Magazine pricing"
        description="Page-count tiers shown in the custom magazine builder. Deposit is always 50% of full price."
        action={
          <button type="button" onClick={handleSave} className="pill pill-solid">
            {saved ? "Saved" : "Save tiers"}
          </button>
        }
      />

      <div className="overflow-hidden rounded-2xl border border-[#ddd8d3] bg-white">
        <div className="grid grid-cols-[1fr_1.2fr_1fr] gap-2 border-b border-[#ddd8d3] bg-[#faf8f6] px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.12em] text-ink-muted">
          <span>Pages</span>
          <span>Full price (₦)</span>
          <span className="text-right">Deposit (50%)</span>
        </div>
        <ul className="divide-y divide-[#ddd8d3]">
          {tiers.map((tier) => (
            <li
              key={tier.pages}
              className="grid grid-cols-[1fr_1.2fr_1fr] items-center gap-2 px-4 py-3"
            >
              <span className="text-sm font-medium">{tier.pages} pages</span>
              <input
                type="number"
                min={0}
                step={1000}
                value={tier.price}
                onChange={(e) =>
                  updatePrice(tier.pages, Number(e.target.value) || 0)
                }
                className="w-full rounded-xl border border-[#ddd8d3] bg-[#faf8f6] px-3 py-2 text-sm outline-none focus:border-ink/40"
              />
              <span className="text-right text-sm text-ink-soft">
                {formatPrice(Math.round(tier.price * 0.5))}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 text-sm text-ink-soft">
        Changes persist in this browser for now. Wire to the API when backend
        pricing is ready.
      </p>
    </div>
  );
}
