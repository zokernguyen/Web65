import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const payload = req.body;
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "45s" });

}

export default auth;