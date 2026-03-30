"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";

interface Feature {
  title: string;
  description: string;
}

interface Impact {
  label: string;
  value: string;
  description: string;
}

interface ProjectData {
  id?: number;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  featured: boolean;
  sort_order: number;
  challenge: string;
  role: string;
  approach: string;
  features: Feature[];
  impact: Impact[];
  tech_stack: string[];
  duration: string;
  year: string;
  live_url: string;
  github_url: string;
  cover_image: string;
  screenshots: string[];
}

const defaultProject: ProjectData = {
  title: "",
  slug: "",
  tagline: "",
  description: "",
  category: "web-app",
  featured: false,
  sort_order: 0,
  challenge: "",
  role: "",
  approach: "",
  features: [],
  impact: [],
  tech_stack: [],
  duration: "",
  year: "",
  live_url: "",
  github_url: "",
  cover_image: "",
  screenshots: [],
};

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ProjectForm({ initialData }: { initialData?: ProjectData }) {
  const isEditing = Boolean(initialData?.id);
  const [data, setData] = useState<ProjectData>({
    ...defaultProject,
    ...initialData,
  });
  const [techInput, setTechInput] = useState(
    initialData?.tech_stack?.join(", ") ?? ""
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const updateField = <K extends keyof ProjectData>(
    key: K,
    value: ProjectData[K]
  ) => {
    setData((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && !isEditing) {
        next.slug = slugify(value as string);
      }
      return next;
    });
  };

  // Features
  const addFeature = () => {
    setData((prev) => ({
      ...prev,
      features: [...prev.features, { title: "", description: "" }],
    }));
  };
  const updateFeature = (idx: number, field: keyof Feature, val: string) => {
    setData((prev) => ({
      ...prev,
      features: prev.features.map((f, i) =>
        i === idx ? { ...f, [field]: val } : f
      ),
    }));
  };
  const removeFeature = (idx: number) => {
    setData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== idx),
    }));
  };

  // Impact
  const addImpact = () => {
    setData((prev) => ({
      ...prev,
      impact: [...prev.impact, { label: "", value: "", description: "" }],
    }));
  };
  const updateImpact = (idx: number, field: keyof Impact, val: string) => {
    setData((prev) => ({
      ...prev,
      impact: prev.impact.map((item, i) =>
        i === idx ? { ...item, [field]: val } : item
      ),
    }));
  };
  const removeImpact = (idx: number) => {
    setData((prev) => ({
      ...prev,
      impact: prev.impact.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      ...data,
      tech_stack: techInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      const url = isEditing
        ? `/api/admin/projects/${data.id}`
        : "/api/admin/projects";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/projects");
        router.refresh();
      } else {
        const result = await res.json();
        setError(result.error || "Failed to save project");
      }
    } catch {
      setError("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2 bg-[#0a0a12] border border-[#1e1e3a] rounded-lg text-[#f0f0f5] text-sm placeholder-[#8888a0]/50 focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] transition-colors";
  const labelClass = "block text-sm font-medium text-[#8888a0] mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {error && (
        <div className="px-4 py-3 text-sm text-[#ef4444] bg-[#ef4444]/10 rounded-lg border border-[#ef4444]/20">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <section className="space-y-4">
        <h2 className="text-lg font-heading font-semibold text-[#f0f0f5]">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => updateField("title", e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Slug</label>
            <input
              type="text"
              value={data.slug}
              onChange={(e) => updateField("slug", e.target.value)}
              className={inputClass}
              required
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Tagline</label>
          <input
            type="text"
            value={data.tagline}
            onChange={(e) => updateField("tagline", e.target.value)}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea
            value={data.description}
            onChange={(e) => updateField("description", e.target.value)}
            rows={4}
            className={inputClass}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Category</label>
            <select
              value={data.category}
              onChange={(e) => updateField("category", e.target.value)}
              className={inputClass}
            >
              <option value="web-app">Web App</option>
              <option value="mobile-app">Mobile App</option>
              <option value="full-stack">Full Stack</option>
              <option value="ai-ml">AI & ML</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Sort Order</label>
            <input
              type="number"
              value={data.sort_order}
              onChange={(e) =>
                updateField("sort_order", parseInt(e.target.value) || 0)
              }
              className={inputClass}
            />
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 text-sm text-[#8888a0] cursor-pointer">
              <input
                type="checkbox"
                checked={data.featured}
                onChange={(e) => updateField("featured", e.target.checked)}
                className="w-4 h-4 rounded border-[#1e1e3a] bg-[#0a0a12] text-[#6366f1] focus:ring-[#6366f1]"
              />
              Featured project
            </label>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="space-y-4">
        <h2 className="text-lg font-heading font-semibold text-[#f0f0f5]">
          Project Details
        </h2>
        <div>
          <label className={labelClass}>Challenge</label>
          <textarea
            value={data.challenge}
            onChange={(e) => updateField("challenge", e.target.value)}
            rows={3}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Role</label>
          <input
            type="text"
            value={data.role}
            onChange={(e) => updateField("role", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Approach</label>
          <textarea
            value={data.approach}
            onChange={(e) => updateField("approach", e.target.value)}
            rows={3}
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Duration</label>
            <input
              type="text"
              value={data.duration}
              onChange={(e) => updateField("duration", e.target.value)}
              placeholder="e.g. 3 months"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Year</label>
            <input
              type="text"
              value={data.year}
              onChange={(e) => updateField("year", e.target.value)}
              placeholder="e.g. 2025"
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="space-y-4">
        <h2 className="text-lg font-heading font-semibold text-[#f0f0f5]">
          Tech Stack
        </h2>
        <div>
          <label className={labelClass}>
            Technologies (comma-separated)
          </label>
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="React, Next.js, TypeScript, PostgreSQL"
            className={inputClass}
          />
        </div>
      </section>

      {/* Features */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-heading font-semibold text-[#f0f0f5]">
            Features
          </h2>
          <button
            type="button"
            onClick={addFeature}
            className="inline-flex items-center gap-1 text-sm text-[#6366f1] hover:text-[#818cf8] transition-colors"
          >
            <Plus size={14} />
            Add Feature
          </button>
        </div>
        {data.features.map((feat, idx) => (
          <div
            key={idx}
            className="flex gap-3 items-start bg-[#0a0a12] border border-[#1e1e3a] rounded-lg p-3"
          >
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={feat.title}
                onChange={(e) => updateFeature(idx, "title", e.target.value)}
                placeholder="Feature title"
                className={inputClass}
              />
              <textarea
                value={feat.description}
                onChange={(e) =>
                  updateFeature(idx, "description", e.target.value)
                }
                placeholder="Feature description"
                rows={2}
                className={inputClass}
              />
            </div>
            <button
              type="button"
              onClick={() => removeFeature(idx)}
              className="p-1 text-[#8888a0] hover:text-[#ef4444] transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </section>

      {/* Impact */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-heading font-semibold text-[#f0f0f5]">
            Impact Metrics
          </h2>
          <button
            type="button"
            onClick={addImpact}
            className="inline-flex items-center gap-1 text-sm text-[#6366f1] hover:text-[#818cf8] transition-colors"
          >
            <Plus size={14} />
            Add Metric
          </button>
        </div>
        {data.impact.map((item, idx) => (
          <div
            key={idx}
            className="flex gap-3 items-start bg-[#0a0a12] border border-[#1e1e3a] rounded-lg p-3"
          >
            <div className="flex-1 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => updateImpact(idx, "label", e.target.value)}
                  placeholder="Label (e.g. Performance)"
                  className={inputClass}
                />
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) => updateImpact(idx, "value", e.target.value)}
                  placeholder="Value (e.g. 40% faster)"
                  className={inputClass}
                />
              </div>
              <input
                type="text"
                value={item.description}
                onChange={(e) =>
                  updateImpact(idx, "description", e.target.value)
                }
                placeholder="Description"
                className={inputClass}
              />
            </div>
            <button
              type="button"
              onClick={() => removeImpact(idx)}
              className="p-1 text-[#8888a0] hover:text-[#ef4444] transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </section>

      {/* URLs */}
      <section className="space-y-4">
        <h2 className="text-lg font-heading font-semibold text-[#f0f0f5]">
          Links
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Live URL</label>
            <input
              type="url"
              value={data.live_url}
              onChange={(e) => updateField("live_url", e.target.value)}
              placeholder="https://..."
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>GitHub URL</label>
            <input
              type="url"
              value={data.github_url}
              onChange={(e) => updateField("github_url", e.target.value)}
              placeholder="https://github.com/..."
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Submit */}
      <div className="flex items-center gap-3 pt-4 border-t border-[#1e1e3a]">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-[#6366f1] hover:bg-[#818cf8] text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : isEditing
              ? "Update Project"
              : "Create Project"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="px-6 py-2.5 text-sm text-[#8888a0] hover:text-[#f0f0f5] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
