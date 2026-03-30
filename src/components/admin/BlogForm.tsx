"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface BlogData {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  cover_image: string;
  date: string;
  published: boolean;
}

const defaultPost: BlogData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "react",
  tags: [],
  cover_image: "",
  date: new Date().toISOString().split("T")[0],
  published: false,
};

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function BlogForm({ initialData }: { initialData?: BlogData }) {
  const isEditing = Boolean(initialData?.id);
  const [data, setData] = useState<BlogData>({
    ...defaultPost,
    ...initialData,
  });
  const [tagsInput, setTagsInput] = useState(
    initialData?.tags?.join(", ") ?? ""
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const updateField = <K extends keyof BlogData>(
    key: K,
    value: BlogData[K]
  ) => {
    setData((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && !isEditing) {
        next.slug = slugify(value as string);
      }
      return next;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      ...data,
      tags: tagsInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      const url = isEditing
        ? `/api/admin/blog/${data.id}`
        : "/api/admin/blog";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/blog");
        router.refresh();
      } else {
        const result = await res.json();
        setError(result.error || "Failed to save post");
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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {error && (
        <div className="px-4 py-3 text-sm text-[#ef4444] bg-[#ef4444]/10 rounded-lg border border-[#ef4444]/20">
          {error}
        </div>
      )}

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
        <label className={labelClass}>Excerpt</label>
        <textarea
          value={data.excerpt}
          onChange={(e) => updateField("excerpt", e.target.value)}
          rows={2}
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
            <option value="architecture">Architecture</option>
            <option value="react">React</option>
            <option value="mobile">Mobile</option>
            <option value="ai">AI</option>
            <option value="devops">DevOps</option>
            <option value="career">Career</option>
            <option value="accessibility">Accessibility</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Date</label>
          <input
            type="date"
            value={data.date}
            onChange={(e) => updateField("date", e.target.value)}
            className={inputClass}
            required
          />
        </div>
        <div className="flex items-end pb-1">
          <label className="flex items-center gap-2 text-sm text-[#8888a0] cursor-pointer">
            <input
              type="checkbox"
              checked={data.published}
              onChange={(e) => updateField("published", e.target.checked)}
              className="w-4 h-4 rounded border-[#1e1e3a] bg-[#0a0a12] text-[#6366f1] focus:ring-[#6366f1]"
            />
            Published
          </label>
        </div>
      </div>

      <div>
        <label className={labelClass}>Tags (comma-separated)</label>
        <input
          type="text"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="react, typescript, performance"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Cover Image URL</label>
        <input
          type="text"
          value={data.cover_image}
          onChange={(e) => updateField("cover_image", e.target.value)}
          placeholder="/images/blog/..."
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Content (MDX)</label>
        <textarea
          value={data.content}
          onChange={(e) => updateField("content", e.target.value)}
          rows={20}
          className={`${inputClass} font-mono text-xs leading-relaxed`}
          placeholder="Write your blog post content in MDX format..."
          required
        />
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-[#1e1e3a]">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-[#6366f1] hover:bg-[#818cf8] text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : isEditing
              ? "Update Post"
              : "Create Post"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/blog")}
          className="px-6 py-2.5 text-sm text-[#8888a0] hover:text-[#f0f0f5] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
