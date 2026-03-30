import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, ...props }, ref) => {
    const selectId = id || label.toLowerCase().replace(/\s+/g, "-");
    const errorId = `${selectId}-error`;

    return (
      <div className="space-y-2">
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-foreground"
        >
          {label}
          {props.required && (
            <span className="text-error ml-1" aria-hidden="true">*</span>
          )}
        </label>
        <select
          ref={ref}
          id={selectId}
          className={cn(
            "w-full rounded-lg border bg-muted px-4 py-3 text-sm text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent appearance-none cursor-pointer",
            error ? "border-error" : "border-border",
            className
          )}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? true : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={errorId} className="text-sm text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
