import { getDb } from "@/lib/db";
import { SubmissionsList } from "@/components/admin/SubmissionsList";

interface SubmissionRow {
  id: number;
  name: string;
  email: string;
  project_type: string;
  budget: string;
  timeline: string;
  message: string;
  read: number;
  created_at: string;
}

export default function AdminSubmissionsPage() {
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM contact_submissions ORDER BY created_at DESC")
    .all() as SubmissionRow[];

  const submissions = rows.map((row) => ({
    ...row,
    read: Boolean(row.read),
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-[#f0f0f5]">
        Submissions
      </h1>
      <SubmissionsList submissions={submissions} />
    </div>
  );
}
