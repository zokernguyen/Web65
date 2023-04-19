import express from "express";
import studentsRouterController from "../controllers/studentsRouterController.js";
import authMDWController from "../controllers/authMDWController.js";

const studentsRouter = express.Router();

//Get all students
studentsRouter.get("/", authMDWController.verifyToken, studentsRouterController.getAllStudents);

//Get student by filters

//Add new student
studentsRouter.post("/", studentsRouterController.addStudent);

//Edit student
studentsRouter.put("/:idToEdit", studentsRouterController.editStudent);

// //Delete student
studentsRouter.delete("/:idToDel", studentsRouterController.deleteStudent);

export default studentsRouter;