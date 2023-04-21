import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authCollection } from "../configs/connectDB.js";

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Email or password is missing",
    });
  }
  const user = await authCollection.findOne({ email });
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
    process.env.JWT_SECRET,
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

authRouter.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);

    const user = await authCollection.findOne({ email });
    if (user) {
      throw new Error("Email is already taken");
    }

    const newUser = await authCollection.insertOne({
      email,
      password: passwordHash,
    });

    if (!newUser.acknowledged) {
      throw new Error("Register failed");
    }

    res.status(201).json({
      message: "Register success",
      data: {
        _id: newUser.insertedId,
        email,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      data: null,
    });
  }
});

export default authRouter;
