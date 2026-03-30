"use client";

import { useEffect, useState } from "react";
import { Loader2, Eye, EyeOff } from "lucide-react";

interface PageSection {
  id: number;
  key: string;
  label: string;
  visible: boolean;
}

const PAGE_KEYS = ["home", "about", "projects", "blog", "services", "contact"];

export default function AdminPagesPage() {
  const [sections, setSections] = useState<PageSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/admin/pages")
      .then((r) => r.json())
      .then((data) => {
        setSections(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleToggle = async (section: PageSection) => {
    setToggling(section.id);
    try {
      const res = await fetch("/api/admin/pages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: section.id, visible: !section.visible }),
      });
      if (res.ok) {
        setSections((prev) =>
          prev.map((s) => (s.id === section.id ? { ...s, visible: !s.visible } : s))
        );
      }
    } catch {
      // silently fail
    } finally {
      setToggling(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-accent" size={24} />
      </div>
    );
  }

  // Group sections into Pages and Sections categories
  const pages: PageSection[] = [];
  const sectionItems: PageSection[] = [];

  for (const section of sections) {
    if (PAGE_KEYS.includes(section.key)) {
      pages.push(section);
    } else {
      sectionItems.push(section);
    }
  }

  const groups: { label: string; items: PageSection[] }[] = [];
  if (pages.length > 0) groups.push({ label: "Pages", items: pages });
  if (sectionItems.length > 0) groups.push({ label: "Sections", items: sectionItems });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">Page Sections</h1>
      <p className="text-sm text-muted-foreground">Toggle visibility of page sections across the site.</p>

      {groups.map((group) => (
        <div key={group.label} className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-border">
            <h2 className="text-sm font-heading font-semibold text-foreground uppercase tracking-wider">
              {group.label}
            </h2>
          </div>
          <div className="divide-y divide-border">
            {group.items.map((section) => (
              <div
                key={section.id}
                className="flex items-center justify-between px-5 py-3 hover:bg-border/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {section.visible ? (
                    <Eye size={16} className="text-success" />
                  ) : (
                    <EyeOff size={16} className="text-muted-foreground/50" />
                  )}
                  <span className="text-sm text-foreground">{section.label}</span>
                </div>
                <button
                  onClick={() => handleToggle(section)}
                  disabled={toggling === section.id}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                    section.visible ? "bg-accent" : "bg-border"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                      section.visible ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {sections.length === 0 && (
        <div className="bg-card border border-border rounded-xl px-5 py-8 text-center text-muted-foreground text-sm">
          No page sections found.
        </div>
      )}
    </div>
  );
}
