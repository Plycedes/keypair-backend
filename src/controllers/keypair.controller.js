import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { KeyPair } from "../models/keypair.model.js";
import { Category } from "../models/category.model.js";
import mongoose from "mongoose";

export const createKeyPair = asyncHandler(async (req, res) => {
  const { title, value, description, catId } = req.body;

  if (!title || !value || !catId) {
    throw new ApiError(409, "Required fields cannot be empty");
  }

  const category = await Category.findOne({
    _id: catId,
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
      new ApiResponse(200, createdKeyPair, "Successfully created the key pair ")
    );
});

export const getAllKeyPairs = asyncHandler(async (req, res) => {
  const { catId } = req.body;

  if (!catId) {
    throw new ApiError(400, "Category Id cannot be empty");
  }

  const keyPairs = await KeyPair.aggregate([
    {
      $match: {
        category: new mongoose.Types.ObjectId(catId),
        creator: new mongoose.Types.ObjectId(req.user._id),
      },
    },
  ]);

  if (!keyPairs) {
    throw new ApiError(
      404,
      "Cannot find any keypair regarding the given category"
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        keyPairs,
        "Successfully fetched all keypairs in the given category"
      )
    );
});

export const deleteKeyPair = asyncHandler(async (req, res) => {
  const { keyPairId } = req.body;

  if (!keyPairId) {
    throw new ApiError(400, "No field can be empty");
  }

  const result = await KeyPair.deleteOne({
    $and: [{ _id: keyPairId }, { creator: req.user }],
  });

  if (result.deletedCount === 1) {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Key Pair deleted successfully"));
  }
});

export const editKeyPair = asyncHandler(async (req, res) => {
  const { title, value, description, catId, keyPairId } = req.body;

  if (
    [title, value, description, catId, keyPairId].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "No field can be empty");
  }

  const keyPair = await KeyPair.findByIdAndUpdate(
    keyPairId,
    {
      $set: {
        title,
        value,
        description,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, keyPair, "Key Pair updated successfully"));
});
