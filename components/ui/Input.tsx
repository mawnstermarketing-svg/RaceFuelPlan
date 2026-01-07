"use client";

import { forwardRef, InputHTMLAttributes, ReactNode, useState } from "react";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";

type InputSize = "sm" | "md" | "lg";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  inputSize?: InputSize;
  fullWidth?: boolean;
}

const sizeClasses: Record<InputSize, { input: string; icon: string }> = {
  sm: {
    input: "px-3 py-1.5 text-sm rounded-lg",
    icon: "w-4 h-4",
  },
  md: {
    input: "px-4 py-2.5 text-sm rounded-xl",
    icon: "w-5 h-5",
  },
  lg: {
    input: "px-4 py-3 text-base rounded-xl",
    icon: "w-5 h-5",
  },
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      leftIcon,
      rightIcon,
      inputSize = "md",
      fullWidth = true,
      type = "text",
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    const hasError = !!error;
    const hasSuccess = !!success && !hasError;

    const stateClasses = hasError
      ? "border-error-500 focus:border-error-500 focus:ring-error-500/20"
      : hasSuccess
      ? "border-success-500 focus:border-success-500 focus:ring-success-500/20"
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
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <span className={sizeClasses[inputSize].icon}>{leftIcon}</span>
            </div>
          )}
          <input
            ref={ref}
            type={inputType}
            disabled={disabled}
            className={`
              w-full bg-white dark:bg-slate-900
              border-2 ${stateClasses}
              text-slate-900 dark:text-white
              placeholder:text-slate-400 dark:placeholder:text-slate-500
              focus:outline-none focus:ring-4
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-50 dark:disabled:bg-slate-800
              ${sizeClasses[inputSize].input}
              ${leftIcon ? "pl-10" : ""}
              ${rightIcon || isPassword || hasError || hasSuccess ? "pr-10" : ""}
              ${className}
            `}
            {...props}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {hasError && !isPassword && (
              <AlertCircle className={`${sizeClasses[inputSize].icon} text-error-500`} />
            )}
            {hasSuccess && !isPassword && (
              <CheckCircle className={`${sizeClasses[inputSize].icon} text-success-500`} />
            )}
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className={sizeClasses[inputSize].icon} />
                ) : (
                  <Eye className={sizeClasses[inputSize].icon} />
                )}
              </button>
            )}
            {rightIcon && !isPassword && !hasError && !hasSuccess && (
              <span className={`text-slate-400 ${sizeClasses[inputSize].icon}`}>
                {rightIcon}
              </span>
            )}
          </div>
        </div>
        {(helperText || error || success) && (
          <p
            className={`mt-1.5 text-sm ${
              hasError
                ? "text-error-600 dark:text-error-400"
                : hasSuccess
                ? "text-success-600 dark:text-success-400"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            {error || success || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
