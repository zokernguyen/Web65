import express from "express";
import userRouterController from "../controllers/userRouterController.js";

const userRouter = express.Router();

userRouter.get("/", userRouterController.getAllUsers);
userRouter.delete("/:id", userRouterController.deleteUser);

export default userRouter;