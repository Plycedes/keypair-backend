import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { KeyPair } from "../models/keypair.model.js";

export const createKeyPair = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Status OK" });
});
