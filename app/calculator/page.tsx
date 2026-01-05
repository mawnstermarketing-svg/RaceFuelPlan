"use client";

import { useState } from "react";
import { PlanInput, PlanOutput } from "@/lib/types";
import { generateFuelingPlan } from "@/lib/planGenerator";
import { generatePlanTitle } from "@/lib/format";

export default function CalculatorPage() {
  const [formData, setFormData] = useState<Partial<PlanInput>>({
    distance: 26.2,
    goalTimeMinutes: 240,
    bodyWeightLb: 150,
    temperatureF: 60,
    fuelType: "gels",
    gelCarbsG: 25,
    drinkCarbsG: 40,
    sodiumPreference: "medium",
    stomachTolerance: "medium",
  });

  const [result, setResult] = useState<PlanOutput | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const plan = generateFuelingPlan(formData as PlanInput);
      setResult(plan);
    } catch (error) {
      console.error("Error generating plan:", error);
      alert("Please fill in all fields correctly");
    }
  };

  const handleDownload = () => {
    setShowPaywall(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs: formData }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          // Not logged in, redirect to login
          window.location.href = "/login?callbackUrl=/app";
          return;
        }
        throw new Error("Failed to save plan");
      }

      const data = await res.json();
      // Redirect to the saved plan
      window.location.href = `/app/plans/${data.planId}`;
    } catch (error) {
      console.error("Error saving plan:", error);
      alert("Failed to save plan. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Race Fueling Calculator</h1>
          <p className="text-gray-600">Enter your race details to generate a personalized fueling plan</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Distance</label>
                <select
                  value={formData.distance}
                  onChange={(e) =>
                    setFormData({ ...formData, distance: parseFloat(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="13.1">Half Marathon (13.1 mi)</option>
                  <option value="26.2">Marathon (26.2 mi)</option>
                  <option value="31">50K (31 mi)</option>
                  <option value="50">50 Mile</option>
                  <option value="62">100K (62 mi)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goal Time (minutes)
                </label>
                <input
                  type="number"
                  value={formData.goalTimeMinutes}
                  onChange={(e) =>
                    setFormData({ ...formData, goalTimeMinutes: parseInt(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 240 for 4:00"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Example: 240 = 4 hours, 210 = 3:30
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Body Weight (lb)
                </label>
                <input
                  type="number"
                  value={formData.bodyWeightLb}
                  onChange={(e) =>
                    setFormData({ ...formData, bodyWeightLb: parseInt(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Temperature (°F)
                </label>
                <input
                  type="number"
                  value={formData.temperatureF}
                  onChange={(e) =>
                    setFormData({ ...formData, temperatureF: parseInt(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                <select
                  value={formData.fuelType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fuelType: e.target.value as "gels" | "drink" | "hybrid",
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="gels">Gels</option>
                  <option value="drink">Drink Mix</option>
                  <option value="hybrid">Hybrid (Gels + Drink)</option>
                </select>
              </div>

              {(formData.fuelType === "gels" || formData.fuelType === "hybrid") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gel Carbs (g)
                  </label>
                  <input
                    type="number"
                    value={formData.gelCarbsG}
                    onChange={(e) =>
                      setFormData({ ...formData, gelCarbsG: parseInt(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {(formData.fuelType === "drink" || formData.fuelType === "hybrid") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Drink Mix Carbs per Serving (g)
                  </label>
                  <input
                    type="number"
                    value={formData.drinkCarbsG}
                    onChange={(e) =>
                      setFormData({ ...formData, drinkCarbsG: parseInt(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sodium Preference
                </label>
                <select
                  value={formData.sodiumPreference}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sodiumPreference: e.target.value as "low" | "medium" | "high",
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stomach Tolerance
                </label>
                <select
                  value={formData.stomachTolerance}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stomachTolerance: e.target.value as "low" | "medium" | "high",
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low (sensitive)</option>
                  <option value="medium">Medium</option>
                  <option value="high">High (iron stomach)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Generate Plan
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Disclaimer: Not medical advice. Consult your healthcare provider.
            </p>
          </div>

          {/* Results */}
          {result && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Fueling Plan</h2>

              <div className="space-y-4">
                <div className="border-b pb-3">
                  <h3 className="text-sm font-semibold text-gray-700">Race Details</h3>
                  <p className="text-sm text-gray-600">
                    Goal Time: {Math.floor(result.raceDurationMinutes / 60)}:
                    {(result.raceDurationMinutes % 60).toString().padStart(2, "0")}
                  </p>
                  <p className="text-sm text-gray-600">Pace: {result.pacePerMile}/mile</p>
                </div>

                <div className="border-b pb-3">
                  <h3 className="text-sm font-semibold text-gray-700">Carbohydrate Target</h3>
                  <p className="text-lg font-bold text-blue-600">
                    {result.chosenCarbsPerHourTarget}g/hour
                  </p>
                  <p className="text-xs text-gray-500">
                    Recommended range: {result.recommendedCarbsPerHourRange.min}-
                    {result.recommendedCarbsPerHourRange.max}g/hour
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Total race: {result.totalCarbsNeeded}g
                  </p>
                </div>

                <div className="border-b pb-3">
                  <h3 className="text-sm font-semibold text-gray-700">Sodium Target</h3>
                  <p className="text-sm text-gray-600">
                    {result.sodiumPerHourRange.min}-{result.sodiumPerHourRange.max} mg/hour
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Fueling Schedule</h3>
                  <div className="max-h-64 overflow-y-auto border rounded-md">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="px-3 py-2 text-left font-semibold">Time</th>
                          <th className="px-3 py-2 text-left font-semibold">Mile</th>
                          <th className="px-3 py-2 text-left font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {result.fuelingSchedule.map((action, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-3 py-2">{action.timeStamp}</td>
                            <td className="px-3 py-2">{action.mileMarker.toFixed(1)}</td>
                            <td className="px-3 py-2">{action.actionText}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <button
                    onClick={handleDownload}
                    className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition"
                  >
                    Download / Print Race Card
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save to Dashboard"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Paywall Modal */}
        {showPaywall && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md">
              <h3 className="text-2xl font-bold mb-4">Unlock Your Plan</h3>
              <p className="text-gray-600 mb-6">
                To download, print, or save your plan, please create an account and choose a plan.
              </p>
              <div className="space-y-3">
                <a
                  href="/login"
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-md font-semibold hover:bg-blue-700 transition"
                >
                  Sign In / Sign Up
                </a>
                <button
                  onClick={() => setShowPaywall(false)}
                  className="block w-full bg-gray-200 text-gray-700 text-center py-3 rounded-md font-semibold hover:bg-gray-300 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
