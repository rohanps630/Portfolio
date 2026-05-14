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
    title: "Client-Side & Mobile",
    skills: [
      "Kotlin",
      "Swift",
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "React Native",
    ],
  },
  {
    icon: <Server className="h-6 w-6 text-accent" />,
    title: "Server-Side & APIs",
    skills: [
      "Python",
      "Node.js",
      "Go",
      "NestJS",
      "Express.js",
      "Django",
      "REST APIs",
      "WebSockets",
    ],
  },
  {
    icon: <Database className="h-6 w-6 text-accent" />,
    title: "Data & Infrastructure",
    skills: [
      "MongoDB",
      "PostgreSQL",
      "Docker",
      "Nginx",
      "GitHub Actions",
      "Bitbucket Pipelines",
      "AWS",
    ],
  },
  {
    icon: <Brain className="h-6 w-6 text-accent" />,
    title: "AI & Advanced Tools",
    skills: [
      "Google ADK",
      "Generative AI",
      "Gemini",
      "ChatGPT",
      "Vector Databases",
      "LangChain",
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
