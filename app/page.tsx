import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            RaceFuelPlan
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Generate science-backed fueling plans for your race day. Optimize your nutrition
            strategy for half marathons, marathons, and ultras.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/calculator"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition shadow-lg"
            >
              Try Free Calculator
            </Link>
            <Link
              href="/pricing"
              className="bg-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-400 transition border-2 border-white"
            >
              View Pricing
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-3">Personalized Plans</h3>
            <p className="text-blue-100">
              Customized fueling strategies based on your race distance, pace, body weight, and
              conditions.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-3">Science-Backed</h3>
            <p className="text-blue-100">
              Recommendations based on sports nutrition research and carbohydrate intake guidelines.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-3">Race Day Ready</h3>
            <p className="text-blue-100">
              Print your race card with time stamps and mile markers for easy reference during your
              race.
            </p>
          </div>
        </div>

        {/* Sample Output Preview */}
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            See What You Get
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-blue-200 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-2">Carbohydrate Target</h3>
              <p className="text-3xl font-bold text-blue-600">75g/hour</p>
              <p className="text-sm text-gray-600 mt-1">Recommended: 60-90g/hour</p>
              <p className="text-sm text-gray-600">Total race: 300g</p>
            </div>
            <div className="border-2 border-blue-200 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-2">Sodium Target</h3>
              <p className="text-xl font-bold text-blue-600">500-800 mg/hour</p>
              <p className="text-sm text-gray-600 mt-1">Adjusted for temperature & preference</p>
            </div>
          </div>
          <div className="mt-6 border-2 border-blue-200 rounded-lg p-4">
            <h3 className="font-bold text-gray-900 mb-3">Sample Fueling Schedule</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold">Time</span>
                <span className="font-semibold">Mile</span>
                <span className="font-semibold">Action</span>
              </div>
              <div className="flex justify-between">
                <span>0:20</span>
                <span>1.7</span>
                <span className="text-right">1 gel (25g) + water</span>
              </div>
              <div className="flex justify-between">
                <span>0:45</span>
                <span>3.8</span>
                <span className="text-right">1 gel (25g) + water</span>
              </div>
              <div className="flex justify-between">
                <span>1:10</span>
                <span>5.9</span>
                <span className="text-right">1 gel (25g) + water</span>
              </div>
              <div className="text-center text-gray-500 py-2">... and more</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/calculator"
            className="inline-block bg-green-500 text-white px-12 py-4 rounded-lg font-bold text-xl hover:bg-green-400 transition shadow-lg"
          >
            Create Your Plan Now
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-blue-200 text-sm">
          <p className="mb-2">Disclaimer: Not medical advice. Consult your healthcare provider.</p>
          <div className="space-x-4">
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
