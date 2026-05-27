import { prisma } from "../../lib/prisma";
import { ApiError } from "../../utils/ApiError";
import { IReview, IUpdateReview } from "./review.interface";

const createReview = async (payload: IReview, userId: string) => {
  const book = await prisma.book.findUnique({
    where: { id: payload.bookId },
  });

  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  const existingReview = await prisma.review.findFirst({
    where: {
      userId,
      bookId: payload.bookId,
    },
  });

  if (existingReview) {
    throw new ApiError(400, "You have already reviewed this book");
  }

  const result = await prisma.review.create({
    data: {
      rating: payload.rating,
      comment: payload.comment,
      userId,
      bookId: payload.bookId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          profileImage: true,
        },
      },
    },
  });

  return result;
};

const getBookReviews = async (bookId: string) => {
  const book = await prisma.book.findUnique({
    where: { id: bookId },
  });

  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  const reviews = await prisma.review.findMany({
    where: { bookId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          profileImage: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return reviews;
};

const updateReview = async (
  reviewId: string,
  payload: IUpdateReview,
  userId: string,
) => {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!review) {
    throw new ApiError(404, "Review not found");
  }

  if (review.userId !== userId) {
    throw new ApiError(403, "You can only update your own reviews");
  }

  const result = await prisma.review.update({
    where: { id: reviewId },
    data: payload,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          profileImage: true,
        },
      },
    },
  });

  return result;
};

const deleteReview = async (reviewId: string, userId: string) => {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!review) {
    throw new ApiError(404, "Review not found");
  }

  if (review.userId !== userId) {
    throw new ApiError(403, "You can only delete your own reviews");
  }

  await prisma.review.delete({
    where: { id: reviewId },
  });

  return null;
};

export const ReviewServices = {
  createReview,
  getBookReviews,
  updateReview,
  deleteReview,
};
