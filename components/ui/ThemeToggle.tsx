"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

type Theme = "light" | "dark" | "system";

interface ThemeToggleProps {
  variant?: "button" | "switch" | "dropdown";
  className?: string;
}

export function ThemeToggle({ variant = "button", className = "" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (theme === "dark" || (theme === "system" && systemDark)) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        const root = document.documentElement;
        if (mediaQuery.matches) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, mounted]);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 ${className}`} />
    );
  }

  if (variant === "switch") {
    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    return (
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={`
          relative w-14 h-8 rounded-full p-1
          bg-slate-200 dark:bg-slate-700
          transition-colors duration-200
          ${className}
        `}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      >
        <span
          className={`
            absolute top-1 w-6 h-6 rounded-full
            bg-white dark:bg-slate-900
            shadow-soft-md
            transition-transform duration-200
            flex items-center justify-center
            ${isDark ? "translate-x-6" : "translate-x-0"}
          `}
        >
          {isDark ? (
            <Moon className="w-3.5 h-3.5 text-primary-500" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-warning-500" />
          )}
        </span>
      </button>
    );
  }

  if (variant === "dropdown") {
    return (
      <div className={`relative group ${className}`}>
        <button
          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          aria-label="Theme settings"
        >
          {theme === "light" && <Sun className="w-5 h-5 text-warning-500" />}
          {theme === "dark" && <Moon className="w-5 h-5 text-primary-400" />}
          {theme === "system" && <Monitor className="w-5 h-5 text-slate-500 dark:text-slate-400" />}
        </button>
        <div className="absolute right-0 mt-2 w-36 py-1 bg-white dark:bg-slate-800 rounded-xl shadow-soft-xl border border-slate-200 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          {[
            { value: "light" as Theme, icon: Sun, label: "Light", color: "text-warning-500" },
            { value: "dark" as Theme, icon: Moon, label: "Dark", color: "text-primary-400" },
            { value: "system" as Theme, icon: Monitor, label: "System", color: "text-slate-500" },
          ].map(({ value, icon: Icon, label, color }) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={`
                w-full flex items-center gap-2 px-3 py-2 text-sm
                hover:bg-slate-100 dark:hover:bg-slate-700
                ${theme === value ? "text-primary-600 dark:text-primary-400 font-medium" : "text-slate-700 dark:text-slate-300"}
              `}
            >
              <Icon className={`w-4 h-4 ${color}`} />
              {label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Default button variant - cycles through themes
  const cycleTheme = () => {
    const themes: Theme[] = ["light", "dark", "system"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <button
      onClick={cycleTheme}
      className={`
        p-2 rounded-lg
        bg-slate-100 dark:bg-slate-800
        hover:bg-slate-200 dark:hover:bg-slate-700
        transition-colors duration-200
        ${className}
      `}
      aria-label={`Current theme: ${theme}. Click to change.`}
    >
      {theme === "light" && <Sun className="w-5 h-5 text-warning-500" />}
      {theme === "dark" && <Moon className="w-5 h-5 text-primary-400" />}
      {theme === "system" && <Monitor className="w-5 h-5 text-slate-500 dark:text-slate-400" />}
    </button>
  );
}

export default ThemeToggle;
