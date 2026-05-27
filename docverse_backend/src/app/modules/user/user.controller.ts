import { Request, Response } from "express";

import { UserServices } from "./user.service";
import { catchAsync } from "../../shared/catchAsync";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsers();

  res.status(200).json({
    success: true,
    data: result,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getUserById(req.params.id as string);

  res.status(200).json({
    success: true,
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const result = await UserServices.updateProfile(userId, req.body);

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});

const updateProfileImage = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const result = await UserServices.updateProfileImage(
    userId,
    req.body.profileImage,
  );

  res.status(200).json({
    success: true,
    message: "Profile image updated successfully",
    data: result,
  });
});

export const UserControllers = {
  getAllUsers,
  getUserById,
  updateProfile,
  updateProfileImage,
};
