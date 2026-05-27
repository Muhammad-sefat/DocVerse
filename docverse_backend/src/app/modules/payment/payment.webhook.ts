import { Request, Response } from "express";
import Stripe from "stripe";

import { stripe } from "../../config/stripe";
import { prisma } from "../../lib/prisma";

export const stripeWebhook = async (req: Request, res: Response) => {
  const signature = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );
  } catch (error: any) {
    console.error("Webhook signature verification failed:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.metadata?.userId;
    const bookId = session.metadata?.bookId;
    const paymentType = session.metadata?.paymentType;
    const borrowDays = Number(session.metadata?.borrowDays || 0);

    if (!userId || !bookId || !paymentType) {
      console.error("Missing metadata in Stripe session");
      return res.status(400).json({
        received: false,
        error: "Missing metadata in Stripe session",
      });
    }

    const amount = (session.amount_total || 0) / 100;
    const stripePaymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.toString() || "";

    try {
      // Check if payment already exists for this payment intent
      const existingPayment = await prisma.payment.findFirst({
        where: { stripePaymentIntentId },
      });

      if (existingPayment) {
        console.log("Payment already processed for:", stripePaymentIntentId);
        return res.json({ received: true, alreadyProcessed: true });
      }

      const payment = await prisma.payment.create({
        data: {
          amount,
          paymentType: paymentType as "PURCHASE" | "BORROW",
          status: "SUCCESS" as const,
          stripePaymentIntentId,
          userId,
        },
      });

      // PURCHASE
      if (paymentType === "PURCHASE") {
        await prisma.purchase.create({
          data: {
            amount,
            userId,
            bookId,
            paymentId: payment.id,
          },
        });
      }

      // BORROW
      if (paymentType === "BORROW") {
        const startDate = new Date();
        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + borrowDays);

        await prisma.borrow.create({
          data: {
            borrowDays,
            startDate,
            expireDate,
            userId,
            bookId,
            paymentId: payment.id,
          },
        });
      }
    } catch (error: any) {
      console.error("Error processing webhook:", error.message);
      return res.status(500).json({
        received: false,
        error: error.message,
      });
    }
  }

  res.json({ received: true });
};
