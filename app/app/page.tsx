import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const plans = await prisma.plan.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      createdAt: true,
      accessType: true,
    },
  });

  // Check if user has annual subscription
  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
  });

  const hasAnnualAccess = subscription?.status === "ACTIVE";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            RaceFuelPlan
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/calculator" className="text-gray-700 hover:text-blue-600">
              New Plan
            </Link>
            <Link href="/account" className="text-gray-700 hover:text-blue-600">
              Account
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button type="submit" className="text-gray-700 hover:text-blue-600">
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Fueling Plans</h1>
          <p className="text-gray-600">
            {hasAnnualAccess
              ? "You have unlimited access to all plans"
              : "Saved plans are view-only. Purchase to unlock download & print."}
          </p>
        </div>

        {!hasAnnualAccess && (
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-2">Upgrade to Unlimited</h3>
            <p className="mb-4">Get unlimited plans and downloads for just $49/year</p>
            <Link
              href="/pricing"
              className="inline-block bg-white text-blue-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-100"
            >
              View Pricing
            </Link>
          </div>
        )}

        {plans.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-4">You haven't saved any plans yet.</p>
            <Link
              href="/calculator"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700"
            >
              Create Your First Plan
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Link
                key={plan.id}
                href={`/app/plans/${plan.id}`}
                className="bg-white rounded-lg shadow hover:shadow-md transition p-6"
              >
                <h3 className="font-bold text-gray-900 mb-2">{plan.title}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Created: {new Date(plan.createdAt).toLocaleDateString()}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      plan.accessType === "ANNUAL_UNLOCKED" || plan.accessType === "ONE_TIME_UNLOCKED"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {plan.accessType === "ANNUAL_UNLOCKED" || plan.accessType === "ONE_TIME_UNLOCKED"
                      ? "Unlocked"
                      : "View Only"}
                  </span>
                  <span className="text-blue-600 font-semibold text-sm">View →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
