import express from "express";
import todoRouter from "./routes/todoRouter.js";

const app = express();
const PORT = 8080;

app.use(express.json());

app.use("/api/v1/todos", todoRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});