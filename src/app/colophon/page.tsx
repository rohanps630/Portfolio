import { createMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Colophon — Architecture & Stack",
  description:
    "How this site was built: the stack, performance targets, accessibility approach, and analytics disclosure.",
  path: "/colophon",
});

export default function ColophonPage() {
  return (
    <div className="pt-24 pb-16">
      <SectionContainer>
        <SectionHeading
          as="h1"
          label="Colophon"
          title="How This Site Was Built"
          subtitle="A transparent look at the architecture, performance targets, and design decisions behind this portfolio."
        />

        <div className="mt-12 max-w-3xl space-y-16">
          {/* The Stack */}
          <section>
            <h2 className="text-2xl font-heading font-semibold mb-6">The Stack</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                This site is built as a static, verifiable system. It uses no database, no complex CMS, and relies entirely on local markdown and TypeScript files for content.
              </p>
              <ul className="mt-4 space-y-2">
                <li><strong>Framework:</strong> Next.js 16 (App Router) + React 19</li>
                <li><strong>Language:</strong> TypeScript 6</li>
                <li><strong>Styling:</strong> Tailwind CSS 4 (CSS-first <code>@theme</code>)</li>
                <li><strong>Animations:</strong> Framer Motion 12 with <code>prefers-reduced-motion</code> gating</li>
                <li><strong>Content:</strong> MDX compiled with <code>next-mdx-remote/rsc</code></li>
                <li><strong>Search:</strong> Pagefind (Static search index)</li>
                <li><strong>Deployment:</strong> Vercel (Edge-cached SSG)</li>
              </ul>
            </div>
          </section>

          {/* Performance */}
          <section>
            <h2 className="text-2xl font-heading font-semibold mb-6">Performance</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                Every route on this site is pre-rendered at build time (SSG). There are no client-side waterfalls for content fetching. Animation components are lazily mounted and respect the OS reduced-motion preference to preserve a fast Largest Contentful Paint (LCP).
              </p>
              <p>
                Current field data targets (Speed Insights):
              </p>
              <ul className="mt-4 space-y-2">
                <li><strong>LCP:</strong> &lt; 1.2s</li>
                <li><strong>INP:</strong> &lt; 50ms</li>
                <li><strong>CLS:</strong> 0.00</li>
              </ul>
            </div>
          </section>

          {/* Accessibility */}
          <section>
            <h2 className="text-2xl font-heading font-semibold mb-6">Accessibility (A11y)</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                A beautiful design is a failure if it isn&apos;t usable. This site was built with a baseline accessibility floor:
              </p>
              <ul className="mt-4 space-y-2">
                <li><strong>Contrast:</strong> All text meets the WCAG AA 4.5:1 ratio minimum.</li>
                <li><strong>Keyboard Navigation:</strong> Every interactive element has a visible <code>:focus-visible</code> ring. You can navigate the entire site without a mouse.</li>
                <li><strong>Reduced Motion:</strong> All Framer Motion animations respect the <code>prefers-reduced-motion</code> media query. If you have animations disabled in your OS, they are disabled here.</li>
                <li><strong>Touch Targets:</strong> Interactive elements on mobile are at least 44x44px.</li>
              </ul>
            </div>
          </section>

          {/* Analytics Disclosure */}
          <section>
            <h2 className="text-2xl font-heading font-semibold mb-6">Analytics & Privacy</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                This site respects your privacy. I use a lightweight, privacy-focused analytics wrapper (Vercel Analytics) that does not use cookies or collect PII. 
                Below is the exhaustive list of custom events tracked:
              </p>
              <ul className="mt-4 space-y-2">
                <li><Badge variant="outline">Search Executed</Badge> — Triggered when a query is run in the Command Palette.</li>
                <li><Badge variant="outline">Search Result Selected</Badge> — Triggered when a search result is clicked.</li>
                <li><Badge variant="outline">contact_submit</Badge> — Triggered when the contact form is successfully submitted.</li>
              </ul>
            </div>
          </section>

          {/* Infrastructure */}
          <section>
            <h2 className="text-2xl font-heading font-semibold mb-6">Infrastructure</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                The CI/CD pipeline enforces strict quality gates before any deployment reaches production.
                You can review the approach in the <Link href="/notes/portfolio-engineering-lab" className="text-accent hover:underline">Portfolio Engineering Lab</Link> note.
              </p>
            </div>
          </section>
        </div>
      </SectionContainer>
    </div>
  );
}
