import { Request, Response } from "express";

import { CategoryServices } from "./category.service";
import { catchAsync } from "../../shared/catchAsync";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.createCategory(req.body);

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.getAllCategories();

  res.status(200).json({
    success: true,
    data: result,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.updateCategory(
    req.params.id as string,
    req.body,
  );

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  await CategoryServices.deleteCategory(req.params.id as string);

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});

export const CategoryControllers = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
