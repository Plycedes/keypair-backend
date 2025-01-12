import { Router } from "express";
import {
  createKeyPair,
  getAllKeyPairs,
  deleteKeyPair,
  editKeyPair,
} from "../controllers/keypair.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-keypair").post(verifyJWT, createKeyPair);
router.route("/delete-keypair").post(verifyJWT, deleteKeyPair);
router.route("/edit-keypair").post(verifyJWT, editKeyPair);
router.route("/get-all-keypairs").post(verifyJWT, getAllKeyPairs);

export default router;
