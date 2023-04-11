import express from "express";
import { MongoClient, ObjectId } from "mongodb";

async function main() {
  const app = express();

  const mongodbURL =
    "mongodb+srv://web_65:7vIC6ZHyo3CpZ7rS@cluster0.sugjv2y.mongodb.net/test";
  //declare db url

  const client = new MongoClient(mongodbURL); //create mongo client from the db

  try {
    await client.connect(); //connect to mongo client

    console.log("Connected to mongodb successfully");

    app.get("/", async (req, res) => {
      const teachersCollections = client.db("web_65").collection("teachers");

      const teachers = await teachersCollections.find().toArray();
      //find() is a collection method to reads all the docs of a collection

      console.log(teachers);

      const singleTeacher = await teachersCollections.findOne().toArray();
      //read the 1st doc of collection, can add filter condition params:
      // findOne({ name: "oranges" })

      teachersCollections.insertMany([
        {
          name: "test 2",
          qty: 2,
        },
        {
          name: "test 3",
          qty: 3,
        },
        {
          name: "test 4",
          qty: 4,
        },
      ]);
      //insertOne()/insertMany method to add doc(s)

      const a = await teachersCollections.deleteOne({
        _id: new ObjectId("642988fb4e62fd88edb941fa"),
      });
      //delete() always requires a condition

      res.status(200).json({
        message: "Success",
        data: teachers,
      });
    });
  } catch (error) {
    console.log("Error connecting to mongodb", error);
  }

  app.listen(8080);
}
main();

// Filter condition
/*
 <key> : <value> => equal
 <key>: { $gt: <value> } => $gt, $lt, $gte, $lte  => greater than, less than, greater than or equal, less than or equal
 */
