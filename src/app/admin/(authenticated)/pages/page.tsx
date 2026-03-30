"use client";

import { useEffect, useState } from "react";
import { Loader2, Eye, EyeOff } from "lucide-react";

interface PageSection {
  id: number;
  page: string;
  section: string;
  visible: boolean;
}

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
        <Loader2 className="animate-spin text-[#6366f1]" size={24} />
      </div>
    );
  }

  // Group sections by page
  const grouped: Record<string, PageSection[]> = {};
  for (const section of sections) {
    const page = section.page || "General";
    if (!grouped[page]) grouped[page] = [];
    grouped[page].push(section);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-[#f0f0f5]">Page Sections</h1>
      <p className="text-sm text-[#8888a0]">Toggle visibility of page sections across the site.</p>

      {Object.entries(grouped).map(([page, pageSections]) => (
        <div key={page} className="bg-[#111128] border border-[#1e1e3a] rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-[#1e1e3a]">
            <h2 className="text-sm font-heading font-semibold text-[#f0f0f5] uppercase tracking-wider">
              {page}
            </h2>
          </div>
          <div className="divide-y divide-[#1e1e3a]">
            {pageSections.map((section) => (
              <div
                key={section.id}
                className="flex items-center justify-between px-5 py-3 hover:bg-[#1e1e3a]/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {section.visible ? (
                    <Eye size={16} className="text-[#22c55e]" />
                  ) : (
                    <EyeOff size={16} className="text-[#8888a0]/50" />
                  )}
                  <span className="text-sm text-[#f0f0f5]">{section.section}</span>
                </div>
                <button
                  onClick={() => handleToggle(section)}
                  disabled={toggling === section.id}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                    section.visible ? "bg-[#6366f1]" : "bg-[#1e1e3a]"
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
        <div className="bg-[#111128] border border-[#1e1e3a] rounded-xl px-5 py-8 text-center text-[#8888a0] text-sm">
          No page sections found.
        </div>
      )}
    </div>
  );
}
