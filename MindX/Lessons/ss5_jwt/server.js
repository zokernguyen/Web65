import express from "express";
import jwt from "jsonwebtoken";


const app = express();
const PORT = process.env.PORT || 6969;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("SS5 - JWT");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});