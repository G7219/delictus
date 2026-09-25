import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/common/Button";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("Incorrect email or password.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy">
      <form onSubmit={handleSubmit} className="w-full max-w-sm border border-border rounded p-6">
        <h1 className="text-lg font-medium mb-1">Sign in</h1>
        <p className="text-sm text-muted mb-5">Broker agent dashboard</p>

        <label className="block text-xs text-muted mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-3 bg-surface border border-border rounded px-3 py-2 text-sm outline-none focus:border-gold"
        />

        <label className="block text-xs text-muted mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 bg-surface border border-border rounded px-3 py-2 text-sm outline-none focus:border-gold"
        />

        {error && <p className="text-rose text-sm mb-3">{error}</p>}

        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
    </div>
  );
}
