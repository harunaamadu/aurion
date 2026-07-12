import { create } from "zustand";
import type { Role } from "@/generated/prisma/client";

export interface StoreUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: Role;
}

interface UserState {
  user: StoreUser | null;
  setUser: (user: StoreUser | null) => void;
}

/**
 * Client-side mirror of the authenticated user, kept in sync from a
 * Server Component that already called auth() (see SyncUserStore /
 * wherever the session is read) so client components can read the
 * current user without an extra useSession() round trip.
 */
export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));