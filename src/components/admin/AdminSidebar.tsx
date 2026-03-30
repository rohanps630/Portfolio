"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Mail,
  ArrowLeft,
  LogOut,
  Menu,
  X,
  Settings,
  Eye,
  Package,
  Quote,
  HelpCircle,
  Navigation,
  BarChart3,
  Code2,
  ListOrdered,
  Sun,
  Moon,
} from "lucide-react";

const contentItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/submissions", label: "Submissions", icon: Mail },
];

const configItems = [
  { href: "/admin/site-config", label: "Site Config", icon: Settings },
  { href: "/admin/pages", label: "Pages", icon: Eye },
  { href: "/admin/services", label: "Services", icon: Package },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/nav", label: "Navigation", icon: Navigation },
  { href: "/admin/stats", label: "Stats", icon: BarChart3 },
  { href: "/admin/tech-stack", label: "Tech Stack", icon: Code2 },
  { href: "/admin/process-steps", label: "Process", icon: ListOrdered },
];

function NavLink({
  item,
  pathname,
  onClick,
}: {
  item: { href: string; label: string; icon: React.ComponentType<{ size?: number }> };
  pathname: string;
  onClick?: () => void;
}) {
  const Icon = item.icon;
  const isActive =
    pathname === item.href ||
    (item.href !== "/admin" && pathname.startsWith(item.href));

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
        isActive
          ? "bg-accent-muted text-accent"
          : "text-muted-foreground hover:text-foreground hover:bg-border"
      }`}
    >
      <Icon size={18} />
      {item.label}
    </Link>
  );
}

function SidebarThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = !mounted || theme === "dark";

  return (
    <button
      onClick={() => mounted && setTheme(isDark ? "light" : "dark")}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-border transition-colors w-full cursor-pointer"
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
      <span suppressHydrationWarning>{isDark ? "Light Mode" : "Dark Mode"}</span>
    </button>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const sidebarContent = (
    <>
      <div className="p-6 border-b border-border">
        <h1 className="text-lg font-heading font-bold text-foreground">
          Admin Panel
        </h1>
        <p className="text-xs text-muted-foreground mt-1">Content Management</p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="px-3 pt-1 pb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          Content
        </p>
        {contentItems.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            pathname={pathname}
            onClick={() => setOpen(false)}
          />
        ))}

        <div className="my-3 border-t border-border" />

        <p className="px-3 pt-1 pb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          Configuration
        </p>
        {configItems.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            pathname={pathname}
            onClick={() => setOpen(false)}
          />
        ))}
      </nav>

      <div className="p-4 border-t border-border space-y-1">
        <SidebarThemeToggle />
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-border transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-error hover:bg-border transition-colors w-full cursor-pointer"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile header bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-card border-b border-border flex items-center px-4 gap-3">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-border transition-colors cursor-pointer"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        <span className="text-sm font-heading font-bold text-foreground">
          Admin Panel
        </span>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile sidebar (slide-out) */}
      <aside
        className={`lg:hidden fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col z-50 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar (always visible) */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex-col z-50">
        {sidebarContent}
      </aside>
    </>
  );
}
