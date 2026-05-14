"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import {
  contactFormSchema,
  type ContactFormData,
  projectTypeLabels,
  timelineLabels,
} from "@/types/contact";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import { FormSuccess } from "@/components/contact/FormSuccess";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "full-time",
      budget: "not-sure",
      timeline: "flexible",
      message: "",
      website: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return <FormSuccess />;
  }

  const projectTypeOptions = Object.entries(projectTypeLabels).map(
    ([value, label]) => ({ value, label })
  );

  const timelineOptions = Object.entries(timelineLabels).map(
    ([value, label]) => ({ value, label })
  );

  return (
    <FadeIn direction="left">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {/* Honeypot */}
        <div
          style={{ position: "absolute", left: "-9999px" }}
          aria-hidden="true"
        >
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>

        <FadeIn delay={0}>
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6${errors.name ? ' animate-shake' : ''}${errors.email ? ' animate-shake' : ''}`}>
            <Input
              label="Name"
              placeholder="Your name"
              required
              error={errors.name?.message}
              {...register("name")}
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              required
              error={errors.email?.message}
              {...register("email")}
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6${errors.projectType || errors.timeline ? ' animate-shake' : ''}`}>
            <Select
              label="What's this about?"
              options={projectTypeOptions}
              required
              error={errors.projectType?.message}
              {...register("projectType")}
            />
            <Select
              label="Timeline"
              options={timelineOptions}
              required
              error={errors.timeline?.message}
              {...register("timeline")}
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className={errors.message ? 'animate-shake' : ''}>
            <Textarea
              label="Message"
              placeholder="A few sentences about what you have in mind — a role, a project, an idea, or just hello."
              required
              error={errors.message?.message}
              {...register("message")}
            />
          </div>
        </FadeIn>

        {serverError && (
          <p className="text-sm text-error" role="alert">
            {serverError}
          </p>
        )}

        <FadeIn delay={0.3}>
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </FadeIn>
      </form>
    </FadeIn>
  );
}
