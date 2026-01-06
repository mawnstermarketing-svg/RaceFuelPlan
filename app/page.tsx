import Link from "next/link";
import { Zap, TrendingUp, FileText } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">
          {/* Left: Hero Text */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Personalized Race Fueling Plans
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Generate science-backed nutrition strategies tailored to your race distance, pace, body weight, and conditions. Get your plan in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/calculator"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
              >
                Create Free Plan
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 text-slate-300 hover:text-white transition text-lg font-medium"
              >
                View pricing →
              </Link>
            </div>
          </div>

          {/* Right: Sample Card */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">
              Sample Output
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-slate-400 mb-1">Carbs/Hour</div>
                <div className="text-3xl font-bold text-blue-400">75g</div>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-1">Sodium/Hour</div>
                <div className="text-3xl font-bold text-blue-400">500-800mg</div>
              </div>
              <div className="border-t border-slate-700 pt-4">
                <div className="text-sm text-slate-400 mb-2">Fueling Schedule</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-300">
                    <span>0:20 • Mile 1.7</span>
                    <span>1 gel + water</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>0:45 • Mile 3.8</span>
                    <span>1 gel + water</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>1:10 • Mile 5.9</span>
                    <span>1 gel + water</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Helps Section */}
        <div className="py-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            How It Helps
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Optimized Nutrition</h3>
              <p className="text-base text-slate-300">
                Carb and sodium targets calculated based on race duration, body weight, and temperature.
              </p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Science-Backed</h3>
              <p className="text-base text-slate-300">
                Recommendations based on peer-reviewed sports nutrition research and endurance guidelines.
              </p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Race Day Ready</h3>
              <p className="text-base text-slate-300">
                Printable race card with time stamps and mile markers for easy reference on the course.
              </p>
            </div>
          </div>
        </div>

        {/* Sample Plan Preview */}
        <div className="py-16">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Example: Marathon Plan
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="text-sm text-slate-400 mb-1">Carbohydrate Target</div>
                <div className="text-4xl font-bold text-blue-400 mb-1">75g/hour</div>
                <div className="text-sm text-slate-400">Total race: 300g</div>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-1">Sodium Range</div>
                <div className="text-4xl font-bold text-blue-400 mb-1">500-800mg/hr</div>
                <div className="text-sm text-slate-400">Adjusted for conditions</div>
              </div>
            </div>
            <div className="border-t border-slate-700 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Fueling Schedule</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-2 text-slate-400 font-medium">Time</th>
                      <th className="text-left py-2 text-slate-400 font-medium">Mile</th>
                      <th className="text-left py-2 text-slate-400 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-slate-700">
                      <td className="py-3">0:20</td>
                      <td className="py-3">1.7</td>
                      <td className="py-3">1 gel (25g) + water</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-3">0:45</td>
                      <td className="py-3">3.8</td>
                      <td className="py-3">1 gel (25g) + water</td>
                    </tr>
                    <tr>
                      <td className="py-3">1:10</td>
                      <td className="py-3">5.9</td>
                      <td className="py-3">1 gel (25g) + water</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-center text-slate-500 text-sm mt-4">+ 6 more intervals</div>
            </div>
          </div>
        </div>

        {/* Trust Row */}
        <div className="py-8 text-center">
          <p className="text-sm text-slate-400 mb-2">
            Trusted by thousands of endurance athletes
          </p>
          <p className="text-xs text-slate-500">
            Not medical advice. Consult your healthcare provider before changing your nutrition strategy.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <div>© 2026 RaceFuelPlan</div>
            <div className="flex gap-6">
              <Link href="/terms" className="hover:text-slate-300 transition">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-slate-300 transition">
                Privacy
              </Link>
              <Link href="/login" className="hover:text-slate-300 transition">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
