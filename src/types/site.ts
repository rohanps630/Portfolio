import { z } from "zod";
import { siteSchema } from "@/lib/schemas/site";

export type SiteConfig = z.infer<typeof siteSchema>;
