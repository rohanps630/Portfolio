import { cn } from "@/lib/utils";
import type { EvidenceLink as EvidenceLinkType } from "@/lib/schemas/system";
import { ExternalLink, FileText, Presentation } from "lucide-react";
import { GithubIcon } from "@/components/shared/SocialLinks";

interface EvidenceLinkProps {
  evidence: EvidenceLinkType;
  className?: string;
}

const iconMap = {
  repo: GithubIcon,
  live: ExternalLink,
  writeup: FileText,
  talk: Presentation,
};

export function EvidenceLink({ evidence, className }: EvidenceLinkProps) {
  const Icon = iconMap[evidence.kind];

  return (
    <a
      href={evidence.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group",
        className
      )}
    >
      <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
      <span className="link-underline">{evidence.label}</span>
    </a>
  );
}
