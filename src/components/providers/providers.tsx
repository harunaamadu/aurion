// src/components/providers/providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { CurrencyProvider } from "./CurrencyProvider";
import { TooltipProvider } from "../ui/tooltip";
import { ThemeProvider } from "./ThemeProvider";
import { SearchPanelProvider } from "@/context/search-context";

interface ProvidersProps {
  children: React.ReactNode;
  // Optionally pass the server-side session to avoid a client waterfall
  session?: Session | null;
}

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <TooltipProvider>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <ThemeProvider>
          <CurrencyProvider>
            <SearchPanelProvider>{children}</SearchPanelProvider>
          </CurrencyProvider>
        </ThemeProvider>
      </SessionProvider>
    </TooltipProvider>
  );
}
