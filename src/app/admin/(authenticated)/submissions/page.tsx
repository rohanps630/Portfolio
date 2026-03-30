import sql from "@/lib/db";
import { SubmissionsList } from "@/components/admin/SubmissionsList";

interface SubmissionRow {
  id: number;
  name: string;
  email: string;
  project_type: string;
  budget: string;
  timeline: string;
  message: string;
  read: boolean;
  created_at: string;
}

export default async function AdminSubmissionsPage() {
  const submissions = await sql`
    SELECT * FROM contact_submissions ORDER BY created_at DESC
  ` as SubmissionRow[];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">
        Submissions
      </h1>
      <SubmissionsList submissions={submissions} />
    </div>
  );
}
