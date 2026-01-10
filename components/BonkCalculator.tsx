'use client';

import { useState, useMemo } from 'react';
import {
  AlertTriangle,
  TrendingDown,
  Zap,
  Clock,
  Target,
  ArrowRight,
  Info,
  Battery,
  BatteryLow,
  BatteryWarning
} from 'lucide-react';
import { Button, Card, Badge, Input, Slider } from '@/components/ui';

interface BonkCalculatorProps {
  onGetPlan?: () => void;
}

export function BonkCalculator({ onGetPlan }: BonkCalculatorProps) {
  const [weight, setWeight] = useState(160);
  const [goalTime, setGoalTime] = useState(240); // 4 hours in minutes
  const [currentCarbs, setCurrentCarbs] = useState(30); // what they think they'll take per hour
  const [distance, setDistance] = useState(26.2);

  // Calculate glycogen and bonk point
  const analysis = useMemo(() => {
    const weightKg = weight / 2.2;

    // Glycogen stores (approximately 400-500g for trained runner, stored in muscles + liver)
    const muscleGlycogenG = weightKg * 15; // ~15g per kg body weight
    const liverGlycogenG = 100; // ~100g in liver
    const totalGlycogenG = muscleGlycogenG + liverGlycogenG;
    const totalGlycogenCals = totalGlycogenG * 4; // 4 cal per gram of carbs

    // Calorie burn rate based on pace
    const hoursToFinish = goalTime / 60;
    const paceMinPerMile = goalTime / distance;

    // Roughly 100 cal per mile for a 150lb runner, scales with weight
    const calsPerMile = (weight / 150) * 100;
    const totalCalsNeeded = calsPerMile * distance;
    const calsPerHour = totalCalsNeeded / hoursToFinish;

    // At marathon pace, roughly 75-85% carbs, 15-25% fat
    // Faster pace = higher carb percentage
    const carbPercentage = paceMinPerMile < 8 ? 0.85 : paceMinPerMile < 10 ? 0.80 : 0.75;
    const carbCalsPerHour = calsPerHour * carbPercentage;
    const carbsNeededPerHour = carbCalsPerHour / 4; // grams

    // Carbs from fueling
    const carbsFromFueling = currentCarbs * hoursToFinish;
    const totalCarbsAvailable = totalGlycogenG + carbsFromFueling;
    const totalCarbsNeeded = carbsNeededPerHour * hoursToFinish;

    // Calculate when they'll bonk (glycogen depletion)
    const netCarbBurnPerHour = carbsNeededPerHour - currentCarbs;
    const hoursUntilBonk = netCarbBurnPerHour > 0 ? totalGlycogenG / netCarbBurnPerHour : 999;
    const mileAtBonk = (hoursUntilBonk / hoursToFinish) * distance;

    // Will they bonk?
    const willBonk = mileAtBonk < distance;
    const bonkMile = Math.min(mileAtBonk, distance);

    // Recommended carbs per hour (60-90g for marathons)
    const recommendedCarbs = paceMinPerMile < 8 ? 90 : paceMinPerMile < 10 ? 75 : 60;
    const carbDeficit = recommendedCarbs - currentCarbs;

    // Energy levels at different points
    const energyAtMile = (mile: number) => {
      const hoursAtMile = (mile / distance) * hoursToFinish;
      const carbsBurned = carbsNeededPerHour * hoursAtMile;
      const carbsConsumed = currentCarbs * hoursAtMile;
      const glycogenRemaining = totalGlycogenG - (carbsBurned - carbsConsumed);
      const percentRemaining = Math.max(0, (glycogenRemaining / totalGlycogenG) * 100);
      return percentRemaining;
    };

    return {
      totalGlycogenG,
      carbsNeededPerHour: Math.round(carbsNeededPerHour),
      hoursToFinish,
      willBonk,
      bonkMile: Math.round(bonkMile * 10) / 10,
      recommendedCarbs,
      carbDeficit,
      totalCarbsNeeded: Math.round(totalCarbsNeeded),
      totalCarbsAvailable: Math.round(totalCarbsAvailable),
      calsPerHour: Math.round(calsPerHour),
      energyAtMile,
      paceMinPerMile
    };
  }, [weight, goalTime, currentCarbs, distance]);

  // Generate mile markers for visualization
  const mileMarkers = useMemo(() => {
    const markers = [];
    const step = distance > 30 ? 10 : distance > 20 ? 5 : 3;
    for (let mile = 0; mile <= distance; mile += step) {
      markers.push({
        mile,
        energy: analysis.energyAtMile(mile)
      });
    }
    // Always include finish
    if (markers[markers.length - 1].mile !== distance) {
      markers.push({
        mile: distance,
        energy: analysis.energyAtMile(distance)
      });
    }
    return markers;
  }, [distance, analysis]);

  const formatTime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}:${mins.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-warning-100 dark:bg-warning-900/30 mb-4">
          <TrendingDown className="w-7 h-7 text-warning-600 dark:text-warning-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Will You Hit the Wall?
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          See exactly when your glycogen stores will run out based on your current plan
        </p>
      </div>

      {/* Inputs */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Body Weight
          </label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(parseInt(e.target.value) || 150)}
              className="flex-1"
            />
            <span className="flex items-center px-3 text-sm text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-lg">
              lbs
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Goal Time
          </label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={goalTime}
              onChange={(e) => setGoalTime(parseInt(e.target.value) || 240)}
              className="flex-1"
            />
            <span className="flex items-center px-3 text-sm text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-lg">
              min
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {formatTime(goalTime)} finish time
          </p>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          How many carbs do you plan to consume per hour?
        </label>
        <Slider
          min={0}
          max={100}
          value={currentCarbs}
          onChange={(e) => setCurrentCarbs(parseInt(e.target.value))}
          valueSuffix="g/hr"
        />
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
          <span>None</span>
          <span>Light (30g)</span>
          <span>Moderate (60g)</span>
          <span>Optimal (90g+)</span>
        </div>
      </div>

      {/* Results */}
      <div className={`rounded-xl p-5 mb-6 ${
        analysis.willBonk
          ? 'bg-gradient-to-br from-error-50 to-warning-50 dark:from-error-900/30 dark:to-warning-900/30 border border-error-200 dark:border-error-800'
          : 'bg-gradient-to-br from-success-50 to-primary-50 dark:from-success-900/30 dark:to-primary-900/30 border border-success-200 dark:border-success-800'
      }`}>
        {analysis.willBonk ? (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-error-100 dark:bg-error-900/50 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-error-600 dark:text-error-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-error-700 dark:text-error-300">
                  You'll Hit the Wall at Mile {analysis.bonkMile}
                </h3>
                <p className="text-sm text-error-600 dark:text-error-400">
                  That's {(distance - analysis.bonkMile).toFixed(1)} miles of suffering ahead
                </p>
              </div>
            </div>

            <div className="bg-white/60 dark:bg-slate-800/60 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">You need:</span>
                  <div className="font-bold text-slate-900 dark:text-white text-lg">
                    {analysis.carbsNeededPerHour}g/hr
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">You're taking:</span>
                  <div className="font-bold text-error-600 dark:text-error-400 text-lg">
                    {currentCarbs}g/hr
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400 text-sm">Carb deficit:</span>
                <span className="font-bold text-error-600 dark:text-error-400 ml-2">
                  -{analysis.carbDeficit}g per hour
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-success-100 dark:bg-success-900/50 flex items-center justify-center">
                <Zap className="w-6 h-6 text-success-600 dark:text-success-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-success-700 dark:text-success-300">
                  You Should Have Enough Fuel
                </h3>
                <p className="text-sm text-success-600 dark:text-success-400">
                  But a personalized plan will optimize your performance
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Energy Visualization */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
          <Battery className="w-4 h-4" />
          Your Energy Levels During the Race
        </h4>
        <div className="relative h-32 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between py-2">
            {[100, 75, 50, 25, 0].map((level) => (
              <div key={level} className="flex items-center">
                <span className="text-xs text-slate-400 w-8 text-right pr-2">{level}%</span>
                <div className="flex-1 border-t border-slate-200 dark:border-slate-700 border-dashed" />
              </div>
            ))}
          </div>

          {/* Danger zone */}
          <div className="absolute bottom-0 left-8 right-0 h-[30%] bg-error-100/50 dark:bg-error-900/30" />
          <div className="absolute bottom-[30%] left-8 right-0 border-t-2 border-error-400 border-dashed" />
          <span className="absolute bottom-[31%] right-2 text-xs text-error-500 font-medium">Bonk Zone</span>

          {/* Energy curve */}
          <svg className="absolute inset-0 w-full h-full" style={{ left: '32px', width: 'calc(100% - 32px)' }}>
            <defs>
              <linearGradient id="energyGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.8" />
                <stop offset="70%" stopColor="rgb(234, 179, 8)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="rgb(239, 68, 68)" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <path
              d={`M 0,${100 - mileMarkers[0].energy}% ` +
                mileMarkers.map((m, i) =>
                  `L ${(i / (mileMarkers.length - 1)) * 100}%,${100 - m.energy}%`
                ).join(' ')}
              fill="none"
              stroke="url(#energyGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Mile markers */}
          <div className="absolute bottom-0 left-8 right-0 flex justify-between px-2 pb-1">
            {mileMarkers.filter((_, i) => i % 2 === 0 || i === mileMarkers.length - 1).map((m) => (
              <span key={m.mile} className="text-xs text-slate-500">
                {m.mile === 0 ? 'Start' : m.mile === distance ? 'Finish' : `Mi ${m.mile}`}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* What bonking feels like */}
      {analysis.willBonk && (
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 mb-6">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <Info className="w-4 h-4 text-slate-500" />
            What "hitting the wall" feels like:
          </h4>
          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
            <li>• Legs feel like concrete blocks</li>
            <li>• Brain fog and confusion</li>
            <li>• Overwhelming urge to stop</li>
            <li>• Pace drops 2-3+ minutes per mile</li>
            <li>• Emotional breakdown (the infamous "marathon cry")</li>
          </ul>
        </div>
      )}

      {/* CTA */}
      <div className="text-center">
        <Button
          size="lg"
          onClick={onGetPlan}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="w-full sm:w-auto"
        >
          Get Your Personalized Fueling Plan
        </Button>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          Know exactly what to eat, when, and how much
        </p>
      </div>
    </Card>
  );
}
