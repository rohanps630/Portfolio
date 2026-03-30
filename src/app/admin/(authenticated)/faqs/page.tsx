import sql from "@/lib/db";
import { InlineEditableList } from "@/components/admin/InlineEditableList";
import type { FieldDef } from "@/components/admin/InlineEditableList";

const fields: FieldDef[] = [
  { key: "question", label: "Question", placeholder: "Frequently asked question" },
  { key: "answer", label: "Answer", type: "textarea", placeholder: "The answer..." },
  { key: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
  { key: "visible", label: "Visible", type: "checkbox", defaultValue: true },
];

export default async function AdminFaqsPage() {
  const faqs = await sql`SELECT * FROM faqs ORDER BY sort_order`;

  return (
    <InlineEditableList
      title="FAQs"
      apiPath="/api/admin/faqs"
      fields={fields}
      displayField="question"
      secondaryField="answer"
      items={faqs}
    />
  );
}
