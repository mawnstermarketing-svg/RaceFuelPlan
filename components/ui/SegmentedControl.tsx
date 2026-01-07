"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

interface SegmentOption {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface SegmentedControlProps {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  label?: string;
  className?: string;
}

const sizeClasses = {
  sm: {
    container: "p-1 rounded-lg",
    option: "px-3 py-1.5 text-xs rounded-md gap-1.5",
    icon: "w-3.5 h-3.5",
  },
  md: {
    container: "p-1 rounded-xl",
    option: "px-4 py-2 text-sm rounded-lg gap-2",
    icon: "w-4 h-4",
  },
  lg: {
    container: "p-1.5 rounded-xl",
    option: "px-5 py-2.5 text-sm rounded-lg gap-2",
    icon: "w-5 h-5",
  },
};

export function SegmentedControl({
  options,
  value,
  onChange,
  size = "md",
  fullWidth = false,
  label,
  className = "",
}: SegmentedControlProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const selectedIndex = options.findIndex((opt) => opt.value === value);
    const buttons = container.querySelectorAll("button");
    const selectedButton = buttons[selectedIndex];

    if (selectedButton) {
      setIndicatorStyle({
        left: selectedButton.offsetLeft,
        width: selectedButton.offsetWidth,
      });
    }
  }, [value, options]);

  const styles = sizeClasses[size];

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          {label}
        </label>
      )}
      <div
        ref={containerRef}
        className={`
          relative inline-flex bg-slate-100 dark:bg-slate-800
          ${styles.container}
          ${fullWidth ? "w-full" : ""}
        `}
      >
        {/* Sliding indicator */}
        <div
          className="absolute bg-white dark:bg-slate-700 shadow-soft-sm rounded-lg transition-all duration-200 ease-smooth"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            top: size === "lg" ? "6px" : "4px",
            bottom: size === "lg" ? "6px" : "4px",
          }}
        />

        {/* Options */}
        {options.map((option) => {
          const isSelected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => !option.disabled && onChange(option.value)}
              disabled={option.disabled}
              className={`
                relative z-10 flex items-center justify-center font-medium
                transition-colors duration-200
                ${styles.option}
                ${fullWidth ? "flex-1" : ""}
                ${
                  isSelected
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                }
                ${option.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              {option.icon && (
                <span className={styles.icon}>{option.icon}</span>
              )}
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SegmentedControl;
