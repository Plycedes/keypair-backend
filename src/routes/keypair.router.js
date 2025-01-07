import { Router } from "express";
import { createKeyPair } from "../controllers/keypair.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-keypair").post(verifyJWT, createKeyPair);

export default router;
