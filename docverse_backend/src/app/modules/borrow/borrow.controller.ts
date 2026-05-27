import { Request, Response } from "express";

import { BorrowServices } from "./borrow.service";
import { catchAsync } from "../../shared/catchAsync";

const getMyBorrows = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const result = await BorrowServices.getMyBorrows(userId);

  res.status(200).json({
    success: true,
    data: result,
  });
});

const getAllBorrows = catchAsync(async (req: Request, res: Response) => {
  const result = await BorrowServices.getAllBorrows();

  res.status(200).json({
    success: true,
    data: result,
  });
});

const returnBook = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const result = await BorrowServices.returnBook(req.params.id as string, userId);

  res.status(200).json({
    success: true,
    message: "Book returned successfully",
    data: result,
  });
});

export const BorrowControllers = {
  getMyBorrows,
  getAllBorrows,
  returnBook,
};
