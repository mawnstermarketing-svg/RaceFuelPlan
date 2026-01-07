"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  Zap,
  Crown,
  ChevronLeft,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Download,
  Save,
  FileText,
  RefreshCw
} from "lucide-react";
import { Button, Card, Badge, Navbar } from "@/components/ui";

const plans = [
  {
    name: "Single Plan",
    price: 29,
    period: "one-time",
    description: "Perfect for a single race",
    features: [
      { text: "One personalized fueling plan", included: true },
      { text: "Download & print race card", included: true },
      { text: "Save to dashboard", included: true },
      { text: "Email support", included: true },
      { text: "Unlimited plans", included: false },
      { text: "Future updates", included: false },
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Unlimited Annual",
    price: 49,
    period: "per year",
    description: "Best for multiple races",
    features: [
      { text: "Unlimited fueling plans", included: true, highlight: true },
      { text: "Download & print all plans", included: true },
      { text: "Save unlimited plans", included: true },
      { text: "Priority email support", included: true },
      { text: "All future updates", included: true },
      { text: "Cancel anytime", included: true },
    ],
    cta: "Get Started",
    popular: true,
  },
];

const faqs = [
  {
    question: "Can I try before I buy?",
    answer:
      "Yes! The calculator is completely free to use. You can see your full fueling plan before deciding to purchase.",
  },
  {
    question: "What's the difference between plans?",
    answer:
      "The single plan ($29) unlocks download and save features for one specific plan. Perfect if you're training for one race. The annual plan ($49) gives you unlimited plans for a year - great for runners doing multiple races.",
  },
  {
    question: "Can I cancel my annual plan?",
    answer:
      "Yes, you can cancel anytime. You'll keep access until your current period ends.",
  },
  {
    question: "Is this medical advice?",
    answer:
      "No, this tool provides general nutrition guidance based on sports science research. Always consult your healthcare provider before making changes to your nutrition strategy.",
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Badge variant="primary" size="lg" className="mb-4" icon={<Sparkles className="w-4 h-4" />}>
            Simple Pricing
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Choose Your <span className="text-gradient">Plan</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Start with a free plan preview, then unlock full features when you're ready
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              variant={plan.popular ? "default" : "outlined"}
              padding="none"
              className={`relative overflow-hidden ${
                plan.popular
                  ? "bg-gradient-to-br from-primary-600 via-accent-600 to-primary-700 border-0"
                  : "bg-white dark:bg-slate-900"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-4 right-4">
                  <Badge variant="success" size="sm" icon={<Crown className="w-3 h-3" />}>
                    BEST VALUE
                  </Badge>
                </div>
              )}

              <div className="p-8">
                <div className="mb-6">
                  <h2
                    className={`text-2xl font-bold mb-2 ${
                      plan.popular ? "text-white" : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {plan.name}
                  </h2>
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-5xl font-bold ${
                        plan.popular ? "text-white" : "text-slate-900 dark:text-white"
                      }`}
                    >
                      ${plan.price}
                    </span>
                    <span
                      className={`text-lg ${
                        plan.popular ? "text-white/80" : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {plan.period}
                    </span>
                  </div>
                  <p
                    className={`mt-2 ${
                      plan.popular ? "text-white/80" : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          feature.included
                            ? plan.popular
                              ? "bg-white/20"
                              : "bg-success-100 dark:bg-success-900/30"
                            : plan.popular
                            ? "bg-white/10"
                            : "bg-slate-100 dark:bg-slate-800"
                        }`}
                      >
                        {feature.included ? (
                          <Check
                            className={`w-3 h-3 ${
                              plan.popular
                                ? "text-white"
                                : "text-success-600 dark:text-success-400"
                            }`}
                          />
                        ) : (
                          <span
                            className={`w-1.5 h-0.5 rounded ${
                              plan.popular ? "bg-white/40" : "bg-slate-300 dark:bg-slate-600"
                            }`}
                          />
                        )}
                      </div>
                      <span
                        className={`text-sm ${
                          feature.included
                            ? plan.popular
                              ? feature.highlight
                                ? "text-white font-semibold"
                                : "text-white"
                              : "text-slate-700 dark:text-slate-300"
                            : plan.popular
                            ? "text-white/50"
                            : "text-slate-400 dark:text-slate-500"
                        }`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href="/login">
                  <Button
                    variant={plan.popular ? "secondary" : "primary"}
                    size="lg"
                    fullWidth
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className={
                      plan.popular
                        ? "bg-white text-primary-700 hover:bg-slate-100"
                        : ""
                    }
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Free Calculator CTA */}
        <div className="text-center mb-16">
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Try the calculator for free
          </Link>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">
            What You Get
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Zap, label: "Instant Plan Generation", color: "primary" },
              { icon: Download, label: "Printable Race Cards", color: "success" },
              { icon: Save, label: "Save to Dashboard", color: "accent" },
              { icon: RefreshCw, label: "Unlimited Updates", color: "warning" },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.label} variant="filled" padding="md" className="text-center">
                  <div
                    className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${
                      feature.color === "primary"
                        ? "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                        : feature.color === "success"
                        ? "bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400"
                        : feature.color === "accent"
                        ? "bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400"
                        : "bg-warning-100 dark:bg-warning-900/30 text-warning-600 dark:text-warning-400"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="font-medium text-slate-900 dark:text-white text-sm">
                    {feature.label}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <Card key={idx} variant="elevated" padding="none" className="overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span className="font-medium text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4 text-slate-600 dark:text-slate-400 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
