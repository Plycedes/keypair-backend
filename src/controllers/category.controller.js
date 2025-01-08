import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { Category } from "../models/category.model.js";

export const createCategory = asyncHandler(async (req, res) => {
  //res.status(200).json({ message: "OK" });
  const { title } = req.body;

  if (!title) {
    throw new ApiError(400, "Title cannot be empty");
  }

  const existingCategory = await Category.findOne({
    title,
  });

  if (existingCategory) {
    throw new ApiError(409, "Category already exists");
  }

  const category = await Category.create({ title, creator: req.user });
  const createdCategory = await Category.findById(category._id);

  if (!createdCategory) {
    throw new ApiError(
      500,
      "Something went wrong while creating the new category"
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        createdCategory,
        "Successfully created a new category"
      )
    );
});
