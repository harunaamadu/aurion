"use client";

import Link from "next/link";
import { useHeaderPanelStore } from "@/store/useHeaderPanelStore";
import { useUserStore } from "@/store/useUserStore";
import { NAVLINKS } from "@/types/navigations";
import { MENU_LINKS } from "@/types";

export function MobileMenuLinksTab() {
  const openPanel = useHeaderPanelStore((s) => s.openPanel);
  const user = useUserStore((s) => s.user);
  const close = () => openPanel(null);

  // Combined into one list (rather than two separately-mapped arrays) so
  // "not-last" border spacing is based on the actual last rendered link,
  // not the last item of whichever array happened to be mapped first.
  const links = [...NAVLINKS, ...MENU_LINKS];

  return (
    <>
      <nav className="flex flex-col">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={close}
            className="not-last:border-b py-3 text-sm transition-colors hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Link
        href={user ? "/account" : "/login"}
        onClick={close}
        className="mt-4 block rounded-full bg-primary py-2.5 text-center text-sm font-medium text-primary-foreground"
      >
        {user ? "Your account" : "Sign in"}
      </Link>
    </>
  );
}