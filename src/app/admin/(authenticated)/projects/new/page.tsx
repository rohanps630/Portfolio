import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-[#f0f0f5]">
        New Project
      </h1>
      <ProjectForm />
    </div>
  );
}
