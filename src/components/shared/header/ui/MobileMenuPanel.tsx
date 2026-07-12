"use client";

import { useEffect, useState } from "react";
import { useHeaderPanelStore } from "@/store/useHeaderPanelStore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LOGO_TEXT, PanelTab } from "@/types";
import { MobileMenuLinksTab } from "./MobileMenuLinksTab";
import { MobileCategoriesTab } from "./MobileCategoriesTab";
import { MobileSettingsTab } from "./MobileSettingsTab";

const TAB_TRIGGER_CLASS =
  "rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-primary data-[state=active]:shadow-none";

const MobileMenuPanel = () => {
  const activePanel = useHeaderPanelStore((s) => s.activePanel);
  const openPanel = useHeaderPanelStore((s) => s.openPanel);

  // "menu" and "categories" both open this same sheet — only the starting tab differs.
  const open = activePanel === "menu" || activePanel === "categories";
  const [tab, setTab] = useState<PanelTab>("menu");

  // Default to whichever trigger opened the panel, each time it (re)opens.
  useEffect(() => {
    if (activePanel === "menu" || activePanel === "categories") {
      setTab(activePanel);
    }
  }, [activePanel]);

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => openPanel(next ? activePanel : null)}
    >
      <SheetContent side="left" className="max-[475px]:min-w-full p-0 z-102">
        <SheetHeader className="border-b px-4 py-4">
          <SheetTitle className="font-heading tracking-[0.08em] text-xl">
            {LOGO_TEXT}
          </SheetTitle>
        </SheetHeader>

        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as PanelTab)}
          className="flex h-full flex-col"
        >
          <TabsList className="grid w-full grid-cols-3 rounded-none border-b bg-transparent p-0">
            <TabsTrigger value="menu" className={TAB_TRIGGER_CLASS}>
              Menu
            </TabsTrigger>
            <TabsTrigger value="categories" className={TAB_TRIGGER_CLASS}>
              Categories
            </TabsTrigger>
            <TabsTrigger value="settings" className={TAB_TRIGGER_CLASS}>
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="menu"
            className="flex-1 overflow-y-auto px-4 py-4"
          >
            <MobileMenuLinksTab />
          </TabsContent>

          <TabsContent
            value="categories"
            className="flex-1 overflow-y-auto px-4 py-4"
          >
            <MobileCategoriesTab />
          </TabsContent>

          <TabsContent
            value="settings"
            className="flex-1 overflow-y-auto px-4 py-4"
          >
            <MobileSettingsTab />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenuPanel;