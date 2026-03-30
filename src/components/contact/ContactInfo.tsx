"use client";

import { Mail, Phone, MapPin, Clock, Calendar } from "lucide-react";
import { siteConfig } from "@/content/site";
import { FadeIn } from "@/components/animations/FadeIn";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "Chat on WhatsApp",
    href: siteConfig.contact.whatsapp,
  },
  {
    icon: MapPin,
    label: "Location",
    value: siteConfig.contact.location,
    href: undefined,
  },
];

export function ContactInfo() {
  return (
    <FadeIn direction="right" delay={0.2}>
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Get in Touch
          </h2>
          <p className="text-sm text-muted-foreground">
            Prefer a direct conversation? Reach out through any of these
            channels.
          </p>
        </div>

        <div className="space-y-5">
          {contactItems.map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
                <item.icon className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-sm font-medium text-foreground hover:text-accent transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-foreground">
                    {item.value}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* LinkedIn */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
              <svg
                className="h-4 w-4 text-accent"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">LinkedIn</p>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-foreground hover:text-accent transition-colors"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Response time */}
        <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
          <Clock className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            I respond to all inquiries within 24 hours.
          </p>
        </div>

        {/* Schedule a Call */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-accent" />
            <h3 className="text-sm font-semibold text-foreground">
              Schedule a Call
            </h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Prefer a live conversation? Book a time that works for you.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted hover:border-accent/50"
          >
            Book a Call
          </a>
        </div>
      </div>
    </FadeIn>
  );
}
