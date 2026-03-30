"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
          {
            "bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/20 hover:shadow-accent/30 btn-shimmer":
              variant === "primary",
            "border border-border text-foreground hover:bg-muted hover:border-accent/50":
              variant === "secondary",
            "text-muted-foreground hover:text-foreground hover:bg-muted":
              variant === "ghost",
          },
          {
            "text-sm px-4 py-2 gap-1.5": size === "sm",
            "text-sm px-6 py-3 gap-2": size === "md",
            "text-base px-8 py-4 gap-2.5": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
