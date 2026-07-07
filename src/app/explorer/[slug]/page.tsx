import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getArchitectureBySlug, architectures } from "@/content/architectures";
import { Explorer } from "@/components/explorer/Explorer";
import { createMetadata, generateOgImageUrl } from "@/lib/seo";

interface ExplorerPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return architectures.map((model) => ({ slug: model.system }));
}

export async function generateMetadata({ params }: ExplorerPageProps) {
  const { slug } = await params;
  const model = getArchitectureBySlug(slug);
  if (!model) return createMetadata({ title: "Not Found" });

  return createMetadata({
    title: `Architecture Explorer: ${model.system}`,
    description: `Interactive architecture diagram and flow explorer for ${model.system}.`,
    // Without an explicit path the canonical URL defaults to the site root,
    // telling crawlers every explorer page is a duplicate of the homepage.
    path: `/explorer/${slug}`,
    image: generateOgImageUrl(model.system, "Interactive Architecture Explorer", "explorer"),
  });
}

export default async function ExplorerPage({ params }: ExplorerPageProps) {
  const { slug } = await params;
  const model = getArchitectureBySlug(slug);

  if (!model) {
    notFound();
  }

  return (
    <section className="min-h-screen bg-background">
      <h1 className="sr-only">Architecture Explorer: {model.system}</h1>
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading Explorer...</div>}>
        <Explorer model={model} embedded={false} />
      </Suspense>
    </section>
  );
}
