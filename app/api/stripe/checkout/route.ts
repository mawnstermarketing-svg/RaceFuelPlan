import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-12-15.clover",
});

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { type, planId } = body; // type: "ONE_TIME" | "ANNUAL"

    if (!type || !["ONE_TIME", "ANNUAL"].includes(type)) {
      return NextResponse.json({ error: "Invalid purchase type" }, { status: 400 });
    }

    if (type === "ONE_TIME" && !planId) {
      return NextResponse.json({ error: "Plan ID required for one-time purchase" }, { status: 400 });
    }

    // Get or create Stripe customer
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let customerId = user.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user.id,
        },
      });
      customerId = customer.id;

      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customerId },
      });
    }

    // Create checkout session
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

    let checkoutSession: Stripe.Checkout.Session;

    if (type === "ONE_TIME") {
      // One-time purchase for specific plan
      const priceId = process.env.STRIPE_PRICE_ONE_TIME;
      if (!priceId) {
        return NextResponse.json({ error: "Stripe price not configured" }, { status: 500 });
      }

      checkoutSession = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "payment",
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/app/plans/${planId}?success=true`,
        cancel_url: `${baseUrl}/app/plans/${planId}?canceled=true`,
        metadata: {
          userId: user.id,
          planId,
          type: "ONE_TIME",
        },
      });

      // Create pending purchase record
      await prisma.purchase.create({
        data: {
          userId: user.id,
          planId,
          stripeCheckoutSessionId: checkoutSession.id,
          type: "ONE_TIME",
          status: "PENDING",
        },
      });
    } else {
      // Annual subscription
      const priceId = process.env.STRIPE_PRICE_ANNUAL;
      if (!priceId) {
        return NextResponse.json({ error: "Stripe price not configured" }, { status: 500 });
      }

      checkoutSession = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "subscription",
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/app?success=true`,
        cancel_url: `${baseUrl}/pricing?canceled=true`,
        metadata: {
          userId: user.id,
          type: "ANNUAL",
        },
      });

      // Create pending purchase record
      await prisma.purchase.create({
        data: {
          userId: user.id,
          stripeCheckoutSessionId: checkoutSession.id,
          type: "ANNUAL",
          status: "PENDING",
        },
      });
    }

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
