import express from "express";

import { PaymentControllers } from "./payment.controller";
import { authMiddleware } from "../../middlewares/auth.middlewares";
import { roleMiddleware } from "../../middlewares/role.middleware";
import { stripeWebhook } from "./payment.webhook";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management endpoints
 */

/**
 * @swagger
 * /api/v1/payments/webhook:
 *   post:
 *     summary: Stripe webhook endpoint
 *     tags: [Payments]
 *     description: Endpoint for Stripe to send webhook events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Webhook received
 */
router.post("/webhook", stripeWebhook);

/**
 * @swagger
 * /api/v1/payments/checkout:
 *   post:
 *     summary: Create a Stripe checkout session
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *               - paymentType
 *             properties:
 *               bookId:
 *                 type: string
 *                 description: ID of the book
 *               paymentType:
 *                 type: string
 *                 enum: [PURCHASE, BORROW]
 *                 description: Type of payment
 *               borrowDays:
 *                 type: integer
 *                 description: Number of days to borrow (required for BORROW type)
 *     responses:
 *       200:
 *         description: Checkout session created
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/checkout",
  authMiddleware,
  PaymentControllers.createCheckoutSession,
);

/**
 * @swagger
 * /api/v1/payments/my-payments:
 *   get:
 *     summary: Get my payment history
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user payments
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/my-payments",
  authMiddleware,
  PaymentControllers.getMyPayments,
);

/**
 * @swagger
 * /api/v1/payments:
 *   get:
 *     summary: Get all payments (Admin only)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all payments
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  PaymentControllers.getAllPayments,
);

export const PaymentRoutes = router;
