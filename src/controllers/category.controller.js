import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { Category } from "../models/category.model.js";
import { KeyPair } from "../models/keypair.model.js";

export const createCategory = asyncHandler(async (req, res) => {
  //res.status(200).json({ message: "OK" });
  const { title } = req.body;

  if (!title) {
    throw new ApiError(400, "Title cannot be empty");
  }

  const existingCategory = await Category.findOne({
    $and: [{ title }, { creator: req.user }],
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

export const deleteCategory = asyncHandler(async (req, res) => {
  const { catId } = req.body;

  if (!catId) {
    throw new ApiError(400, "Category Id cannot be empty");
  }

  const deletedKeyPairs = await KeyPair.deleteMany({ category: catId });

  const result = await Category.deleteOne({
    _id: catId,
  });

  if (result.deletedCount == 1) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          {},
          `Successfully deleted one category and ${deletedKeyPairs.deletedCount} keypairs`
        )
      );
  } else {
    throw new ApiError(404, "Could not find the category to delete");
  }
});

export const editCategory = asyncHandler(async (req, res) => {
  const { title, catId } = req.body;

  if (!title) {
    throw new ApiError(400, "Title cannot be empty");
  }

  const category = await Category.findByIdAndUpdate(
    catId,
    {
      $set: {
        title,
      },
    },
    { new: true }
  );

  if (!category) {
    throw new ApiError(404, "Could not find the category to update");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Updated one category successfully"));
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ creator: req.user });

  if (!categories) {
    throw new ApiError(404, "Could not find categories");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, categories, "Successfully fetched all categories")
    );
});
