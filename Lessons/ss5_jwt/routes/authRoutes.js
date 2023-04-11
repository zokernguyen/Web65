import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const authRouter = express.Router();
const JWT_SECRET = "MY_SECRET_KEY";
const users = [];

authRouter.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Email or password is missing",
        });
    }
    const user = users.find((u) => u.email === email);
    if (!user) {
        return res.status(400).json({
            message: "User not found",
        });
    }

    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({
            message: "Password is incorrect",
        });
    }

    // handle login succsess
    // create token

    // xxx.yyy.zzz
    /*
    xxx: header: base64 encoded
    {
      exp: // thoi gian het han
    }
    ____
    yyy: payload: base64 encoded
    {
      email,
      userId,
      role,
      permission
    }
    ____
    zzz: signature: "ajhfjkafjhahjflafjhahjf"
    */

    const token = jwt.sign(
        {
            email,
        },
        JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );

    // send token to client
    return res.status(200).json({
        message: "Login success",
        data: {
            token,
            email,
        },
    });
});

authRouter.post("/register", (req, res) => {
    const { email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);

    users.push({
        email,
        password: passwordHash,
    });
    console.log(users);
    res.send("Registering a new user");
});

export default authRouter;