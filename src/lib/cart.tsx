"use client";

import {
  createContext,
  useCallback,
  useContext,
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
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addItem = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
    ensureInitialized();
    const existing = cartItems.find((i) => i.productId === item.productId);
    const next = existing
      ? cartItems.map((i) =>
          i.productId === item.productId ? { ...i, quantity: i.quantity + quantity } : i
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

  const value = useMemo<CartContextValue>(
    () => ({ items, addItem, removeItem, updateQuantity, clearCart, subtotal, itemCount }),
    [items, addItem, removeItem, updateQuantity, clearCart, subtotal, itemCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
