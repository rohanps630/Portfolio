import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getArchitectureBySlug } from "@/content/architectures";
import { Explorer } from "@/components/explorer/Explorer";
import { createMetadata, generateOgImageUrl } from "@/lib/seo";

interface ExplorerPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ExplorerPageProps) {
  const model = getArchitectureBySlug(params.slug);
  if (!model) return createMetadata({ title: "Not Found" });

  return createMetadata({
    title: `Architecture Explorer: ${model.system}`,
    description: `Interactive architecture diagram and flow explorer for ${model.system}.`,
    image: generateOgImageUrl(model.system, "Interactive Architecture Explorer", "explorer"),
  });
}

export default function ExplorerPage({ params }: ExplorerPageProps) {
  const model = getArchitectureBySlug(params.slug);

  if (!model) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading Explorer...</div>}>
        <Explorer model={model} embedded={false} />
      </Suspense>
    </main>
  );
}
