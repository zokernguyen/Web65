import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./configs/connectDB.js";
import authRouter from "./routes/authRouter.js";
import studentsRouter from "./routes/studentsRouter.js";

const app = express();
const PORT = process.env.PORT;

async function main() {
    try {
        // connect to mongodb
        await connectDB();

        // set up middlewares
        app.use(express.json());
        app.use(cors());
        app.use("/api/v1/auth", authRouter);
        app.use("/api/v1/students", studentsRouter);

        // run server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1); // exit with error
    }
};

main();