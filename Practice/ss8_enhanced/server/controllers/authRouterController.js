import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from './../models/User.js';
import { usersCollection } from '../configs/connectDB.js';

dotenv.config();

let refreshTokenStore = [];

const authRouterController = {

    //Register
    register: async (req, res) => {
        try {

            const { username, password } = req.body;

            //check input
            if (!username || !password) {
                return res.status(400).json({ message: 'Username or password is empty' });
            };

            //check if username is existed or not
            const isDuplicated = await usersCollection.findOne({
                username: username,
            });

            if (isDuplicated) {
                return res.status(409).json({ message: "User name is already existed" });
            };

            //add new user to db
            const hashedPW = bcrypt.hashSync(password, 10);

            const registerInfo = new User({ username: username, password: hashedPW });

            const newUser = await registerInfo.save();
            //using save() instead of insertOne() to apply the schema template for new doc

            if (!newUser) {
                return res.status(500).json({ message: "Register failed" });
            };

            res.status(201).json({
                message: "Register success",
                data: {
                    id: newUser._id,
                    username,
                    role: newUser.role
                    //do not expose pw here
                }
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    },

    //Generate access token
    genAccessToken: (user) => {
        const payload = {
            id: user._id,
            username: user.username,
            role: user.role
        };

        return jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        );
    },

    //Generate refresh token
    genRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user._id,
                username: user.username,
                role: user.role
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "365d" }
        );
    },

    //Login
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            //check input
            if (!username || !password) {
                return res.status(400).json({ message: 'Username or password is empty' });
            };

            //check if user is existed in DB or not
            const user = await usersCollection.findOne({
                username: username,
            });

            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            };

            //check password
            const isValidPW = bcrypt.compareSync(password, user.password);

            if (!isValidPW) {
                return res.status(400).json({ message: 'Incorrect password' });
            };

            if (user && isValidPW) {

                const accessToken = authRouterController.genAccessToken(user);
                const refreshToken = authRouterController.genRefreshToken(user);

                //storing refresh token to check if the same user is requesting to refresh
                refreshTokenStore.push(refreshToken);

                const { password, ...othersInfo } = user
                //exclude sensitive data from the user document before sending it in the response.
                //user._doc = only get stored value (user object includes User model and other structural values/metadata that is unneccessory to send to client)

                res.setHeader("refreshToken", refreshToken);
                res.setHeader('Access-Control-Expose-Headers', 'refreshToken');

                res.status(200).json({ ...othersInfo, accessToken, refreshToken });
                //do not expose password here
            }
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }
}

export default authRouterController;