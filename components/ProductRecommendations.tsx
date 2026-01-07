"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Beaker,
  Droplets,
  Package,
  Zap,
  Scale,
  Info,
  Sparkles,
  Lock,
  Crown,
  Check
} from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import {
  Product,
  ProductRecommendation,
  RecommendationProfile,
  getProductRecommendations,
  gels,
  drinkMixes,
  hydrationTabs,
  chews
} from "@/lib/products";

// Number of products to show for free
const FREE_PREVIEW_PRODUCTS = 2;

interface ProductRecommendationsProps {
  carbTargetPerHour: number;
  sodiumTargetPerHourMin: number;
  sodiumTargetPerHourMax: number;
  raceDurationMinutes: number;
  temperatureF: number;
  fuelType: "gels" | "drink" | "hybrid";
  stomachTolerance: "low" | "medium" | "high";
  isPaid?: boolean;
  onUnlockClick?: () => void;
}

export function ProductRecommendations({
  carbTargetPerHour,
  sodiumTargetPerHourMin,
  sodiumTargetPerHourMax,
  raceDurationMinutes,
  temperatureF,
  fuelType,
  stomachTolerance,
  isPaid = false,
  onUnlockClick
}: ProductRecommendationsProps) {
  const [selectedCategory, setSelectedCategory] = useState<"recommended" | "gels" | "drinks" | "hydration">("recommended");

  // Derive sweat rate from temperature
  const sweatRate: "low" | "medium" | "high" =
    temperatureF >= 80 ? "high" :
    temperatureF >= 65 ? "medium" : "low";

  // Map stomach tolerance to gut sensitivity (inverted: low tolerance = high sensitivity)
  const gutSensitivity: "low" | "medium" | "high" =
    stomachTolerance === "low" ? "low" :
    stomachTolerance === "medium" ? "medium" :
    "high";

  const profile: RecommendationProfile = {
    sweatRate,
    gutSensitivity,
    carbTargetPerHour,
    sodiumTargetPerHour: (sodiumTargetPerHourMin + sodiumTargetPerHourMax) / 2,
    raceDurationHours: raceDurationMinutes / 60,
    preferredFuelType: fuelType
  };

  const recommendations = useMemo(() => getProductRecommendations(profile), [
    sweatRate,
    gutSensitivity,
    carbTargetPerHour,
    sodiumTargetPerHourMin,
    sodiumTargetPerHourMax,
    raceDurationMinutes,
    fuelType
  ]);

  // Count total recommendations
  const totalRecommendations = recommendations.primaryFuel.length + recommendations.hydration.length;
  const lockedCount = Math.max(0, totalRecommendations - FREE_PREVIEW_PRODUCTS);

  const categories = [
    { id: "recommended", label: "For You", icon: Sparkles, locked: false },
    { id: "gels", label: "Gels", icon: Beaker, locked: !isPaid },
    { id: "drinks", label: "Drink Mixes", icon: Droplets, locked: !isPaid },
    { id: "hydration", label: "Electrolytes", icon: Zap, locked: !isPaid },
  ] as const;

  // Get filtered products based on category
  const getProductsForCategory = () => {
    switch (selectedCategory) {
      case "gels":
        return [...gels, ...chews];
      case "drinks":
        return drinkMixes;
      case "hydration":
        return hydrationTabs;
      default:
        return [];
    }
  };

  const allCategoryProducts = getProductsForCategory();

  // Calculate servings needed for a product
  const calculateForRace = (product: Product) => {
    const servingsPerHour = carbTargetPerHour / product.carbsG;
    const totalServings = Math.ceil(servingsPerHour * (raceDurationMinutes / 60));
    return {
      servingsPerHour: servingsPerHour.toFixed(1),
      totalServings,
      totalCarbs: totalServings * product.carbsG,
      totalSodium: totalServings * product.sodiumMg
    };
  };

  // Split recommendations into visible and locked
  const allRecs = [...recommendations.primaryFuel, ...recommendations.hydration];
  const visibleRecs = isPaid ? allRecs : allRecs.slice(0, FREE_PREVIEW_PRODUCTS);
  const blurredRecs = isPaid ? [] : allRecs.slice(FREE_PREVIEW_PRODUCTS, FREE_PREVIEW_PRODUCTS + 2);

  return (
    <Card variant="outlined" padding="none" className="overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-primary-500" />
              Product Reference
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Popular gels and drink mixes that match your targets
            </p>
          </div>
          {!isPaid && (
            <Badge variant="warning" size="sm" icon={<Lock className="w-3 h-3" />}>
              Preview
            </Badge>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isLocked = cat.locked && selectedCategory !== cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (cat.locked && !isPaid) {
                    onUnlockClick?.();
                  } else {
                    setSelectedCategory(cat.id);
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300"
                    : cat.locked
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-pointer"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat.locked ? <Lock className="w-3 h-3" /> : <Icon className="w-4 h-4" />}
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6">
        {selectedCategory === "recommended" ? (
          <div className="space-y-6">
            {/* Context badges */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="default" size="sm">
                {carbTargetPerHour}g carbs/hr target
              </Badge>
              <Badge variant="default" size="sm">
                {sodiumTargetPerHourMin}-{sodiumTargetPerHourMax}mg sodium/hr
              </Badge>
              {sweatRate === "high" && (
                <Badge variant="warning" size="sm">
                  High sweat conditions
                </Badge>
              )}
              {stomachTolerance === "low" && (
                <Badge variant="accent" size="sm">
                  Gut-friendly options
                </Badge>
              )}
            </div>

            {/* Visible Recommendations */}
            {visibleRecs.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                  Recommended Products
                </h4>
                <div className="grid gap-3">
                  {visibleRecs.map((rec) => (
                    <ProductCard
                      key={rec.product.id}
                      recommendation={rec}
                      raceDurationMinutes={raceDurationMinutes}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Blurred Preview (for free users) */}
            {!isPaid && blurredRecs.length > 0 && (
              <div className="relative">
                <div className="grid gap-3">
                  {blurredRecs.map((rec) => (
                    <div
                      key={rec.product.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 blur-sm select-none pointer-events-none"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {rec.product.brand}
                            </span>
                            <span className="text-slate-500 dark:text-slate-400">
                              {rec.product.name}
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {rec.reasoning}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            {rec.servingsNeeded}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lock Overlay for free users */}
            {!isPaid && lockedCount > 0 && (
              <div className="relative">
                {/* Gradient fade */}
                <div className="absolute -top-12 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-slate-800 to-transparent pointer-events-none z-10" />

                <div className="bg-gradient-to-br from-slate-50 to-primary-50 dark:from-slate-800 dark:to-primary-900/20 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/50 mb-3">
                      <Lock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                      {lockedCount} More Product{lockedCount > 1 ? 's' : ''} + Full Database
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 max-w-sm mx-auto">
                      Unlock all product recommendations, browse the full database, and see exactly how many servings you need.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 mb-4 text-xs">
                      <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <Check className="w-3 h-3 text-success-500" />
                        {gels.length + chews.length} gels & chews
                      </span>
                      <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <Check className="w-3 h-3 text-success-500" />
                        {drinkMixes.length} drink mixes
                      </span>
                      <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <Check className="w-3 h-3 text-success-500" />
                        {hydrationTabs.length} electrolyte options
                      </span>
                    </div>

                    <Button
                      size="sm"
                      onClick={onUnlockClick}
                      leftIcon={<Crown className="w-4 h-4" />}
                    >
                      Unlock Full Plan
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Notes (only for paid users) */}
            {isPaid && recommendations.notes.length > 0 && (
              <div className="space-y-2">
                {recommendations.notes.map((note, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-sm"
                  >
                    <Info className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">{note}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : isPaid ? (
          /* All Products View (paid users only) */
          <div className="space-y-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Browse all {selectedCategory === "gels" ? "gels and chews" : selectedCategory === "drinks" ? "drink mixes" : "electrolyte products"}.
              Your target: <strong>{carbTargetPerHour}g carbs/hr</strong>
            </p>

            <div className="grid gap-3">
              {allCategoryProducts.map((product) => {
                const calc = calculateForRace(product);
                return (
                  <div
                    key={product.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {product.brand}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400">
                            {product.name}
                          </span>
                          {product.gutFriendliness === "high" && (
                            <Badge variant="success" size="sm">
                              Gut-friendly
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                          {product.notes}
                        </p>
                        <div className="flex flex-wrap gap-3 text-xs text-slate-600 dark:text-slate-400">
                          <span>{product.carbsG}g carbs</span>
                          <span>{product.sodiumMg}mg sodium</span>
                          <span>{product.servingSize}</span>
                          {product.caffeineMg > 0 && (
                            <span className="text-warning-600 dark:text-warning-400">
                              {product.caffeineMg}mg caffeine
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                          {calc.totalServings}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          for race
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Locked category view for free users */
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
              <Lock className="w-6 h-6 text-slate-400" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Full Product Database
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-xs mx-auto">
              Browse {allCategoryProducts.length} {selectedCategory === "gels" ? "gels and chews" : selectedCategory === "drinks" ? "drink mixes" : "electrolyte products"} with your full plan.
            </p>
            <Button
              onClick={onUnlockClick}
              leftIcon={<Crown className="w-4 h-4" />}
            >
              Unlock Full Plan - $29
            </Button>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="px-6 pb-6">
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
            Product data is approximate. Always verify nutrition facts on packaging.
            This is not an endorsement of any brand.
          </p>
        </div>
      </div>
    </Card>
  );
}

// Individual product recommendation card
function ProductCard({
  recommendation,
  raceDurationMinutes
}: {
  recommendation: ProductRecommendation;
  raceDurationMinutes: number;
}) {
  const { product, servingsNeeded, totalCarbsG, totalSodiumMg, reasoning } = recommendation;
  const hours = raceDurationMinutes / 60;
  const servingsPerHour = (servingsNeeded / hours).toFixed(1);

  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-semibold text-slate-900 dark:text-white">
              {product.brand}
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              {product.name}
            </span>
            {product.gutFriendliness === "high" && (
              <Badge variant="success" size="sm">
                Gentle
              </Badge>
            )}
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
            {reasoning}
          </p>

          <div className="flex flex-wrap gap-3 text-xs text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Scale className="w-3 h-3" />
              {product.carbsG}g carbs/serving
            </span>
            <span className="flex items-center gap-1">
              <Droplets className="w-3 h-3" />
              {product.sodiumMg}mg sodium/serving
            </span>
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {servingsNeeded}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            total ({servingsPerHour}/hr)
          </div>
        </div>
      </div>

      {/* Totals bar */}
      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex gap-4 text-xs">
        <span className="text-slate-600 dark:text-slate-400">
          Total: <strong className="text-slate-900 dark:text-white">{totalCarbsG}g carbs</strong>
        </span>
        <span className="text-slate-600 dark:text-slate-400">
          <strong className="text-slate-900 dark:text-white">{totalSodiumMg}mg sodium</strong>
        </span>
      </div>
    </div>
  );
}
