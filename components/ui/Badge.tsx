"use client";

import { HTMLAttributes, ReactNode } from "react";

type BadgeVariant = "default" | "primary" | "secondary" | "success" | "warning" | "error" | "outline";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  dot?: boolean;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  primary: "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400",
  secondary: "bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400",
  success: "bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400",
  warning: "bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400",
  error: "bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400",
  outline: "bg-transparent border border-slate-300 text-slate-700 dark:border-slate-600 dark:text-slate-300",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs rounded-md gap-1",
  md: "px-2.5 py-1 text-xs rounded-lg gap-1.5",
  lg: "px-3 py-1.5 text-sm rounded-lg gap-2",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-slate-500",
  primary: "bg-primary-500",
  secondary: "bg-accent-500",
  success: "bg-success-500",
  warning: "bg-warning-500",
  error: "bg-error-500",
  outline: "bg-slate-500",
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  icon,
  removable = false,
  onRemove,
  dot = false,
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center font-medium
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />
      )}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {removable && (
        <button
          onClick={onRemove}
          className="ml-1 -mr-1 p-0.5 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          aria-label="Remove"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
}

export default Badge;
