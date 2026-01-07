"use client";

import { ReactNode } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

type StatTrend = "up" | "down" | "neutral";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: StatTrend;
  trendValue?: string;
  variant?: "default" | "primary" | "success" | "warning" | "accent";
  className?: string;
}

const variantClasses = {
  default: {
    bg: "bg-white dark:bg-slate-900",
    iconBg: "bg-slate-100 dark:bg-slate-800",
    iconColor: "text-slate-600 dark:text-slate-400",
  },
  primary: {
    bg: "bg-primary-50 dark:bg-primary-900/20",
    iconBg: "bg-primary-100 dark:bg-primary-800/50",
    iconColor: "text-primary-600 dark:text-primary-400",
  },
  success: {
    bg: "bg-success-50 dark:bg-success-900/20",
    iconBg: "bg-success-100 dark:bg-success-800/50",
    iconColor: "text-success-600 dark:text-success-400",
  },
  warning: {
    bg: "bg-warning-50 dark:bg-warning-900/20",
    iconBg: "bg-warning-100 dark:bg-warning-800/50",
    iconColor: "text-warning-600 dark:text-warning-400",
  },
  accent: {
    bg: "bg-accent-50 dark:bg-accent-900/20",
    iconBg: "bg-accent-100 dark:bg-accent-800/50",
    iconColor: "text-accent-600 dark:text-accent-400",
  },
};

const trendConfig = {
  up: {
    icon: TrendingUp,
    color: "text-success-600 dark:text-success-400",
    bg: "bg-success-50 dark:bg-success-900/30",
  },
  down: {
    icon: TrendingDown,
    color: "text-error-600 dark:text-error-400",
    bg: "bg-error-50 dark:bg-error-900/30",
  },
  neutral: {
    icon: Minus,
    color: "text-slate-500 dark:text-slate-400",
    bg: "bg-slate-100 dark:bg-slate-800",
  },
};

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  variant = "default",
  className = "",
}: StatCardProps) {
  const styles = variantClasses[variant];
  const TrendIcon = trend ? trendConfig[trend].icon : null;

  return (
    <div
      className={`
        ${styles.bg}
        rounded-2xl p-5 border border-slate-200 dark:border-slate-700
        transition-all duration-200 hover:shadow-soft-md
        ${className}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {subtitle}
            </p>
          )}
          {trend && trendValue && (
            <div className="flex items-center gap-1.5 mt-2">
              <span
                className={`
                  inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium
                  ${trendConfig[trend].bg} ${trendConfig[trend].color}
                `}
              >
                {TrendIcon && <TrendIcon className="w-3 h-3" />}
                {trendValue}
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div
            className={`
              p-3 rounded-xl ${styles.iconBg}
            `}
          >
            <span className={styles.iconColor}>{icon}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;
