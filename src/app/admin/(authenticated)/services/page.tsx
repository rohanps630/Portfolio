import sql from "@/lib/db";
import { InlineEditableList } from "@/components/admin/InlineEditableList";
import type { FieldDef } from "@/components/admin/InlineEditableList";

const fields: FieldDef[] = [
  { key: "title", label: "Title", placeholder: "Service title" },
  { key: "slug", label: "Slug", placeholder: "service-slug" },
  { key: "tagline", label: "Tagline", placeholder: "Short tagline" },
  { key: "description", label: "Description", type: "textarea", placeholder: "Service description" },
  { key: "icon", label: "Icon", placeholder: "Icon name (e.g. Globe)" },
  { key: "features", label: "Features (one per line)", jsonArray: true },
  { key: "price_label", label: "Price Label", placeholder: "e.g. Starting at $500" },
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
      secondaryField="tagline"
      items={services}
    />
  );
}
