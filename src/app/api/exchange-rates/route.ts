import { NextResponse } from "next/server";
import type { ExchangeRates } from "@/types/currency";

// Free, keyless endpoint for local dev. Swap for a paid provider
// (exchangerate-api.com, currencyapi.com, openexchangerates.org) in
// production if you need uptime guarantees or more currencies.
const SOURCE_URL = "https://open.er-api.com/v6/latest/USD";

export async function GET() {
  try {
    const res = await fetch(SOURCE_URL, {
      // Cache on the server for an hour so every client isn't hitting the
      // upstream API directly — matches the client's own hourly refresh.
      next: { revalidate: 60 * 60 },
    });

    if (!res.ok) {
      throw new Error(`Upstream rate provider responded ${res.status}`);
    }

    const data = await res.json();

    if (data.result !== "success" || !data.rates) {
      throw new Error("Upstream rate provider returned an unexpected payload");
    }

    const payload: ExchangeRates = {
      base: data.base_code ?? "USD",
      rates: data.rates,
      fetchedAt: Date.now(),
    };

    return NextResponse.json(payload);
  } catch (err) {
    console.error("[/api/exchange-rates]", err);
    return NextResponse.json({ error: "Failed to fetch exchange rates" }, { status: 502 });
  }
}