"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Mail,
  ArrowLeft,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/submissions", label: "Submissions", icon: Mail },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#111128] border-r border-[#1e1e3a] flex flex-col z-50">
      <div className="p-6 border-b border-[#1e1e3a]">
        <h1 className="text-lg font-heading font-bold text-[#f0f0f5]">
          Admin Panel
        </h1>
        <p className="text-xs text-[#8888a0] mt-1">Content Management</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#6366f1]/15 text-[#818cf8]"
                  : "text-[#8888a0] hover:text-[#f0f0f5] hover:bg-[#1e1e3a]"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#1e1e3a] space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#8888a0] hover:text-[#f0f0f5] hover:bg-[#1e1e3a] transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#8888a0] hover:text-[#ef4444] hover:bg-[#1e1e3a] transition-colors w-full"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
