import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authorizeMDW from "./middlewares/authorizeMDW.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());

const users = [
    {
        id: 1,
        username: 'Zoker',
    },
    {
        id: 2,
        username: 'Henry',
    },
    {
        id: 3,
        username: 'Jon Doe',
    }
]

const postByAuthor = [
    {
        userId: 1,
        Author: 'Zoker',
        posts: [
            "post1 by Zoker",
            "post2 by Zoker",
        ]
    },
    {
        userId: 2,
        Author: 'Henry',
        posts: [
            "post1 by Henry",
        ]
    },
    {
        userId: 3,
        Author: 'Jon Doe',
        posts: [
            "post1 by Jon Doe",
            "post2 by Jon Doe",
            "post3 by Jon Doe",
        ]
    }
];

app.get("/posts", authorizeMDW, (req, res) => {
    // console.log(posts);
    console.log(req.userId);
    const data = postByAuthor.filter(author => author.userId === req.userId)[0]?.posts;
    console.log(data);
    res.json({
        posts: data
    });
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const user = users.find(user => user.username === username);

    if (!user) res.sendStatus(401);

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });

    res.json({ accessToken });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});