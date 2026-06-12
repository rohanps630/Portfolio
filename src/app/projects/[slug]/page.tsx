import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";
import { getSystemBySlug, getSystems } from "@/lib/systems";
import { getArchitectureBySlug } from "@/content/architectures";
import { createMetadata, generateOgImageUrl } from "@/lib/seo";
import { Explorer } from "@/components/explorer/Explorer";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { MetricFact } from "@/components/ui/MetricFact";
import { DecisionRecordBlock } from "@/components/ui/DecisionRecord";
import { EvidenceLink } from "@/components/ui/EvidenceLink";
import { RelatedNotes } from "@/components/notes/RelatedNotes";

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
    title: `${system.title} — Case Study`,
    description: system.executiveSummary,
    path: `/projects/${system.slug}`,
    image: generateOgImageUrl(system.title, system.executiveSummary, "system"),
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const system = await getSystemBySlug(slug);
  const architecture = getArchitectureBySlug(slug);

  if (!system) {
    notFound();
  }

  return (
    <main className="pb-24 pt-24">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <Link 
          href="/projects" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Work
        </Link>
        
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <StatusBadge status={system.status} />
          {system.confidentiality && (
            <span className="px-3 py-1 bg-warning/10 text-warning border border-warning/20 rounded-full text-xs font-medium uppercase tracking-wider">
              {system.confidentiality}
            </span>
          )}
          <span className="mono-label text-muted-foreground">{system.year}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mb-6 max-w-4xl">
          {system.title}
        </h1>
        
        <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
          {system.thesis}
        </p>
      </header>

      {/* TL;DR Strip */}
      <div className="border-y border-border bg-card/50 backdrop-blur-sm mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <span className="mono-label text-muted-foreground block mb-2">Role</span>
              <p className="font-medium text-foreground">{system.role}</p>
            </div>
            {system.outcomes.slice(0, 3).map((metric, i) => (
              <MetricFact key={i} fact={metric} />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Layout with ToC */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Sticky ToC Rail */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-24 self-start">
            <nav className="space-y-1 border-l-2 border-border pl-4">
              <span className="mono-label text-muted-foreground block mb-4 uppercase tracking-wider">
                Contents
              </span>
              <a href="#context" className="block py-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                Context & Problem
              </a>
              <a href="#constraints" className="block py-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                Constraints
              </a>
              <a href="#architecture" className="block py-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                Architecture
              </a>
              <a href="#decisions" className="block py-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                Key Decisions
              </a>
              <a href="#outcomes" className="block py-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                Outcomes & Lessons
              </a>
            </nav>
          </aside>

          {/* Content Sections */}
          <article className="flex-1 max-w-3xl space-y-24" data-pagefind-body>
            
            {/* Context & Problem */}
            <section id="context" className="scroll-mt-24">
              <h2 className="text-3xl font-heading font-bold mb-6 text-foreground">
                Context & Problem
              </h2>
              <div className="prose prose-lg dark:prose-invert">
                <p>{system.businessContext}</p>
                <p>{system.problemStatement}</p>
              </div>
            </section>

            {/* Constraints */}
            <section id="constraints" className="scroll-mt-24">
              <h2 className="text-3xl font-heading font-bold mb-6 text-foreground">
                Design Constraints
              </h2>
              <ul className="space-y-4">
                {system.constraints.map((c, i) => (
                  <li key={i} className="flex gap-4 p-4 border border-border rounded-lg bg-card">
                    <span className="px-2 py-1 bg-muted rounded text-xs font-mono text-muted-foreground self-start uppercase tracking-wider shrink-0 mt-0.5">
                      {c.kind}
                    </span>
                    <span className="text-foreground leading-relaxed">{c.text}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Architecture */}
            <section id="architecture" className="scroll-mt-24">
              <h2 className="text-3xl font-heading font-bold mb-6 text-foreground">
                Architecture Overview
              </h2>
              <div className="prose prose-lg dark:prose-invert mb-8">
                <p>{system.solutionOverview}</p>
              </div>

              {/* Interactive Architecture Explorer */}
              {architecture && (
                <div className="mb-12">
                  <div className="mb-4 flex justify-between items-end">
                    <h3 className="text-xl font-heading font-semibold">Interactive Architecture</h3>
                    <Link 
                      href={`/explorer/${system.slug}`}
                      className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
                      target="_blank"
                    >
                      Open full screen ↗
                    </Link>
                  </div>
                  <Suspense fallback={<div className="h-[600px] bg-muted/20 rounded-xl animate-pulse flex items-center justify-center">Loading Explorer...</div>}>
                    <Explorer model={architecture} embedded={true} />
                  </Suspense>
                </div>
              )}
              
              {/* Static Diagrams Fallback or Supplemental */}
              {system.staticDiagrams && system.staticDiagrams.length > 0 && (
                <div className="space-y-8">
                  {system.staticDiagrams.map((diag, i) => (
                    <figure key={i} className="rounded-xl overflow-hidden border border-border bg-card">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={diag.src} 
                        alt={diag.alt}
                        className="w-full h-auto object-cover"
                      />
                      {(diag.caption || diag.summary) && (
                        <figcaption className="p-4 bg-muted border-t border-border">
                          {diag.caption && <p className="font-medium text-foreground mb-1">{diag.caption}</p>}
                          {diag.summary && <p className="text-sm text-muted-foreground leading-relaxed">{diag.summary}</p>}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              )}
            </section>

            {/* Decisions */}
            <section id="decisions" className="scroll-mt-24">
              <h2 className="text-3xl font-heading font-bold mb-6 text-foreground">
                Key Engineering Decisions
              </h2>
              <div className="space-y-6">
                {system.decisions.map((decision) => (
                  <DecisionRecordBlock key={decision.id} decision={decision} />
                ))}
              </div>
            </section>

            {/* Outcomes & Lessons */}
            <section id="outcomes" className="scroll-mt-24">
              <h2 className="text-3xl font-heading font-bold mb-6 text-foreground">
                Outcomes & Lessons Learned
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {system.outcomes.map((metric, i) => (
                  <div key={i} className="p-6 border border-border rounded-xl bg-card">
                    <MetricFact fact={metric} />
                  </div>
                ))}
              </div>

              {system.lessons.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-xl font-heading font-semibold mb-4">Retrospective</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground prose prose-lg dark:prose-invert">
                    {system.lessons.map((lesson, i) => (
                      <li key={i}>{lesson}</li>
                    ))}
                  </ul>
                </div>
              )}

              {system.evidence.length > 0 && (
                <div>
                  <h3 className="text-xl font-heading font-semibold mb-4">Evidence & Links</h3>
                  <div className="flex flex-wrap gap-4">
                    {system.evidence.map((link, i) => (
                      <EvidenceLink key={i} evidence={link} />
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Related Engineering Notes */}
            <RelatedNotes systemSlug={system.slug} />
          </article>
        </div>
      </div>
    </main>
  );
}
