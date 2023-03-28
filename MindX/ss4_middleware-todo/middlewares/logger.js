const logger = (req, res, next) => {
    const logTime = new Date().toISOString();

    req.log = `Request logged at ${logTime}`;

    next();
}

export default logger;