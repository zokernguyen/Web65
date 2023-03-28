import path from "path";
import fs from "fs";

const PATH = path.join("data", "todo.json");

const getTodos = (req, res, next) => {

    try {
        //read data
        const fileData = fs.readFileSync(PATH, "utf-8");
        const dataJSON = JSON.parse(fileData);

        //assign data to {req} obj with custom key ("todos"), so the middleware can carry this data as a payload and use it in further steps
        req.todos = dataJSON;

        //end of middleware logic, execute next step
        next();

    } catch {

        res.status(500).json({
            message: "Bad request!",
            data: null
        })
    };
}

export default getTodos;