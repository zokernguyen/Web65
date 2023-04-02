import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMDW = (req, res, next) => {
    try {

        //extract the token from req.headers.authorization (default key name)
        const token = req.headers.authorization.replace("Bearer ", "");

        //verify the extracted token
        const { username } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    } catch (error) {

    }


    next();
};

export default authMDW;