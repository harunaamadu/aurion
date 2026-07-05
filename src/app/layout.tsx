import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Geom } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

// Heading font (GEOM alternative)
const geom = Geom({
  subsets: ["latin"],
  variable: "--font-heading",
});

// Body font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aurion.shop"),

  title: {
    default: "Aurion",
    template: "%s | Aurion",
  },

  description:
    "Aurion is a modern e-commerce platform for fashion and technology, offering clothing, footwear, accessories, gadgets, and wearables in one seamless experience.",

  keywords: [
    "Aurion",
    "ecommerce",
    "fashion",
    "technology",
    "shoes",
    "clothing",
    "gadgets",
    "smartphones",
    "laptops",
    "wearables",
  ],

  authors: [{ name: "Aurion Team" }],

  openGraph: {
    title: "Aurion",
    description:
      "Shop fashion and tech products in one place with a smooth modern experience.",
    type: "website",
    url: "https://aurion.shop",
    siteName: "Aurion",
  },

  twitter: {
    card: "summary_large_image",
    title: "Aurion",
    description:
      "Shop fashion and tech products in one place with a smooth modern experience.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        inter.variable,
        geom.variable,
        "font-sans",
      )}
      suppressHydrationWarning
    >
      <body>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
