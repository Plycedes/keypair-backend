import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const router = Router();

router.route("/create-category").post(verifyJWT, createCategory);
router.route("/delete-category").post(verifyJWT, deleteCategory);

export default router;
