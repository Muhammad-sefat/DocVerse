import { prisma } from "../../lib/prisma";
import { IBook } from "./book.interface";

const createBook = async (payload: IBook, authorId: string) => {
  const category = await prisma.category.findUnique({
    where: {
      id: payload.categoryId,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  const result = await prisma.book.create({
    data: {
      ...payload,
      authorId,
    },

    include: {
      author: true,
      category: true,
    },
  });

  return result;
};

const getAllBooks = async () => {
  return await prisma.book.findMany({
    include: {
      author: true,
      category: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

const getSingleBook = async (id: string) => {
  const result = await prisma.book.findUnique({
    where: { id },

    include: {
      author: true,
      category: true,
      reviews: true,
    },
  });

  if (!result) {
    throw new Error("Book not found");
  }

  return result;
};

const updateBook = async (id: string, payload: Partial<IBook>) => {
  const book = await prisma.book.findUnique({
    where: { id },
  });

  if (!book) {
    throw new Error("Book not found");
  }

  const result = await prisma.book.update({
    where: { id },

    data: payload,

    include: {
      author: true,
      category: true,
    },
  });

  return result;
};

const deleteBook = async (id: string) => {
  const book = await prisma.book.findUnique({
    where: { id },
  });

  if (!book) {
    throw new Error("Book not found");
  }

  await prisma.book.delete({
    where: { id },
  });

  return null;
};

export const BookServices = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
