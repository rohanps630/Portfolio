import { createMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Get in touch to discuss your next project. Whether you need an MVP, a full product build, or ongoing development support, I'd love to hear from you.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Contact"
          title="Let's Work Together"
          subtitle="Have a project in mind? Fill out the form below and I'll get back to you within 24 hours."
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
