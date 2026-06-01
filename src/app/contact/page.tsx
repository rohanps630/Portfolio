import { createMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";

export const metadata = createMetadata({
  title: "Contact — Hire a Full Stack & AI Engineer",
  description:
    "Get in touch with Rohan P. Suresh — available for senior full-stack roles and selective client work. I reply within 24 hours.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          as="h1"
          label="Contact"
          title="Get in Touch with Rohan P. Suresh"
          subtitle="Whether you're hiring, have a project to scope, or just want to say hi — drop a note below and I'll reply within 24 hours."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info — shown first on mobile */}
          <div className="lg:col-span-2 lg:order-2">
            <ContactInfo />
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 lg:order-1">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
