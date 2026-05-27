import { Request, Response } from "express";

import { WishlistServices } from "./wishlist.service";
import { catchAsync } from "../../shared/catchAsync";

const getMyWishlist = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const result = await WishlistServices.getMyWishlist(userId);

  res.status(200).json({
    success: true,
    data: result,
  });
});

const addToWishlist = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const result = await WishlistServices.addToWishlist(
    req.body.bookId,
    userId,
  );

  res.status(201).json({
    success: true,
    message: "Book added to wishlist successfully",
    data: result,
  });
});

const removeFromWishlist = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;

  await WishlistServices.removeFromWishlist(req.params.id as string, userId);

  res.status(200).json({
    success: true,
    message: "Book removed from wishlist successfully",
  });
});

export const WishlistControllers = {
  getMyWishlist,
  addToWishlist,
  removeFromWishlist,
};
