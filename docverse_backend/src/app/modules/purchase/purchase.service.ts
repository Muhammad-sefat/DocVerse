import { prisma } from "../../lib/prisma";

const getMyPurchases = async (userId: string) => {
  const purchases = await prisma.purchase.findMany({
    where: { userId },
    include: {
      book: {
        include: {
          author: true,
          category: true,
        },
      },
      payment: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return purchases;
};

const getAllPurchases = async () => {
  const purchases = await prisma.purchase.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      book: {
        include: {
          author: true,
          category: true,
        },
      },
      payment: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return purchases;
};

export const PurchaseServices = {
  getMyPurchases,
  getAllPurchases,
};
