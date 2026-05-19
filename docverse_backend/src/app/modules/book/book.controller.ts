import { Request, Response } from "express";

import { BookServices } from "./book.service";
import { catchAsync } from "../../shared/catchAsync";

const createBook = catchAsync(async (req: Request, res: Response) => {
  const authorId = req.user.id;

  const result = await BookServices.createBook(req.body, authorId);

  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookServices.getAllBooks();

  res.status(200).json({
    success: true,
    data: result,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookServices.getSingleBook(req.params.id as string);

  res.status(200).json({
    success: true,
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookServices.updateBook(
    req.params.id as string,
    req.body,
  );

  res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  await BookServices.deleteBook(req.params.id as string);

  res.status(200).json({
    success: true,
    message: "Book deleted successfully",
  });
});

export const BookControllers = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
