import express from "express";

import { PurchaseControllers } from "./purchase.controller";
import { authMiddleware } from "../../middlewares/auth.middlewares";
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Purchases
 *   description: Book purchase management endpoints
 */

/**
 * @swagger
 * /api/v1/purchases/my-purchases:
 *   get:
 *     summary: Get my purchased books
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of purchased books
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/my-purchases",
  authMiddleware,
  PurchaseControllers.getMyPurchases,
);

/**
 * @swagger
 * /api/v1/purchases:
 *   get:
 *     summary: Get all purchases (Admin only)
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all purchases
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  PurchaseControllers.getAllPurchases,
);

export const PurchaseRoutes = router;
