import { stripe } from "../../config/stripe";
import { prisma } from "../../lib/prisma";

import { ICreateCheckout } from "./payment.interface";

const createCheckoutSession = async (
  payload: ICreateCheckout,
  userId: string,
) => {
  const book = await prisma.book.findUnique({
    where: {
      id: payload.bookId,
    },
  });

  if (!book) {
    throw new Error("Book not found");
  }

  // PRICE
  const amount =
    payload.paymentType === "PURCHASE" ? book.price : book.borrowPrice;

  // STRIPE SESSION
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    mode: "payment",

    line_items: [
      {
        price_data: {
          currency: "usd",

          product_data: {
            name: book.title,
          },

          unit_amount: amount * 100,
        },

        quantity: 1,
      },
    ],

    success_url: `${process.env.CLIENT_URL}/success`,

    cancel_url: `${process.env.CLIENT_URL}/cancel`,

    metadata: {
      userId,

      bookId: payload.bookId,

      paymentType: payload.paymentType,

      borrowDays: payload.borrowDays?.toString() || "",
    },
  });

  return session;
};

export const PaymentServices = {
  createCheckoutSession,
};
