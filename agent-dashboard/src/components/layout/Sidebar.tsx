import { NavLink } from "react-router-dom";
import { MessageSquare, BarChart3, CreditCard, Settings as SettingsIcon } from "lucide-react";

const NAV_ITEMS = [
  { to: "/", label: "Chats", icon: MessageSquare },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/billing", label: "Billing", icon: CreditCard },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
];

/** Dark left navigation. Collapsible width is a TODO — fixed width for now. */
export function Sidebar() {
  return (
    <nav className="w-56 shrink-0 bg-surface border-r border-border flex flex-col py-4">
      {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 text-sm ${
              isActive ? "text-ink bg-surfaceHover border-l-2 border-gold" : "text-muted hover:text-ink"
            }`
          }
        >
          <Icon size={17} strokeWidth={1.75} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
