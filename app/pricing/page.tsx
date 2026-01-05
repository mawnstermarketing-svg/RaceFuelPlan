import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Simple Pricing</h1>
          <p className="text-xl text-gray-600">Choose the plan that works for you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* One-Time Purchase */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-gray-200">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Single Plan</h2>
              <div className="text-5xl font-bold text-blue-600 mb-2">$29</div>
              <p className="text-gray-600">One-time purchase</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>One personalized fueling plan</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Download & print race card</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Save to dashboard</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Perfect for a single race</span>
              </li>
            </ul>
            <Link
              href="/login"
              className="block w-full bg-blue-600 text-white text-center py-3 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </div>

          {/* Annual Plan */}
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-lg shadow-lg p-8 border-2 border-indigo-500 relative">
            <div className="absolute top-0 right-0 bg-green-400 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg font-semibold text-sm">
              BEST VALUE
            </div>
            <div className="text-center mb-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Unlimited Annual</h2>
              <div className="text-5xl font-bold mb-2">$49</div>
              <p className="text-blue-100">per year</p>
            </div>
            <ul className="space-y-3 mb-8 text-white">
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-300 mr-2 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="font-semibold">Unlimited fueling plans</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-300 mr-2 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Download & print all plans</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-300 mr-2 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Save unlimited plans</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-300 mr-2 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Perfect for multiple races</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-300 mr-2 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Updates & improvements</span>
              </li>
            </ul>
            <Link
              href="/login"
              className="block w-full bg-white text-indigo-600 text-center py-3 rounded-md font-semibold hover:bg-gray-100 transition"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link href="/calculator" className="text-blue-600 hover:text-blue-700 font-semibold">
            ← Try the calculator for free
          </Link>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-gray-900 mb-2">Can I try before I buy?</h3>
              <p className="text-gray-600">
                Yes! The calculator is completely free to use. You can see your full fueling plan
                before deciding to purchase.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-gray-900 mb-2">
                What's the difference between plans?
              </h3>
              <p className="text-gray-600">
                The single plan ($29) unlocks download and save features for one specific plan.
                Perfect if you're training for one race. The annual plan ($49) gives you unlimited
                plans for a year - great for runners doing multiple races.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-gray-900 mb-2">Can I cancel my annual plan?</h3>
              <p className="text-gray-600">
                Yes, you can cancel anytime. You'll keep access until your current period ends.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-gray-900 mb-2">Is this medical advice?</h3>
              <p className="text-gray-600">
                No, this tool provides general nutrition guidance based on sports science research.
                Always consult your healthcare provider before making changes to your nutrition
                strategy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
