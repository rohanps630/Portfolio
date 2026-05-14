import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TechStackBar } from "@/components/home/TechStackBar";
import { BlogPreview } from "@/components/home/BlogPreview";
import { CTASection } from "@/components/home/CTASection";
import { getAllPosts } from "@/lib/mdx";
import { getFeaturedProjects } from "@/lib/projects";
import { getTechStack, getStats } from "@/lib/data";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function Home() {
  const [blogPosts, featuredProjects, techStack, stats] = await Promise.all([
    getAllPosts(),
    getFeaturedProjects(),
    getTechStack(),
    getStats(),
  ]);

  return (
    <>
      <section className="py-8 md:py-12">
        <HeroSection tagline={siteConfig.tagline} stats={stats} />
      </section>

      <section className="py-20 md:py-28">
        <FeaturedProjects projects={featuredProjects.slice(0, 3)} />
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
