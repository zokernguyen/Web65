import { config } from "dotenv";

config();

import express from "express";

import { client } from "./configs/connectDB.js";
import authRouter from "./routes/authRouter.js";
import studentsRouter from "./routes/studentsRouter.js";

const app = express();
const PORT = process.env.PORT;

async function main() {
    try {
        // connect to mongodb
        await client.connect();
        console.log("Connected to mongodb successfully");

        // set up middlewares
        app.use(express.json());
        app.use("/api/v1/students", studentsRouter);
        app.use("/api/v1/auth", authRouter);

        // run server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        // handle error here
    }
}

main();