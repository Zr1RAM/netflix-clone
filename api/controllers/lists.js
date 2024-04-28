const { StatusCodes } = require("http-status-codes");
const { createCustomError } = require("../errors/custom-error");
const asyncWrapper = require("../middleware/asyncWrapper");
const List = require("../models/List");

// Add list
const addList = asyncWrapper(async (req, res, next) => {
    try {
        const newList = await List.create(req.body);
        return res.status(StatusCodes.CREATED).json(newList);
    } catch (error) {
        return next(createCustomError(error, StatusCodes.INTERNAL_SERVER_ERROR));
    }
});

// Get list

// Delete list 


module.exports = {
    addList,
};