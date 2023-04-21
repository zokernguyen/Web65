import { MongoClient } from "mongodb";
import { config } from "dotenv";
config();

export const client = new MongoClient(process.env.MONGO_DB_URL);

export const studentsCollection = client.db("web_65").collection("students");
export const authCollection = client.db("web_65").collection("auth");
