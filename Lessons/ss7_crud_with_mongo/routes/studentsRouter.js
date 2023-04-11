import express from "express";
import authMDW from "../middlewares/authMDW.js";
import { studentsCollection } from "../configs/connectDB.js";
import { ObjectId } from "mongodb";

const studentsRouter = express.Router();

studentsRouter.get("/", authMDW, async (req, res) => {

    const allStudents = await studentsCollection.find().toArray();

    res.status(200).json({
        message: "Read data success",
        data: allStudents,
    });
});

//get student by name
studentsRouter.get("/:studentName", (req, res) => {

    //find student in students list by 'studentName' param
    const studentName = req.params.studentName;
    const student = req.allStudents.filter((student) => student.name === studentName);
    const result = Array.from(student);//convert student (has type = object) to array

    if (result.length !== 0) {
        res.status(200).json({
            message: `Found ${result.length} student(s) with name ${studentName}`,
            data: student
        });
    } else {
        res.status(404).json({
            message: `Found no student with name ${studentName}`,
            data: null
        });
    }
});

studentsRouter.post("/", async (req, res) => {

    try {

        // get data from req.body
        const newStudentData = req.body;

        //check duplication
        const isDuplicated = await studentsCollection.findOne({
            name: newStudentData.name,
            age: newStudentData.age,
            address: newStudentData.address
        })

        if (isDuplicated) {
            return res.status(409).json({
                message: "Student already existed",
            });
        }

        // insert to db collection
        const newStudent = await studentsCollection.insertOne(newStudentData);

        if (!newStudent.acknowledged) {
            throw new Error("Insert failed");
        }

        res.status(201).json({
            message: "Success",
            data: {
                ...newStudentData,
                _id: newStudent.insertedId,
            },
        });

    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
});

studentsRouter.put("/:idToEdit", async (req, res) => {

    try {

        const idToEdit = req.params.idToEdit;

        const { editData } = req.body;

        const updateStudent = await studentsCollection.updateOne(
            { _id: new ObjectId(idToEdit) },
            { $set: { editData } }
        );

        if (!updateStudent.acknowledged) {
            throw new Error("Edit failed");
        }

        res.status(200).json({
            message: "Update success",
            data: {
                _id: idToEdit,
                ...editData,
            }
        })

    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }

});

studentsRouter.delete("/:idToDel", async (req, res) => {

    try {

        const idToDel = req.params.idToDel;

        const deleteStudent = await studentsCollection.deleteOne({
            _id: new ObjectId(idToDel)
        });

        if (!deleteStudent.acknowledged) {
            throw new Error("Delete failed");
        }

        res.status(200).json({
            message: "Delete success",
        });

    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
});

export default studentsRouter;