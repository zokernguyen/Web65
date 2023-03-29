import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authenToken from "./middlewares/authenToken.js";

dotenv.config(); //load variables from .env file into NodeJS

const app = express();
const PORT = process.env.PORT || 6969;
app.use(express.json());

const books = [
    {
        id: 1,
        name: "Chi Pheo",
        author: "Nam Cao"
    },
    {
        id: 2,
        name: "Tat den",
        author: "Ngo Tat To",
    },
    {
        id: 3,
        name: "So do",
        author: "Vu Trong Phung"
    }
]

app.post("/login", (req, res) => {
    //Authentication
    //Authorization

    //{username: "user_name"}
    const data = req.body;

    //create token
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: "30s" });
    /*
    params:
    1st param (data): user req payload,
2nd param (env...): read .env file to get the secret key,
3rd param ({...}): expire time to secure the token.
    */

    res.json({ accessToken });
})

app.get("/books", authenToken, (req, res) => {
    res.json({
        status: "success",
        data: books
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});