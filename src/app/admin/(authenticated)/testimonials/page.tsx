import sql from "@/lib/db";
import { InlineEditableList } from "@/components/admin/InlineEditableList";
import type { FieldDef } from "@/components/admin/InlineEditableList";

const fields: FieldDef[] = [
  { key: "name", label: "Name", placeholder: "Client name" },
  { key: "role", label: "Role", placeholder: "CEO, CTO, etc." },
  { key: "company", label: "Company", placeholder: "Company name" },
  { key: "content", label: "Testimonial", type: "textarea", placeholder: "What they said..." },
  { key: "avatar", label: "Avatar URL", placeholder: "/images/avatar.jpg" },
  { key: "rating", label: "Rating (1-5)", type: "number", defaultValue: 5 },
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
      secondaryField="content"
      items={testimonials}
    />
  );
}
