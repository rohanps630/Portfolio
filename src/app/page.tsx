import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedSystems } from "@/components/home/FeaturedSystems";
import { ValuePillars } from "@/components/home/ValuePillars";
import { CTASection } from "@/components/home/CTASection";
import { getFeaturedSystems } from "@/lib/systems";
import { getStats } from "@/lib/data";

export const metadata = createMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

export default async function Home() {
  const [featuredSystems, stats] = await Promise.all([
    getFeaturedSystems(),
    getStats(),
  ]);

  return (
    <>
      <section className="py-8 md:py-12">
        <HeroSection stats={stats} />
      </section>

      <section className="py-20 md:py-28">
        <FeaturedSystems systems={featuredSystems.slice(0, 3)} />
      </section>

      <section className="py-20 md:py-28 bg-muted/20 border-y border-border/50">
        <ValuePillars />
      </section>

      <section className="py-20 md:py-28">
        <CTASection />
      </section>
    </>
  );
}
