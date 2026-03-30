import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createMetadata, buildServiceJsonLd } from "@/lib/seo";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { ProcessSteps } from "@/components/services/ProcessSteps";
import { FAQSection } from "@/components/services/FAQSection";
import { getServices, getProcessSteps, getFaqs } from "@/lib/data";

export const metadata = createMetadata({
  title: "Services",
  description:
    "Full stack development services including MVP development, full product builds, and ongoing support. Let's turn your idea into a scalable, production-ready application.",
  path: "/services",
});

export default async function ServicesPage() {
  const [dbServices, processSteps, faqs] = await Promise.all([
    getServices(),
    getProcessSteps(),
    getFaqs(),
  ]);

  const jsonLd = buildServiceJsonLd();

  // Map DB service format to ServiceTier format for the grid
  const services = dbServices.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    price: s.price,
    timeline: s.timeline,
    features: s.features,
    highlighted: s.highlighted,
    ctaText: s.cta_text,
  }));

  return (
    <main className="pt-24 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Service Tiers */}
        <section className="py-12 md:py-20">
          <SectionHeading
            label="Services"
            title="How I Can Help"
            subtitle="Whether you need an MVP to validate your idea or a full-scale product, I offer flexible engagement models to fit your needs."
          />
          <ServiceGrid services={services} />
        </section>

        {/* Development Process */}
        <section className="py-20 md:py-28">
          <SectionHeading
            label="Process"
            title="How I Work"
            subtitle="A transparent, structured approach to delivering high-quality software."
          />
          <ProcessSteps steps={processSteps} />
        </section>

        {/* FAQ */}
        <section className="py-20 md:py-28">
          <SectionHeading
            label="FAQ"
            title="Frequently Asked Questions"
            subtitle="Answers to common questions about working together."
          />
          <FAQSection faqs={faqs} />
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28">
          <div className="rounded-2xl border border-border bg-card p-8 md:p-12 text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Let&apos;s discuss your idea and find the right approach to bring
              it to life. No commitment required.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-4 text-base font-medium text-white shadow-lg shadow-accent/20 transition-all duration-200 hover:bg-accent-hover hover:shadow-accent/30"
            >
              Get in Touch
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
