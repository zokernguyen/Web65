import { MongoClient } from "mongodb";
import { config } from "dotenv";

config();

export const client = new MongoClient(process.env.MONGO_DB_URL);

export const studentsCollection = client.db("practice").collection("students");

export const usersCollection = client.db("practice").collection("users");