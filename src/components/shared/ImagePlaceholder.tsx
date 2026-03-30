import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  title: string;
  category?: string;
  aspectRatio?: "video" | "square" | "wide";
  className?: string;
  alt?: string;
}

const categoryGradients: Record<string, string> = {
  "web-app": "from-blue-600/20 to-purple-600/20",
  "mobile-app": "from-emerald-600/20 to-teal-600/20",
  "full-stack": "from-orange-600/20 to-red-600/20",
  "ai-ml": "from-violet-600/20 to-pink-600/20",
  default: "from-accent/20 to-purple-600/20",
};

export function ImagePlaceholder({
  title,
  category,
  aspectRatio = "video",
  className,
  alt,
}: ImagePlaceholderProps) {
  const gradient = categoryGradients[category || "default"] || categoryGradients.default;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-gradient-to-br border border-border",
        gradient,
        {
          "aspect-video": aspectRatio === "video",
          "aspect-square": aspectRatio === "square",
          "aspect-[21/9]": aspectRatio === "wide",
        },
        className
      )}
      {...(alt ? { role: "img", "aria-label": alt } : { "aria-hidden": true as const })}
    >
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <p className="text-center font-heading text-lg font-semibold text-foreground/30">
          {title}
        </p>
      </div>
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
