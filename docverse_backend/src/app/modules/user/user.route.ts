import express from "express";

import { UserControllers } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middlewares";
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  UserControllers.getAllUsers,
);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get(
  "/:id",
  authMiddleware,
  UserControllers.getUserById,
);

/**
 * @swagger
 * /api/v1/users/update-profile:
 *   patch:
 *     summary: Update own profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 */
router.patch(
  "/update-profile",
  authMiddleware,
  UserControllers.updateProfile,
);

/**
 * @swagger
 * /api/v1/users/update-profile-image:
 *   patch:
 *     summary: Update own profile image
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profileImage:
 *                 type: string
 *                 description: URL of the profile image
 *     responses:
 *       200:
 *         description: Profile image updated successfully
 *       401:
 *         description: Unauthorized
 */
router.patch(
  "/update-profile-image",
  authMiddleware,
  UserControllers.updateProfileImage,
);

export const UserRoutes = router;
