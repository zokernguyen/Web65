import jwt from "jsonwebtoken";

const authorizeMDW = (req, res, next) => {
    const authorizeHeader = req.header('Authorization');
    const token = authorizeHeader && authorizeHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    try {
        const decodedReq = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log(decodedReq);

        req.userId = decodedReq.id;

        next();

    } catch (error) {
        console.log(error);
        res.sendStatus(403);
    }

}

export default authorizeMDW;