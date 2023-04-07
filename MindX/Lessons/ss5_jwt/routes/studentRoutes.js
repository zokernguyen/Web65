import express from "express";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/authMiddleware.js";

const studentRoutes = express.Router();
const JWT_SECRET = "MY_SECRET_KEY";

const students = [
    {
        id: 1,
        name: "Alice",
        age: 20,
    },
    {
        id: 2,
        name: "Bob",
        age: 21,
    },
];

studentRoutes.get("/", authMiddleware, (req, res) => {
    try {
        res.status(200).json({
            data: students,
        });
    } catch (err) {
        res.status(401).json({
            message: "Unauthorized",
        });
    }
});

export default studentRoutes;