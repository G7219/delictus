import { useState, FormEvent } from "react";
import { Button } from "../components/common/Button";
import { api } from "../services/api";

/** BYO Meta Cloud API keys + broker core API endpoint configuration. */
export function Settings() {
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await api.put("/tenant/credentials", Object.fromEntries(form));
    setSaved(true);
  }

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-lg font-medium mb-1">Settings</h1>
      <p className="text-sm text-muted mb-6">Connect your own Meta WhatsApp and broker core API credentials.</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs text-muted mb-1">WhatsApp phone number ID</label>
          <input name="whatsappPhoneNumberId" className="w-full bg-surface border border-border rounded px-3 py-2 text-sm outline-none focus:border-gold" />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">WhatsApp access token</label>
          <input name="whatsappAccessToken" type="password" className="w-full bg-surface border border-border rounded px-3 py-2 text-sm outline-none focus:border-gold" />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Broker core API URL</label>
          <input name="brokerCoreApiUrl" className="w-full bg-surface border border-border rounded px-3 py-2 text-sm outline-none focus:border-gold" />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Broker core API key</label>
          <input name="brokerCoreApiKey" type="password" className="w-full bg-surface border border-border rounded px-3 py-2 text-sm outline-none focus:border-gold" />
        </div>
        <Button type="submit">Save credentials</Button>
        {saved && <p className="text-emerald text-sm">Saved.</p>}
      </form>
    </div>
  );
}
