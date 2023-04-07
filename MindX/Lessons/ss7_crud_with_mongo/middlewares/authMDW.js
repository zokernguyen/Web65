import jwt from "jsonwebtoken";

const authMDW = (req, res, next) => {

    try {
        const token = req.headers.authorization.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            })
        }

        const { username } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (username) {
            next();
        } else {
            throw new Error("Unauthorized");
        }

    } catch (error) {
        res.status(401).json({
            message: error.message,
        });
    }

};

export default authMDW;