import { Request, Response } from "express";

import { ReviewServices } from "./review.service";
import { catchAsync } from "../../shared/catchAsync";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const result = await ReviewServices.createReview(req.body, userId);

  res.status(201).json({
    success: true,
    message: "Review created successfully",
    data: result,
  });
});

const getBookReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewServices.getBookReviews(req.params.bookId as string);

  res.status(200).json({
    success: true,
    data: result,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const result = await ReviewServices.updateReview(
    req.params.id as string,
    req.body,
    userId,
  );

  res.status(200).json({
    success: true,
    message: "Review updated successfully",
    data: result,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;

  await ReviewServices.deleteReview(req.params.id as string, userId);

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});

export const ReviewControllers = {
  createReview,
  getBookReviews,
  updateReview,
  deleteReview,
};
