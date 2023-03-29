import express from "express";

const loginRouter = express.Router();

const account = [
    {
        username: 'zoker',
        password: 'zoker123'
    },
    {
        username: 'test_acc',
        password: 'test123'
    }
]

//create account
todoRouter.post("/register", (req, res) => {
    const { username, password } = req.body;

})
//login
todoRouter.post("/login", (req, res) => {

});

loginRouter.post("/login", (req, res) => {

})

export default loginRouter;

