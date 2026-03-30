import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildBreadcrumbJsonLd } from "@/lib/seo";

interface BreadcrumbsProps {
  items: { name: string; href: string }[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const jsonLd = buildBreadcrumbJsonLd(items);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
        <ol className="flex items-center gap-1.5 text-muted-foreground">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {i > 0 && (
                  <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                )}
                {isLast ? (
                  <span aria-current="page" className="text-foreground font-medium">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
