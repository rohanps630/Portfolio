"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, X, Check, Loader2 } from "lucide-react";
import { DeleteButton } from "./DeleteButton";

export interface FieldDef {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "checkbox";
  placeholder?: string;
  defaultValue?: string | number | boolean;
  /** If true, this field uses sql.json() on the API side and should be sent as JSON string in the form */
  jsonArray?: boolean;
}

interface InlineEditableListProps {
  title: string;
  apiPath: string;
  fields: FieldDef[];
  /** Which field to show as the primary display in the list */
  displayField: string;
  /** Optional secondary display field */
  secondaryField?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
}

export function InlineEditableList({
  title,
  apiPath,
  fields,
  displayField,
  secondaryField,
  items: initialItems,
}: InlineEditableListProps) {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [items, setItems] = useState<any[]>(initialItems);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);

  const getDefaults = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const defaults: Record<string, any> = {};
    for (const field of fields) {
      if (field.defaultValue !== undefined) {
        defaults[field.key] = field.defaultValue;
      } else if (field.type === "number") {
        defaults[field.key] = 0;
      } else if (field.type === "checkbox") {
        defaults[field.key] = true;
      } else if (field.jsonArray) {
        defaults[field.key] = "";
      } else {
        defaults[field.key] = "";
      }
    }
    return defaults;
  };

  const openAdd = () => {
    setEditingId(null);
    setFormData(getDefaults());
    setShowAdd(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openEdit = (item: any) => {
    setShowAdd(false);
    setEditingId(item.id);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: Record<string, any> = {};
    for (const field of fields) {
      if (field.jsonArray && Array.isArray(item[field.key])) {
        data[field.key] = item[field.key].join("\n");
      } else {
        data[field.key] = item[field.key] ?? "";
      }
    }
    setFormData(data);
  };

  const cancel = () => {
    setShowAdd(false);
    setEditingId(null);
    setFormData({});
  };

  const buildPayload = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: Record<string, any> = {};
    for (const field of fields) {
      if (field.jsonArray) {
        payload[field.key] = (formData[field.key] as string)
          .split("\n")
          .map((s: string) => s.trim())
          .filter(Boolean);
      } else if (field.type === "number") {
        payload[field.key] = Number(formData[field.key]) || 0;
      } else if (field.type === "checkbox") {
        payload[field.key] = !!formData[field.key];
      } else {
        payload[field.key] = formData[field.key];
      }
    }
    return payload;
  };

  const handleAdd = async () => {
    setSaving(true);
    try {
      const res = await fetch(apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      if (res.ok) {
        const created = await res.json();
        setItems((prev) => [...prev, created]);
        cancel();
        router.refresh();
      }
    } catch {
      // silently fail
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    setSaving(true);
    try {
      const res = await fetch(`${apiPath}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      if (res.ok) {
        const updated = await res.json();
        setItems((prev) => prev.map((i) => (i.id === editingId ? updated : i)));
        cancel();
        router.refresh();
      }
    } catch {
      // silently fail
    } finally {
      setSaving(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateField = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const renderForm = () => (
    <div className="bg-[#0a0a12] border border-[#1e1e3a] rounded-lg p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div
            key={field.key}
            className={
              field.type === "textarea" || field.jsonArray ? "md:col-span-2" : ""
            }
          >
            {field.type === "checkbox" ? (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!formData[field.key]}
                  onChange={(e) => updateField(field.key, e.target.checked)}
                  className="rounded border-[#1e1e3a]"
                />
                <span className="text-sm text-[#f0f0f5]">{field.label}</span>
              </label>
            ) : (
              <>
                <label className="block text-xs font-medium text-[#8888a0] mb-1">
                  {field.label}
                </label>
                {field.type === "textarea" || field.jsonArray ? (
                  <textarea
                    value={formData[field.key] ?? ""}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    placeholder={field.jsonArray ? "One per line" : field.placeholder}
                    rows={3}
                    className="w-full px-3 py-2 bg-[#111128] border border-[#1e1e3a] rounded-lg text-sm text-[#f0f0f5] placeholder-[#8888a0]/50 focus:outline-none focus:border-[#6366f1] transition-colors"
                  />
                ) : (
                  <input
                    type={field.type === "number" ? "number" : "text"}
                    value={formData[field.key] ?? ""}
                    onChange={(e) =>
                      updateField(
                        field.key,
                        field.type === "number" ? e.target.value : e.target.value
                      )
                    }
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 bg-[#111128] border border-[#1e1e3a] rounded-lg text-sm text-[#f0f0f5] placeholder-[#8888a0]/50 focus:outline-none focus:border-[#6366f1] transition-colors"
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 pt-2">
        <button
          onClick={showAdd ? handleAdd : handleUpdate}
          disabled={saving}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#6366f1] hover:bg-[#818cf8] text-white text-sm rounded-lg transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
          {showAdd ? "Add" : "Save"}
        </button>
        <button
          onClick={cancel}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[#8888a0] hover:text-[#f0f0f5] text-sm rounded-lg transition-colors"
        >
          <X size={14} />
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-[#f0f0f5]">{title}</h1>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#6366f1] hover:bg-[#818cf8] text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          Add New
        </button>
      </div>

      {showAdd && renderForm()}

      <div className="bg-[#111128] border border-[#1e1e3a] rounded-xl overflow-hidden">
        {items.length === 0 ? (
          <p className="px-5 py-8 text-center text-[#8888a0] text-sm">
            No items yet. Click &quot;Add New&quot; to create one.
          </p>
        ) : (
          <div className="divide-y divide-[#1e1e3a]">
            {items.map((item) => (
              <div key={item.id}>
                {editingId === item.id ? (
                  <div className="p-4">{renderForm()}</div>
                ) : (
                  <div className="flex items-center justify-between px-5 py-3 hover:bg-[#1e1e3a]/50 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-[#f0f0f5]">
                        {item[displayField]}
                      </p>
                      {secondaryField && item[secondaryField] && (
                        <p className="text-xs text-[#8888a0] mt-0.5">
                          {typeof item[secondaryField] === "string" && item[secondaryField].length > 100
                            ? item[secondaryField].substring(0, 100) + "..."
                            : item[secondaryField]}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 shrink-0 ml-4">
                      {item.sort_order !== undefined && (
                        <span className="text-xs text-[#8888a0] mr-2">#{item.sort_order}</span>
                      )}
                      <button
                        onClick={() => openEdit(item)}
                        className="p-1.5 text-[#8888a0] hover:text-[#6366f1] transition-colors rounded-md hover:bg-[#6366f1]/10"
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </button>
                      <DeleteButton endpoint={`${apiPath}/${item.id}`} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
