import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { KeyPair } from "../models/keypair.model.js";
import { Category } from "../models/category.model.js";

export const createKeyPair = asyncHandler(async (req, res) => {
  const { title, value, description, catTitle } = req.body;

  if (!title || !value || !catTitle) {
    throw new ApiError(409, "Required fields cannot be empty");
  }

  const category = await Category.findOne({
    $and: [{ title: catTitle }, { creator: req.user }],
  });
  if (!category) {
    throw new ApiError(404, "Could not find the category");
  }

  const keyPair = await KeyPair.create({
    title,
    value,
    description,
    creator: req.user,
    category,
  });

  const createdKeyPair = await KeyPair.findById(keyPair._id);

  if (!createdKeyPair) {
    throw new ApiError(500, "Something went wrong while creating key pair");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, createdKeyPair, "Successfully created the key pair")
    );
});
