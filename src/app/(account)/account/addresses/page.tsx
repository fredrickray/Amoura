"use client";

import { useState } from "react";
import { addresses as initialAddresses, type Address } from "@/data/account";
import { cn } from "@/lib/utils";

export default function AddressesPage() {
  const [list, setList] = useState<Address[]>(initialAddresses);
  const [editing, setEditing] = useState<Address | null>(null);
  const [adding, setAdding] = useState(false);

  function setDefault(id: string) {
    setList((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id })),
    );
  }

  function remove(id: string) {
    setList((prev) => {
      const next = prev.filter((a) => a.id !== id);
      if (next.length && !next.some((a) => a.isDefault)) {
        next[0] = { ...next[0], isDefault: true };
      }
      return next;
    });
  }

  function save(address: Address) {
    setList((prev) => {
      const exists = prev.some((a) => a.id === address.id);
      const next = exists
        ? prev.map((a) => (a.id === address.id ? address : a))
        : [...prev, address];
      if (address.isDefault) {
        return next.map((a) => ({
          ...a,
          isDefault: a.id === address.id,
        }));
      }
      return next;
    });
    setEditing(null);
    setAdding(false);
  }

  return (
    <div className="min-w-0">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="badge mb-3">Addresses</p>
          <h1 className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-[1.05] tracking-[-0.03em]">
            Shipping addresses
          </h1>
          <p className="mt-2 text-[15px] text-ink-soft">
            Manage where perfume and magazine orders are delivered.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setAdding(true);
            setEditing({
              id: `addr-${Date.now()}`,
              label: "New",
              name: "",
              line1: "",
              city: "",
              state: "",
              country: "Nigeria",
              phone: "",
              isDefault: list.length === 0,
            });
          }}
          className="pill pill-solid px-5 py-2.5 text-sm"
        >
          Add address
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {list.map((address) => (
          <article
            key={address.id}
            className={cn(
              "relative rounded-[24px] border bg-surface/90 p-5 shadow-[0_16px_36px_-30px_rgba(17,17,17,0.35)] md:p-6",
              address.isDefault
                ? "border-ink/20 ring-1 ring-ink/10"
                : "border-line/80",
            )}
          >
            {address.isDefault ? (
              <span className="absolute right-4 top-4 rounded-full bg-[#efe4e6] px-2.5 py-1 text-xs font-medium text-ink">
                Default
              </span>
            ) : null}
            <p className="text-sm font-medium text-blush-deep">{address.label}</p>
            <p className="mt-2 font-medium text-ink">{address.name}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">
              {address.line1}
              {address.line2 ? (
                <>
                  <br />
                  {address.line2}
                </>
              ) : null}
              <br />
              {address.city}, {address.state}
              <br />
              {address.country}
              <br />
              {address.phone}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setAdding(false);
                  setEditing(address);
                }}
                className="rounded-full border border-line px-3.5 py-1.5 text-sm font-medium hover:bg-surface-soft"
              >
                Edit
              </button>
              {!address.isDefault ? (
                <button
                  type="button"
                  onClick={() => setDefault(address.id)}
                  className="rounded-full border border-line px-3.5 py-1.5 text-sm font-medium hover:bg-surface-soft"
                >
                  Set default
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => remove(address.id)}
                className="rounded-full px-3.5 py-1.5 text-sm text-ink-muted hover:text-ink"
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>

      {editing ? (
        <AddressForm
          address={editing}
          isNew={adding}
          onCancel={() => {
            setEditing(null);
            setAdding(false);
          }}
          onSave={save}
        />
      ) : null}
    </div>
  );
}

function AddressForm({
  address,
  isNew,
  onCancel,
  onSave,
}: {
  address: Address;
  isNew: boolean;
  onCancel: () => void;
  onSave: (a: Address) => void;
}) {
  const [form, setForm] = useState(address);

  function set<K extends keyof Address>(key: K, value: Address[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 sm:items-center">
      <div
        role="dialog"
        aria-modal
        aria-labelledby="address-form-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[24px] bg-white p-5 shadow-xl md:p-6"
      >
        <h2 id="address-form-title" className="font-display text-2xl tracking-tight">
          {isNew ? "Add address" : "Edit address"}
        </h2>
        <div className="mt-5 grid gap-3">
          {(
            [
              ["label", "Label (Home, Office…)"],
              ["name", "Full name"],
              ["line1", "Address line"],
              ["line2", "Area / landmark"],
              ["city", "City"],
              ["state", "State"],
              ["country", "Country"],
              ["phone", "Phone"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="block text-sm">
              <span className="mb-1.5 block text-ink-soft">{label}</span>
              <input
                value={(form[key] as string) ?? ""}
                onChange={(e) => set(key, e.target.value)}
                required={key !== "line2"}
                className="h-12 w-full rounded-2xl border border-line bg-[#fafafa] px-4 outline-none focus:border-ink/30"
              />
            </label>
          ))}
          <label className="flex items-center gap-2 text-sm text-ink-soft">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) => set("isDefault", e.target.checked)}
              className="size-4 accent-ink"
            />
            Set as default shipping address
          </label>
        </div>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => onSave(form)}
            className="pill pill-solid flex-1 justify-center py-3 text-sm"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="pill flex-1 justify-center py-3 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
