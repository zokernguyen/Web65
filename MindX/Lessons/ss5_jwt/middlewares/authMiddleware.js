import jwt from "jsonwebtoken";
const JWT_SECRET = "MY_SECRET_KEY";

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        // verify token
        const { email } = jwt.verify(token, JWT_SECRET);
        req.user = email;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Unauthorized",
        });
    }
};

export default authMiddleware;