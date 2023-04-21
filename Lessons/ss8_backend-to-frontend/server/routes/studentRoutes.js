import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { studentsCollection } from "../configs/connectDB.js";

const studentRoutes = express.Router();

studentRoutes.get("/", authMiddleware, async (req, res) => {
  const allStudents = await studentsCollection.find().toArray();
  res.status(200).json({
    message: "Success",
    data: allStudents,
  });
});

studentRoutes.post("/", authMiddleware, async (req, res) => {
  try {
    // lay data tu body
    const studentData = req.body;
    // insert vao db
    const newStudent = await studentsCollection.insertOne(studentData);
    if (!newStudent.acknowledged) {
      throw new Error("Insert failed");
    }

    res.status(201).json({
      message: "Success",
      data: {
        ...studentData,
        _id: newStudent.insertedId,
      },
    });
    // return data
  } catch (error) {
    res.status(400).json({
      message: error.message,
      data: null,
    });
  }
});

export default studentRoutes;
