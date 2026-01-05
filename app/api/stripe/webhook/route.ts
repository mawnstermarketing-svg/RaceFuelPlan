import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-12-15.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentSucceeded(invoice);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  const planId = session.metadata?.planId;
  const type = session.metadata?.type;

  if (!userId) {
    console.error("No userId in session metadata");
    return;
  }

  // Update purchase record
  await prisma.purchase.updateMany({
    where: {
      stripeCheckoutSessionId: session.id,
    },
    data: {
      status: "PAID",
    },
  });

  if (type === "ONE_TIME" && planId) {
    // Unlock the specific plan
    await prisma.plan.update({
      where: { id: planId },
      data: { accessType: "ONE_TIME_UNLOCKED" },
    });
  } else if (type === "ANNUAL" && session.subscription) {
    // Create or update subscription
    const stripeSubscription: any = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    await prisma.subscription.upsert({
      where: { userId },
      update: {
        stripeSubscriptionId: stripeSubscription.id,
        status: "ACTIVE",
        currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
      },
      create: {
        userId,
        stripeSubscriptionId: stripeSubscription.id,
        status: "ACTIVE",
        currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
      },
    });

    // Unlock all user's plans
    await prisma.plan.updateMany({
      where: { userId },
      data: { accessType: "ANNUAL_UNLOCKED" },
    });
  }
}

async function handleInvoicePaymentSucceeded(invoice: any) {
  // Handle subscription renewals
  if (invoice.subscription) {
    const subscription: any = await stripe.subscriptions.retrieve(invoice.subscription as string);
    const userId = subscription.metadata?.userId;

    if (userId) {
      await prisma.subscription.updateMany({
        where: { stripeSubscriptionId: subscription.id },
        data: {
          status: "ACTIVE",
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
      });
    }
  }
}

async function handleSubscriptionUpdated(subscription: any) {
  const dbSubscription = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: subscription.id },
  });

  if (!dbSubscription) {
    return;
  }

  let status: string;
  switch (subscription.status) {
    case "active":
      status = "ACTIVE";
      break;
    case "canceled":
      status = "CANCELED";
      break;
    case "past_due":
      status = "PAST_DUE";
      break;
    default:
      status = "INCOMPLETE";
  }

  await prisma.subscription.update({
    where: { id: dbSubscription.id },
    data: {
      status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
  });

  // If subscription is canceled or past_due, revert plans to FREE_VIEW_ONLY
  if (status === "CANCELED" || status === "PAST_DUE") {
    await prisma.plan.updateMany({
      where: {
        userId: dbSubscription.userId,
        accessType: "ANNUAL_UNLOCKED",
      },
      data: { accessType: "FREE_VIEW_ONLY" },
    });
  }
}

async function handleSubscriptionDeleted(subscription: any) {
  await prisma.subscription.updateMany({
    where: { stripeSubscriptionId: subscription.id },
    data: { status: "CANCELED" },
  });

  const dbSubscription = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: subscription.id },
  });

  if (dbSubscription) {
    // Revert all annual unlocked plans to FREE_VIEW_ONLY
    await prisma.plan.updateMany({
      where: {
        userId: dbSubscription.userId,
        accessType: "ANNUAL_UNLOCKED",
      },
      data: { accessType: "FREE_VIEW_ONLY" },
    });
  }
}
