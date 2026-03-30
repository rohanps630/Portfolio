import sql from "@/lib/db";
import { InlineEditableList } from "@/components/admin/InlineEditableList";
import type { FieldDef } from "@/components/admin/InlineEditableList";

const fields: FieldDef[] = [
  { key: "label", label: "Label", placeholder: "e.g. Projects Completed" },
  { key: "value", label: "Value", placeholder: "e.g. 50" },
  { key: "suffix", label: "Suffix", placeholder: "e.g. +" },
  { key: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
];

export default async function AdminStatsPage() {
  const stats = await sql`SELECT * FROM stats ORDER BY sort_order`;

  return (
    <InlineEditableList
      title="Stats"
      apiPath="/api/admin/stats"
      fields={fields}
      displayField="label"
      secondaryField="value"
      items={stats}
    />
  );
}
