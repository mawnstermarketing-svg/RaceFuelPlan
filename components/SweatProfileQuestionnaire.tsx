'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface SweatProfileQuestionnaireProps {
  onComplete: (profile: SweatProfile) => void;
  onClose: () => void;
}

export interface SweatProfile {
  sweatAmount: 'light' | 'moderate' | 'heavy';
  sodiumNeeds: 'low' | 'medium' | 'high';
  heatSensitivity: 'low' | 'moderate' | 'high';
  crampRisk: 'low' | 'moderate' | 'high';
  recommendations: string[];
}

interface Question {
  id: string;
  question: string;
  description: string;
  options: {
    value: number;
    label: string;
    description: string;
  }[];
}

const questions: Question[] = [
  {
    id: 'saltStains',
    question: 'Do you notice white salt stains on your clothes or hat after workouts?',
    description: 'Salt residue indicates higher sodium concentration in your sweat.',
    options: [
      { value: 0, label: 'Never', description: 'No visible salt marks' },
      { value: 1, label: 'Sometimes', description: 'Occasional light marks' },
      { value: 2, label: 'Often', description: 'Regular visible stains' },
      { value: 3, label: 'Always', description: 'Heavy crusty deposits' },
    ],
  },
  {
    id: 'sweatAmount',
    question: 'How would you describe your sweat volume compared to others?',
    description: 'Think about group runs or gym sessions with similar effort levels.',
    options: [
      { value: 0, label: 'Light sweater', description: 'Barely break a sweat' },
      { value: 1, label: 'Average', description: 'Similar to most people' },
      { value: 2, label: 'Heavy sweater', description: 'Noticeably more than others' },
      { value: 3, label: 'Very heavy', description: 'Dripping wet, clothes soaked' },
    ],
  },
  {
    id: 'crampHistory',
    question: 'How often do you experience muscle cramps during or after exercise?',
    description: 'Cramps can indicate electrolyte imbalances, especially sodium.',
    options: [
      { value: 0, label: 'Never', description: 'No cramping issues' },
      { value: 1, label: 'Rarely', description: 'Maybe once or twice a year' },
      { value: 2, label: 'Sometimes', description: 'A few times per month' },
      { value: 3, label: 'Frequently', description: 'Regular cramping during hard efforts' },
    ],
  },
  {
    id: 'heatPerformance',
    question: 'How does heat affect your exercise performance?',
    description: 'Heat tolerance varies based on sweat rate and cooling efficiency.',
    options: [
      { value: 0, label: 'Minimal impact', description: 'I perform well in heat' },
      { value: 1, label: 'Slight decline', description: 'A bit slower but manageable' },
      { value: 2, label: 'Noticeable decline', description: 'Significantly harder in heat' },
      { value: 3, label: 'Major decline', description: 'Heat severely impacts me' },
    ],
  },
  {
    id: 'saltCravings',
    question: 'Do you crave salty foods after long workouts?',
    description: 'Salt cravings can indicate your body needs more sodium.',
    options: [
      { value: 0, label: 'Never', description: 'No particular cravings' },
      { value: 1, label: 'Sometimes', description: 'Occasional salt cravings' },
      { value: 2, label: 'Often', description: 'Regular cravings after exercise' },
      { value: 3, label: 'Always', description: 'Intense cravings every time' },
    ],
  },
  {
    id: 'sweatTaste',
    question: 'If sweat gets in your eyes or mouth, how salty does it taste/sting?',
    description: 'Saltier sweat = higher sodium concentration.',
    options: [
      { value: 0, label: 'Not very salty', description: 'Barely noticeable' },
      { value: 1, label: 'Mildly salty', description: 'Some taste but not strong' },
      { value: 2, label: 'Quite salty', description: 'Noticeable salty taste, stings eyes' },
      { value: 3, label: 'Very salty', description: 'Intense burning in eyes' },
    ],
  },
];

export function SweatProfileQuestionnaire({ onComplete, onClose }: SweatProfileQuestionnaireProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: number) => {
    const newAnswers = {
      ...answers,
      [questions[currentQuestion].id]: value,
    };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateProfile = (): SweatProfile => {
    // Calculate scores
    const sodiumScore = (answers.saltStains || 0) + (answers.saltCravings || 0) + (answers.sweatTaste || 0);
    const sweatVolumeScore = (answers.sweatAmount || 0) + (answers.heatPerformance || 0);
    const crampScore = answers.crampHistory || 0;

    // Determine sweat amount
    let sweatAmount: 'light' | 'moderate' | 'heavy';
    if (sweatVolumeScore <= 2) {
      sweatAmount = 'light';
    } else if (sweatVolumeScore <= 4) {
      sweatAmount = 'moderate';
    } else {
      sweatAmount = 'heavy';
    }

    // Determine sodium needs
    let sodiumNeeds: 'low' | 'medium' | 'high';
    if (sodiumScore <= 3) {
      sodiumNeeds = 'low';
    } else if (sodiumScore <= 6) {
      sodiumNeeds = 'medium';
    } else {
      sodiumNeeds = 'high';
    }

    // Determine heat sensitivity
    let heatSensitivity: 'low' | 'moderate' | 'high';
    const heatScore = answers.heatPerformance || 0;
    if (heatScore <= 1) {
      heatSensitivity = 'low';
    } else if (heatScore === 2) {
      heatSensitivity = 'moderate';
    } else {
      heatSensitivity = 'high';
    }

    // Determine cramp risk
    let crampRisk: 'low' | 'moderate' | 'high';
    if (crampScore <= 1) {
      crampRisk = 'low';
    } else if (crampScore === 2) {
      crampRisk = 'moderate';
    } else {
      crampRisk = 'high';
    }

    // Generate recommendations
    const recommendations: string[] = [];

    if (sodiumNeeds === 'high') {
      recommendations.push('Consider sodium-enhanced sports drinks (700-1000mg sodium/L)');
      recommendations.push('Add salt tablets during races over 2 hours');
      recommendations.push('Include salty snacks in pre-race meals');
    } else if (sodiumNeeds === 'medium') {
      recommendations.push('Standard sports drinks (300-500mg sodium/L) should suffice');
      recommendations.push('Consider salt tablets only in hot conditions');
    } else {
      recommendations.push('Regular hydration without extra sodium is likely fine');
      recommendations.push('Focus on overall fluid intake rather than sodium');
    }

    if (sweatAmount === 'heavy') {
      recommendations.push('Aim for higher fluid intake: 24-32 oz/hour in moderate conditions');
      recommendations.push('Pre-hydrate well 2-3 hours before race start');
      recommendations.push('Consider a hydration vest for longer races');
    } else if (sweatAmount === 'moderate') {
      recommendations.push('Target 16-24 oz/hour of fluid intake');
    } else {
      recommendations.push('Standard fluid intake of 12-20 oz/hour should work well');
    }

    if (heatSensitivity === 'high') {
      recommendations.push('Start conservatively in warm races and adjust pace');
      recommendations.push('Pour water over head/neck at aid stations');
      recommendations.push('Seek shade when possible during races');
    }

    if (crampRisk === 'high') {
      recommendations.push('Ensure adequate sodium intake before and during exercise');
      recommendations.push('Consider magnesium supplementation');
      recommendations.push('Practice pace discipline to reduce cramp risk');
    }

    return {
      sweatAmount,
      sodiumNeeds,
      heatSensitivity,
      crampRisk,
      recommendations,
    };
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    const profile = calculateProfile();

    return (
      <Card className="p-6 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your Sweat Profile</h2>
          <p className="text-gray-600 dark:text-gray-300">Based on your answers, here's your personalized profile</p>
        </div>

        {/* Profile Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 text-center">
            <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">Sweat Volume</div>
            <div className="text-xl font-bold text-blue-900 dark:text-blue-100 capitalize">{profile.sweatAmount}</div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/30 rounded-lg p-4 text-center">
            <div className="text-sm text-orange-600 dark:text-orange-400 font-medium mb-1">Sodium Needs</div>
            <div className="text-xl font-bold text-orange-900 dark:text-orange-100 capitalize">{profile.sodiumNeeds}</div>
          </div>
          <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-4 text-center">
            <div className="text-sm text-red-600 dark:text-red-400 font-medium mb-1">Heat Sensitivity</div>
            <div className="text-xl font-bold text-red-900 dark:text-red-100 capitalize">{profile.heatSensitivity}</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 text-center">
            <div className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-1">Cramp Risk</div>
            <div className="text-xl font-bold text-purple-900 dark:text-purple-100 capitalize">{profile.crampRisk}</div>
          </div>
        </div>

        {/* Sodium Target */}
        <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Suggested Sodium Range</h3>
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {profile.sodiumNeeds === 'low' && '300-500 mg/hour'}
            {profile.sodiumNeeds === 'medium' && '500-700 mg/hour'}
            {profile.sodiumNeeds === 'high' && '700-1000+ mg/hour'}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {profile.sodiumNeeds === 'low' && 'Your sodium losses appear typical. Standard sports drinks should meet your needs.'}
            {profile.sodiumNeeds === 'medium' && 'You have moderate sodium needs. Consider sodium-enhanced drinks in hot conditions.'}
            {profile.sodiumNeeds === 'high' && 'You\'re a salty sweater. Plan for extra sodium, especially in longer or hotter races.'}
          </p>
        </div>

        {/* Recommendations */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Personalized Recommendations</h3>
          <ul className="space-y-2">
            {profile.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-200">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Close
          </Button>
          <Button onClick={() => onComplete(profile)} className="flex-1">
            Apply to My Plan
          </Button>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
          This questionnaire provides estimates. For precise data, complete a home sweat rate test.
        </p>
      </Card>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Sweat Profile Quiz</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Question {currentQuestion + 1} of {questions.length}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 mb-6">
        <div
          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{question.question}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{question.description}</p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswer(option.value)}
            className="w-full text-left p-4 rounded-lg border-2 border-gray-200 dark:border-slate-600 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-slate-500 group-hover:border-primary-500 flex items-center justify-center flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-transparent group-hover:bg-primary-500" />
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{option.label}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{option.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Back Button */}
      {currentQuestion > 0 && (
        <button
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
          className="mt-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous question
        </button>
      )}
    </Card>
  );
}
