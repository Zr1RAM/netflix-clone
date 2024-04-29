const { StatusCodes } = require("http-status-codes");
const { createCustomError } = require("../errors/custom-error");

// middleware checks if user is admin before processing any of the endpoints.
const checkPrivileges = (req, res, next) => {
    if(req.userInfo.isAdmin) {
        next();
    } else {
        return next(createCustomError('you are not allowed', StatusCodes.FORBIDDEN));
    }
}

module.exports = checkPrivileges;