import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const textareaId = id || label.toLowerCase().replace(/\s+/g, "-");
    const errorId = `${textareaId}-error`;

    return (
      <div className="space-y-2">
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-foreground"
        >
          {label}
          {props.required && (
            <span className="text-error ml-1" aria-hidden="true">*</span>
          )}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "w-full rounded-lg border bg-muted px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent min-h-[120px] resize-y",
            error ? "border-error" : "border-border",
            className
          )}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? true : undefined}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-sm text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
