"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import {
  contactFormSchema,
  type ContactFormData,
  projectTypeLabels,
  budgetLabels,
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
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    control,
    setValue,
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

  useEffect(() => {
    const typeQuery = searchParams.get("type");
    if (typeQuery && Object.keys(projectTypeLabels).includes(typeQuery)) {
      setValue("projectType", typeQuery as ContactFormData["projectType"]);
    }
  }, [searchParams, setValue]);

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
      trackEvent("contact_submit", { type: data.projectType });
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return <FormSuccess />;
  }

  const timelineOptions = Object.entries(timelineLabels).map(
    ([value, label]) => ({ value, label })
  );
  const budgetOptions = Object.entries(budgetLabels).map(
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
          <div className="space-y-4">
            <p id="projectTypeGroup" className="block text-sm font-medium text-foreground">
              What&apos;s this about?
            </p>
            <div 
              role="radiogroup" 
              aria-labelledby="projectTypeGroup"
              className={`grid grid-cols-1 sm:grid-cols-3 gap-3 ${errors.projectType ? 'animate-shake' : ''}`}
            >
              <Controller
                name="projectType"
                control={control}
                render={({ field }) => (
                  <>
                    {Object.entries(projectTypeLabels).map(([value, label]) => (
                      <label
                        key={value}
                        className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background ${
                          field.value === value
                            ? "border-accent bg-accent/10 ring-1 ring-accent"
                            : "border-border bg-card hover:bg-muted/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name={field.name}
                          value={value}
                          checked={field.value === value}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="sr-only"
                        />
                        <span className="flex flex-1">
                          <span className="flex flex-col">
                            <span className="block text-sm font-medium text-foreground">
                              {label}
                            </span>
                          </span>
                        </span>
                        {field.value === value && (
                          <svg
                            className="h-5 w-5 text-accent"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </label>
                    ))}
                  </>
                )}
              />
            </div>
            {errors.projectType && (
              <p className="mt-1 text-sm text-error">{errors.projectType.message}</p>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className={errors.timeline ? 'animate-shake' : ''}>
              <Select
                label="Timeline"
                options={timelineOptions}
                required
                error={errors.timeline?.message}
                {...register("timeline")}
              />
            </div>
            <div className={errors.budget ? 'animate-shake' : ''}>
              <Select
                label="Budget"
                options={budgetOptions}
                required
                error={errors.budget?.message}
                {...register("budget")}
              />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
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

        <FadeIn delay={0.4}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
            <p className="text-sm text-muted-foreground max-w-sm">
              Based in IST. I reply to all non-automated inquiries within 24 hours. Open to remote roles.
            </p>
          </div>
        </FadeIn>
      </form>
    </FadeIn>
  );
}
