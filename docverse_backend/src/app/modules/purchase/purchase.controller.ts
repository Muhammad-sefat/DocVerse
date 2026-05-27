import { Request, Response } from "express";

import { PurchaseServices } from "./purchase.service";
import { catchAsync } from "../../shared/catchAsync";

const getMyPurchases = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const result = await PurchaseServices.getMyPurchases(userId);

  res.status(200).json({
    success: true,
    data: result,
  });
});

const getAllPurchases = catchAsync(async (req: Request, res: Response) => {
  const result = await PurchaseServices.getAllPurchases();

  res.status(200).json({
    success: true,
    data: result,
  });
});

export const PurchaseControllers = {
  getMyPurchases,
  getAllPurchases,
};
