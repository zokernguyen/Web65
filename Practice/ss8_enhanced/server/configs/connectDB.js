import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// Connect to MongoDB cluster
export async function connectDB() {
    mongoose.connect(process.env.MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to MongoDB");
    }).catch((error) => {
        console.log("Error connecting to MongoDB:", error);
    })
};

// Define students collection
export const studentsCollection = mongoose.connection.collection("students");

// Define users collection
export const usersCollection = mongoose.connection.collection("users");
