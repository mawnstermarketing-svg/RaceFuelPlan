"use client";

import { useState } from "react";
import {
  Scale,
  Clock,
  Droplets,
  ArrowRight,
  ArrowLeft,
  Check,
  Info,
  Thermometer,
  AlertCircle,
  RotateCcw,
  Calculator
} from "lucide-react";
import { Button, Card, Badge, Input } from "@/components/ui";

interface SweatRateTestProps {
  onComplete: (sweatRateOzPerHour: number, temperatureF: number) => void;
  onClose: () => void;
}

type TestStep = "intro" | "before" | "workout" | "after" | "results";

interface TestData {
  preWeightLb: number | null;
  postWeightLb: number | null;
  fluidConsumedOz: number | null;
  workoutDurationMin: number | null;
  temperatureF: number | null;
}

export function SweatRateTest({ onComplete, onClose }: SweatRateTestProps) {
  const [step, setStep] = useState<TestStep>("intro");
  const [data, setData] = useState<TestData>({
    preWeightLb: null,
    postWeightLb: null,
    fluidConsumedOz: null,
    workoutDurationMin: null,
    temperatureF: null
  });

  // Calculate sweat rate
  const calculateSweatRate = () => {
    if (
      data.preWeightLb === null ||
      data.postWeightLb === null ||
      data.fluidConsumedOz === null ||
      data.workoutDurationMin === null
    ) {
      return null;
    }

    // Weight lost in lbs (each lb = ~16 oz of sweat)
    const weightLostLb = data.preWeightLb - data.postWeightLb;
    const weightLostOz = weightLostLb * 16;

    // Total sweat = weight lost + fluid consumed
    const totalSweatOz = weightLostOz + data.fluidConsumedOz;

    // Convert to hourly rate
    const hours = data.workoutDurationMin / 60;
    const sweatRateOzPerHour = totalSweatOz / hours;

    return Math.round(sweatRateOzPerHour);
  };

  const sweatRate = calculateSweatRate();

  // Interpret sweat rate
  const getSweatRateCategory = (rate: number) => {
    if (rate < 24) return { label: "Light Sweater", color: "success" as const };
    if (rate < 40) return { label: "Moderate Sweater", color: "warning" as const };
    return { label: "Heavy Sweater", color: "error" as const };
  };

  // Get sodium recommendation based on sweat rate
  const getSodiumRecommendation = (rate: number) => {
    if (rate < 24) return { min: 300, max: 500, preference: "low" as const };
    if (rate < 40) return { min: 500, max: 700, preference: "medium" as const };
    return { min: 700, max: 1000, preference: "high" as const };
  };

  const handleComplete = () => {
    if (sweatRate !== null && data.temperatureF !== null) {
      onComplete(sweatRate, data.temperatureF);
    }
  };

  const canProceed = () => {
    switch (step) {
      case "intro":
        return true;
      case "before":
        return data.preWeightLb !== null && data.preWeightLb > 0;
      case "workout":
        return (
          data.workoutDurationMin !== null &&
          data.workoutDurationMin > 0 &&
          data.temperatureF !== null
        );
      case "after":
        return (
          data.postWeightLb !== null &&
          data.postWeightLb > 0 &&
          data.fluidConsumedOz !== null
        );
      default:
        return true;
    }
  };

  const nextStep = () => {
    const steps: TestStep[] = ["intro", "before", "workout", "after", "results"];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const steps: TestStep[] = ["intro", "before", "workout", "after", "results"];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const resetTest = () => {
    setData({
      preWeightLb: null,
      postWeightLb: null,
      fluidConsumedOz: null,
      workoutDurationMin: null,
      temperatureF: null
    });
    setStep("intro");
  };

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {["intro", "before", "workout", "after", "results"].map((s, idx) => (
            <div
              key={s}
              className={`w-2 h-2 rounded-full transition-colors ${
                step === s
                  ? "bg-primary-500 w-4"
                  : ["intro", "before", "workout", "after", "results"].indexOf(step) > idx
                  ? "bg-primary-300"
                  : "bg-slate-200 dark:bg-slate-700"
              }`}
            />
          ))}
        </div>
        <button
          onClick={onClose}
          className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          Cancel
        </button>
      </div>

      {/* Step Content */}
      {step === "intro" && (
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
            <Droplets className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Home Sweat Rate Test
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-sm mx-auto">
            Measure your personal sweat rate to get more accurate hydration and sodium recommendations.
          </p>

          <Card variant="filled" className="text-left mb-6">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
              You'll need:
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success-500" />
                A scale accurate to 0.1 lb (or 0.1 kg)
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success-500" />
                A measured water bottle
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success-500" />
                45-60 minutes for a workout
              </li>
            </ul>
          </Card>

          <div className="p-3 rounded-lg bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 text-sm text-left">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-warning-600 dark:text-warning-400 mt-0.5 flex-shrink-0" />
              <p className="text-warning-700 dark:text-warning-300">
                <strong>Best practice:</strong> Do this test in conditions similar to your race
                (temperature, intensity, duration).
              </p>
            </div>
          </div>
        </div>
      )}

      {step === "before" && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <Scale className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Step 1: Before Workout
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Weigh yourself before you start
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Pre-workout weight
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  step="0.1"
                  placeholder="150.0"
                  value={data.preWeightLb || ""}
                  onChange={(e) =>
                    setData({ ...data, preWeightLb: parseFloat(e.target.value) || null })
                  }
                  className="flex-1"
                />
                <span className="flex items-center px-3 text-sm text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  lbs
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Weigh yourself nude or in minimal dry clothing after using the bathroom
              </p>
            </div>
          </div>

          <Card variant="outlined" className="mt-6">
            <h4 className="font-medium text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-primary-500" />
              Tips for accuracy
            </h4>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <li>• Use the same scale for all measurements</li>
              <li>• Weigh at the same time relative to eating/drinking</li>
              <li>• Empty bladder before weighing</li>
            </ul>
          </Card>
        </div>
      )}

      {step === "workout" && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-warning-100 dark:bg-warning-900/30 flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning-600 dark:text-warning-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Step 2: Complete Your Workout
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Record workout details
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Workout duration
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="60"
                  value={data.workoutDurationMin || ""}
                  onChange={(e) =>
                    setData({ ...data, workoutDurationMin: parseInt(e.target.value) || null })
                  }
                  className="flex-1"
                />
                <span className="flex items-center px-3 text-sm text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  minutes
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                45-90 minutes at race-like intensity is ideal
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Temperature during workout
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="70"
                  value={data.temperatureF || ""}
                  onChange={(e) =>
                    setData({ ...data, temperatureF: parseInt(e.target.value) || null })
                  }
                  className="flex-1"
                />
                <span className="flex items-center px-3 text-sm text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  °F
                </span>
              </div>
            </div>
          </div>

          <Card variant="filled" className="mt-6">
            <h4 className="font-medium text-slate-900 dark:text-white mb-2">
              During your workout:
            </h4>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <li>• Track exactly how much fluid you drink</li>
              <li>• Don't urinate during the workout if possible</li>
              <li>• Maintain consistent race-like effort</li>
            </ul>
          </Card>
        </div>
      )}

      {step === "after" && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-success-100 dark:bg-success-900/30 flex items-center justify-center">
              <Scale className="w-5 h-5 text-success-600 dark:text-success-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Step 3: After Workout
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Final measurements
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Post-workout weight
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  step="0.1"
                  placeholder="148.5"
                  value={data.postWeightLb || ""}
                  onChange={(e) =>
                    setData({ ...data, postWeightLb: parseFloat(e.target.value) || null })
                  }
                  className="flex-1"
                />
                <span className="flex items-center px-3 text-sm text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  lbs
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Towel dry and weigh in the same clothing as before
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Total fluid consumed during workout
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="24"
                  value={data.fluidConsumedOz || ""}
                  onChange={(e) =>
                    setData({ ...data, fluidConsumedOz: parseInt(e.target.value) || null })
                  }
                  className="flex-1"
                />
                <span className="flex items-center px-3 text-sm text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  oz
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Include all water, sports drinks, etc. (1 standard bottle = ~20 oz)
              </p>
            </div>
          </div>
        </div>
      )}

      {step === "results" && sweatRate !== null && (
        <div>
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-success-100 dark:bg-success-900/30 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-success-600 dark:text-success-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Your Sweat Rate Results
            </h3>
          </div>

          {/* Main Result */}
          <Card variant="elevated" className="text-center mb-6">
            <div className="text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {sweatRate} oz/hr
            </div>
            <Badge
              variant={getSweatRateCategory(sweatRate).color}
              size="lg"
            >
              {getSweatRateCategory(sweatRate).label}
            </Badge>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
              at {data.temperatureF}°F
            </p>
          </Card>

          {/* Interpretation */}
          <div className="grid gap-4 mb-6">
            <Card variant="outlined">
              <div className="flex items-start gap-3">
                <Droplets className="w-5 h-5 text-primary-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    Fluid Replacement
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Aim to replace <strong>~{Math.round(sweatRate * 0.8)}-{sweatRate} oz/hour</strong> during exercise.
                    Don't try to replace 100% - 80-90% is optimal.
                  </p>
                </div>
              </div>
            </Card>

            <Card variant="outlined">
              <div className="flex items-start gap-3">
                <Thermometer className="w-5 h-5 text-warning-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    Sodium Needs
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Based on your sweat rate, target{" "}
                    <strong>
                      {getSodiumRecommendation(sweatRate).min}-{getSodiumRecommendation(sweatRate).max} mg/hour
                    </strong>{" "}
                    of sodium.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Temperature note */}
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
              <p className="text-slate-600 dark:text-slate-400">
                <strong>Note:</strong> Sweat rate increases ~10-15% for every 10°F rise in temperature.
                Retest in different conditions for race-specific accuracy.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
        {step !== "intro" && step !== "results" ? (
          <Button variant="ghost" onClick={prevStep} leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back
          </Button>
        ) : step === "results" ? (
          <Button variant="ghost" onClick={resetTest} leftIcon={<RotateCcw className="w-4 h-4" />}>
            Retest
          </Button>
        ) : (
          <div />
        )}

        {step !== "results" ? (
          <Button
            onClick={nextStep}
            disabled={!canProceed()}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {step === "intro" ? "Start Test" : "Continue"}
          </Button>
        ) : (
          <Button onClick={handleComplete} rightIcon={<Calculator className="w-4 h-4" />}>
            Apply to My Plan
          </Button>
        )}
      </div>
    </div>
  );
}
