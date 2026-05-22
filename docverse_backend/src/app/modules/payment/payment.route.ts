import express from "express";

import { PaymentControllers } from "./payment.controller";
import { authMiddleware } from "../../middlewares/auth.middlewares";

const router = express.Router();

router.post(
  "/checkout",
  authMiddleware,
  PaymentControllers.createCheckoutSession,
);

export const PaymentRoutes = router;
