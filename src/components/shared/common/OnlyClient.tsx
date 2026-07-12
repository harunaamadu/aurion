"use client";

import { useSyncExternalStore } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
}

// No-op subscription: we never need to be notified of changes, we just need
// a way to report "true" only once we're past hydration on the client.
const emptySubscribe = () => () => {};

export function ClientOnly({
  children,
}: ClientOnlyProps) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) return null;

  return <>{children}</>;
}