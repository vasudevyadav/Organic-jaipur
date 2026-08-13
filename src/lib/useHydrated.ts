import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

// True once mounted on the client. Avoids flashing client-only content
// (e.g. localStorage-derived state) during the initial server-rendered paint.
export function useHydrated(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}
