'use client';

import { useState } from 'react';
import {
  Calendar,
  Target,
  TrendingUp,
  Check,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Clock,
  Zap,
  Activity,
  Heart,
  Info,
  Apple
} from 'lucide-react';
import { Button, Card, Badge } from '@/components/ui';

interface GutTrainingProtocolProps {
  targetCarbsPerHour?: number;
  weeksUntilRace?: number;
  onClose: () => void;
}

interface WeekPlan {
  week: number;
  title: string;
  carbTarget: string;
  carbsPerHour: number;
  longRunFocus: string;
  practiceRuns: number;
  tips: string[];
  products: string[];
  warningSign: string;
  keyWorkout: string;
}

export function GutTrainingProtocol({
  targetCarbsPerHour = 60,
  weeksUntilRace = 6,
  onClose
}: GutTrainingProtocolProps) {
  const [expandedWeek, setExpandedWeek] = useState<number>(0);
  const [completedWeeks, setCompletedWeeks] = useState<Set<number>>(new Set());

  // Generate 6-week progressive plan
  const generatePlan = (): WeekPlan[] => {
    const weeklyProgression = [
      { percent: 0.40, title: 'Foundation' },
      { percent: 0.50, title: 'Building' },
      { percent: 0.65, title: 'Progression' },
      { percent: 0.80, title: 'Race Simulation' },
      { percent: 0.90, title: 'Fine Tuning' },
      { percent: 1.00, title: 'Race Ready' }
    ];

    return weeklyProgression.map((prog, idx) => {
      const carbsPerHour = Math.round(targetCarbsPerHour * prog.percent);
      const week = idx + 1;

      return {
        week,
        title: prog.title,
        carbTarget: `${carbsPerHour}g/hr`,
        carbsPerHour,
        longRunFocus: getLongRunFocus(week, carbsPerHour),
        practiceRuns: week <= 2 ? 1 : 2,
        tips: getTips(week),
        products: getProducts(week, carbsPerHour),
        warningSign: getWarningSign(week),
        keyWorkout: getKeyWorkout(week, carbsPerHour)
      };
    });
  };

  const getLongRunFocus = (week: number, carbs: number): string => {
    switch (week) {
      case 1: return `Introduce ${carbs}g/hr on long run. Focus on timing, not speed.`;
      case 2: return `Maintain ${carbs}g/hr. Practice your planned race products.`;
      case 3: return `Increase to ${carbs}g/hr. Add variety in fuel types.`;
      case 4: return `Race simulation: ${carbs}g/hr at race pace for 8-10 miles.`;
      case 5: return `Fine-tune timing. ${carbs}g/hr should feel comfortable.`;
      case 6: return `Confidence run only. Your gut is trained!`;
      default: return '';
    }
  };

  const getTips = (week: number): string[] => {
    switch (week) {
      case 1:
        return [
          'Start taking fuel 30-45 minutes into run',
          'Use water to help digestion, not sports drink',
          'If you feel sick, slow down - don\'t stop fueling',
          'Practice opening gel packets while running'
        ];
      case 2:
        return [
          'Try your planned race-day products',
          'Note which flavors work best for you',
          'Practice drinking from cups (simulate aid stations)',
          'Take fuel every 20-25 minutes'
        ];
      case 3:
        return [
          'Mix gels with drink mix to test hybrid approach',
          'Practice fueling at race pace, not just easy pace',
          'Your gut adapts to what you train it with',
          'Experiment with caffeinated vs non-caffeinated'
        ];
      case 4:
        return [
          'This is your race rehearsal',
          'Use ONLY products you\'ll use race day',
          'Practice your exact race morning breakfast',
          'Simulate race start time if possible'
        ];
      case 5:
        return [
          'No new products from here on',
          'Fine-tune timing based on what you\'ve learned',
          'Your stomach should feel "trained"',
          'Reduce fiber 2-3 days before long run'
        ];
      case 6:
        return [
          'Taper week - gut is already trained',
          'One short practice run with race fuel only',
          'Trust your training',
          'Focus on carb-loading, not gut training'
        ];
      default:
        return [];
    }
  };

  const getProducts = (week: number, carbs: number): string[] => {
    if (carbs <= 30) {
      return ['1 gel (25g carbs)', 'OR 8-10 oz sports drink'];
    } else if (carbs <= 45) {
      return ['1.5-2 gels', 'OR 1 gel + 8 oz sports drink', 'OR 16 oz sports drink'];
    } else if (carbs <= 60) {
      return ['2-3 gels', 'OR 2 gels + sports drink', 'OR concentrated drink mix'];
    } else {
      return ['3+ gels', '2 gels + 16 oz sports drink', 'High-carb drink (Maurten, etc.)', 'Solid food options (chews, waffles)'];
    }
  };

  const getWarningSign = (week: number): string => {
    switch (week) {
      case 1: return 'Some bloating is normal. Sharp pain or vomiting = stop and reassess.';
      case 2: return 'GI distress should be less than Week 1. If worse, try different products.';
      case 3: return 'Cramping may indicate too much too fast. Drop back 10g and rebuild.';
      case 4: return 'If simulation run has issues, you have time to adjust.';
      case 5: return 'Minor discomfort OK. Major issues = see a sports dietitian.';
      case 6: return 'Any new symptoms now = don\'t change anything. Trust training.';
      default: return '';
    }
  };

  const getKeyWorkout = (week: number, carbs: number): string => {
    switch (week) {
      case 1: return `Long run: 10-12 mi with ${carbs}g/hr starting at mile 3`;
      case 2: return `Long run: 12-14 mi with ${carbs}g/hr every 25 min`;
      case 3: return `Long run: 14-16 mi with ${carbs}g/hr + tempo miles 8-11`;
      case 4: return `Race sim: 16-18 mi at goal pace with full ${carbs}g/hr`;
      case 5: return `Long run: 12-14 mi at easy pace with ${carbs}g/hr`;
      case 6: return `Easy 8-10 mi with light fueling. Taper in effect!`;
      default: return '';
    }
  };

  const plan = generatePlan();
  const progress = (completedWeeks.size / 6) * 100;

  const toggleWeekComplete = (week: number) => {
    const newCompleted = new Set(completedWeeks);
    if (newCompleted.has(week)) {
      newCompleted.delete(week);
    } else {
      newCompleted.add(week);
    }
    setCompletedWeeks(newCompleted);
  };

  return (
    <Card className="p-6 max-w-3xl mx-auto max-h-[85vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary-500" />
            Gut Training Protocol
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            6-week progressive plan to race-ready fueling
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-primary-50 to-success-50 dark:from-primary-900/30 dark:to-success-900/30 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <span className="font-semibold text-slate-900 dark:text-white">Your Target</span>
          </div>
          <Badge variant="primary" size="lg">{targetCarbsPerHour}g/hr</Badge>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {Math.round(targetCarbsPerHour * 0.4)}g
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Week 1 Start</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-warning-600 dark:text-warning-400">
              {Math.round(targetCarbsPerHour * 0.7)}g
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Midpoint</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-success-600 dark:text-success-400">
              {targetCarbsPerHour}g
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Race Day</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-slate-600 dark:text-slate-400">Training Progress</span>
          <span className="font-medium text-slate-900 dark:text-white">
            {completedWeeks.size} of 6 weeks
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-primary-500 to-success-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Why Gut Training Matters */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 mb-6">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <Info className="w-4 h-4 text-primary-500" />
          Why This Matters
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
          Your gut is trainable. Studies show that practicing with carbs during training can:
        </p>
        <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-success-500 flex-shrink-0" />
            Increase carbohydrate absorption by up to 40%
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-success-500 flex-shrink-0" />
            Reduce GI distress significantly
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-success-500 flex-shrink-0" />
            Improve stomach emptying rates
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-success-500 flex-shrink-0" />
            Build confidence in your race nutrition
          </li>
        </ul>
      </div>

      {/* Weekly Plan */}
      <div className="space-y-3">
        {plan.map((weekPlan, index) => (
          <div
            key={weekPlan.week}
            className={`border rounded-xl overflow-hidden transition-all ${
              completedWeeks.has(weekPlan.week)
                ? 'border-success-300 dark:border-success-700 bg-success-50/50 dark:bg-success-900/20'
                : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            {/* Week Header */}
            <button
              onClick={() => setExpandedWeek(expandedWeek === index ? -1 : index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWeekComplete(weekPlan.week);
                  }}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    completedWeeks.has(weekPlan.week)
                      ? 'bg-success-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {completedWeeks.has(weekPlan.week) ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="font-bold">{weekPlan.week}</span>
                  )}
                </button>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    Week {weekPlan.week}: {weekPlan.title}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Target: {weekPlan.carbTarget} during long runs
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant={weekPlan.week <= 2 ? 'default' : weekPlan.week <= 4 ? 'warning' : 'success'}
                  size="sm"
                >
                  {weekPlan.carbsPerHour}g/hr
                </Badge>
                {expandedWeek === index ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </div>
            </button>

            {/* Expanded Content */}
            {expandedWeek === index && (
              <div className="px-4 pb-4 border-t border-slate-100 dark:border-slate-800 pt-4 space-y-4">
                {/* Key Workout */}
                <div className="bg-primary-50 dark:bg-primary-900/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
                    <Zap className="w-4 h-4" />
                    Key Workout
                  </div>
                  <p className="text-sm text-primary-600 dark:text-primary-400">
                    {weekPlan.keyWorkout}
                  </p>
                </div>

                {/* Long Run Focus */}
                <div>
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Focus This Week
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {weekPlan.longRunFocus}
                  </p>
                </div>

                {/* What to Use */}
                <div>
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                    <Apple className="w-4 h-4" />
                    Fuel Options ({weekPlan.carbsPerHour}g/hr)
                  </h4>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    {weekPlan.products.map((product, i) => (
                      <li key={i}>• {product}</li>
                    ))}
                  </ul>
                </div>

                {/* Tips */}
                <div>
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Tips for Success
                  </h4>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    {weekPlan.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Warning Signs */}
                <div className="bg-warning-50 dark:bg-warning-900/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-warning-700 dark:text-warning-300 mb-1">
                    <AlertTriangle className="w-4 h-4" />
                    Watch For
                  </div>
                  <p className="text-sm text-warning-600 dark:text-warning-400">
                    {weekPlan.warningSign}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
            Golden Rules of Gut Training
          </h4>
          <ol className="text-sm text-slate-600 dark:text-slate-400 space-y-1 list-decimal list-inside">
            <li>Never try anything new on race day</li>
            <li>Train your gut at race pace, not just easy pace</li>
            <li>If something doesn't work, try different products - not less fuel</li>
            <li>Consistency beats perfection - practice every long run</li>
          </ol>
        </div>
        <Button onClick={onClose} fullWidth variant="outline">
          Close
        </Button>
      </div>
    </Card>
  );
}
