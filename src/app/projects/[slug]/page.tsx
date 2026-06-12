import { notFound } from "next/navigation";
import { getSystemBySlug, getSystems } from "@/lib/systems";
import { createMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const systems = await getSystems();
  return systems.map((system) => ({
    slug: system.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const system = await getSystemBySlug(slug);

  if (!system) {
    return createMetadata({ title: "System Not Found" });
  }

  return createMetadata({
    title: `${system.title} — System Case Study`,
    description: system.thesis,
    path: `/projects/${system.slug}`,
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const system = await getSystemBySlug(slug);

  if (!system) {
    notFound();
  }

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">{system.title}</h1>
        <p className="text-xl text-muted-foreground mb-8">{system.thesis}</p>
        <div className="p-8 border border-border rounded-xl text-center bg-card">
          <p className="text-muted-foreground">
            This case study is currently being migrated to the new System framework format.
            Please check back later.
          </p>
        </div>
      </div>
    </main>
  );
}
