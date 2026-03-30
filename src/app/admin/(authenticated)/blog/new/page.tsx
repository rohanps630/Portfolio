import { BlogForm } from "@/components/admin/BlogForm";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-[#f0f0f5]">
        New Blog Post
      </h1>
      <BlogForm />
    </div>
  );
}
