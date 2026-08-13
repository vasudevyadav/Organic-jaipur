"use client";

import { useState, type FormEvent } from "react";
import type { Address } from "@prisma/client";

const EMPTY_FORM = {
  label: "Home",
  line1: "",
  line2: "",
  city: "Jaipur",
  state: "Rajasthan",
  pincode: "",
  phone: "",
  isDefault: false,
};

export default function AddressManager({ initialAddresses }: { initialAddresses: Address[] }) {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [showForm, setShowForm] = useState(initialAddresses.length === 0);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleAdd(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const res = await fetch("/api/account/addresses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json().catch(() => null);
    setSaving(false);

    if (!res.ok) {
      setError("Could not save this address. Please check the details.");
      return;
    }

    setAddresses((prev) =>
      form.isDefault
        ? [data.address, ...prev.map((a) => ({ ...a, isDefault: false }))]
        : [...prev, data.address]
    );
    setForm(EMPTY_FORM);
    setShowForm(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this address?")) return;
    const res = await fetch(`/api/account/addresses/${id}`, { method: "DELETE" });
    if (res.ok) {
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    }
  }

  async function handleSetDefault(id: string) {
    const res = await fetch(`/api/account/addresses/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDefault: true }),
    });
    if (res.ok) {
      setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-brand-900">Saved Addresses</h2>
        {!showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-cream hover:bg-brand-700"
          >
            + Add Address
          </button>
        )}
      </div>

      {addresses.length === 0 && !showForm && (
        <p className="text-sm text-foreground/50">No saved addresses yet.</p>
      )}

      <div className="space-y-3">
        {addresses.map((address) => (
          <div key={address.id} className="rounded-2xl border border-brand-100 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium text-foreground/90">
                {address.label}
                {address.isDefault && (
                  <span className="ml-2 rounded-full bg-brand-600/10 px-2.5 py-0.5 text-xs font-medium text-brand-700">
                    Default
                  </span>
                )}
              </p>
              <div className="flex items-center gap-4 text-sm">
                {!address.isDefault && (
                  <button type="button" onClick={() => handleSetDefault(address.id)} className="font-medium text-brand-700 hover:text-brand-800">
                    Set Default
                  </button>
                )}
                <button type="button" onClick={() => handleDelete(address.id)} className="font-medium text-terracotta-600 hover:text-terracotta-500">
                  Delete
                </button>
              </div>
            </div>
            <p className="mt-2 text-sm text-foreground/70">
              {address.line1}
              {address.line2 ? `, ${address.line2}` : ""}, {address.city}, {address.state} {address.pincode}
            </p>
            <p className="mt-1 text-sm text-foreground/50">{address.phone}</p>
          </div>
        ))}
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="rounded-2xl border border-brand-100 bg-white p-6">
          <h3 className="font-display text-base font-semibold text-brand-900">New Address</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <TextField label="Label (e.g. Home, Office)" value={form.label} onChange={(v) => setForm((f) => ({ ...f, label: v }))} required />
            <TextField label="Phone" type="tel" value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} required />
            <TextField label="Address Line 1" value={form.line1} onChange={(v) => setForm((f) => ({ ...f, line1: v }))} required className="sm:col-span-2" />
            <TextField label="Address Line 2 (optional)" value={form.line2} onChange={(v) => setForm((f) => ({ ...f, line2: v }))} className="sm:col-span-2" />
            <TextField label="City" value={form.city} onChange={(v) => setForm((f) => ({ ...f, city: v }))} required />
            <TextField label="State" value={form.state} onChange={(v) => setForm((f) => ({ ...f, state: v }))} required />
            <TextField label="Pincode" value={form.pincode} onChange={(v) => setForm((f) => ({ ...f, pincode: v }))} required />
          </div>
          <label className="mt-4 flex items-center gap-2 text-sm text-foreground/80">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) => setForm((f) => ({ ...f, isDefault: e.target.checked }))}
            />
            Set as default address
          </label>

          {error && <p className="mt-3 text-sm text-terracotta-600">{error}</p>}

          <div className="mt-5 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-cream hover:bg-brand-700 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Address"}
            </button>
            {addresses.length > 0 && (
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-full border border-brand-200 px-6 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  required,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-sm font-medium text-foreground/80">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
      />
    </div>
  );
}
