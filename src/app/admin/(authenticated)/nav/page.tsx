import sql from "@/lib/db";
import { InlineEditableList } from "@/components/admin/InlineEditableList";
import type { FieldDef } from "@/components/admin/InlineEditableList";

const fields: FieldDef[] = [
  { key: "label", label: "Label", placeholder: "Menu item label" },
  { key: "href", label: "Href", placeholder: "/about" },
  { key: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
  { key: "visible", label: "Visible", type: "checkbox", defaultValue: true },
];

export default async function AdminNavPage() {
  const items = await sql`SELECT * FROM nav_items ORDER BY sort_order`;

  return (
    <InlineEditableList
      title="Navigation"
      apiPath="/api/admin/nav"
      fields={fields}
      displayField="label"
      secondaryField="href"
      items={items}
    />
  );
}
