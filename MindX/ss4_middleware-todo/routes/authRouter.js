import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const authRouter = express.Router();

const users = [
    {
        username: "zoker",
        password: "zoker123"
    },
    {
        username: "tester",
        password: "123456"
    },

];

authRouter.post("/register", (req, res) => {

    const { username, password } = req.body;

    //encrypt password with bcrypt
    const passwordHash = bcrypt.hashSync(password, 10);

    // check if username or password are missing
    if (!username || !password) {
        return res.status(400).json({
            message: "Username or Password is missing!",
        });
    }

    // check if user already exists
    const userExists = users.find((user) => user.username === username);
    if (userExists) {
        return res.status(409).json({
            message: "Username already exists!",
        });
    }

    // add new user to list
    users.push({ "username": username, "password": passwordHash });

    // return success message and new user info
    res.status(201).json({
        message: "Register success",
        data: { username }
    });

});

authRouter.post("/login", (req, res) => {

    const { username, password } = req.body;

    // check if username or password are missing
    if (!username || !password) {
        return res.status(400).json({
            message: "Username or Password is missing!",
        });
    }

    // find user by username
    const user = users.find((user) => user.username === username);

    // check if user exists
    if (!user) {
        return res.status(404).json({
            message: "User not found!",
        });
    }

    // check if password is correct with bcrypt
    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({
            message: "Incorrect password!",
        });
    }

    // generate access token
    const token = jwt.sign(
        { username },//user payload
        process.env.ACCESS_TOKEN_SECRET,//secret key
        { expiresIn: "15s" });//token option: expire time, hash alg, ...

    // return success message and token
    res.json({
        message: "Login success",
        data: { token },
    });
});

export default authRouter;