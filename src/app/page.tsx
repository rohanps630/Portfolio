import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedSystems } from "@/components/home/FeaturedSystems";
import { TechStackBar } from "@/components/home/TechStackBar";
import { BlogPreview } from "@/components/home/BlogPreview";
import { CTASection } from "@/components/home/CTASection";
import { getAllPosts } from "@/lib/mdx";
import { getFeaturedSystems } from "@/lib/systems";
import { getTechStack, getStats } from "@/lib/data";

export const metadata = createMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

export default async function Home() {
  const [blogPosts, featuredSystems, techStack, stats] = await Promise.all([
    getAllPosts(),
    getFeaturedSystems(),
    getTechStack(),
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

      <section className="py-20 md:py-28">
        <TechStackBar techs={techStack} />
      </section>

      <section className="py-20 md:py-28">
        <BlogPreview posts={blogPosts.slice(0, 3)} />
      </section>

      <section className="py-20 md:py-28">
        <CTASection />
      </section>
    </>
  );
}
