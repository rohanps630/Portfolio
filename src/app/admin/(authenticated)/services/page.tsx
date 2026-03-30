import sql from "@/lib/db";
import { InlineEditableList } from "@/components/admin/InlineEditableList";
import type { FieldDef } from "@/components/admin/InlineEditableList";

const fields: FieldDef[] = [
  { key: "slug", label: "Slug", placeholder: "service-slug" },
  { key: "title", label: "Title", placeholder: "Service title" },
  { key: "description", label: "Description", type: "textarea", placeholder: "Service description" },
  { key: "price", label: "Price", placeholder: "e.g. $500" },
  { key: "timeline", label: "Timeline", placeholder: "e.g. 2-4 weeks" },
  { key: "features", label: "Features (one per line)", jsonArray: true },
  { key: "highlighted", label: "Highlighted", type: "checkbox", defaultValue: false },
  { key: "cta_text", label: "CTA Text", placeholder: "e.g. Get Started" },
  { key: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
  { key: "visible", label: "Visible", type: "checkbox", defaultValue: true },
];

export default async function AdminServicesPage() {
  const services = await sql`SELECT * FROM services ORDER BY sort_order`;

  return (
    <InlineEditableList
      title="Services"
      apiPath="/api/admin/services"
      fields={fields}
      displayField="title"
      secondaryField="description"
      items={services}
    />
  );
}
