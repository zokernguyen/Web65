import express from "express";
import todoRouter from "./routers/todoRouter.js";

const port = 8081;
const app = express();
app.use(express.json());

app.use("/api/v1/todo", todoRouter);

app.listen(port, () => {
    `Server is running on port ${port}`
});