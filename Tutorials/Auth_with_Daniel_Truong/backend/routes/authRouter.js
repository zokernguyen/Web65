import express from "express";
import authRouterController from "../controllers/authRouterController.js";

const authRouter = express.Router();

authRouter.post("/register", authRouterController.registerUser);
authRouter.post("/login", authRouterController.loginUser);

export default authRouter;