import { useTenant } from "../../context/TenantContext";
import { Badge } from "../common/Badge";

/** Top bar: broker branding + live DSE market status. Market feed wiring is a TODO. */
export function Header() {
  const { tenant } = useTenant();

  return (
    <header className="h-14 shrink-0 border-b border-border flex items-center justify-between px-5">
      <span className="font-medium text-sm">{tenant?.companyName ?? "Broker Dashboard"}</span>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted font-figures">DSE market: closed</span>
        <Badge label="256-bit encrypted" tone="positive" />
      </div>
    </header>
  );
}
