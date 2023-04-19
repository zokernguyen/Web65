import jwt from "jsonwebtoken";

const authMDWController = {

    //Verify access token MDW

    verifyToken: (req, res, next) => {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({
                message: 'Missing authorization header'
            });
        }

        const accessToken = authHeader.split(' ')[1];
        if (!accessToken) {
            return res.status(401).json({
                message: 'No authorization token provided'
            });
        }

        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            //get method err and token decoded payload as params to handle err, then assign the token payload to req obj to use in the next step.
            if (err) {
                if (err.name = 'TokenExpiredError') {
                    return res.status(401).json({
                        message: 'Access token has expired',
                    });
                } else {
                    return res.status(401).json({ error: "Invalid access token" });
                }
            }
            req.user = user;
            next();
        });
    },

    //MDW to verify user's role before executing delete method. Only admin has the permission to delete other user's profile. Manager can edit students info. Users can only delete their own profile.

    verifyRole: (req, res, next) => {

        authMDWController.verifyToken(req, res, () => {
            const { user } = req.user;
            const role = user.role;
            console.log(`Your role is ${role}`);
            //Authorization here, execute later
            // if (id == req.params.id) {
            //     return res.status(400).json({ message: "You cannot delete your own profile" });
            // }

            // if (id !== req.params.id && !req.user.admin) {
            //     return res.status(403).json({ message: "You don't have permission for this action" });
            // }

            next();
        });
    }
}

export default authMDWController;