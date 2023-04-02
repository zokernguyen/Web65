import express from "express";
import todoRouter from "./routes/todoRouter.js";
import authRouter from "./routes/authRouter.js";

const app = express();
const PORT = 8080;

app.use(express.json());

app.use("/todos", todoRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});