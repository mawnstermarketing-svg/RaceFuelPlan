import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PlanInputSchema } from "@/lib/types";
import { generateFuelingPlan } from "@/lib/planGenerator";
import { generatePlanTitle } from "@/lib/format";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const inputs = PlanInputSchema.parse(body.inputs);

    // Generate the plan
    const outputs = generateFuelingPlan(inputs);
    const title = generatePlanTitle(inputs.distance, inputs.goalTimeMinutes, inputs.temperatureF);

    // Save to database
    const plan = await prisma.plan.create({
      data: {
        userId: session.user.id,
        inputsJson: JSON.stringify(inputs),
        outputsJson: JSON.stringify(outputs),
        title,
        accessType: "FREE_VIEW_ONLY",
      },
    });

    return NextResponse.json({ planId: plan.id, message: "Plan saved successfully" });
  } catch (error) {
    console.error("Error saving plan:", error);
    return NextResponse.json({ error: "Failed to save plan" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

    return NextResponse.json({ plans });
  } catch (error) {
    console.error("Error fetching plans:", error);
    return NextResponse.json({ error: "Failed to fetch plans" }, { status: 500 });
  }
}
