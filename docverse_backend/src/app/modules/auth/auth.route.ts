import express from "express";
import { AuthControllers } from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middlewares";

const router = express.Router();

router.post("/register", AuthControllers.registerUser);

router.post("/login", AuthControllers.loginUser);

router.get("/me", authMiddleware, AuthControllers.getMe);

router.post("/logout", AuthControllers.logoutUser);

export const AuthRoutes = router;
