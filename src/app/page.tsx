import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TechStackBar } from "@/components/home/TechStackBar";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { BlogPreview } from "@/components/home/BlogPreview";
import { CTASection } from "@/components/home/CTASection";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function Home() {
  const blogPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <section className="py-8 md:py-12">
        <HeroSection />
      </section>

      <section className="py-20 md:py-28">
        <FeaturedProjects />
      </section>

      <section className="py-20 md:py-28">
        <TechStackBar />
      </section>

      <section className="py-20 md:py-28">
        <ServicesPreview />
      </section>

      <section className="py-20 md:py-28">
        <TestimonialSection />
      </section>

      <section className="py-20 md:py-28">
        <BlogPreview posts={blogPosts} />
      </section>

      <section className="py-20 md:py-28">
        <CTASection />
      </section>
    </>
  );
}
