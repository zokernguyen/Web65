import express from "express";
import authRouter from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/students", studentRoutes);

// Authorization <type> <credentials>

app.listen(8080, () => { });