import { Suspense } from "react";
import Link from "next/link";
import { getSystems, getSystemDomains, getSystemContexts } from "@/lib/systems";
import { createMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SystemFilter } from "@/components/systems/SystemFilter";
import { SystemRow } from "@/components/ui/SystemRow";
import { SystemCard } from "@/components/ui/SystemCard";

export const metadata = createMetadata({
  title: "Work — Engineering Case Studies",
  description:
    "Engineering case studies for AI systems, platforms, and products by Rohan P. Suresh.",
  path: "/projects",
});

interface ProjectsPageProps {
  searchParams: Promise<{ domain?: string; context?: string }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const { domain, context } = await searchParams;
  const [allSystems, domains, contexts] = await Promise.all([
    getSystems(),
    getSystemDomains(),
    getSystemContexts(),
  ]);

  const filteredSystems = allSystems.filter((s) => {
    if (domain && s.domain !== domain) return false;
    if (context && s.context !== context) return false;
    return true;
  });

  const tier1 = filteredSystems.filter((s) => s.tier === 1);
  const tier2 = filteredSystems.filter((s) => s.tier === 2);
  const tier3 = filteredSystems.filter((s) => s.tier === 3);

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          as="h1"
          label="Work"
          title="Engineering Case Studies"
          subtitle="A structured look at systems I've built, focusing on the problem, architecture, decisions made, and measurable outcomes."
        />

        <Suspense fallback={null}>
          <SystemFilter
            domains={domains}
            contexts={contexts}
            totalCount={allSystems.length}
          />
        </Suspense>

        {filteredSystems.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-border rounded-xl">
            <h3 className="font-heading text-xl font-bold mb-2">
              No systems found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to see more results.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-24">
            {tier1.length > 0 && (
              <section>
                <div className="flex flex-col">
                  {tier1.map((system) => (
                    <SystemRow key={system.slug} system={system} />
                  ))}
                </div>
              </section>
            )}

            {tier2.length > 0 && (
              <section>
                <h2 className="font-heading text-2xl font-bold mb-8 flex items-center gap-4">
                  Production Systems
                  <div className="flex-grow h-px bg-border"></div>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tier2.map((system) => (
                    <SystemCard key={system.slug} system={system} />
                  ))}
                </div>
              </section>
            )}

            {tier3.length > 0 && (
              <section>
                <h2 className="font-heading text-2xl font-bold mb-8 flex items-center gap-4">
                  Archive
                  <div className="flex-grow h-px bg-border"></div>
                </h2>
                <div className="flex flex-col gap-4">
                  {tier3.map((system) => (
                    <div
                      key={system.slug}
                      className="relative flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-border/50 last:border-0 group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                        <span className="mono-label text-muted-foreground">
                          {system.year}
                        </span>
                        <div>
                          <h3 className="font-bold text-foreground group-hover:text-accent transition-colors">
                            {system.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {system.thesis}
                          </p>
                        </div>
                      </div>
                      <div className="hidden lg:flex items-center gap-2">
                        {system.techStack.slice(0, 3).map((t) => (
                          <span
                            key={t.name}
                            className="mono-label text-[0.65rem] bg-muted px-2 py-0.5 rounded-full text-muted-foreground"
                          >
                            {t.name}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/projects/${system.slug}`}
                        className="absolute inset-0"
                      >
                        <span className="sr-only">View {system.title}</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
