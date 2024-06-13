const { StatusCodes } = require("http-status-codes");
const { createCustomError } = require("../errors/custom-error");
const asyncWrapper = require("../middleware/asyncWrapper");
const Movie = require('../models/Movie');


// Create new movie
const addMovie = asyncWrapper(async (req, res, next) => {
    console.log(req.body);
    // const movie = req.body;
    // console.log(movie);
    // delete movie.video; // this removes the video key value pair from the object
    try {
        const addMovie = await Movie.create(req.body);
        return res.status(StatusCodes.CREATED).json(addMovie);
    } catch (error) {
        console.log(error);
        return next(createCustomError(error, StatusCodes.INTERNAL_SERVER_ERROR));
    }
});

// update movie
const updateMovie = asyncWrapper(async (req, res, next) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
        {
            new: true
        });
        return res.status(StatusCodes.OK).json(updatedMovie);
    } catch (error) {
        return next(createCustomError({msg: 'cannot find movie', error}, StatusCodes.NOT_FOUND));
    }
});

// delete movie
const deleteMovie = asyncWrapper(async (req, res, next) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        return res.status(StatusCodes.OK).json('movie deleted');
    } catch (error) {
        return next(createCustomError({msg: 'cannot find movie to delete', error}, StatusCodes.NOT_FOUND));
    }
});

// get movie
const getMovie = asyncWrapper(async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);
        return res.status(StatusCodes.OK).json(movie);
    } catch (error) {
        console.log(error);
        return next(createCustomError({msg: 'could not find movie', error}, StatusCodes.INTERNAL_SERVER_ERROR))
    }
});

// get random movie or series
const getRandomMovieOrSeries = asyncWrapper(async (req, res, next) => {
    const type = req.query.type;
    console.log(`isSeries:  ${type === 'series' ? true : false}`);
    try {
        const movieOrSeries = await Movie.aggregate([
            { $match: { isSeries: type === 'series' ? true : false } },
            { $sample: {size: 1} },
        ]);
        return res.status(StatusCodes.OK).json(movieOrSeries);
    } catch (error) {
        return next(createCustomError({msg: 'could not find movie', error}, StatusCodes.INTERNAL_SERVER_ERROR))
    }
});

// get all movies 
const getAllMovies = asyncWrapper(async (req, res, next) => {
    try {
        const movies = await Movie.find();
        return res.status(StatusCodes.OK).json(movies.reverse());
    } catch (error) {
        return next(createCustomError(error, StatusCodes.INTERNAL_SERVER_ERROR))
    }
});

module.exports = { 
    addMovie, 
    updateMovie, 
    deleteMovie, 
    getMovie, 
    getRandomMovieOrSeries, 
    getAllMovies
 };