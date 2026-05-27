import express from "express";

import { WishlistControllers } from "./wishlist.controller";
import { authMiddleware } from "../../middlewares/auth.middlewares";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Wishlist management endpoints
 */

/**
 * @swagger
 * /api/v1/wishlist:
 *   get:
 *     summary: Get my wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of wishlist items
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/",
  authMiddleware,
  WishlistControllers.getMyWishlist,
);

/**
 * @swagger
 * /api/v1/wishlist/add-to-wishlist:
 *   post:
 *     summary: Add a book to wishlist
 *     tags: [Wishlist]
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
 *             properties:
 *               bookId:
 *                 type: string
 *                 description: ID of the book to add
 *     responses:
 *       201:
 *         description: Book added to wishlist
 *       400:
 *         description: Book already in wishlist
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Book not found
 */
router.post(
  "/add-to-wishlist",
  authMiddleware,
  WishlistControllers.addToWishlist,
);

/**
 * @swagger
 * /api/v1/wishlist/{id}:
 *   delete:
 *     summary: Remove a book from wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Wishlist entry ID
 *     responses:
 *       200:
 *         description: Book removed from wishlist
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Wishlist entry not found
 */
router.delete(
  "/:id",
  authMiddleware,
  WishlistControllers.removeFromWishlist,
);

export const WishlistRoutes = router;
