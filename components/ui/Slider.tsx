"use client";

import { forwardRef, InputHTMLAttributes, useMemo } from "react";

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  helperText?: string;
  showValue?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
  showMinMax?: boolean;
  formatValue?: (value: number) => string;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      label,
      helperText,
      showValue = true,
      valuePrefix = "",
      valueSuffix = "",
      showMinMax = true,
      formatValue,
      min = 0,
      max = 100,
      value,
      className = "",
      ...props
    },
    ref
  ) => {
    const currentValue = Number(value || min);
    const minValue = Number(min);
    const maxValue = Number(max);

    const percentage = useMemo(() => {
      return ((currentValue - minValue) / (maxValue - minValue)) * 100;
    }, [currentValue, minValue, maxValue]);

    const displayValue = formatValue
      ? formatValue(currentValue)
      : `${valuePrefix}${currentValue}${valueSuffix}`;

    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-between mb-2">
          {label && (
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {label}
            </label>
          )}
          {showValue && (
            <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2 py-0.5 rounded-md">
              {displayValue}
            </span>
          )}
        </div>
        <div className="relative">
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            value={value}
            className="
              w-full h-2 appearance-none cursor-pointer
              bg-slate-200 dark:bg-slate-700 rounded-full
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-primary-600
              [&::-webkit-slider-thumb]:shadow-md
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:transition-all
              [&::-webkit-slider-thumb]:duration-150
              [&::-webkit-slider-thumb]:hover:bg-primary-700
              [&::-webkit-slider-thumb]:hover:scale-110
              [&::-webkit-slider-thumb]:active:scale-95
              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-primary-600
              [&::-moz-range-thumb]:border-none
              [&::-moz-range-thumb]:shadow-md
              [&::-moz-range-thumb]:cursor-pointer
              focus:outline-none
            "
            style={{
              background: `linear-gradient(to right, #2563eb ${percentage}%, #e2e8f0 ${percentage}%)`,
            }}
            {...props}
          />
        </div>
        {(showMinMax || helperText) && (
          <div className="flex items-center justify-between mt-1.5">
            {showMinMax ? (
              <>
                <span className="text-xs text-slate-400">{minValue}</span>
                {helperText && (
                  <span className="text-xs text-slate-500">{helperText}</span>
                )}
                <span className="text-xs text-slate-400">{maxValue}</span>
              </>
            ) : (
              helperText && <span className="text-xs text-slate-500">{helperText}</span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Slider.displayName = "Slider";

export default Slider;
