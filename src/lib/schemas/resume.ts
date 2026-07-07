import { z } from "zod/v4";

// Mirrors the shape resumeData actually has (and resume/page.tsx reads):
// `title`, `email`, `location`, per-job `date`/`description`, and `skills`.
// Enforced by scripts/validate-content.ts.
export const resumeSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  email: z.email(),
  location: z.string().min(1),
  summary: z.string().min(1),
  experience: z
    .array(
      z.object({
        company: z.string().min(1),
        role: z.string().min(1),
        date: z.string().min(1),
        description: z.array(z.string().min(1)).min(1),
      })
    )
    .min(1),
  education: z.array(
    z.object({
      institution: z.string().min(1),
      degree: z.string().min(1),
      date: z.string().min(1),
    })
  ),
  skills: z.array(z.string().min(1)).min(1),
});
