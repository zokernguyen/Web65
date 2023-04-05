import express from "express";
import { client } from "../configs/connectDB.js";
import { usersCollection } from "../configs/connectDB.js";
const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
    try {

        const registerData = req.body;

        const newUser = await usersCollection.insertOne(registerData);

        if (!newUser.acknowledged) {
            throw new Error("Register failed");
        }

        res.status(201).json({
            message: "Register success",
            data: registerData
        })

    } catch (error) {
        res.status(400).json({
            message: error.message,
            data: null,
        });
    }
});

authRouter.post("/login", async (req, res) => {
    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username or Password is missing!",
            });
        }

        const user = await usersCollection.findOne(
            {
                username: username
            });

        if (!user) {
            return res.status(404).json({
                message: "User not found!",
            });
        }

        const pw = await usersCollection.findOne(
            {
                password: password
            });

        if (!pw) {
            {
                return res.status(401).json({
                    message: "Incorrect password!",
                });
            }
        }

    } catch (error) {
        res.status(400).json(error.message)
    }


});

export default authRouter;