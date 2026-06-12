"use client";

import { Monitor, Server, Database, Brain } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { TechBadge } from "@/components/shared/TechBadge";
import { StaggerChildren, staggerItemVariants } from "@/components/animations/StaggerChildren";
import { motion } from "framer-motion";

interface SkillCategory {
  icon: React.ReactNode;
  title: string;
  skills: string[];
}

const categories: SkillCategory[] = [
  {
    icon: <Monitor className="h-6 w-6 text-accent" />,
    title: "Architecture & State",
    skills: [
      "XState",
      "Redux Toolkit",
      "React Native Web",
      "Next.js App Router",
      "React 19",
      "TypeScript",
    ],
  },
  {
    icon: <Brain className="h-6 w-6 text-accent" />,
    title: "AI & Data Engineering",
    skills: [
      "LLM Agents",
      "pgvector",
      "Retrieval Augmented Generation (RAG)",
      "Voyage AI",
      "Cohere",
      "OpenTelemetry / Langfuse",
    ],
  },
  {
    icon: <Server className="h-6 w-6 text-accent" />,
    title: "Backend & APIs",
    skills: [
      "Node.js",
      "NestJS",
      "Go",
      "Python",
      "GraphQL",
      "Redis",
      "PostgreSQL",
    ],
  },
  {
    icon: <Database className="h-6 w-6 text-accent" />,
    title: "Infrastructure & Tools",
    skills: [
      "Docker",
      "AWS",
      "GitHub Actions",
      "Turbopack",
      "ESLint / Zod",
    ],
  },
];

export function SkillsGrid() {
  return (
    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {categories.map((category) => (
        <motion.div key={category.title} variants={staggerItemVariants}>
          <Card className="h-full">
            <div className="flex items-center gap-3 mb-4">
              {category.icon}
              <h3 className="text-lg font-semibold text-foreground">
                {category.title}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <TechBadge key={skill} name={skill} />
              ))}
            </div>
          </Card>
        </motion.div>
      ))}
    </StaggerChildren>
  );
}
