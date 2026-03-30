import Link from "next/link";
import sql from "@/lib/db";
import { FolderKanban, FileText, Mail, MailWarning, Plus } from "lucide-react";

interface Submission {
  id: number;
  name: string;
  email: string;
  project_type: string;
  budget: string;
  message: string;
  read: boolean;
  created_at: string;
}

export default async function AdminDashboardPage() {
  const [{ count: totalProjects }] = await sql`SELECT COUNT(*)::int as count FROM projects`;
  const [{ count: totalPosts }] = await sql`SELECT COUNT(*)::int as count FROM blog_posts`;
  const [{ count: totalSubmissions }] = await sql`SELECT COUNT(*)::int as count FROM contact_submissions`;
  const [{ count: unreadSubmissions }] = await sql`SELECT COUNT(*)::int as count FROM contact_submissions WHERE read = false`;

  const recentSubmissions = await sql`SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 5` as Submission[];

  const stats = [
    { label: "Projects", value: totalProjects, icon: FolderKanban, color: "text-accent", bg: "bg-accent/10" },
    { label: "Blog Posts", value: totalPosts, icon: FileText, color: "text-success", bg: "bg-success/10" },
    { label: "Submissions", value: totalSubmissions, icon: Mail, color: "text-warning", bg: "bg-warning/10" },
    { label: "Unread", value: unreadSubmissions, icon: MailWarning, color: "text-error", bg: "bg-error/10" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-foreground">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <Icon size={20} className={stat.color} />
                </div>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <p className="text-3xl font-heading font-bold text-foreground">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          New Project
        </Link>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-card border border-border hover:border-accent text-foreground text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          New Blog Post
        </Link>
      </div>

      {/* Recent Submissions */}
      <div className="bg-card border border-border rounded-xl">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Recent Submissions
          </h2>
          <Link
            href="/admin/submissions"
            className="text-sm text-accent hover:text-accent-hover transition-colors"
          >
            View all
          </Link>
        </div>
        {recentSubmissions.length === 0 ? (
          <p className="px-5 py-8 text-center text-muted-foreground text-sm">
            No submissions yet.
          </p>
        ) : (
          <div className="divide-y divide-border">
            {recentSubmissions.map((sub) => (
              <div key={sub.id} className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {!sub.read && (
                    <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">{sub.name}</p>
                    <p className="text-xs text-muted-foreground">{sub.email}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(sub.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
