import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { PlanInput, PlanOutput } from "@/lib/types";

export default async function PrintPage({ params }: { params: Promise<{ id: string }> }) {
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

  // Check if plan is unlocked
  const isUnlocked =
    plan.accessType === "ONE_TIME_UNLOCKED" || plan.accessType === "ANNUAL_UNLOCKED";

  if (!isUnlocked) {
    redirect(`/app/plans/${plan.id}`);
  }

  const inputs: PlanInput = JSON.parse(plan.inputsJson);
  const outputs: PlanOutput = JSON.parse(plan.outputsJson);

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Print Button (hidden in print) */}
      <div className="no-print mb-4">
        <button
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700"
        >
          Print Race Card
        </button>
      </div>

      {/* Race Card */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 border-b-4 border-black pb-4">
          <h1 className="text-4xl font-bold mb-2">{plan.title}</h1>
          <p className="text-xl">Race Day Fueling Plan</p>
        </div>

        {/* Key Info */}
        <div className="grid grid-cols-2 gap-4 mb-8 text-lg">
          <div className="border-2 border-black p-4 text-center">
            <div className="font-bold">CARBS</div>
            <div className="text-3xl font-bold">{outputs.chosenCarbsPerHourTarget}g/hr</div>
            <div className="text-sm">
              Total: {outputs.totalCarbsNeeded}g
            </div>
          </div>
          <div className="border-2 border-black p-4 text-center">
            <div className="font-bold">SODIUM</div>
            <div className="text-2xl font-bold">
              {outputs.sodiumPerHourRange.min}-{outputs.sodiumPerHourRange.max}
            </div>
            <div className="text-sm">mg/hour</div>
          </div>
        </div>

        {/* Fueling Schedule */}
        <div>
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2">
            FUELING SCHEDULE
          </h2>
          <table className="w-full border-2 border-black">
            <thead>
              <tr className="bg-gray-200 border-b-2 border-black">
                <th className="px-4 py-3 text-left font-bold text-lg border-r-2 border-black">
                  TIME
                </th>
                <th className="px-4 py-3 text-left font-bold text-lg border-r-2 border-black">
                  MILE
                </th>
                <th className="px-4 py-3 text-left font-bold text-lg">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {outputs.fuelingSchedule.map((action, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-black ${idx % 2 === 0 ? "bg-gray-50" : ""}`}
                >
                  <td className="px-4 py-3 font-bold text-lg border-r-2 border-black">
                    {action.timeStamp}
                  </td>
                  <td className="px-4 py-3 font-semibold border-r-2 border-black">
                    {action.mileMarker.toFixed(1)}
                  </td>
                  <td className="px-4 py-3">{action.actionText}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Race Details */}
        <div className="mt-8 text-sm border-t-2 border-black pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <strong>Distance:</strong> {inputs.distance} mi
            </div>
            <div>
              <strong>Goal Time:</strong> {Math.floor(outputs.raceDurationMinutes / 60)}:
              {(outputs.raceDurationMinutes % 60).toString().padStart(2, "0")}
            </div>
            <div>
              <strong>Pace:</strong> {outputs.pacePerMile}/mi
            </div>
            <div>
              <strong>Weight:</strong> {inputs.bodyWeightLb} lb
            </div>
            <div>
              <strong>Temp:</strong> {inputs.temperatureF}°F
            </div>
            <div>
              <strong>Fuel Type:</strong> {inputs.fuelType}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm border-t border-gray-300 pt-4">
          <p className="font-bold">RaceFuelPlan.com</p>
          <p className="text-xs text-gray-600 mt-1">
            Not medical advice. Consult your healthcare provider.
          </p>
        </div>
      </div>
    </div>
  );
}
