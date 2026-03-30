import sql from "@/lib/db";
import { InlineEditableList } from "@/components/admin/InlineEditableList";
import type { FieldDef } from "@/components/admin/InlineEditableList";

const fields: FieldDef[] = [
  { key: "step_number", label: "Step Number", type: "number", defaultValue: 0 },
  { key: "title", label: "Title", placeholder: "Step title" },
  { key: "description", label: "Description", type: "textarea", placeholder: "Step description" },
  { key: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
  { key: "visible", label: "Visible", type: "checkbox", defaultValue: true },
];

export default async function AdminProcessStepsPage() {
  const steps = await sql`SELECT * FROM process_steps ORDER BY sort_order`;

  return (
    <InlineEditableList
      title="Process Steps"
      apiPath="/api/admin/process-steps"
      fields={fields}
      displayField="title"
      secondaryField="description"
      items={steps}
    />
  );
}
