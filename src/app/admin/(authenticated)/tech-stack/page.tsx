import sql from "@/lib/db";
import { InlineEditableList } from "@/components/admin/InlineEditableList";
import type { FieldDef } from "@/components/admin/InlineEditableList";

const fields: FieldDef[] = [
  { key: "name", label: "Name", placeholder: "e.g. React" },
  { key: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
  { key: "visible", label: "Visible", type: "checkbox", defaultValue: true },
];

export default async function AdminTechStackPage() {
  const items = await sql`SELECT * FROM tech_stack ORDER BY sort_order`;

  return (
    <InlineEditableList
      title="Tech Stack"
      apiPath="/api/admin/tech-stack"
      fields={fields}
      displayField="name"
      secondaryField="name"
      items={items}
    />
  );
}
