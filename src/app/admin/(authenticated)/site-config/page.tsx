"use client";

import { useEffect, useState } from "react";
import { Save, Loader2 } from "lucide-react";

const CONFIG_KEYS = [
  { key: "name", label: "Name", placeholder: "Your full name" },
  { key: "title", label: "Title", placeholder: "Full Stack Developer" },
  { key: "tagline", label: "Tagline", placeholder: "A short tagline" },
  { key: "description", label: "Description", placeholder: "Site meta description", multiline: true },
  { key: "email", label: "Email", placeholder: "you@example.com" },
  { key: "phone", label: "Phone", placeholder: "+1 234 567 8900" },
  { key: "location", label: "Location", placeholder: "City, Country" },
  { key: "whatsapp", label: "WhatsApp", placeholder: "WhatsApp number or link" },
  { key: "github", label: "GitHub URL", placeholder: "https://github.com/username" },
  { key: "linkedin", label: "LinkedIn URL", placeholder: "https://linkedin.com/in/username" },
  { key: "site_url", label: "Site URL", placeholder: "https://yoursite.com" },
];

export default function SiteConfigPage() {
  const [config, setConfig] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/site-config")
      .then((r) => r.json())
      .then((data) => {
        setConfig(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const entries = Object.entries(config).map(([key, value]) => ({ key, value }));
      const res = await fetch("/api/admin/site-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries }),
      });
      if (res.ok) {
        setMessage("Configuration saved successfully.");
      } else {
        setMessage("Failed to save configuration.");
      }
    } catch {
      setMessage("Failed to save configuration.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-[#6366f1]" size={24} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-[#f0f0f5]">Site Configuration</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#6366f1] hover:bg-[#818cf8] text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save Changes
        </button>
      </div>

      {message && (
        <div
          className={`px-4 py-3 rounded-lg text-sm ${
            message.includes("success")
              ? "bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20"
              : "bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20"
          }`}
        >
          {message}
        </div>
      )}

      <div className="bg-[#111128] border border-[#1e1e3a] rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CONFIG_KEYS.map(({ key, label, placeholder, multiline }) => (
            <div key={key} className={multiline ? "md:col-span-2" : ""}>
              <label className="block text-sm font-medium text-[#8888a0] mb-1.5">{label}</label>
              {multiline ? (
                <textarea
                  value={config[key] || ""}
                  onChange={(e) => setConfig((prev) => ({ ...prev, [key]: e.target.value }))}
                  placeholder={placeholder}
                  rows={3}
                  className="w-full px-3 py-2 bg-[#0a0a12] border border-[#1e1e3a] rounded-lg text-sm text-[#f0f0f5] placeholder-[#8888a0]/50 focus:outline-none focus:border-[#6366f1] transition-colors"
                />
              ) : (
                <input
                  type="text"
                  value={config[key] || ""}
                  onChange={(e) => setConfig((prev) => ({ ...prev, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full px-3 py-2 bg-[#0a0a12] border border-[#1e1e3a] rounded-lg text-sm text-[#f0f0f5] placeholder-[#8888a0]/50 focus:outline-none focus:border-[#6366f1] transition-colors"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
