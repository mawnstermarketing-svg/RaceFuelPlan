import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PlanInput, PlanOutput } from "@/lib/types";

export default async function PlanPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { id } = await params;

  const plan = await prisma.plan.findUnique({
    where: { id },
  });

  if (!plan || plan.userId !== session.user.id) {
    redirect("/app");
  }

  const inputs: PlanInput = JSON.parse(plan.inputsJson);
  const outputs: PlanOutput = JSON.parse(plan.outputsJson);

  const isUnlocked =
    plan.accessType === "ONE_TIME_UNLOCKED" || plan.accessType === "ANNUAL_UNLOCKED";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <Link href="/app" className="text-blue-600 hover:text-blue-700">
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{plan.title}</h1>
          <p className="text-gray-600 mb-6">
            Created: {new Date(plan.createdAt).toLocaleDateString()}
          </p>

          {/* Race Details */}
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Race Details</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Distance:</span> {inputs.distance} miles
              </div>
              <div>
                <span className="font-semibold">Goal Time:</span>{" "}
                {Math.floor(outputs.raceDurationMinutes / 60)}:
                {(outputs.raceDurationMinutes % 60).toString().padStart(2, "0")}
              </div>
              <div>
                <span className="font-semibold">Pace:</span> {outputs.pacePerMile}/mile
              </div>
              <div>
                <span className="font-semibold">Temperature:</span> {inputs.temperatureF}°F
              </div>
              <div>
                <span className="font-semibold">Body Weight:</span> {inputs.bodyWeightLb} lb
              </div>
              <div>
                <span className="font-semibold">Fuel Type:</span> {inputs.fuelType}
              </div>
            </div>
          </div>

          {/* Nutrition Targets */}
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Nutrition Targets</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700 mb-1">Carbohydrates</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {outputs.chosenCarbsPerHourTarget}g/hr
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Recommended: {outputs.recommendedCarbsPerHourRange.min}-
                  {outputs.recommendedCarbsPerHourRange.max}g/hr
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  Total race: {outputs.totalCarbsNeeded}g
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700 mb-1">Sodium</h3>
                <p className="text-2xl font-bold text-purple-600">
                  {outputs.sodiumPerHourRange.min}-{outputs.sodiumPerHourRange.max} mg/hr
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Adjusted for temperature and preference
                </p>
              </div>
            </div>
          </div>

          {/* Fueling Schedule */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Fueling Schedule</h2>
            <div className="overflow-x-auto border rounded-lg">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Time</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Mile</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {outputs.fuelingSchedule.map((action, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{action.timeStamp}</td>
                      <td className="px-4 py-3">{action.mileMarker.toFixed(1)}</td>
                      <td className="px-4 py-3">{action.actionText}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {isUnlocked ? (
              <>
                <Link
                  href={`/app/plans/${plan.id}/print`}
                  target="_blank"
                  className="block w-full bg-green-600 text-white text-center py-3 rounded-md font-semibold hover:bg-green-700 transition"
                >
                  Print Race Card
                </Link>
                <button className="block w-full bg-blue-600 text-white text-center py-3 rounded-md font-semibold hover:bg-blue-700 transition">
                  Download PDF (Coming Soon)
                </button>
              </>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                <p className="text-gray-800 mb-4">
                  Unlock this plan to print your race card and download PDF
                </p>
                <Link
                  href={`/pricing?planId=${plan.id}`}
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
                >
                  Unlock Plan - $29
                </Link>
                <p className="text-sm text-gray-600 mt-3">Or get unlimited with annual plan</p>
              </div>
            )}
          </div>

          <p className="text-xs text-gray-500 mt-6 text-center">
            Disclaimer: Not medical advice. Consult your healthcare provider.
          </p>
        </div>
      </div>
    </div>
  );
}
