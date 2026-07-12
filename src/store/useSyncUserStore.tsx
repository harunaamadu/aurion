"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/store/useUserStore";

export function SyncUserStore() {
  const { data: session, status } = useSession();
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    if (status === "unauthenticated") setUser(null);
    else if (session?.user) setUser(session.user);
  }, [session, status, setUser]);

  return null;
}