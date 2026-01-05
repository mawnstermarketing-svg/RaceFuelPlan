import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      subscriptions: true,
      purchases: {
        where: { status: "PAID" },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  const activeSubscription = user.subscriptions.find((sub) => sub.status === "ACTIVE");

  async function createBillingPortalSession() {
    "use server";
    const session = await auth();
    if (!session?.user) {
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user?.stripeCustomerId) {
      return;
    }

    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
      apiVersion: "2025-12-15.clover",
    });

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.NEXTAUTH_URL}/account`,
    });

    redirect(portalSession.url);
  }

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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Account Settings</h1>

        {/* Account Info */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Account Information</h2>
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Email:</span> {user.email}
            </div>
            <div>
              <span className="font-semibold">Member Since:</span>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Subscription Status */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Subscription</h2>
          {activeSubscription ? (
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-semibold text-green-800">Annual Subscription Active</p>
                <p className="text-sm text-green-700 mt-1">
                  Renews on: {new Date(activeSubscription.currentPeriodEnd).toLocaleDateString()}
                </p>
              </div>
              {user.stripeCustomerId && (
                <form action={createBillingPortalSession}>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                  >
                    Manage Subscription
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-gray-600">You don't have an active subscription.</p>
              <Link
                href="/pricing"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                View Pricing
              </Link>
            </div>
          )}
        </div>

        {/* Purchase History */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Purchase History</h2>
          {user.purchases.length === 0 ? (
            <p className="text-gray-600">No purchases yet.</p>
          ) : (
            <div className="space-y-3">
              {user.purchases.map((purchase) => (
                <div key={purchase.id} className="border-b pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">
                        {purchase.type === "ONE_TIME" ? "Single Plan" : "Annual Subscription"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(purchase.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full">
                      Paid
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
