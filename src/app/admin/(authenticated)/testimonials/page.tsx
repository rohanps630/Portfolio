import sql from "@/lib/db";
import { InlineEditableList } from "@/components/admin/InlineEditableList";
import type { FieldDef } from "@/components/admin/InlineEditableList";

const fields: FieldDef[] = [
  { key: "name", label: "Name", placeholder: "Client name" },
  { key: "role", label: "Role", placeholder: "CEO, CTO, etc." },
  { key: "company", label: "Company", placeholder: "Company name" },
  { key: "quote", label: "What they said", type: "textarea", placeholder: "What they said..." },
  { key: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
  { key: "visible", label: "Visible", type: "checkbox", defaultValue: true },
];

export default async function AdminTestimonialsPage() {
  const testimonials = await sql`SELECT * FROM testimonials ORDER BY sort_order`;

  return (
    <InlineEditableList
      title="Testimonials"
      apiPath="/api/admin/testimonials"
      fields={fields}
      displayField="name"
      secondaryField="quote"
      items={testimonials}
    />
  );
}
