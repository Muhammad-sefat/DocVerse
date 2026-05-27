import express from "express";

import { BorrowControllers } from "./borrow.controller";
import { authMiddleware } from "../../middlewares/auth.middlewares";
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Borrows
 *   description: Book borrow management endpoints
 */

/**
 * @swagger
 * /api/v1/borrows/my-borrows:
 *   get:
 *     summary: Get my borrowed books
 *     tags: [Borrows]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of borrowed books
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/my-borrows",
  authMiddleware,
  BorrowControllers.getMyBorrows,
);

/**
 * @swagger
 * /api/v1/borrows:
 *   get:
 *     summary: Get all borrows (Admin only)
 *     tags: [Borrows]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all borrows
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  BorrowControllers.getAllBorrows,
);

/**
 * @swagger
 * /api/v1/borrows/{id}/return:
 *   patch:
 *     summary: Return a borrowed book
 *     tags: [Borrows]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Borrow ID
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Borrow record not found
 */
router.patch(
  "/:id/return",
  authMiddleware,
  BorrowControllers.returnBook,
);

export const BorrowRoutes = router;
