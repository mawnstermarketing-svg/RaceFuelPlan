"use client";

import Link from "next/link";
import {
  Zap,
  ArrowRight,
  ChevronLeft,
  BookOpen,
  Beaker,
  TrendingUp,
  Droplets,
  Thermometer,
  Scale,
  Clock,
  CheckCircle,
  ExternalLink
} from "lucide-react";
import { Button, Card, Badge, Navbar } from "@/components/ui";

const guidelines = [
  {
    icon: Beaker,
    title: "Carbohydrate Targets: 60-90g/hour",
    description: "For events lasting >2.5 hours, research supports 60-90g of carbohydrates per hour using multiple transportable carbohydrates (glucose + fructose) to maximize oxidation rates.",
    source: "Jeukendrup, 2014 - Sports Medicine",
    color: "primary",
  },
  {
    icon: Droplets,
    title: "Sodium Replacement: 300-1000mg/hour",
    description: "Sodium needs vary significantly by sweat rate and sweat sodium concentration. Our calculator adjusts for temperature, which strongly influences sweat loss.",
    source: "Baker & Jeukendrup, 2014 - Sports Medicine",
    color: "accent",
  },
  {
    icon: Clock,
    title: "Timing: Every 15-20 Minutes",
    description: "Frequent, smaller doses improve gastric tolerance compared to larger, less frequent intakes. This reduces GI distress risk while maintaining energy availability.",
    source: "Pfeiffer et al., 2012 - Medicine & Science in Sports",
    color: "success",
  },
  {
    icon: Thermometer,
    title: "Heat Adjustments",
    description: "Hot conditions increase sweat rate by 20-50%, requiring higher fluid and sodium intake. Our calculator increases sodium targets by 20-40% for temperatures above 70°F.",
    source: "Shirreffs & Sawka, 2011 - Journal of Sports Sciences",
    color: "warning",
  },
];

const principles = [
  {
    title: "Individual Variation",
    description: "We account for body weight, pace, and stomach tolerance because research shows these factors significantly affect optimal fueling strategies.",
  },
  {
    title: "Practical Application",
    description: "Scientific guidelines are translated into specific products and timing based on your preferred fuel sources (gels, drinks, or hybrid approaches).",
  },
  {
    title: "Conservative Defaults",
    description: "For athletes new to structured fueling, we start at the lower end of recommended ranges to minimize GI risk while building tolerance.",
  },
  {
    title: "Gut Training Emphasis",
    description: "We provide guidance on training your gut during long runs, which research shows can increase carbohydrate tolerance by 20-40%.",
  },
];

const references = [
  {
    authors: "Jeukendrup AE",
    year: "2014",
    title: "A step towards personalized sports nutrition: carbohydrate intake during exercise",
    journal: "Sports Medicine",
    volume: "44(Suppl 1):S25-33",
  },
  {
    authors: "Baker LB, Jeukendrup AE",
    year: "2014",
    title: "Optimal composition of fluid-replacement beverages",
    journal: "Comprehensive Physiology",
    volume: "4(2):575-620",
  },
  {
    authors: "Pfeiffer B, et al.",
    year: "2012",
    title: "Nutritional intake and gastrointestinal problems during competitive endurance events",
    journal: "Medicine & Science in Sports & Exercise",
    volume: "44(2):344-351",
  },
  {
    authors: "Shirreffs SM, Sawka MN",
    year: "2011",
    title: "Fluid and electrolyte needs for training, competition, and recovery",
    journal: "Journal of Sports Sciences",
    volume: "29(Suppl 1):S39-46",
  },
  {
    authors: "Thomas DT, et al.",
    year: "2016",
    title: "Position of the Academy of Nutrition and Dietetics: Nutrition and Athletic Performance",
    journal: "Journal of the Academy of Nutrition and Dietetics",
    volume: "116(3):501-528",
  },
];

export default function SciencePage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-300 mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <Badge variant="primary" className="mb-4" icon={<Beaker className="w-4 h-4" />}>
            Evidence-Based Approach
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Why RaceFuelPlan is Science-Backed
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Our fueling recommendations are derived from peer-reviewed sports nutrition research
            and align with current guidelines from leading sports science organizations.
          </p>
        </div>

        {/* Key Guidelines */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            Key Scientific Guidelines We Follow
          </h2>
          <div className="grid gap-6">
            {guidelines.map((guideline) => {
              const Icon = guideline.icon;
              return (
                <Card
                  key={guideline.title}
                  variant="outlined"
                  className="bg-slate-900/50 border-slate-800"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        guideline.color === "primary"
                          ? "bg-primary-500/20 text-primary-400"
                          : guideline.color === "accent"
                          ? "bg-accent-500/20 text-accent-400"
                          : guideline.color === "success"
                          ? "bg-success-500/20 text-success-400"
                          : "bg-warning-500/20 text-warning-400"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{guideline.title}</h3>
                      <p className="text-slate-400 mb-3 leading-relaxed">{guideline.description}</p>
                      <p className="text-sm text-slate-500 italic">{guideline.source}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* How We Apply Science */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            How We Apply the Science
          </h2>
          <Card variant="outlined" className="bg-slate-900/50 border-slate-800">
            <div className="grid sm:grid-cols-2 gap-6">
              {principles.map((principle) => (
                <div key={principle.title} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">{principle.title}</h3>
                    <p className="text-sm text-slate-400">{principle.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Calculator Logic */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            Calculator Logic Overview
          </h2>
          <Card variant="outlined" className="bg-slate-900/50 border-slate-800">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-primary-400" />
                  Carbohydrate Calculation
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Base target starts at 60g/hour for most runners. We adjust upward (to 90g/hour max)
                  based on race duration, body weight, and stated stomach tolerance. Larger athletes
                  and those with high tolerance can absorb more carbohydrates effectively.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-accent-400" />
                  Sodium Calculation
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Base range is 300-600mg/hour. We increase this by 20-40% for temperatures above 70°F
                  and for athletes who report high sweat rates. This aligns with research showing
                  significant individual variation in sweat sodium losses.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-success-400" />
                  Timing Strategy
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Fueling intervals are calculated based on your pace and fuel source carbohydrate
                  content. We aim for 15-25 minute intervals to maintain steady energy without
                  overwhelming the gut. The first fuel is typically scheduled 15-20 minutes in.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* References */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            Selected References
          </h2>
          <Card variant="outlined" className="bg-slate-900/50 border-slate-800">
            <div className="space-y-4">
              {references.map((ref, idx) => (
                <div
                  key={idx}
                  className={`pb-4 ${idx < references.length - 1 ? "border-b border-slate-800" : ""}`}
                >
                  <p className="text-slate-300 text-sm">
                    {ref.authors} ({ref.year}). <em>{ref.title}</em>. {ref.journal}, {ref.volume}.
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Disclaimer */}
        <section className="mb-16">
          <Card variant="filled" className="bg-slate-800/50 border-slate-700">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-warning-500/20 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-warning-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Important Disclaimer</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  While our recommendations are based on published research, individual responses
                  to nutrition vary significantly. This tool provides general guidance and is not
                  a substitute for personalized advice from a registered sports dietitian.
                  Always test your fueling strategy during training before race day. If you have
                  medical conditions affecting nutrition, consult your healthcare provider.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Create Your Plan?
          </h2>
          <p className="text-slate-400 mb-6">
            Put science-backed fueling to work for your next race.
          </p>
          <Link href="/calculator">
            <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Create Your Free Preview
            </Button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary-500 to-accent-600">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">RaceFuelPlan</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <Link href="/" className="hover:text-slate-300 transition">
                Home
              </Link>
              <Link href="/calculator" className="hover:text-slate-300 transition">
                Calculator
              </Link>
              <Link href="/pricing" className="hover:text-slate-300 transition">
                Pricing
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
