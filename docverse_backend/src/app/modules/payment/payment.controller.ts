import { Request, Response } from "express";

import { PaymentServices } from "./payment.service";
import { catchAsync } from "../../shared/catchAsync";

const createCheckoutSession = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user.id;

    const result = await PaymentServices.createCheckoutSession(
      req.body,
      userId,
    );

    res.status(200).json({
      success: true,

      data: result,
    });
  },
);

export const PaymentControllers = {
  createCheckoutSession,
};
