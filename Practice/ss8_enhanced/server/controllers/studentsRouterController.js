import { ObjectId } from "mongodb";
import { studentsCollection } from "../configs/connectDB.js";
import Student from "../models/Student.js";

const studentsRouterController = {
    //Get all students
    getAllStudents: async (req, res) => {
        try {
            const allstudents = await studentsCollection.find().toArray();
            res.status(200).json({
                message: "Student list loaded successfully",
                data: allstudents
            });
        } catch (error) {
            res.status(500).json({
                message: error.message,
                data: null
            });
        }
    },

    //Add new student
    addStudent: async (req, res) => {
        try {
            //get data from req.body
            const newStudentData = req.body;
            //check to prevent adding a duplicated doc to DB
            const isDuplicated = await studentsCollection.findOne(newStudentData);

            if (isDuplicated) {
                return res.status(409).json({
                    message: "Student already existed",
                });
            };

            const newStudent = new Student({
                ...newStudentData,
            });

            const addNewStudent = await newStudent.save();

            if (!addNewStudent) {
                return res.status(500).json({ message: "Add new student failed" });
            };

            res.status(201).json({
                message: "Add success",
                data: newStudent
            });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    },

    //Edit student (using id params)
    editStudent: async (req, res) => {
        try {
            const idToEdit = req.params.idToEdit;
            const editData = req.body;

            const updateStudent = await studentsCollection.updateOne(
                { _id: new ObjectId(idToEdit) },
                { $set: { ...editData } }
            );

            if (!updateStudent.acknowledged) {
                return res.status(500).json({
                    message: "Edit student failed",
                });
            };

            res.status(200).json({
                message: "Edit success",
                data: {
                    _id: idToEdit,
                    ...editData,
                }
            });

        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    },

    //Delete student
    deleteStudent: async (req, res) => {
        try {
            const idToDel = req.params.idToDel;

            const deleteStudent = await studentsCollection.deleteOne({
                _id: new ObjectId(idToDel)
            });

            if (!deleteStudent.acknowledged) {
                return res.status(500).json({
                    message: "Delete failed",
                });
            }

            res.status(200).json({
                message: "Delete success",
            });

        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        };
    }

};

export default studentsRouterController;