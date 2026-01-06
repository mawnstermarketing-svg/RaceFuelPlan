import Link from "next/link";
import { Zap, TrendingUp, FileText, Check } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              RaceFuelPlan
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition">
              Pricing
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition"
            >
              Sign In
            </Link>
            <Link
              href="/calculator"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-md hover:shadow-lg"
            >
              Try Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Science-Backed Nutrition
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent leading-tight">
            Fuel Your Best Race
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Generate personalized fueling plans for your race day. Science-backed recommendations
            tailored to your body, pace, and conditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/calculator"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Create Free Plan
              <span className="inline-block group-hover:translate-x-1 transition-transform ml-2">→</span>
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-50 transition border-2 border-gray-200 shadow-md hover:shadow-lg"
            >
              View Pricing
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
          <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Personalized Plans</h3>
            <p className="text-gray-600 leading-relaxed">
              Customized fueling strategies based on your race distance, pace, body weight, and
              weather conditions.
            </p>
          </div>

          <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-indigo-200">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Science-Backed</h3>
            <p className="text-gray-600 leading-relaxed">
              Recommendations based on sports nutrition research and proven carbohydrate intake
              guidelines.
            </p>
          </div>

          <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-purple-200">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Race Day Ready</h3>
            <p className="text-gray-600 leading-relaxed">
              Print your race card with time stamps and mile markers for easy reference during your
              race.
            </p>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-5xl mx-auto border border-gray-100">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
            See What You Get
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 text-lg">Carbohydrate Target</h3>
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                75g/hour
              </p>
              <p className="text-sm text-gray-600 mb-1">Recommended: 60-90g/hour</p>
              <p className="text-sm font-semibold text-gray-700">Total race: 300g</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 text-lg">Sodium Target</h3>
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                500-800 mg/hr
              </p>
              <p className="text-sm text-gray-600">Adjusted for temperature & preference</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">Sample Fueling Schedule</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-200">
                <div className="flex-shrink-0 w-16 text-center">
                  <div className="text-sm font-bold text-gray-900">0:20</div>
                </div>
                <div className="flex-shrink-0 w-16 text-center">
                  <div className="text-sm font-semibold text-blue-600">Mile 1.7</div>
                </div>
                <div className="flex-1 text-sm text-gray-700">1 gel (25g) + water</div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-200">
                <div className="flex-shrink-0 w-16 text-center">
                  <div className="text-sm font-bold text-gray-900">0:45</div>
                </div>
                <div className="flex-shrink-0 w-16 text-center">
                  <div className="text-sm font-semibold text-blue-600">Mile 3.8</div>
                </div>
                <div className="flex-1 text-sm text-gray-700">1 gel (25g) + water</div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-200">
                <div className="flex-shrink-0 w-16 text-center">
                  <div className="text-sm font-bold text-gray-900">1:10</div>
                </div>
                <div className="flex-shrink-0 w-16 text-center">
                  <div className="text-sm font-semibold text-blue-600">Mile 5.9</div>
                </div>
                <div className="flex-1 text-sm text-gray-700">1 gel (25g) + water</div>
              </div>
              <div className="text-center text-gray-400 py-2">... and more</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <Link
            href="/calculator"
            className="group inline-flex items-center gap-2 px-12 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-xl hover:from-green-600 hover:to-emerald-700 transition shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Create Your Plan Now
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center">
          <div className="flex justify-center items-center gap-2 text-sm text-gray-600 mb-2">
            {[...Array(5)].map((_, i) => (
              <Check key={i} className="w-4 h-4 text-green-500" />
            ))}
          </div>
          <p className="text-gray-600">Trusted by thousands of runners worldwide</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © 2026 RaceFuelPlan. Not medical advice. Consult your healthcare provider.
            </p>
            <div className="flex gap-6">
              <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
