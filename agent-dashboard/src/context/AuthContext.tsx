import { createContext, useContext, useState, ReactNode } from "react";
import { api } from "../services/api";

interface Agent {
  id: string;
  name: string;
  role: "ADMIN" | "AGENT";
}

interface AuthContextValue {
  agent: Agent | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [agent, setAgent] = useState<Agent | null>(null);

  async function login(email: string, password: string) {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("dse_agent_token", data.token);
    setAgent(data.agent);
    // TODO: MFA challenge step goes here once the backend supports it.
  }

  function logout() {
    localStorage.removeItem("dse_agent_token");
    setAgent(null);
  }

  return <AuthContext.Provider value={{ agent, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
