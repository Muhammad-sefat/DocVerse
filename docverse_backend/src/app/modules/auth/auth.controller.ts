import { Request, Response } from "express";
import { AuthServices } from "./auth.service";

const registerUser = async (req: Request, res: Response) => {
  try {
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
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
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
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getMe = async (req: Request, res: Response) => {
  try {
    const user = await AuthServices.getMe(req.user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

export const AuthControllers = {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
};
