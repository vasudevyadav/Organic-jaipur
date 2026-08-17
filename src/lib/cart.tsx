"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  unit: string;
  weight: number;
  imageUrl: string;
  quantity: number;
};

const STORAGE_KEY = "oj_cart";
const EMPTY: CartItem[] = [];

let cartItems: CartItem[] = EMPTY;
let initialized = false;
const listeners = new Set<() => void>();

function readStoredCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function ensureInitialized() {
  if (!initialized && typeof window !== "undefined") {
    cartItems = readStoredCart();
    initialized = true;
  }
}

function setCartItems(next: CartItem[]) {
  cartItems = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): CartItem[] {
  ensureInitialized();
  return cartItems;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY;
}

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  totalWeight: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (items.length === 0) return;
    const controller = new AbortController();
    const ids = items.map((item) => item.productId).join(",");
    const slugs = items.map((item) => item.slug).join(",");
    fetch(`/api/products?ids=${encodeURIComponent(ids)}&slugs=${encodeURIComponent(slugs)}`, { signal: controller.signal })
      .then(async (response) => response.ok ? response.json() : null)
      .then((data) => {
        if (!Array.isArray(data?.products)) return;
        const byId = new Map(data.products.map((product: CartItem) => [product.productId ?? (product as unknown as { id: string }).id, product]));
        const bySlug = new Map(data.products.map((product: CartItem) => [product.slug, product]));
        const reconciled = items.flatMap((item) => {
          const product = byId.get(item.productId) ?? bySlug.get(item.slug);
          if (!product || !(product as unknown as { inStock: boolean }).inStock) return [];
          const current = product as unknown as { id: string; slug: string; name: string; price: number; unit: string; weight: number; imageUrl: string };
          return [{ productId: current.id, slug: current.slug, name: current.name, price: current.price, unit: current.unit, weight: current.weight, imageUrl: current.imageUrl, quantity: item.quantity }];
        });
        const merged = Array.from(reconciled.reduce((map, item) => {
          const existing = map.get(item.productId);
          map.set(item.productId, existing ? { ...item, quantity: Math.min(existing.quantity + item.quantity, 50) } : item);
          return map;
        }, new Map<string, CartItem>()).values());
        if (JSON.stringify(merged) !== JSON.stringify(items)) setCartItems(merged);
      })
      .catch((error: unknown) => {
        if (!(error instanceof Error && error.name === "AbortError")) console.error("Cart refresh failed", error);
      });
    return () => controller.abort();
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
    ensureInitialized();
    const existing = cartItems.find((i) => i.productId === item.productId);
    const next = existing
      ? cartItems.map((i) =>
          i.productId === item.productId ? { ...i, ...item, quantity: i.quantity + quantity } : i
        )
      : [...cartItems, { ...item, quantity }];
    setCartItems(next);
  }, []);

  const removeItem = useCallback((productId: string) => {
    ensureInitialized();
    setCartItems(cartItems.filter((i) => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    ensureInitialized();
    if (quantity <= 0) {
      setCartItems(cartItems.filter((i) => i.productId !== productId));
      return;
    }
    setCartItems(cartItems.map((i) => (i.productId === productId ? { ...i, quantity } : i)));
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);
  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const totalWeight = useMemo(() => items.reduce((sum, i) => sum + Math.max(0, i.weight ?? 0) * i.quantity, 0), [items]);

  const value = useMemo<CartContextValue>(
    () => ({ items, addItem, removeItem, updateQuantity, clearCart, subtotal, itemCount, totalWeight }),
    [items, addItem, removeItem, updateQuantity, clearCart, subtotal, itemCount, totalWeight]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
