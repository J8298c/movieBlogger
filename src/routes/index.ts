import { authRouter } from "./auth";
import { commentRouter } from "./comments";
import { movieRouter } from "./movies";
import express, { NextFunction } from "express";



const router = express.Router();

router.use("/auth", authRouter);
router.use("/comments", commentRouter);
router.use("/movies", movieRouter);

export default router;