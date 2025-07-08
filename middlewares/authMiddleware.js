const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // const token = req.headers.authorization
    // console.log(token);
    console.log("middlewire");
    next();
}

module.exports = authMiddleware;