"use client";

import Link from "next/link";
import { siteConfig } from "@/content/site";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { FadeIn } from "@/components/animations/FadeIn";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 mt-24">
      <SectionContainer className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <FadeIn direction="up" delay={0}>
            <div className="md:col-span-2">
              <Logo />
              <p className="mt-4 text-sm text-muted-foreground max-w-sm">
                Full-stack engineer building web, mobile, and AI-integrated
                products. Open to senior roles and selective client work.
              </p>
              <SocialLinks className="mt-5" />
            </div>
          </FadeIn>

          {/* Pages */}
          <FadeIn direction="up" delay={0.1}>
            <div>
              <h3 className="font-heading text-sm font-semibold mb-4">Pages</h3>
              <ul className="space-y-2.5">
                {siteConfig.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/colophon"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Colophon
                  </Link>
                </li>
              </ul>
            </div>
          </FadeIn>

          {/* Contact */}
          <FadeIn direction="up" delay={0.2}>
            <div>
              <h3 className="font-heading text-sm font-semibold mb-4">Contact</h3>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <span className="text-sm text-muted-foreground">
                    {siteConfig.contact.location}
                  </span>
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* suppressHydrationWarning: the year is baked in at build time
                and can lag the client's clock every January until a rebuild. */}
            <p className="text-xs text-muted-foreground" suppressHydrationWarning>
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
              reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Built with Next.js, Tailwind CSS & a lot of coffee.
            </p>
          </div>
        </FadeIn>
      </SectionContainer>
    </footer>
  );
}
