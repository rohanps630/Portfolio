import sql from "@/lib/db";
import { InlineEditableList } from "@/components/admin/InlineEditableList";
import type { FieldDef } from "@/components/admin/InlineEditableList";

const fields: FieldDef[] = [
  { key: "name", label: "Name", placeholder: "e.g. React" },
  { key: "category", label: "Category", placeholder: "e.g. Frontend, Backend, DevOps" },
  { key: "icon", label: "Icon", placeholder: "Icon name or URL" },
  { key: "proficiency", label: "Proficiency (0-100)", type: "number", defaultValue: 0 },
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
      secondaryField="category"
      items={items}
    />
  );
}
