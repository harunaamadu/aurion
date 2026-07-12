import LocaleSwitcher from "../LocaleSwitcher";
import NavSettings from "./NavSettings";

export function MobileSettingsTab() {
  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Location &amp; currency
        </p>
        <LocaleSwitcher
          className="text-foreground/80!"
          spanColor="text-foreground!"
          isMobile
        />
      </div>

      <NavSettings />
    </div>
  );
}