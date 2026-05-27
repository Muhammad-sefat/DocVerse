import { prisma } from "../../lib/prisma";
import { ApiError } from "../../utils/ApiError";

const getMyBorrows = async (userId: string) => {
  const borrows = await prisma.borrow.findMany({
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

  return borrows;
};

const getAllBorrows = async () => {
  const borrows = await prisma.borrow.findMany({
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

  return borrows;
};

const returnBook = async (borrowId: string, userId: string) => {
  const borrow = await prisma.borrow.findUnique({
    where: { id: borrowId },
  });

  if (!borrow) {
    throw new ApiError(404, "Borrow record not found");
  }

  if (borrow.userId !== userId) {
    throw new ApiError(403, "You can only return your own borrowed books");
  }

  if (borrow.isExpired) {
    throw new ApiError(400, "Book already returned");
  }

  const result = await prisma.borrow.update({
    where: { id: borrowId },
    data: { isExpired: true },
    include: {
      book: true,
    },
  });

  return result;
};

export const BorrowServices = {
  getMyBorrows,
  getAllBorrows,
  returnBook,
};
