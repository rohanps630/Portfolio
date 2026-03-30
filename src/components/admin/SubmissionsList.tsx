"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, MailOpen, ChevronDown, ChevronUp } from "lucide-react";

interface Submission {
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

const projectTypeLabels: Record<string, string> = {
  mvp: "MVP Development",
  "full-product": "Full Product Build",
  consulting: "Consulting / Advisory",
  other: "Other",
};

const budgetLabels: Record<string, string> = {
  "under-5k": "Under $5,000",
  "5k-15k": "$5,000 - $15,000",
  "15k-30k": "$15,000 - $30,000",
  "30k-plus": "$30,000+",
  "not-sure": "Not Sure Yet",
};

export function SubmissionsList({
  submissions: initialSubmissions,
}: {
  submissions: Submission[];
}) {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const router = useRouter();

  const markAsRead = async (id: number) => {
    const res = await fetch(`/api/admin/submissions/${id}`, {
      method: "PUT",
    });
    if (res.ok) {
      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, read: true } : s))
      );
      router.refresh();
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-x-auto">
      <table className="w-full min-w-[700px]">
        <thead>
          <tr className="border-b border-border">
            <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-8" />
            <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Name
            </th>
            <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Email
            </th>
            <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Type
            </th>
            <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Budget
            </th>
            <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Date
            </th>
            <th className="px-5 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Status
            </th>
            <th className="px-5 py-3 w-8" />
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {submissions.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="px-5 py-8 text-center text-muted-foreground text-sm"
              >
                No submissions yet.
              </td>
            </tr>
          ) : (
            submissions.map((sub) => (
              <>
                <tr
                  key={sub.id}
                  className={`hover:bg-border/50 transition-colors cursor-pointer ${
                    !sub.read ? "bg-accent/5" : ""
                  }`}
                  onClick={() => toggleExpand(sub.id)}
                >
                  <td className="px-5 py-3">
                    {!sub.read && (
                      <span className="w-2 h-2 rounded-full bg-accent block" />
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-sm ${!sub.read ? "font-semibold text-foreground" : "text-foreground"}`}
                    >
                      {sub.name}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-muted-foreground">
                    {sub.email}
                  </td>
                  <td className="px-5 py-3 text-sm text-muted-foreground">
                    {projectTypeLabels[sub.project_type] || sub.project_type}
                  </td>
                  <td className="px-5 py-3 text-sm text-muted-foreground">
                    {budgetLabels[sub.budget] || sub.budget}
                  </td>
                  <td className="px-5 py-3 text-sm text-muted-foreground">
                    {new Date(sub.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3 text-center">
                    {sub.read ? (
                      <MailOpen size={16} className="inline text-muted-foreground" />
                    ) : (
                      <Mail size={16} className="inline text-accent" />
                    )}
                  </td>
                  <td className="px-5 py-3">
                    {expandedId === sub.id ? (
                      <ChevronUp size={16} className="text-muted-foreground" />
                    ) : (
                      <ChevronDown size={16} className="text-muted-foreground" />
                    )}
                  </td>
                </tr>
                {expandedId === sub.id && (
                  <tr key={`${sub.id}-detail`}>
                    <td colSpan={8} className="px-5 py-4 bg-background">
                      <div className="space-y-3 max-w-2xl">
                        <div>
                          <span className="text-xs font-medium text-muted-foreground uppercase">
                            Message
                          </span>
                          <p className="mt-1 text-sm text-foreground whitespace-pre-wrap">
                            {sub.message}
                          </p>
                        </div>
                        {sub.timeline && (
                          <div>
                            <span className="text-xs font-medium text-muted-foreground uppercase">
                              Timeline
                            </span>
                            <p className="mt-1 text-sm text-foreground">
                              {sub.timeline}
                            </p>
                          </div>
                        )}
                        {!sub.read && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(sub.id);
                            }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs bg-accent hover:bg-accent-hover text-white rounded-md transition-colors"
                          >
                            <MailOpen size={14} />
                            Mark as Read
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
