import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AuthenticatedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await verifySession();

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  return (
    <div data-theme="dark" className="flex min-h-screen bg-[#0a0a12]">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}
