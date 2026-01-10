import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ hasAccess: false, subscription: null });
    }

    const subscription = await prisma.subscription.findUnique({
      where: { userId: session.user.id },
    });

    const hasAccess = subscription?.status === "ACTIVE";

    return NextResponse.json({
      hasAccess,
      subscription: subscription
        ? {
            status: subscription.status,
            currentPeriodEnd: subscription.currentPeriodEnd,
          }
        : null,
    });
  } catch (error) {
    console.error("Error checking subscription:", error);
    return NextResponse.json({ hasAccess: false, subscription: null });
  }
}
