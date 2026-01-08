'use client';

import { useState } from 'react';
import {
  Calendar,
  Utensils,
  Droplets,
  Moon,
  Sun,
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronUp,
  Apple,
  Coffee,
  Salad
} from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';

interface RaceWeekPlannerProps {
  raceDate?: Date;
  bodyWeightLb: number;
  raceDurationMinutes: number;
  raceDistance: number;
  onClose: () => void;
}

interface DayPlan {
  daysOut: number;
  title: string;
  phase: 'normal' | 'taper' | 'carb-load' | 'race-day';
  carbTarget: string;
  hydrationOz: number;
  keyFocus: string;
  meals: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snacks: string[];
  };
  tips: string[];
  avoid: string[];
}

export function RaceWeekPlanner({
  raceDate,
  bodyWeightLb,
  raceDurationMinutes,
  raceDistance,
  onClose
}: RaceWeekPlannerProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(0);

  // Calculate personalized targets
  const bodyWeightKg = bodyWeightLb / 2.2;
  const isMarathonOrLonger = raceDistance >= 26.2;
  const isUltra = raceDistance >= 50;

  // Carb targets (g/kg body weight)
  const normalCarbsGPerKg = 5; // Normal training
  const carbLoadGPerKg = isUltra ? 10 : isMarathonOrLonger ? 8 : 7; // Carb loading phase

  const normalCarbsG = Math.round(bodyWeightKg * normalCarbsGPerKg);
  const carbLoadG = Math.round(bodyWeightKg * carbLoadGPerKg);

  // Hydration (oz per day)
  const baseHydrationOz = Math.round(bodyWeightLb * 0.5); // Half body weight in oz
  const carbLoadHydrationOz = Math.round(baseHydrationOz * 1.2); // 20% more during carb loading

  const generateWeekPlan = (): DayPlan[] => {
    return [
      {
        daysOut: 7,
        title: '7 Days Out',
        phase: 'normal',
        carbTarget: `${normalCarbsG}g`,
        hydrationOz: baseHydrationOz,
        keyFocus: 'Last harder workout, then begin taper',
        meals: {
          breakfast: ['Oatmeal with banana and honey', 'Eggs and whole grain toast', 'Greek yogurt with granola'],
          lunch: ['Pasta with lean protein', 'Rice bowl with chicken', 'Sandwich on whole grain bread'],
          dinner: ['Salmon with rice and vegetables', 'Lean steak with potato', 'Chicken stir-fry with noodles'],
          snacks: ['Fruit', 'Pretzels', 'Energy bars']
        },
        tips: [
          'Complete your last quality workout',
          'Begin reducing training volume',
          'Focus on sleep quality'
        ],
        avoid: ['New foods', 'Excessive alcohol', 'High-intensity cross-training']
      },
      {
        daysOut: 6,
        title: '6 Days Out',
        phase: 'taper',
        carbTarget: `${normalCarbsG}g`,
        hydrationOz: baseHydrationOz,
        keyFocus: 'Easy running only, prioritize recovery',
        meals: {
          breakfast: ['Pancakes with maple syrup', 'Bagel with peanut butter', 'Cereal with milk and fruit'],
          lunch: ['Turkey sandwich', 'Pasta salad', 'Burrito bowl with rice'],
          dinner: ['Grilled chicken with mashed potatoes', 'Fish tacos with rice', 'Pasta with marinara sauce'],
          snacks: ['Crackers', 'Dried fruit', 'Smoothie']
        },
        tips: [
          'Short, easy shake-out runs only',
          'Start visualizing your race',
          'Confirm travel/logistics'
        ],
        avoid: ['Hard workouts', 'Standing for long periods', 'Stressful activities']
      },
      {
        daysOut: 5,
        title: '5 Days Out',
        phase: 'taper',
        carbTarget: `${normalCarbsG}g`,
        hydrationOz: baseHydrationOz,
        keyFocus: 'Rest and mental preparation',
        meals: {
          breakfast: ['French toast', 'Breakfast burrito (no spicy)', 'Waffles with fruit'],
          lunch: ['Grilled cheese with soup', 'Chicken and rice', 'Poke bowl'],
          dinner: ['Baked potato with chicken', 'Risotto', 'Mild curry with rice'],
          snacks: ['Rice cakes', 'Banana', 'Graham crackers']
        },
        tips: [
          'Lay out all race gear',
          'Check weather forecast',
          'Plan race morning logistics'
        ],
        avoid: ['High-fiber foods', 'Spicy foods', 'Large salads']
      },
      {
        daysOut: 4,
        title: '4 Days Out',
        phase: 'taper',
        carbTarget: `${Math.round(normalCarbsG * 1.1)}g`,
        hydrationOz: baseHydrationOz,
        keyFocus: 'Begin slightly increasing carbs',
        meals: {
          breakfast: ['Large bowl of oatmeal', 'Bagel with jam', 'Pancake stack'],
          lunch: ['Big pasta bowl', 'Rice and beans', 'Noodle soup'],
          dinner: ['Spaghetti with bread', 'Teriyaki chicken with rice', 'Pizza (cheese or pepperoni)'],
          snacks: ['Pretzels', 'Sports drink', 'White bread with honey']
        },
        tips: [
          'Gradually increase portion sizes',
          'Choose familiar, easily digestible foods',
          'Rest day or very light jog'
        ],
        avoid: ['Gas-producing foods (beans, broccoli, cabbage)', 'Excess fiber', 'Alcohol']
      },
      {
        daysOut: 3,
        title: '3 Days Out - Carb Loading Begins',
        phase: 'carb-load',
        carbTarget: `${carbLoadG}g`,
        hydrationOz: carbLoadHydrationOz,
        keyFocus: 'Maximize glycogen stores',
        meals: {
          breakfast: ['Stack of pancakes with syrup', 'Large bagel with jam + banana', 'Big bowl of cereal'],
          lunch: ['Pasta with olive oil and parmesan', 'White rice with teriyaki', 'Large sub sandwich'],
          dinner: ['Spaghetti with garlic bread', 'Rice bowl with lean protein', 'Gnocchi with sauce'],
          snacks: ['Sports drinks', 'White bread', 'Pretzels', 'Fruit juice', 'Energy bars']
        },
        tips: [
          'Eat carbs at every meal and snack',
          'Choose low-fiber, white carbs',
          'Drink extra water (carbs need water to store)',
          'Expect to gain 2-4 lbs (water weight)'
        ],
        avoid: ['High-fat foods', 'High-fiber foods', 'Large amounts of protein', 'Cruciferous vegetables']
      },
      {
        daysOut: 2,
        title: '2 Days Out - Peak Carb Loading',
        phase: 'carb-load',
        carbTarget: `${carbLoadG}g`,
        hydrationOz: carbLoadHydrationOz,
        keyFocus: 'Continue maximizing glycogen, stay off feet',
        meals: {
          breakfast: ['Waffles with syrup and banana', 'French toast', 'Bagels with honey'],
          lunch: ['Large plate of pasta', 'Rice with chicken', 'Sandwich with chips'],
          dinner: ['Traditional pre-race pasta dinner', 'Rice and mild chicken', 'Noodles with simple sauce'],
          snacks: ['White bread with jam', 'Pretzels', 'Sports drink', 'Rice cakes']
        },
        tips: [
          'Stay off your feet as much as possible',
          'Eat until comfortably full, not stuffed',
          'Sip fluids throughout the day',
          'Do race packet pickup if needed'
        ],
        avoid: ['Restaurant food you haven\'t tried', 'Alcohol', 'Excessive walking at expo', 'New supplements']
      },
      {
        daysOut: 1,
        title: '1 Day Out - Day Before Race',
        phase: 'carb-load',
        carbTarget: `${carbLoadG}g`,
        hydrationOz: carbLoadHydrationOz,
        keyFocus: 'Final prep, early dinner, early bed',
        meals: {
          breakfast: ['Your usual pre-long run breakfast', 'Pancakes or waffles', 'Bagel with peanut butter'],
          lunch: ['Pasta with simple sauce', 'Rice and chicken', 'Sandwich'],
          dinner: ['EARLY (5-6pm): Pasta with marinara', 'Rice with grilled chicken', 'Familiar comfort food - nothing new!'],
          snacks: ['Light snacks only after early dinner', 'Pretzels if hungry before bed']
        },
        tips: [
          'Eat an early dinner (5-6 PM)',
          'Lay out everything for race morning',
          'Set multiple alarms',
          'Go to bed early (even if you can\'t sleep)',
          'Light 10-15 min shakeout jog optional'
        ],
        avoid: ['Large late dinner', 'Alcohol', 'Staying up late', 'Trying anything new']
      },
      {
        daysOut: 0,
        title: 'Race Morning',
        phase: 'race-day',
        carbTarget: `${Math.round(bodyWeightKg * 1)}g (pre-race meal)`,
        hydrationOz: Math.round(baseHydrationOz * 0.3),
        keyFocus: 'Execute your practiced routine',
        meals: {
          breakfast: [
            `Eat 3-4 hours before start (${Math.round(bodyWeightKg * 1)}g carbs)`,
            'Bagel with peanut butter and banana',
            'Oatmeal with honey',
            'Toast with jam',
            'Your practiced pre-race meal'
          ],
          lunch: [],
          dinner: [],
          snacks: [
            'Sip sports drink leading up to start',
            'Small gel or banana 15-30 min before if needed',
            'Stop eating 30-60 min before race'
          ]
        },
        tips: [
          'Wake up 3-4 hours before race start',
          'Eat your practiced pre-race meal',
          'Sip 16-20 oz of fluid before start',
          'Use the bathroom before heading to start',
          'Arrive at start 45-60 min early'
        ],
        avoid: ['New foods', 'Excess caffeine', 'Over-hydrating', 'Starting too fast']
      }
    ];
  };

  const weekPlan = generateWeekPlan();

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'carb-load': return 'warning';
      case 'race-day': return 'success';
      case 'taper': return 'primary';
      default: return 'default';
    }
  };

  const getPhaseLabel = (phase: string) => {
    switch (phase) {
      case 'carb-load': return 'Carb Loading';
      case 'race-day': return 'Race Day';
      case 'taper': return 'Taper';
      default: return 'Normal';
    }
  };

  return (
    <Card className="p-6 max-w-3xl mx-auto max-h-[85vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary-500" />
            Race Week Nutrition Plan
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Personalized for {bodyWeightLb} lb athlete • {raceDistance} mile race
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

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-primary-50 dark:bg-primary-900/30 rounded-lg p-3 text-center">
          <div className="text-xs text-primary-600 dark:text-primary-400 font-medium mb-1">Normal Carbs</div>
          <div className="text-lg font-bold text-primary-900 dark:text-primary-100">{normalCarbsG}g/day</div>
        </div>
        <div className="bg-warning-50 dark:bg-warning-900/30 rounded-lg p-3 text-center">
          <div className="text-xs text-warning-600 dark:text-warning-400 font-medium mb-1">Carb Load Target</div>
          <div className="text-lg font-bold text-warning-900 dark:text-warning-100">{carbLoadG}g/day</div>
        </div>
      </div>

      {/* Day-by-day plan */}
      <div className="space-y-3">
        {weekPlan.map((day, index) => (
          <div
            key={day.daysOut}
            className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden"
          >
            {/* Day Header */}
            <button
              onClick={() => setExpandedDay(expandedDay === index ? null : index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  day.phase === 'race-day' ? 'bg-success-100 dark:bg-success-900/50' :
                  day.phase === 'carb-load' ? 'bg-warning-100 dark:bg-warning-900/50' :
                  'bg-slate-100 dark:bg-slate-800'
                }`}>
                  {day.phase === 'race-day' ? (
                    <Sun className="w-5 h-5 text-success-600 dark:text-success-400" />
                  ) : (
                    <span className={`font-bold ${
                      day.phase === 'carb-load' ? 'text-warning-600 dark:text-warning-400' : 'text-slate-600 dark:text-slate-400'
                    }`}>
                      {day.daysOut}
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">{day.title}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{day.keyFocus}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={getPhaseColor(day.phase) as any} size="sm">
                  {getPhaseLabel(day.phase)}
                </Badge>
                {expandedDay === index ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </div>
            </button>

            {/* Expanded Content */}
            {expandedDay === index && (
              <div className="px-4 pb-4 border-t border-slate-100 dark:border-slate-800 pt-4 space-y-4">
                {/* Targets */}
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-warning-500" />
                    <span className="text-slate-600 dark:text-slate-300">
                      <strong>{day.carbTarget}</strong> carbs
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-primary-500" />
                    <span className="text-slate-600 dark:text-slate-300">
                      <strong>{day.hydrationOz} oz</strong> fluids
                    </span>
                  </div>
                </div>

                {/* Meals */}
                {day.meals.breakfast.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      <Coffee className="w-4 h-4" />
                      Breakfast Ideas
                    </div>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-6">
                      {day.meals.breakfast.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {day.meals.lunch.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      <Salad className="w-4 h-4" />
                      Lunch Ideas
                    </div>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-6">
                      {day.meals.lunch.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {day.meals.dinner.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      <Moon className="w-4 h-4" />
                      Dinner Ideas
                    </div>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-6">
                      {day.meals.dinner.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {day.meals.snacks.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      <Apple className="w-4 h-4" />
                      Snacks
                    </div>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-6">
                      {day.meals.snacks.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tips */}
                <div className="bg-success-50 dark:bg-success-900/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-success-700 dark:text-success-300 mb-2">
                    <Check className="w-4 h-4" />
                    Key Tips
                  </div>
                  <ul className="text-sm text-success-600 dark:text-success-400 space-y-1">
                    {day.tips.map((tip, i) => (
                      <li key={i}>• {tip}</li>
                    ))}
                  </ul>
                </div>

                {/* Avoid */}
                {day.avoid.length > 0 && (
                  <div className="bg-error-50 dark:bg-error-900/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-error-700 dark:text-error-300 mb-2">
                      <AlertTriangle className="w-4 h-4" />
                      Avoid
                    </div>
                    <ul className="text-sm text-error-600 dark:text-error-400 space-y-1">
                      {day.avoid.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-4">
          Carb targets based on {bodyWeightKg.toFixed(1)} kg body weight. Adjust based on your individual needs and tolerance.
        </p>
        <Button onClick={onClose} fullWidth variant="outline">
          Close
        </Button>
      </div>
    </Card>
  );
}
