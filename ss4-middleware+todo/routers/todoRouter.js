import express from "express";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const todoRouter = express.Router();
const PATH = path.join("resources", "todo.json");
//get all
todoRouter.get("/", (req, res) => {
    // try {

    // } catch {
    //     res.status(500).json({
    //         message: "read failed",
    //         data: null
    //     });
    // }
    const fileData = fs.readFileSync(PATH, "utf-8");
    //step 3: send data to client
    res.status(200).json({
        message: "read success",
        data: JSON.parse(fileData)
    });
});

//get by todoID
todoRouter.get("/:todoID", (req, res) => {

});

//post new todo
todoRouter.post("/", (req, res) => {
    //step 1: get data from client
    const { title, isCompleted } = req.body;
    //step 2: create a new todo obj
    const addTodo = {
        id: 3,
        title: title,
        isCompleted: isCompleted
    };
    //

    const newTodo = JSON.stringify(fs.readFileSync(PATH, "utf-8")).push(addTodo);
    res.send(newTodo);
});

todoRouter.put("/:todoID", (req, res) => {

});

todoRouter.delete("/:todoID", (req, res) => {

});

export default todoRouter; 