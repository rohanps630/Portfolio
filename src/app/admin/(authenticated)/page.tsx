import Link from "next/link";
import { getDb } from "@/lib/db";
import { FolderKanban, FileText, Mail, MailWarning, Plus } from "lucide-react";

interface Submission {
  id: number;
  name: string;
  email: string;
  project_type: string;
  budget: string;
  message: string;
  read: number;
  created_at: string;
}

export default function AdminDashboardPage() {
  const db = getDb();

  const totalProjects = (
    db.prepare("SELECT COUNT(*) as count FROM projects").get() as { count: number }
  ).count;

  const totalPosts = (
    db.prepare("SELECT COUNT(*) as count FROM blog_posts").get() as { count: number }
  ).count;

  const totalSubmissions = (
    db.prepare("SELECT COUNT(*) as count FROM contact_submissions").get() as { count: number }
  ).count;

  const unreadSubmissions = (
    db.prepare("SELECT COUNT(*) as count FROM contact_submissions WHERE read = 0").get() as {
      count: number;
    }
  ).count;

  const recentSubmissions = db
    .prepare("SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 5")
    .all() as Submission[];

  const stats = [
    { label: "Projects", value: totalProjects, icon: FolderKanban, color: "text-[#6366f1]", bg: "bg-[#6366f1]/10" },
    { label: "Blog Posts", value: totalPosts, icon: FileText, color: "text-[#22c55e]", bg: "bg-[#22c55e]/10" },
    { label: "Submissions", value: totalSubmissions, icon: Mail, color: "text-[#f59e0b]", bg: "bg-[#f59e0b]/10" },
    { label: "Unread", value: unreadSubmissions, icon: MailWarning, color: "text-[#ef4444]", bg: "bg-[#ef4444]/10" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-[#f0f0f5]">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-[#111128] border border-[#1e1e3a] rounded-xl p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <Icon size={20} className={stat.color} />
                </div>
                <span className="text-sm text-[#8888a0]">{stat.label}</span>
              </div>
              <p className="text-3xl font-heading font-bold text-[#f0f0f5]">
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
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#6366f1] hover:bg-[#818cf8] text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          New Project
        </Link>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#111128] border border-[#1e1e3a] hover:border-[#6366f1] text-[#f0f0f5] text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          New Blog Post
        </Link>
      </div>

      {/* Recent Submissions */}
      <div className="bg-[#111128] border border-[#1e1e3a] rounded-xl">
        <div className="px-5 py-4 border-b border-[#1e1e3a] flex items-center justify-between">
          <h2 className="text-lg font-heading font-semibold text-[#f0f0f5]">
            Recent Submissions
          </h2>
          <Link
            href="/admin/submissions"
            className="text-sm text-[#6366f1] hover:text-[#818cf8] transition-colors"
          >
            View all
          </Link>
        </div>
        {recentSubmissions.length === 0 ? (
          <p className="px-5 py-8 text-center text-[#8888a0] text-sm">
            No submissions yet.
          </p>
        ) : (
          <div className="divide-y divide-[#1e1e3a]">
            {recentSubmissions.map((sub) => (
              <div key={sub.id} className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {!sub.read && (
                    <span className="w-2 h-2 rounded-full bg-[#6366f1] shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-[#f0f0f5]">{sub.name}</p>
                    <p className="text-xs text-[#8888a0]">{sub.email}</p>
                  </div>
                </div>
                <span className="text-xs text-[#8888a0]">
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
