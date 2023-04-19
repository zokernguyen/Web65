import express from "express";
import authRouterController from "../controllers/authRouterController.js";
// import authMDWController from "../controllers/authMDWController.js"

const authRouter = express.Router();

//Register
authRouter.post("/register", authRouterController.register);

//Login
authRouter.post("/login", authRouterController.login);

//Refresh access token
authRouter.post("/refresh", authRouterController.genRefreshToken);

//Logout
// authRouter.post("/register", authRouterController.logout);

export default authRouter;