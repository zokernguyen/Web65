import express from "express";
import { MongoClient } from 'mongodb';

const PORT = 8080;
const app = express();

const mongodbURL = "mongodb+srv://zoker_nguyen:zoker666@cluster0.fis8kch.mongodb.net/test";
const client = new MongoClient(mongodbURL);

await client.connect();

app.get("/", async (req, res) => {
    const practiceCollection = client.db("practice").collection("new_collection");

    await practiceCollection.insertMany([
        {
            name: "Alice",
            age: 19
        },
        {
            name: "Bob",
            age: 30
        },
        {
            name: "Clark",
            age: 26
        },
    ]);


});

app.listen(PORT);