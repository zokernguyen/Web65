import { config } from "dotenv";
config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { client } from "./configs/connectDB.js";
import studentRoutes from "./routes/studentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();
const PORT = process.env.PORT;

async function main() {
  try {
    // connect to mongodb
    await client.connect();
    console.log("Connected to mongodb successfully");

    // set up middlewares
    app.use(express.json());
    app.use(cookieParser());
    app.use(
      cors({
        credentials: true,
        origin: ["http://localhost:5173"],
      })
    );
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));

    app.use("/api/v1/students", studentRoutes);
    app.use("/api/v1/auth", authRoutes);
    app.use("/api/v1/upload", uploadRoutes);

    // run server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    // handle error here
  }
}

main();
