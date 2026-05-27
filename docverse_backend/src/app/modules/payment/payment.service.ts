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

  // Validate borrow has days
  if (payload.paymentType === "BORROW" && !payload.borrowDays) {
    throw new Error("Borrow days is required for borrowing");
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

    success_url: `${process.env.CLIENT_URL || "http://localhost:3000"}/success`,

    cancel_url: `${process.env.CLIENT_URL || "http://localhost:3000"}/cancel`,

    metadata: {
      userId,

      bookId: payload.bookId,

      paymentType: payload.paymentType,

      borrowDays: payload.borrowDays?.toString() || "",
    },
  });

  return session;
};

const getMyPayments = async (userId: string) => {
  const payments = await prisma.payment.findMany({
    where: { userId },
    include: {
      purchases: {
        include: {
          book: {
            select: {
              id: true,
              title: true,
              coverImage: true,
            },
          },
        },
      },
      borrows: {
        include: {
          book: {
            select: {
              id: true,
              title: true,
              coverImage: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return payments;
};

const getAllPayments = async () => {
  const payments = await prisma.payment.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      purchases: {
        include: {
          book: {
            select: {
              id: true,
              title: true,
              coverImage: true,
            },
          },
        },
      },
      borrows: {
        include: {
          book: {
            select: {
              id: true,
              title: true,
              coverImage: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return payments;
};

export const PaymentServices = {
  createCheckoutSession,
  getMyPayments,
  getAllPayments,
};
