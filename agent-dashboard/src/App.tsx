import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { TenantProvider, useTenant } from "./context/TenantContext";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Billing } from "./pages/Billing";
import { Settings } from "./pages/Settings";
import { LockoutScreen } from "./pages/LockoutScreen";


function AppShell() {
  const { agent } = useAuth();
  const { tenant } = useTenant();

  if (!agent) return <Login />;
  // TODO: setupFeePaid comes from the tenant fetched after login — wire
  // that fetch in AuthContext before enforcing this in production.
  if (tenant && !tenant.setupFeePaid) return <LockoutScreen />;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/analytics" element={<div className="p-6 text-sm text-muted">Analytics — TODO.</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TenantProvider>
          <AppShell />
        </TenantProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
