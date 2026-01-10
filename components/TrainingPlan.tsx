'use client';

import { useState, useMemo } from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Zap,
  Droplets,
  Moon,
  TrendingUp,
  Target,
  Clock,
  MapPin,
  Check,
  AlertTriangle,
  Flame,
  Activity,
  Coffee,
  Download,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button, Card, Badge } from '@/components/ui';

interface TrainingPlanProps {
  raceDistance: number;
  goalTimeMinutes: number;
  raceName?: string;
  weeksUntilRace?: number;
  carbTargetPerHour: number;
  onClose: () => void;
}

interface Workout {
  type: 'rest' | 'easy' | 'tempo' | 'intervals' | 'long' | 'race-pace' | 'recovery' | 'cross';
  title: string;
  distance?: number;
  duration?: number;
  description: string;
  paceGuidance?: string;
  fuelingNotes?: string;
  isFuelingPractice?: boolean;
}

interface WeekPlan {
  weekNumber: number;
  phase: 'base' | 'build' | 'peak' | 'taper' | 'race';
  phaseWeek: number;
  totalMiles: number;
  focus: string;
  workouts: Workout[];
  nutritionFocus: string;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function TrainingPlan({
  raceDistance,
  goalTimeMinutes,
  raceName,
  weeksUntilRace = 12,
  carbTargetPerHour,
  onClose
}: TrainingPlanProps) {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  // Calculate pace
  const pacePerMile = goalTimeMinutes / raceDistance;
  const formatPace = (pace: number) => {
    const mins = Math.floor(pace);
    const secs = Math.round((pace - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate training plan
  const plan = useMemo(() => {
    const weeks: WeekPlan[] = [];
    const totalWeeks = Math.min(weeksUntilRace, 16);

    // Determine plan structure based on weeks available
    const taperWeeks = raceDistance >= 26.2 ? 3 : 2;
    const peakWeeks = Math.min(3, Math.floor((totalWeeks - taperWeeks) * 0.2));
    const buildWeeks = Math.min(4, Math.floor((totalWeeks - taperWeeks - peakWeeks) * 0.5));
    const baseWeeks = totalWeeks - taperWeeks - peakWeeks - buildWeeks;

    // Base weekly mileage calculation
    const peakMileage = raceDistance >= 50 ? 60 : raceDistance >= 26.2 ? 50 : 35;
    const startMileage = peakMileage * 0.6;

    let weekNum = 1;

    // Generate each phase
    const generatePhaseWeeks = (
      phase: 'base' | 'build' | 'peak' | 'taper',
      numWeeks: number,
      startMiles: number,
      endMiles: number
    ) => {
      for (let i = 0; i < numWeeks; i++) {
        const progress = numWeeks > 1 ? i / (numWeeks - 1) : 1;
        const weekMiles = Math.round(startMiles + (endMiles - startMiles) * progress);
        const longRunMiles = Math.round(weekMiles * (phase === 'taper' ? 0.25 : 0.35));

        weeks.push({
          weekNumber: weekNum,
          phase,
          phaseWeek: i + 1,
          totalMiles: weekMiles,
          focus: getPhaseFocus(phase, i, numWeeks),
          workouts: generateWeekWorkouts(phase, weekMiles, longRunMiles, weekNum, totalWeeks),
          nutritionFocus: getNutritionFocus(phase, i, numWeeks, weekNum, totalWeeks)
        });
        weekNum++;
      }
    };

    // Base phase
    generatePhaseWeeks('base', baseWeeks, startMileage, startMileage * 1.2);

    // Build phase
    generatePhaseWeeks('build', buildWeeks, startMileage * 1.2, peakMileage * 0.9);

    // Peak phase
    generatePhaseWeeks('peak', peakWeeks, peakMileage * 0.9, peakMileage);

    // Taper phase
    generatePhaseWeeks('taper', taperWeeks, peakMileage * 0.7, peakMileage * 0.4);

    // Race week
    weeks.push({
      weekNumber: weekNum,
      phase: 'race',
      phaseWeek: 1,
      totalMiles: Math.round(raceDistance + 5),
      focus: 'Race Week - Trust Your Training!',
      workouts: generateRaceWeek(),
      nutritionFocus: 'Carb loading days 3-1. Race morning: familiar breakfast 3-4hrs before start.'
    });

    return weeks;
  }, [raceDistance, goalTimeMinutes, weeksUntilRace, carbTargetPerHour]);

  function getPhaseFocus(phase: string, weekInPhase: number, totalPhaseWeeks: number): string {
    switch (phase) {
      case 'base':
        return weekInPhase === 0
          ? 'Build aerobic foundation, establish routine'
          : 'Gradually increase mileage, easy effort';
      case 'build':
        return weekInPhase < totalPhaseWeeks / 2
          ? 'Introduce quality workouts, build strength'
          : 'Increase workout intensity, practice race pace';
      case 'peak':
        return 'Highest volume & intensity - key fitness gains';
      case 'taper':
        return weekInPhase === 0
          ? 'Begin reducing volume, maintain intensity'
          : 'Sharp reduction in volume, stay fresh';
      default:
        return '';
    }
  }

  function getNutritionFocus(
    phase: string,
    weekInPhase: number,
    totalPhaseWeeks: number,
    weekNum: number,
    totalWeeks: number
  ): string {
    // Gut training integration
    const gutTrainingWeek = Math.ceil((weekNum / totalWeeks) * 6);
    const carbPercent = Math.min(100, 40 + (gutTrainingWeek - 1) * 12);
    const currentCarbTarget = Math.round(carbTargetPerHour * (carbPercent / 100));

    switch (phase) {
      case 'base':
        return `Start gut training: Practice ${currentCarbTarget}g/hr on long runs. Focus on timing.`;
      case 'build':
        return `Increase to ${currentCarbTarget}g/hr. Try different products. Note what works.`;
      case 'peak':
        return `Full race nutrition: ${currentCarbTarget}g/hr. Use ONLY race-day products now.`;
      case 'taper':
        return weekInPhase === totalPhaseWeeks - 1
          ? 'Begin carb loading 3 days out. Reduce fiber. Stay hydrated.'
          : `Maintain ${currentCarbTarget}g/hr practice. No new products!`;
      default:
        return '';
    }
  }

  function generateWeekWorkouts(
    phase: string,
    weekMiles: number,
    longRunMiles: number,
    weekNum: number,
    totalWeeks: number
  ): Workout[] {
    const easyPace = formatPace(pacePerMile + 1.0); // 60 sec slower (1 minute)
    const tempoPace = formatPace(pacePerMile + 0.25); // 15 sec slower
    const racePace = formatPace(pacePerMile);

    // Gut training carb calculation
    const gutTrainingWeek = Math.ceil((weekNum / totalWeeks) * 6);
    const carbPercent = Math.min(100, 40 + (gutTrainingWeek - 1) * 12);
    const currentCarbTarget = Math.round(carbTargetPerHour * (carbPercent / 100));

    const workouts: Workout[] = [];

    // Monday - Rest or easy
    if (phase === 'base') {
      workouts.push({
        type: 'rest',
        title: 'Rest Day',
        description: 'Complete rest or light stretching',
      });
    } else {
      workouts.push({
        type: 'recovery',
        title: 'Recovery Run',
        distance: Math.round(weekMiles * 0.1),
        description: 'Very easy effort, shake out legs',
        paceGuidance: `${easyPace}/mi or slower`,
      });
    }

    // Tuesday - Quality workout
    if (phase === 'base') {
      workouts.push({
        type: 'easy',
        title: 'Easy Run',
        distance: Math.round(weekMiles * 0.15),
        description: 'Conversational pace, build aerobic base',
        paceGuidance: `${easyPace}/mi`,
      });
    } else if (phase === 'build' || phase === 'peak') {
      workouts.push({
        type: 'tempo',
        title: 'Tempo Run',
        distance: Math.round(weekMiles * 0.15),
        description: `${Math.round(weekMiles * 0.08)}mi warm-up, ${Math.round(weekMiles * 0.05)}mi @ tempo, cool-down`,
        paceGuidance: `Tempo: ${tempoPace}/mi`,
        fuelingNotes: weekMiles > 8 ? 'Practice taking gel mid-tempo' : undefined,
      });
    } else {
      workouts.push({
        type: 'easy',
        title: 'Easy Run',
        distance: Math.round(weekMiles * 0.12),
        description: 'Keep legs fresh',
        paceGuidance: `${easyPace}/mi`,
      });
    }

    // Wednesday - Easy or cross
    workouts.push({
      type: phase === 'peak' ? 'easy' : 'cross',
      title: phase === 'peak' ? 'Easy Run' : 'Cross Training',
      distance: phase === 'peak' ? Math.round(weekMiles * 0.1) : undefined,
      duration: phase !== 'peak' ? 30 : undefined,
      description: phase === 'peak'
        ? 'Easy effort, recovery'
        : 'Bike, swim, or elliptical. Low impact.',
    });

    // Thursday - Intervals or easy
    if (phase === 'build' || phase === 'peak') {
      workouts.push({
        type: 'intervals',
        title: 'Speed Work',
        distance: Math.round(weekMiles * 0.12),
        description: phase === 'peak'
          ? `6-8 x 800m @ 5K pace with 400m jog recovery`
          : `4-6 x 800m @ 5K pace with 400m jog recovery`,
        paceGuidance: `5K pace: ${formatPace(pacePerMile - 0.5)}/mi`,
      });
    } else {
      workouts.push({
        type: 'easy',
        title: 'Easy Run',
        distance: Math.round(weekMiles * 0.12),
        description: 'Relaxed effort',
        paceGuidance: `${easyPace}/mi`,
      });
    }

    // Friday - Rest
    workouts.push({
      type: 'rest',
      title: 'Rest Day',
      description: 'Rest before long run. Light stretching OK.',
    });

    // Saturday - Long run (THE KEY WORKOUT)
    const isRaceSimulation = phase === 'peak' || (phase === 'build' && longRunMiles >= 16);
    workouts.push({
      type: 'long',
      title: isRaceSimulation ? 'Long Run (Race Simulation)' : 'Long Run',
      distance: longRunMiles,
      description: isRaceSimulation
        ? `Race simulation: last ${Math.round(longRunMiles * 0.4)}mi at race pace`
        : 'Build endurance. Start easy, finish easy.',
      paceGuidance: isRaceSimulation
        ? `Easy: ${easyPace}/mi → Race pace: ${racePace}/mi`
        : `${easyPace}/mi`,
      isFuelingPractice: true,
      fuelingNotes: `🔥 FUEL PRACTICE: ${currentCarbTarget}g/hr starting at mile 3. Practice race-day products!`,
    });

    // Sunday - Recovery
    workouts.push({
      type: 'recovery',
      title: 'Recovery Run',
      distance: Math.round(weekMiles * 0.08),
      description: 'Very easy, flush out legs from long run',
      paceGuidance: `${easyPace}/mi or slower`,
    });

    return workouts;
  }

  function generateRaceWeek(): Workout[] {
    const easyPace = formatPace(pacePerMile + 1.0); // 60 sec slower (1 minute)
    const racePace = formatPace(pacePerMile);

    return [
      {
        type: 'easy',
        title: 'Easy Shakeout',
        distance: 3,
        description: 'Very easy, stay loose',
        paceGuidance: `${easyPace}/mi`,
      },
      {
        type: 'easy',
        title: 'Easy + Strides',
        distance: 4,
        description: '3mi easy + 4x100m strides',
        paceGuidance: `${easyPace}/mi`,
      },
      {
        type: 'rest',
        title: 'Rest Day',
        description: 'Complete rest. Hydrate well.',
        fuelingNotes: '🍝 Carb loading begins! Increase carbs to 8-10g/kg body weight.',
      },
      {
        type: 'easy',
        title: 'Easy Shakeout',
        distance: 3,
        description: 'Short and easy. Stay loose.',
        paceGuidance: `${easyPace}/mi`,
        fuelingNotes: '🍝 Continue carb loading. Low fiber. Drink extra water.',
      },
      {
        type: 'rest',
        title: 'Rest Day',
        description: 'Rest. Prepare race gear. Early to bed.',
        fuelingNotes: '🍝 Final carb load day. Early dinner. Lay out everything.',
      },
      {
        type: 'easy',
        title: 'Race Eve Shakeout',
        distance: 2,
        description: '15-20 min very easy jog with a few strides',
        paceGuidance: 'Very easy',
        fuelingNotes: '🍝 Light breakfast + lunch. Pasta dinner by 6pm. Early bed!',
      },
      {
        type: 'race-pace',
        title: '🏃 RACE DAY!',
        distance: raceDistance,
        description: 'Execute your plan. Trust your training!',
        paceGuidance: `Goal: ${formatPace(pacePerMile)}/mi`,
        isFuelingPractice: true,
        fuelingNotes: `🔥 Race fueling: ${carbTargetPerHour}g/hr starting at mile 3. You've trained for this!`,
      },
    ];
  }

  const getWorkoutColor = (type: Workout['type']) => {
    switch (type) {
      case 'rest': return 'bg-slate-100 dark:bg-slate-800 text-slate-500';
      case 'easy': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'recovery': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'tempo': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400';
      case 'intervals': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      case 'long': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400';
      case 'race-pace': return 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400';
      case 'cross': return 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400';
      default: return 'bg-slate-100 dark:bg-slate-800';
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'base': return 'default';
      case 'build': return 'warning';
      case 'peak': return 'error';
      case 'taper': return 'success';
      case 'race': return 'primary';
      default: return 'default';
    }
  };

  const currentWeekData = plan[currentWeek];

  return (
    <Card className="p-6 max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary-500" />
            Training Plan
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {plan.length}-week plan for {raceDistance} miles {raceName && `• ${raceName}`}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Week Navigator */}
      <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 mb-6">
        <button
          onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
          disabled={currentWeek === 0}
          className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              Week {currentWeekData.weekNumber}
            </span>
            <Badge variant={getPhaseColor(currentWeekData.phase) as any} size="sm">
              {currentWeekData.phase.charAt(0).toUpperCase() + currentWeekData.phase.slice(1)}
            </Badge>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {currentWeekData.totalMiles} miles total
          </p>
        </div>

        <button
          onClick={() => setCurrentWeek(Math.min(plan.length - 1, currentWeek + 1))}
          disabled={currentWeek === plan.length - 1}
          className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Week Overview */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-primary-50 dark:bg-primary-900/30 rounded-lg p-3">
          <div className="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 mb-1">
            <Target className="w-4 h-4" />
            Focus
          </div>
          <p className="text-sm font-medium text-primary-900 dark:text-primary-100">
            {currentWeekData.focus}
          </p>
        </div>
        <div className="bg-warning-50 dark:bg-warning-900/30 rounded-lg p-3">
          <div className="flex items-center gap-2 text-sm text-warning-600 dark:text-warning-400 mb-1">
            <Zap className="w-4 h-4" />
            Nutrition
          </div>
          <p className="text-sm font-medium text-warning-900 dark:text-warning-100">
            {currentWeekData.nutritionFocus}
          </p>
        </div>
      </div>

      {/* Daily Workouts */}
      <div className="space-y-2">
        {currentWeekData.workouts.map((workout, idx) => (
          <div
            key={idx}
            className={`rounded-xl border transition-all ${
              workout.isFuelingPractice
                ? 'border-warning-300 dark:border-warning-700'
                : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            <button
              onClick={() => setExpandedDay(expandedDay === idx ? null : idx)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 text-center">
                  <div className="text-xs text-slate-500 dark:text-slate-400 uppercase">
                    {DAYS[idx]}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-lg text-xs font-medium ${getWorkoutColor(workout.type)}`}>
                  {workout.type === 'race-pace' ? 'RACE' : workout.type.toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">
                    {workout.title}
                  </div>
                  {workout.distance && (
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {workout.distance} miles
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {workout.isFuelingPractice && (
                  <Badge variant="warning" size="sm" icon={<Flame className="w-3 h-3" />}>
                    Fuel
                  </Badge>
                )}
                {expandedDay === idx ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </div>
            </button>

            {expandedDay === idx && (
              <div className="px-4 pb-4 pt-0 border-t border-slate-100 dark:border-slate-800 mt-0 space-y-3">
                <div className="pt-3">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {workout.description}
                  </p>
                </div>

                {workout.paceGuidance && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600 dark:text-slate-400">
                      Pace: <span className="font-medium text-slate-900 dark:text-white">{workout.paceGuidance}</span>
                    </span>
                  </div>
                )}

                {workout.fuelingNotes && (
                  <div className="bg-warning-50 dark:bg-warning-900/20 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-warning-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-warning-700 dark:text-warning-300">
                        {workout.fuelingNotes}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Week Mini-Nav */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex gap-1 overflow-x-auto pb-2">
          {plan.map((week, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentWeek(idx)}
              className={`flex-shrink-0 w-10 h-10 rounded-lg text-xs font-medium transition-all ${
                currentWeek === idx
                  ? 'bg-primary-500 text-white'
                  : week.phase === 'race'
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                  : week.phase === 'taper'
                  ? 'bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400'
                  : week.phase === 'peak'
                  ? 'bg-error-100 dark:bg-error-900/30 text-error-600 dark:text-error-400'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {week.weekNumber}
            </button>
          ))}
        </div>
        <div className="flex gap-4 mt-3 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-700" /> Base
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-warning-200 dark:bg-warning-900/50" /> Build
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-error-200 dark:bg-error-900/50" /> Peak
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-success-200 dark:bg-success-900/50" /> Taper
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-primary-200 dark:bg-primary-900/50" /> Race
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-warning-500" />
            Fueling Integration
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Your {carbTargetPerHour}g/hr race target is integrated into this plan.
            Long runs are marked with 🔥 for fueling practice.
            You'll progressively build from {Math.round(carbTargetPerHour * 0.4)}g/hr to full race nutrition.
          </p>
        </div>
        <Button onClick={onClose} fullWidth variant="outline">
          Close
        </Button>
      </div>
    </Card>
  );
}
