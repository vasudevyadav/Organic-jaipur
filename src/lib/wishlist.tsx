"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const STORAGE_KEY = "oj_wishlist";
const EMPTY: string[] = [];

let wishlistIds: string[] = EMPTY;
let initialized = false;
const listeners = new Set<() => void>();

function readStoredWishlist(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function ensureInitialized() {
  if (!initialized && typeof window !== "undefined") {
    wishlistIds = readStoredWishlist();
    initialized = true;
  }
}

function setWishlistIds(next: string[]) {
  wishlistIds = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): string[] {
  ensureInitialized();
  return wishlistIds;
}

function getServerSnapshot(): string[] {
  return EMPTY;
}

type WishlistContextValue = {
  productIds: string[];
  isWishlisted: (productId: string) => boolean;
  toggle: (productId: string) => void;
  count: number;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const productIds = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((productId: string) => {
    ensureInitialized();
    const next = wishlistIds.includes(productId)
      ? wishlistIds.filter((id) => id !== productId)
      : [...wishlistIds, productId];
    setWishlistIds(next);
  }, []);

  const isWishlisted = useCallback(
    (productId: string) => productIds.includes(productId),
    [productIds]
  );

  const value = useMemo<WishlistContextValue>(
    () => ({ productIds, isWishlisted, toggle, count: productIds.length }),
    [productIds, isWishlisted, toggle]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}
