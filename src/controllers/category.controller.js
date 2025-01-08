import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { Category } from "../models/category.model.js";

export const createCategory = asyncHandler((req, res) => {
  res.status(200).json({ message: "OK" });
});
