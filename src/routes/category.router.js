import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getCategories,
} from "../controllers/category.controller.js";

const router = Router();

router.route("/create-category").post(verifyJWT, createCategory);
router.route("/delete-category").post(verifyJWT, deleteCategory);
router.route("/edit-category").post(verifyJWT, editCategory);
router.route("/get-category").get(verifyJWT, getCategories);

export default router;
