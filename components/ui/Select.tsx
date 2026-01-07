"use client";

import { forwardRef, SelectHTMLAttributes, ReactNode } from "react";
import { ChevronDown, AlertCircle } from "lucide-react";

type SelectSize = "sm" | "md" | "lg";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  selectSize?: SelectSize;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
}

const sizeClasses: Record<SelectSize, string> = {
  sm: "px-3 py-1.5 text-sm rounded-lg pr-8",
  md: "px-4 py-2.5 text-sm rounded-xl pr-10",
  lg: "px-4 py-3 text-base rounded-xl pr-10",
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      error,
      options,
      placeholder,
      selectSize = "md",
      fullWidth = true,
      leftIcon,
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    const hasError = !!error;

    const stateClasses = hasError
      ? "border-error-500 focus:border-error-500 focus:ring-error-500/20"
      : "border-slate-300 dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500/20";

    return (
      <div className={`${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              {leftIcon}
            </div>
          )}
          <select
            ref={ref}
            disabled={disabled}
            className={`
              w-full appearance-none bg-white dark:bg-slate-900
              border-2 ${stateClasses}
              text-slate-900 dark:text-white
              focus:outline-none focus:ring-4
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-50 dark:disabled:bg-slate-800
              cursor-pointer
              ${sizeClasses[selectSize]}
              ${leftIcon ? "pl-10" : ""}
              ${className}
            `}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
            {hasError && <AlertCircle className="w-4 h-4 text-error-500" />}
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
        </div>
        {(helperText || error) && (
          <p
            className={`mt-1.5 text-sm ${
              hasError ? "text-error-600 dark:text-error-400" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
