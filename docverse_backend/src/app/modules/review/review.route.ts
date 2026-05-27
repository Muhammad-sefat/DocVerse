import express from "express";

import { ReviewControllers } from "./review.controller";
import { authMiddleware } from "../../middlewares/auth.middlewares";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Book review management endpoints
 */

/**
 * @swagger
 * /api/v1/reviews/create-review:
 *   post:
 *     summary: Create a review for a book
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *               - comment
 *               - bookId
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 description: Rating from 1 to 5
 *               comment:
 *                 type: string
 *                 description: Review comment
 *               bookId:
 *                 type: string
 *                 description: ID of the book being reviewed
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Already reviewed this book
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Book not found
 */
router.post(
  "/create-review",
  authMiddleware,
  ReviewControllers.createReview,
);

/**
 * @swagger
 * /api/v1/reviews/{bookId}:
 *   get:
 *     summary: Get all reviews for a book
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: List of reviews for the book
 *       404:
 *         description: Book not found
 */
router.get("/:bookId", ReviewControllers.getBookReviews);

/**
 * @swagger
 * /api/v1/reviews/{id}:
 *   patch:
 *     summary: Update your review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Review not found
 */
router.patch(
  "/:id",
  authMiddleware,
  ReviewControllers.updateReview,
);

/**
 * @swagger
 * /api/v1/reviews/{id}:
 *   delete:
 *     summary: Delete your review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Review not found
 */
router.delete(
  "/:id",
  authMiddleware,
  ReviewControllers.deleteReview,
);

export const ReviewRoutes = router;
