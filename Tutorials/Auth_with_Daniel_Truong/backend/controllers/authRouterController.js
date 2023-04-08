import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authRouterController = {

    //Register
    registerUser: async (req, res) => {
        try {

            //check duplicate
            const nameIsDuplicated = await User.findOne({
                username: req.body.username
            })
            const emailIsDuplicated = await User.findOne({
                email: req.body.email
            })

            if (nameIsDuplicated || emailIsDuplicated) {
                res.status(409).json("Username or email already existed!")
            }

            //encode password
            const password = req.body.password;
            const hashedPW = bcrypt.hashSync(password, 10);

            //create new user
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPW,
            });

            //save to db
            const user = await newUser.save();

            res.status(200).json({
                message: "New user created successfully",
                data: user,
            });
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    //Login
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });

            if (!user) {
                res.status(404).json("Username not found!");
            };

            const isValidPW = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!isValidPW) {
                res.status(404).json("Password is incorrect!");
            };

            if (user && isValidPW) {
                jwt.sign(
                    {
                        id: user.id,
                        isAdmin: user.admin
                    },
                    process.env.ACCESS_TOKEN_SECRET
                );

                res.status(200).json({
                    message: "Login success",
                    data: user
                });
            };
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }
};

export default authRouterController;
