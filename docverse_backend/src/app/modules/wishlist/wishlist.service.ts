import { prisma } from "../../lib/prisma";
import { ApiError } from "../../utils/ApiError";

const getMyWishlist = async (userId: string) => {
  const wishlist = await prisma.wishlist.findMany({
    where: { userId },
    include: {
      book: {
        include: {
          author: true,
          category: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return wishlist;
};

const addToWishlist = async (bookId: string, userId: string) => {
  const book = await prisma.book.findUnique({
    where: { id: bookId },
  });

  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  const existingEntry = await prisma.wishlist.findUnique({
    where: {
      userId_bookId: {
        userId,
        bookId,
      },
    },
  });

  if (existingEntry) {
    throw new ApiError(400, "Book already in wishlist");
  }

  const result = await prisma.wishlist.create({
    data: {
      userId,
      bookId,
    },
    include: {
      book: {
        include: {
          author: true,
          category: true,
        },
      },
    },
  });

  return result;
};

const removeFromWishlist = async (wishlistId: string, userId: string) => {
  const entry = await prisma.wishlist.findUnique({
    where: { id: wishlistId },
  });

  if (!entry) {
    throw new ApiError(404, "Wishlist entry not found");
  }

  if (entry.userId !== userId) {
    throw new ApiError(403, "You can only remove items from your own wishlist");
  }

  await prisma.wishlist.delete({
    where: { id: wishlistId },
  });

  return null;
};

export const WishlistServices = {
  getMyWishlist,
  addToWishlist,
  removeFromWishlist,
};
