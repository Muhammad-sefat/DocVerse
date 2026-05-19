import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import { catchAsync } from "../../shared/catchAsync";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.registerUser(req.body);

  res.cookie("token", result.token, {
    httpOnly: true,
    secure: false,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result.user,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);

  res.cookie("token", result.token, {
    httpOnly: true,
    secure: false,
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result.user,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const user = await AuthServices.getMe(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

const logoutUser = catchAsync(async (_req: Request, res: Response) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

export const AuthControllers = {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
};
