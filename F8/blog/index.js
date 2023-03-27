const express = require("express");
const app = express();
const port = 6969;

app.get("/", (req, res) => {
    res.send("Welcome to my Blog");
})

app.listen(port, () => console.log(`Server is running on port ${port}`));