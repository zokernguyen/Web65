import express from "express";
import { client } from "../configs/connectDB.js";
import { usersCollection } from "../configs/connectDB.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {

    try {

        const { username, password } = req.body;
        const passwordHash = bcrypt.hashSync(password, 10);

        const isExisted = await usersCollection.findOne({
            username: username
        });

        if (isExisted) {
            throw new Error("Username is already existed")
        };

        const newUser = await usersCollection.insertOne({
            username,
            password: passwordHash
        });

        if (!newUser.acknowledged) {
            throw new Error("Register failed");
        }

        res.status(201).json({
            message: "Register success",
            data: {
                id: newUser.insertedId,
                username
                //do not expose pw
            }
        });

    } catch (error) {

        res.status(400).json({
            message: error.message,
        });
    }
});

authRouter.post("/login", async (req, res) => {

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
    };

    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({
            message: "Password is incorrect"
        });
    };

    const token = jwt.sign(
        { username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
    );

    res.status(200).json({
        message: "Login success",
        data: {
            token,
            username
        }
    });

});

export default authRouter;