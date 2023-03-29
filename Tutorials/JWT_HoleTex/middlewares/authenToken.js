import jwt from "jsonwebtoken";

const authenToken = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];

    // extract the token (with index=1) from [Bearer token] as config in jwt.http / shortcut in TC GUI
    const token = authorizationHeader.split(' ')[1];
    // console.log(token);

    // if (!token) res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, data) => {
        console.log(err, data);
        if (err) res.sendStatus(403);
        next();
    });

}

export default authenToken;