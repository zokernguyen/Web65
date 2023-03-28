const auth = (req, res, next) => {

    //validate token
    const tokenIsValid = true;
    console.log("Access granted");

    if (tokenIsValid) {
        next();
    } else {
        res.status(401).json({
            message: "Unauthorized",
        });
    }
}

export default auth;