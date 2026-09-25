import { createContext, useContext, useState, ReactNode } from "react";

interface TenantInfo {
  companyName: string;
  subscriptionPlan: "STARTER" | "GROWTH" | "ENTERPRISE";
  setupFeePaid: boolean;
}

interface TenantContextValue {
  tenant: TenantInfo | null;
  setTenant: (tenant: TenantInfo) => void;
}

const TenantContext = createContext<TenantContextValue | undefined>(undefined);

export function TenantProvider({ children }: { children: ReactNode }) {
  const [tenant, setTenant] = useState<TenantInfo | null>(null);
  return <TenantContext.Provider value={{ tenant, setTenant }}>{children}</TenantContext.Provider>;
}

export function useTenant(): TenantContextValue {
  const ctx = useContext(TenantContext);
  if (!ctx) throw new Error("useTenant must be used within TenantProvider");
  return ctx;
}
