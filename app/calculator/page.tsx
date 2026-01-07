"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Zap,
  Timer,
  Flame,
  Droplets,
  Download,
  Save,
  ArrowRight,
  ChevronLeft,
  Clock,
  MapPin,
  Beaker,
  Sparkles,
  AlertCircle,
  Lock,
  Crown,
  Check,
  Eye,
  EyeOff
} from "lucide-react";
import { PlanInput, PlanOutput } from "@/lib/types";
import { generateFuelingPlan } from "@/lib/planGenerator";
import { Race } from "@/lib/races";
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Input,
  Select,
  Modal,
  Badge,
  Slider,
  SegmentedControl,
  StatCard,
  Navbar,
  RaceSelector
} from "@/components/ui";
import { ProductRecommendations } from "@/components/ProductRecommendations";
import { SweatRateTest } from "@/components/SweatRateTest";
import { SweatProfileQuestionnaire, SweatProfile } from "@/components/SweatProfileQuestionnaire";

const distanceOptions = [
  { value: "13.1", label: "Half Marathon (13.1 mi)" },
  { value: "26.2", label: "Marathon (26.2 mi)" },
  { value: "31", label: "50K (31 mi)" },
  { value: "50", label: "50 Mile" },
  { value: "62", label: "100K (62 mi)" },
];

const fuelTypeOptions = [
  { value: "gels", label: "Gels", icon: <Beaker className="w-4 h-4" /> },
  { value: "drink", label: "Drink", icon: <Droplets className="w-4 h-4" /> },
  { value: "hybrid", label: "Hybrid", icon: <Sparkles className="w-4 h-4" /> },
];

const toleranceOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

// Number of actions to show for free
const FREE_PREVIEW_ACTIONS = 3;

export default function CalculatorPage() {
  const [formData, setFormData] = useState<Partial<PlanInput>>({
    distance: 26.2,
    goalTimeMinutes: 240,
    bodyWeightLb: 150,
    temperatureF: 60,
    fuelType: "gels",
    gelCarbsG: 25,
    drinkCarbsG: 40,
    sodiumPreference: "medium",
    stomachTolerance: "medium",
  });

  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [result, setResult] = useState<PlanOutput | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sweat profile helper states
  const [showSweatRateTest, setShowSweatRateTest] = useState(false);
  const [showSweatQuestionnaire, setShowSweatQuestionnaire] = useState(false);
  const [sweatRateResult, setSweatRateResult] = useState<number | null>(null);
  const [sweatProfile, setSweatProfile] = useState<SweatProfile | null>(null);

  const formattedGoalTime = useMemo(() => {
    const minutes = formData.goalTimeMinutes || 0;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, "0")}`;
  }, [formData.goalTimeMinutes]);

  // Handle race selection - auto-fill distance and temperature
  const handleRaceSelect = (race: Race | null) => {
    setSelectedRace(race);
    if (race) {
      setFormData((prev) => ({
        ...prev,
        distance: race.distance,
        temperatureF: race.typicalWeather.avgF,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const plan = generateFuelingPlan(formData as PlanInput);
      setResult(plan);
    } catch (error) {
      console.error("Error generating plan:", error);
      setErrors({ form: "Please fill in all fields correctly" });
    }
  };

  const handleDownload = () => {
    setShowPaywall(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs: formData }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = "/login?callbackUrl=/app";
          return;
        }
        throw new Error("Failed to save plan");
      }

      const data = await res.json();
      window.location.href = `/app/plans/${data.planId}`;
    } catch (error) {
      console.error("Error saving plan:", error);
      setErrors({ save: "Failed to save plan. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  const handleUnlockClick = () => {
    setShowPaywall(true);
  };

  // Handle sweat rate test completion
  const handleSweatRateComplete = (sweatRateOzPerHour: number, testTemperatureF: number) => {
    setSweatRateResult(sweatRateOzPerHour);
    setShowSweatRateTest(false);

    // Auto-adjust sodium preference based on sweat rate
    let newSodiumPref: "low" | "medium" | "high" = "medium";
    if (sweatRateOzPerHour < 24) {
      newSodiumPref = "low";
    } else if (sweatRateOzPerHour > 40) {
      newSodiumPref = "high";
    }

    setFormData((prev) => ({
      ...prev,
      sodiumPreference: newSodiumPref,
    }));
  };

  // Handle sweat profile questionnaire completion
  const handleSweatProfileComplete = (profile: SweatProfile) => {
    setSweatProfile(profile);
    setShowSweatQuestionnaire(false);

    // Apply profile to form data
    setFormData((prev) => ({
      ...prev,
      sodiumPreference: profile.sodiumNeeds,
      stomachTolerance: profile.sweatAmount === "heavy" ? "low" : profile.sweatAmount === "light" ? "high" : "medium",
    }));
  };

  // Calculate how many actions are locked
  const lockedActionsCount = result
    ? Math.max(0, result.fuelingSchedule.length - FREE_PREVIEW_ACTIONS)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 mb-4 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                Race Fueling <span className="text-gradient">Calculator</span>
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Generate a personalized, science-backed fueling plan for your race
              </p>
            </div>
            <Badge variant="primary" size="lg" icon={<Zap className="w-4 h-4" />}>
              Free Preview
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form Section - Left Column */}
          <div className="lg:col-span-2">
            <Card variant="elevated" padding="lg" className="sticky top-24">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Race Selection Section */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                    Your Race
                  </h3>
                  <RaceSelector
                    onSelect={handleRaceSelect}
                    selectedRace={selectedRace}
                  />
                </div>

                {/* Race Details Section */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                    Race Details
                  </h3>
                  <div className="space-y-4">
                    <Select
                      label="Distance"
                      options={distanceOptions}
                      value={formData.distance?.toString()}
                      onChange={(e) =>
                        setFormData({ ...formData, distance: parseFloat(e.target.value) })
                      }
                      leftIcon={<MapPin className="w-4 h-4" />}
                    />

                    <div>
                      <Input
                        label="Goal Time (minutes)"
                        type="number"
                        value={formData.goalTimeMinutes}
                        onChange={(e) =>
                          setFormData({ ...formData, goalTimeMinutes: parseInt(e.target.value) || 0 })
                        }
                        leftIcon={<Clock className="w-4 h-4" />}
                        helperText={`That's ${formattedGoalTime} (hh:mm)`}
                      />
                    </div>
                  </div>
                </div>

                {/* Body Stats Section */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                    Your Stats
                  </h3>
                  <div className="space-y-5">
                    <Slider
                      label="Body Weight"
                      min={80}
                      max={300}
                      value={formData.bodyWeightLb}
                      onChange={(e) =>
                        setFormData({ ...formData, bodyWeightLb: parseInt(e.target.value) })
                      }
                      valueSuffix=" lb"
                    />

                    <Slider
                      label="Race Temperature"
                      min={30}
                      max={100}
                      value={formData.temperatureF}
                      onChange={(e) =>
                        setFormData({ ...formData, temperatureF: parseInt(e.target.value) })
                      }
                      valueSuffix="°F"
                    />
                    {selectedRace && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 -mt-2">
                        Auto-filled from {selectedRace.name} typical weather
                      </p>
                    )}
                  </div>
                </div>

                {/* Fuel Preferences Section */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                    Fuel Preferences
                  </h3>
                  <div className="space-y-5">
                    <SegmentedControl
                      label="Fuel Type"
                      options={fuelTypeOptions}
                      value={formData.fuelType || "gels"}
                      onChange={(value) =>
                        setFormData({ ...formData, fuelType: value as "gels" | "drink" | "hybrid" })
                      }
                      fullWidth
                    />

                    {(formData.fuelType === "gels" || formData.fuelType === "hybrid") && (
                      <Input
                        label="Gel Carbs"
                        type="number"
                        value={formData.gelCarbsG}
                        onChange={(e) =>
                          setFormData({ ...formData, gelCarbsG: parseInt(e.target.value) || 0 })
                        }
                        helperText="Carbs per gel packet (typically 20-30g)"
                        rightIcon={<span className="text-xs text-slate-400">g</span>}
                      />
                    )}

                    {(formData.fuelType === "drink" || formData.fuelType === "hybrid") && (
                      <Input
                        label="Drink Mix Carbs"
                        type="number"
                        value={formData.drinkCarbsG}
                        onChange={(e) =>
                          setFormData({ ...formData, drinkCarbsG: parseInt(e.target.value) || 0 })
                        }
                        helperText="Carbs per serving of drink mix"
                        rightIcon={<span className="text-xs text-slate-400">g</span>}
                      />
                    )}
                  </div>
                </div>

                {/* Tolerance Section */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                    Tolerance Settings
                  </h3>
                  <div className="space-y-4">
                    <SegmentedControl
                      label="Sodium Preference"
                      options={toleranceOptions}
                      value={formData.sodiumPreference || "medium"}
                      onChange={(value) =>
                        setFormData({ ...formData, sodiumPreference: value as "low" | "medium" | "high" })
                      }
                      fullWidth
                      size="sm"
                    />

                    <SegmentedControl
                      label="Stomach Tolerance"
                      options={toleranceOptions}
                      value={formData.stomachTolerance || "medium"}
                      onChange={(value) =>
                        setFormData({ ...formData, stomachTolerance: value as "low" | "medium" | "high" })
                      }
                      fullWidth
                      size="sm"
                    />
                  </div>

                  {/* Sweat Profile Helpers */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                      Not sure about your settings? Use our helpers:
                    </p>
                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => setShowSweatQuestionnaire(true)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-slate-700 dark:text-slate-300">
                            Sweat Profile Quiz
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            Quick 6-question assessment
                          </div>
                        </div>
                        {sweatProfile && (
                          <Badge variant="success" size="sm">Done</Badge>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowSweatRateTest(true)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-accent-100 dark:bg-accent-900/50 flex items-center justify-center flex-shrink-0">
                          <Droplets className="w-4 h-4 text-accent-600 dark:text-accent-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-slate-700 dark:text-slate-300">
                            Home Sweat Rate Test
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            Measure your exact sweat rate
                          </div>
                        </div>
                        {sweatRateResult && (
                          <Badge variant="success" size="sm">{sweatRateResult.toFixed(0)} oz/hr</Badge>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {errors.form && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-error-50 dark:bg-error-900/20 text-error-600 dark:text-error-400 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {errors.form}
                  </div>
                )}

                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Generate Plan
                </Button>

                <p className="text-xs text-slate-400 dark:text-slate-500 text-center">
                  Disclaimer: This is not medical advice. Consult your healthcare provider.
                </p>
              </form>
            </Card>
          </div>

          {/* Results Section - Right Column */}
          <div className="lg:col-span-3">
            {result ? (
              <div className="space-y-6 animate-fade-in">
                {/* Stats Overview */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <StatCard
                    title="Carbs Target"
                    value={`${result.chosenCarbsPerHourTarget}g/hr`}
                    subtitle={`Range: ${result.recommendedCarbsPerHourRange.min}-${result.recommendedCarbsPerHourRange.max}g/hr`}
                    icon={<Flame className="w-5 h-5" />}
                    variant="primary"
                  />
                  <StatCard
                    title="Sodium Target"
                    value={`${result.sodiumPerHourRange.min}-${result.sodiumPerHourRange.max}`}
                    subtitle="mg per hour"
                    icon={<Droplets className="w-5 h-5" />}
                    variant="accent"
                  />
                  <StatCard
                    title="Race Duration"
                    value={`${Math.floor(result.raceDurationMinutes / 60)}:${(result.raceDurationMinutes % 60).toString().padStart(2, "0")}`}
                    subtitle={`Pace: ${result.pacePerMile}/mi`}
                    icon={<Timer className="w-5 h-5" />}
                    variant="success"
                  />
                  <StatCard
                    title="Total Carbs"
                    value={`${result.totalCarbsNeeded}g`}
                    subtitle="For entire race"
                    icon={<Zap className="w-5 h-5" />}
                    variant="warning"
                  />
                </div>

                {/* Fueling Schedule with Paywall */}
                <Card variant="elevated" padding="none" className="overflow-hidden">
                  <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <CardHeader
                        title="Your Fueling Schedule"
                        subtitle={`${result.fuelingSchedule.length} fueling actions planned`}
                      />
                      <Badge variant="warning" size="sm" icon={<Eye className="w-3 h-3" />}>
                        Preview Mode
                      </Badge>
                    </div>
                  </div>

                  {/* Visible Actions */}
                  <div className="max-h-96 overflow-y-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 dark:bg-slate-800/50 sticky top-0">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            Time
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            Mile
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {/* Free preview actions */}
                        {result.fuelingSchedule.slice(0, FREE_PREVIEW_ACTIONS).map((action, idx) => (
                          <tr
                            key={idx}
                            className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <span className="font-mono text-sm font-medium text-slate-900 dark:text-white">
                                {action.timeStamp}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <Badge variant="outline" size="sm">
                                Mile {action.mileMarker.toFixed(1)}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                              {action.actionText}
                            </td>
                          </tr>
                        ))}

                        {/* Blurred/locked actions preview */}
                        {lockedActionsCount > 0 && (
                          <>
                            {result.fuelingSchedule.slice(FREE_PREVIEW_ACTIONS, FREE_PREVIEW_ACTIONS + 2).map((action, idx) => (
                              <tr
                                key={`blur-${idx}`}
                                className="relative"
                              >
                                <td className="px-6 py-4">
                                  <span className="font-mono text-sm font-medium text-slate-900 dark:text-white blur-sm select-none">
                                    {action.timeStamp}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border blur-sm select-none">
                                    Mile {action.mileMarker.toFixed(1)}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-sm blur-sm select-none">
                                  {action.actionText}
                                </td>
                              </tr>
                            ))}
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Locked Actions Overlay */}
                  {lockedActionsCount > 0 && (
                    <div className="relative">
                      {/* Gradient fade */}
                      <div className="absolute -top-16 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-slate-800 to-transparent pointer-events-none" />

                      {/* Unlock CTA */}
                      <div className="bg-gradient-to-br from-slate-50 to-primary-50 dark:from-slate-800 dark:to-primary-900/20 p-6 border-t border-slate-200 dark:border-slate-700">
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 mb-4">
                            <Lock className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                            {lockedActionsCount} More Fueling Actions Locked
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 mb-4 max-w-md mx-auto">
                            Unlock your complete race-day fueling schedule with exact timing, mile markers, and fuel amounts.
                          </p>

                          {/* Benefits */}
                          <div className="flex flex-wrap justify-center gap-4 mb-6">
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                              <Check className="w-4 h-4 text-success-500" />
                              Full schedule access
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                              <Check className="w-4 h-4 text-success-500" />
                              Printable race card
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                              <Check className="w-4 h-4 text-success-500" />
                              Save unlimited plans
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button
                              size="lg"
                              onClick={handleUnlockClick}
                              leftIcon={<Crown className="w-4 h-4" />}
                            >
                              Unlock Full Plan - $29
                            </Button>
                            <Link href="/pricing">
                              <Button variant="ghost" size="lg">
                                View All Plans
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>

                {/* Product Recommendations */}
                <ProductRecommendations
                  carbTargetPerHour={result.chosenCarbsPerHourTarget}
                  sodiumTargetPerHourMin={result.sodiumPerHourRange.min}
                  sodiumTargetPerHourMax={result.sodiumPerHourRange.max}
                  raceDurationMinutes={result.raceDurationMinutes}
                  temperatureF={formData.temperatureF || 60}
                  fuelType={formData.fuelType || "gels"}
                  stomachTolerance={formData.stomachTolerance || "medium"}
                  isPaid={false}
                  onUnlockClick={() => setShowPaywall(true)}
                />

                {/* Action Buttons - Only show for non-paywalled or demo */}
                <Card variant="filled" padding="md">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleDownload}
                      leftIcon={<Lock className="w-4 h-4" />}
                      fullWidth
                    >
                      Download Race Card
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleSave}
                      isLoading={saving}
                      leftIcon={<Lock className="w-4 h-4" />}
                      fullWidth
                    >
                      Save to Dashboard
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-3">
                    Sign up to download your race card and save plans to your dashboard
                  </p>
                  {errors.save && (
                    <p className="mt-3 text-sm text-error-600 dark:text-error-400 text-center">
                      {errors.save}
                    </p>
                  )}
                </Card>
              </div>
            ) : (
              /* Empty State */
              <Card variant="outlined" padding="lg" className="h-full min-h-[400px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Ready to Fuel Your Race
                </h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                  Select your race or fill in details on the left and click "Generate Plan" to see your personalized fueling strategy.
                </p>
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  <Badge variant="default" icon={<Timer className="w-3 h-3" />}>
                    Science-backed
                  </Badge>
                  <Badge variant="default" icon={<Flame className="w-3 h-3" />}>
                    Personalized
                  </Badge>
                  <Badge variant="default" icon={<MapPin className="w-3 h-3" />}>
                    Mile-by-mile
                  </Badge>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Paywall Modal */}
      <Modal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        title="Unlock Your Complete Race Plan"
        size="md"
      >
        <div className="space-y-6">
          {/* Pricing Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* One-Time Purchase */}
            <div className="p-4 rounded-xl border-2 border-primary-200 dark:border-primary-800 bg-primary-50/50 dark:bg-primary-900/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                  One-Time
                </span>
                <Badge variant="primary" size="sm">Popular</Badge>
              </div>
              <div className="mb-3">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">$29</span>
                <span className="text-slate-500 dark:text-slate-400 ml-1">once</span>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Check className="w-4 h-4 text-success-500" />
                  3 complete race plans
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Check className="w-4 h-4 text-success-500" />
                  Printable race cards
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Check className="w-4 h-4 text-success-500" />
                  Lifetime access
                </li>
              </ul>
              <Link href="/pricing" className="block">
                <Button fullWidth variant="primary">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Annual Subscription */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Annual
                </span>
                <Badge variant="success" size="sm">Best Value</Badge>
              </div>
              <div className="mb-3">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">$49</span>
                <span className="text-slate-500 dark:text-slate-400 ml-1">/year</span>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Check className="w-4 h-4 text-success-500" />
                  Unlimited race plans
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Check className="w-4 h-4 text-success-500" />
                  Priority support
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Check className="w-4 h-4 text-success-500" />
                  Early access to features
                </li>
              </ul>
              <Link href="/pricing" className="block">
                <Button fullWidth variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Social Proof */}
          <div className="text-center pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-warning-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Trusted by 1,000+ endurance athletes
            </p>
          </div>

          {/* Close Button */}
          <div className="text-center">
            <button
              onClick={() => setShowPaywall(false)}
              className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </Modal>

      {/* Sweat Rate Test Modal */}
      {showSweatRateTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <SweatRateTest
              onComplete={handleSweatRateComplete}
              onClose={() => setShowSweatRateTest(false)}
            />
          </div>
        </div>
      )}

      {/* Sweat Profile Questionnaire Modal */}
      {showSweatQuestionnaire && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <SweatProfileQuestionnaire
              onComplete={handleSweatProfileComplete}
              onClose={() => setShowSweatQuestionnaire(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
