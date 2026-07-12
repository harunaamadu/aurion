import { create } from "zustand";

export type HeaderPanel = "menu" | "categories" | "more" | null;

interface HeaderPanelState {
  activePanel: HeaderPanel;
  /** Pass the panel to open, or null to close whatever's open. Opening one panel always closes any other. */
  openPanel: (panel: HeaderPanel) => void;
}

export const useHeaderPanelStore = create<HeaderPanelState>((set) => ({
  activePanel: null,
  openPanel: (panel) => set({ activePanel: panel }),
}));