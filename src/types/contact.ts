import { z } from "zod/v4";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  projectType: z.enum(["full-time", "mvp", "full-product", "consulting", "other"]),
  budget: z.enum(["under-5k", "5k-15k", "15k-30k", "30k-plus", "not-sure"]),
  timeline: z.enum(["asap", "1-3-months", "3-6-months", "flexible"]),
  message: z.string().min(20, "Please share at least a couple of sentences (20+ characters)"),
  website: z.string().max(0, "This field should be empty").optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const projectTypeLabels: Record<ContactFormData["projectType"], string> = {
  "full-time": "Full-time / Contract Role",
  mvp: "Project / MVP Build",
  "full-product": "Full Product Build",
  consulting: "Consulting / Advisory",
  other: "Other / Just Saying Hi",
};

export const budgetLabels: Record<ContactFormData["budget"], string> = {
  "under-5k": "Under $5,000",
  "5k-15k": "$5,000 - $15,000",
  "15k-30k": "$15,000 - $30,000",
  "30k-plus": "$30,000+",
  "not-sure": "Not Specified",
};

export const timelineLabels: Record<ContactFormData["timeline"], string> = {
  asap: "ASAP",
  "1-3-months": "1 - 3 Months",
  "3-6-months": "3 - 6 Months",
  flexible: "Flexible",
};
