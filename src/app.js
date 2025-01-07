import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.json({ status: "Status OK", statusCode: 200 });
});

import userRouter from "./routes/user.router.js";
import keyPairRouter from "./routes/keypair.router.js";

app.use("/api/users", userRouter);
app.use("/api/keypair", keyPairRouter);

export { app };
