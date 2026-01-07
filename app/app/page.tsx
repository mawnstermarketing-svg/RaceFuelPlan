import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

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

  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
  });

  const hasAnnualAccess = subscription?.status === "ACTIVE";

  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: "/" });
  };

  return (
    <DashboardContent
      user={{
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }}
      plans={plans.map((p) => ({
        ...p,
        createdAt: p.createdAt,
      }))}
      hasAnnualAccess={hasAnnualAccess}
      onSignOut={handleSignOut}
    />
  );
}
