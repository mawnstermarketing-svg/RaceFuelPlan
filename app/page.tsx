"use client";

import Link from "next/link";
import {
  Zap,
  TrendingUp,
  FileText,
  ArrowRight,
  CheckCircle,
  Clock,
  Flame,
  Droplets,
  MapPin,
  Users,
  Star,
  ChevronRight,
  Shield,
  Gift,
  Mail,
  Download,
  BookOpen,
  ChevronDown,
  Check,
  HelpCircle,
  Sparkles,
  Trophy
} from "lucide-react";
import { Button, Card, Badge, Navbar } from "@/components/ui";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BonkCalculator } from "@/components/BonkCalculator";

const features = [
  {
    icon: TrendingUp,
    title: "Optimized Nutrition",
    description: "Carb and sodium targets calculated based on race duration, body weight, and temperature.",
    color: "primary",
  },
  {
    icon: Zap,
    title: "Science-Backed",
    description: "Recommendations based on peer-reviewed sports nutrition research and endurance guidelines.",
    color: "warning",
  },
  {
    icon: FileText,
    title: "Race Day Ready",
    description: "Printable race card with time stamps and mile markers for easy reference on the course.",
    color: "success",
  },
];

const sampleSchedule = [
  { time: "0:20", mile: "1.7", action: "1 gel (25g) + water" },
  { time: "0:45", mile: "3.8", action: "1 gel (25g) + water" },
  { time: "1:10", mile: "5.9", action: "1 gel (25g) + water" },
  { time: "1:35", mile: "8.0", action: "1 gel (25g) + water" },
];

const stats = [
  { value: "10K+", label: "Plans Created" },
  { value: "50+", label: "Race Distances" },
  { value: "4.9", label: "Star Rating" },
];

const testimonials = [
  {
    name: "Sarah M.",
    initials: "SM",
    race: "Chicago Marathon",
    result: "3:42 finish, no late-race fade",
    quote: "Finally nailed my fueling. Felt strong through mile 24 for the first time ever.",
    color: "primary",
  },
  {
    name: "Mike R.",
    initials: "MR",
    race: "Boston Marathon",
    result: "BQ by 8 minutes",
    quote: "The mile-by-mile breakdown made race day so simple. No more guessing when to fuel.",
    color: "success",
  },
  {
    name: "Jennifer L.",
    initials: "JL",
    race: "50K Ultra",
    result: "First ultra, zero GI issues",
    quote: "As someone with a sensitive stomach, this plan was a game-changer. Finished feeling great.",
    color: "accent",
  },
];

const faqItems = [
  {
    question: "Will this work for my stomach?",
    answer: "Yes! The calculator accounts for stomach tolerance with three levels (low, medium, high). If you have a sensitive stomach, select 'low' and we'll recommend gentler fueling strategies with smaller, more frequent doses. Many runners with GI issues report great results because the plan is personalized to their tolerance.",
  },
  {
    question: "What if the weather changes on race day?",
    answer: "You can regenerate your plan anytime with updated conditions. If race morning is hotter than expected, just update the temperature and get adjusted sodium and hydration targets in seconds. We recommend checking the forecast 2-3 days before and again race morning.",
  },
  {
    question: "Can I use my preferred gels and drinks?",
    answer: "Absolutely! You enter the carb content of YOUR specific gels and drink mixes. Whether you use Maurten, SiS, Gu, Tailwind, or homemade solutions, the plan adapts to your products and calculates exactly how many you'll need.",
  },
  {
    question: "What distances does this cover?",
    answer: "Everything from half marathon to 100-milers. The science scales appropriately for different durations. Shorter races focus on carb timing while ultras include more nuanced hydration and real-food strategies.",
  },
  {
    question: "Is this different from generic fueling advice?",
    answer: "Very different. Generic advice says 'take a gel every 45 minutes.' Your plan says 'at mile 8.2 (around 1:12:00), take 1 gel + 4oz water to hit your 72g/hr target given the 68°F conditions.' It's precision, not guesswork.",
  },
];

const bonusAssets = [
  {
    icon: BookOpen,
    title: "Race-Morning Breakfast Template",
    description: "Exactly what to eat 2-3 hours before your start time",
  },
  {
    icon: Flame,
    title: "Gut Training Mini-Guide",
    description: "4 long run protocols to train your stomach for race-day fueling",
  },
];

const emailSequence = [
  { icon: Download, text: "Instant: Full plan + printable race card" },
  { icon: Clock, text: "7 days before: Race week reminders + weather check" },
  { icon: Zap, text: "Race morning: Final checklist + confidence boost" },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-slate-950 to-accent-900/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Text */}
            <div className="animate-fade-in">
              <Badge variant="primary" size="lg" className="mb-6" icon={<Zap className="w-4 h-4" />}>
                Free Race Fueling Calculator
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-display-md font-bold text-white mb-6 leading-tight">
                Run Your Next Marathon{" "}
                <span className="text-gradient-light">Without Hitting the Wall</span>
              </h1>
              <p className="text-lg text-slate-400 mb-4 leading-relaxed max-w-xl">
                Get a personalized, mile-by-mile fueling strategy based on YOUR pace, weight, and race-day conditions.
                No more bonking after mile 18.
              </p>

              {/* What you receive */}
              <p className="text-slate-300 mb-8 font-medium">
                You'll receive: Downloadable race card, packing checklist, and weather-adjusted fuel targets tailored to your race.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <Link href="/calculator">
                  <Button size="xl" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Create Free Plan Preview
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="ghost" size="xl" className="text-slate-300 hover:text-white">
                    View Pricing
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </Button>
                </Link>
              </div>

              {/* Flow explanation */}
              <p className="text-sm text-slate-500">
                Create a free plan preview in 30 seconds, then upgrade to unlock your full race strategy and printable card.
              </p>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 mt-10 pt-8 border-t border-slate-800">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Sample Card */}
            <div className="animate-fade-in stagger-2">
              <Card
                variant="glass"
                padding="none"
                className="bg-slate-900/80 border-slate-700/50 overflow-hidden"
              >
                <div className="p-6 border-b border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">
                      Sample Output
                    </h3>
                    <Badge variant="success" size="sm" dot>
                      Live Preview
                    </Badge>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-primary-500/10 border border-primary-500/20">
                      <div className="flex items-center gap-2 text-sm text-primary-400 mb-1">
                        <Flame className="w-4 h-4" />
                        Carbs/Hour
                      </div>
                      <div className="text-3xl font-bold text-white">75g</div>
                    </div>
                    <div className="p-4 rounded-xl bg-accent-500/10 border border-accent-500/20">
                      <div className="flex items-center gap-2 text-sm text-accent-400 mb-1">
                        <Droplets className="w-4 h-4" />
                        Sodium/Hour
                      </div>
                      <div className="text-3xl font-bold text-white">500-800mg</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                      <Clock className="w-4 h-4" />
                      Fueling Schedule
                    </div>
                    <div className="space-y-2">
                      {sampleSchedule.slice(0, 3).map((item) => (
                        <div
                          key={item.time}
                          className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 text-sm"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-primary-400">{item.time}</span>
                            <span className="text-slate-500">•</span>
                            <span className="text-slate-400">Mile {item.mile}</span>
                          </div>
                          <span className="text-slate-300">{item.action}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-center text-slate-500 text-sm mt-3">+ more intervals</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Bonk Calculator Section */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge variant="warning" size="lg" className="mb-4">
              Free Tool
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Will You <span className="text-warning-400">Hit the Wall</span>?
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Most marathoners bonk because they underestimate their carb needs.
              See exactly when YOUR glycogen stores will run out.
            </p>
          </div>

          <BonkCalculator onGetPlan={() => router.push('/calculator')} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It <span className="text-gradient-light">Works</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Our calculator uses proven sports nutrition science to generate your personalized
              fueling strategy in seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  variant="outlined"
                  hover
                  className={`bg-slate-900/50 border-slate-800 animate-fade-in-up stagger-${idx + 1}`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
                      feature.color === "primary"
                        ? "bg-primary-500/20 text-primary-400"
                        : feature.color === "warning"
                        ? "bg-warning-500/20 text-warning-400"
                        : "bg-success-500/20 text-success-400"
                    }`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                </Card>
              );
            })}
          </div>

          {/* Authority Anchor */}
          <div className="text-center mt-10">
            <Link href="/science" className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors text-sm">
              <Shield className="w-4 h-4" />
              Plan ranges aligned with current sports nutrition guidelines for endurance athletes
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-16 border-t border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge variant="warning" className="mb-4" icon={<Sparkles className="w-4 h-4" />}>
              Free vs. Premium
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Preview Free, Unlock Everything for $29
            </h2>
            <p className="text-slate-400">
              See your first 3 fueling actions free. Upgrade to unlock your complete race strategy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Free Preview */}
            <Card variant="outlined" className="bg-slate-900/50 border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Free Preview</h3>
                <span className="text-2xl font-bold text-slate-400">$0</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-slate-400">
                  <Check className="w-5 h-5 text-slate-500" />
                  Carb and sodium targets
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <Check className="w-5 h-5 text-slate-500" />
                  First 3 fueling actions
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <Check className="w-5 h-5 text-slate-500" />
                  Race selection with weather data
                </li>
                <li className="flex items-center gap-3 text-slate-600 line-through">
                  Full mile-by-mile schedule
                </li>
                <li className="flex items-center gap-3 text-slate-600 line-through">
                  Printable race card
                </li>
                <li className="flex items-center gap-3 text-slate-600 line-through">
                  Bonus guides
                </li>
              </ul>
              <Link href="/calculator" className="block">
                <Button variant="outline" fullWidth>
                  Try Free Preview
                </Button>
              </Link>
            </Card>

            {/* Premium */}
            <Card variant="outlined" className="bg-gradient-to-br from-primary-900/30 to-accent-900/30 border-primary-700/50 relative">
              <div className="absolute -top-3 right-4">
                <Badge variant="primary" size="sm">Most Popular</Badge>
              </div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Full Plan</h3>
                <div>
                  <span className="text-2xl font-bold text-white">$29</span>
                  <span className="text-slate-400 ml-1">one-time</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-slate-300">
                  <Check className="w-5 h-5 text-success-400" />
                  <strong>Complete</strong> mile-by-mile fueling schedule
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Check className="w-5 h-5 text-success-400" />
                  Printable race card (PDF)
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Check className="w-5 h-5 text-success-400" />
                  Gear packing checklist
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Check className="w-5 h-5 text-success-400" />
                  3 race plans (use for multiple races)
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Check className="w-5 h-5 text-success-400" />
                  <span className="flex items-center gap-1">
                    <Gift className="w-4 h-4 text-warning-400" />
                    Bonus: Breakfast template + gut training guide
                  </span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Check className="w-5 h-5 text-success-400" />
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4 text-accent-400" />
                    Race week email reminders
                  </span>
                </li>
              </ul>
              <Link href="/pricing" className="block">
                <Button fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Get Full Plan
                </Button>
              </Link>

              {/* Guarantee */}
              <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-center gap-2 text-sm text-slate-400">
                <Shield className="w-4 h-4 text-success-400" />
                <span>Underfuel guarantee: Full refund if you bonk</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Plan Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card variant="outlined" padding="none" className="bg-slate-900/50 border-slate-800 overflow-hidden">
            <div className="p-8 lg:p-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                <div>
                  <Badge variant="default" className="mb-3">Example Plan</Badge>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    Marathon Fueling Strategy
                  </h2>
                  <p className="text-slate-400 mt-2">
                    26.2 miles • 4:00 goal time • 60°F conditions
                  </p>
                </div>
                <div className="text-left lg:text-right">
                  <Link href="/calculator">
                    <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Create Your Plan
                    </Button>
                  </Link>
                  <p className="text-sm text-slate-500 mt-2">
                    30-second setup, instant preview
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="p-5 rounded-xl bg-primary-500/10 border border-primary-500/20">
                  <div className="text-sm text-primary-400 mb-1">Carb Target</div>
                  <div className="text-3xl font-bold text-white">75g/hr</div>
                  <div className="text-sm text-slate-500 mt-1">Range: 60-90g/hr</div>
                </div>
                <div className="p-5 rounded-xl bg-accent-500/10 border border-accent-500/20">
                  <div className="text-sm text-accent-400 mb-1">Sodium Range</div>
                  <div className="text-3xl font-bold text-white">500-800mg</div>
                  <div className="text-sm text-slate-500 mt-1">Per hour</div>
                </div>
                <div className="p-5 rounded-xl bg-success-500/10 border border-success-500/20">
                  <div className="text-sm text-success-400 mb-1">Total Carbs</div>
                  <div className="text-3xl font-bold text-white">300g</div>
                  <div className="text-sm text-slate-500 mt-1">Entire race</div>
                </div>
                <div className="p-5 rounded-xl bg-warning-500/10 border border-warning-500/20">
                  <div className="text-sm text-warning-400 mb-1">Fuel Actions</div>
                  <div className="text-3xl font-bold text-white">12</div>
                  <div className="text-sm text-slate-500 mt-1">Planned stops</div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full">
                  <thead className="bg-slate-800/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Mile
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {sampleSchedule.map((item) => (
                      <tr key={item.time} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 font-mono text-primary-400">{item.time}</td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" size="sm">Mile {item.mile}</Badge>
                        </td>
                        <td className="px-6 py-4 text-slate-300">{item.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-center text-slate-500 text-sm mt-4">+ 8 more intervals in full plan</p>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-warning-400 fill-warning-400" />
              ))}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Trusted by Thousands of Endurance Athletes
            </h2>
            <p className="text-slate-400">Real results from real runners</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <Card
                key={testimonial.name}
                variant="outlined"
                className={`bg-slate-900/50 border-slate-800 animate-fade-in-up stagger-${idx + 1}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                      testimonial.color === "primary"
                        ? "bg-primary-600"
                        : testimonial.color === "success"
                        ? "bg-success-600"
                        : "bg-accent-600"
                    }`}
                  >
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-400">{testimonial.race}</div>
                  </div>
                </div>
                <p className="text-slate-300 mb-4 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-warning-400" />
                  <span className="text-sm font-medium text-warning-400">{testimonial.result}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bonus Assets Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge variant="warning" className="mb-4" icon={<Gift className="w-4 h-4" />}>
              Included Free with Every Plan
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Bonus Resources
            </h2>
            <p className="text-slate-400">
              Everything you need for race week success
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {bonusAssets.map((bonus) => {
              const Icon = bonus.icon;
              return (
                <Card key={bonus.title} variant="outlined" className="bg-slate-900/50 border-slate-800">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-warning-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-warning-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1">{bonus.title}</h3>
                      <p className="text-slate-400 text-sm">{bonus.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Email Sequence */}
          <Card variant="outlined" className="bg-slate-900/50 border-slate-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-accent-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">Race Week Email Sequence</h3>
                <p className="text-sm text-slate-400">We've got your back all the way to the start line</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {emailSequence.map((email, idx) => {
                const Icon = email.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
                    <Icon className="w-5 h-5 text-accent-400 flex-shrink-0" />
                    <span className="text-sm text-slate-300">{email.text}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400">
              Everything you need to know about your race fueling plan
            </p>
          </div>

          <div className="space-y-3">
            {faqItems.map((faq, idx) => (
              <Card
                key={idx}
                variant="outlined"
                padding="none"
                className="bg-slate-900/50 border-slate-800 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-800/30 transition-colors"
                >
                  <span className="font-semibold text-white pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 via-accent-600/20 to-primary-600/20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Run Your Best Race?
          </h2>
          <p className="text-lg text-slate-400 mb-2">
            Create a free plan preview in 30 seconds, then upgrade to unlock your full race strategy and printable card.
          </p>
          <p className="text-slate-300 mb-8 font-medium">
            Downloadable race card, packing checklist, and weather-adjusted fuel targets tailored to your race.
          </p>
          <Link href="/calculator">
            <Button size="xl" rightIcon={<ArrowRight className="w-5 h-5" />}>
              Create Your Free Preview
            </Button>
          </Link>

          {/* Guarantee */}
          <div className="mt-6 inline-flex items-center gap-2 text-sm text-slate-400 bg-slate-800/50 px-4 py-2 rounded-full">
            <Shield className="w-4 h-4 text-success-400" />
            If you underfuel using this plan, reply to your confirmation email for a full refund
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary-500 to-accent-600">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">RaceFuelPlan</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <Link href="/science" className="hover:text-slate-300 transition">
                Science
              </Link>
              <Link href="/terms" className="hover:text-slate-300 transition">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-slate-300 transition">
                Privacy
              </Link>
              <Link href="/pricing" className="hover:text-slate-300 transition">
                Pricing
              </Link>
              <Link href="/login" className="hover:text-slate-300 transition">
                Sign In
              </Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-800 text-center text-sm text-slate-600">
            © {new Date().getFullYear()} RaceFuelPlan. All rights reserved. Not medical advice.
          </div>
        </div>
      </footer>
    </div>
  );
}
