import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { CategoryRoutes } from "../modules/category/category.route";
import { BookRoutes } from "../modules/book/book.route";
import { PaymentRoutes } from "../modules/payment/payment.route";

const router = express.Router();

router.use("/auth", AuthRoutes);
router.use("/categories", CategoryRoutes);
router.use("/books", BookRoutes);
router.use("/payments", PaymentRoutes);

export default router;
