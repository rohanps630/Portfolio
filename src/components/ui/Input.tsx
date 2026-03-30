import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
    const errorId = `${inputId}-error`;

    return (
      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-foreground"
        >
          {label}
          {props.required && (
            <span className="text-error ml-1" aria-hidden="true">*</span>
          )}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-lg border bg-muted px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent",
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

Input.displayName = "Input";

export { Input };
