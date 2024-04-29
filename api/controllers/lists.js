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
const getLists = asyncWrapper(async (req, res, next) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    //console.log({typeQuery, genreQuery});
    let movieLists = [];
    try {
        let pipeline = [{  $sample: { size: 10 }  }];
        if(typeQuery) {
            pipeline.push( { $match: {type: typeQuery } });
        }
        if(genreQuery) {
            pipeline.push( { $match: {genre: genreQuery } });  
        }
        movieLists = await List.aggregate(pipeline);
        return res.status(StatusCodes.OK).json(movieLists);
    } catch (error) {
        return next(createCustomError(error, StatusCodes.INTERNAL_SERVER_ERROR));
    }
});

// Delete list 
const deleteList = asyncWrapper(async (req, res, next) => {
    try {
        await List.findByIdAndDelete(req.params.id);
        return res.status(StatusCodes.OK).json(`list ${req.params.id} has been deleted`)
    } catch (error) {
        return next(createCustomError(error), StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

module.exports = {
    addList,
    deleteList,
    getLists
};