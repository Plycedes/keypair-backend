import { Router } from "express";
import {
  createKeyPair,
  getAllKeyPairs,
  deleteKeyPair,
} from "../controllers/keypair.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-keypair").post(verifyJWT, createKeyPair);
router.route("/delete-keypair").post(verifyJWT, deleteKeyPair);

router.route("/get-all-keypairs").get(verifyJWT, getAllKeyPairs);

export default router;
