import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { CategoryRoutes } from "../modules/category/category.route";
import { BookRoutes } from "../modules/book/book.route";
import { PaymentRoutes } from "../modules/payment/payment.route";
import { BorrowRoutes } from "../modules/borrow/borrow.route";
import { PurchaseRoutes } from "../modules/purchase/purchase.route";
import { ReviewRoutes } from "../modules/review/review.route";
import { WishlistRoutes } from "../modules/wishlist/wishlist.route";
import { UserRoutes } from "../modules/user/user.route";

const router = express.Router();

router.use("/auth", AuthRoutes);
router.use("/categories", CategoryRoutes);
router.use("/books", BookRoutes);
router.use("/payments", PaymentRoutes);
router.use("/borrows", BorrowRoutes);
router.use("/purchases", PurchaseRoutes);
router.use("/reviews", ReviewRoutes);
router.use("/wishlist", WishlistRoutes);
router.use("/users", UserRoutes);

export default router;
