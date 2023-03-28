import express from "express";

const app = express();
const port = 8080;

const router = express.Router();


app.get("/", (req, res) => {
    res.send("Homepage")
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
