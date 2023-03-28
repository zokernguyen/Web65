import express from "express";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import auth from "../middlewares/auth.js";
import getTodos from "../middlewares/getTodos.js";
import logger from "../middlewares/logger.js";
const todoRouter = express.Router();
const TODOS_PATH = path.join("data", "todo.json");

//get all todos using getData middleware
todoRouter.get("/", auth, getTodos, (req, res) => {

    try {
        res.status(200).json({
            message: "Todos loaded successfully.",
            data: req.todos
        })
    } catch {
        res.status(500).json({
            message: "Failed to read todos data",
            data: null
        });
    }
});

//get todo by id
todoRouter.get("/:todoID", getTodos, (req, res) => {

    //find todo in todos list by id param
    const todoID = req.params.todoID;
    const todo = req.todos.find((todo) => todo.id == todoID); // (==) compare value only ([number] in .json >< [string char] in req.params)

    if (todo) {
        res.status(200).json({
            message: `Todo with id: ${todoID} loaded successfully.`,
            data: todo
        });
    } else {
        res.status(404).json({
            message: `Todo with id: ${todoID} does not exist!`,
            data: null
        });
    }
});

//post new todo
todoRouter.post("/", logger, getTodos, (req, res) => {

    console.log(req.log);

    try {

        const { title, isCompleted } = req.body;

        const newTodo = {
            id: uuidv4(),
            title: title,
            isCompleted: isCompleted
        }

        const dataJSON = req.todos; //retrieve data from mdw payload
        dataJSON.push(newTodo); //update data
        fs.writeFileSync(TODOS_PATH, JSON.stringify(dataJSON)); //overwrite old data.json

        res.status(201).json({
            message: "New Todo created successfully.",
            data: dataJSON
        })
    } catch {

        res.status(500).json({
            message: "Can't create new Todo",
            data: null
        })
    }
});

//edit todo by id
todoRouter.put("/:idToEdit", getTodos, (req, res) => {

    try {

        const idToEdit = req.params.idToEdit; //type=string
        const dataJSON = req.todos; //retrieve data from mdw payload
        const newTodoList = dataJSON.map(todo => {
            if (todo.id == idToEdit) {
                return {
                    ...todo,
                    ...req.body
                };
            } //using map to overwrite old todo (which has its id matched to params idToEdit) with user data in req.body
            return todo; //if can't find id, return old todo.
        });

        fs.writeFileSync(TODOS_PATH, JSON.stringify(newTodoList)); ////overwrite old data.json

        res.status(200).json({
            message: "Todo updated successfully.",
            data: newTodoList
        });

    } catch {

        res.status(500).json({
            message: "Update failed.",
            data: null
        });

    }

});

//delete todo by id
todoRouter.delete("/:idToDel", getTodos, (req, res) => {

    try {

        const idToDel = req.params.idToDel;
        const dataJSON = req.todos;
        const newTodoList = dataJSON.filter(todo => todo.id != idToDel);

        fs.writeFileSync(TODOS_PATH, JSON.stringify(newTodoList));

        res.status(200).json({
            message: "Todo deleted",
            data: newTodoList
        });

    } catch {

        res.status(500).json({
            message: "Can't delete todo",
            data: null
        });

    }
});

export default todoRouter;