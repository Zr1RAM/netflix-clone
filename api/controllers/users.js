const { createCustomError } = require("../errors/custom-error");
const asyncWrapper = require("../middleware/asyncWrapper");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CryptoJS = require("crypto-js");

// Update

const updateUser = asyncWrapper(async (req, res, next) => {
    //console.log("test update");
    //console.log(req.userInfo);
    if(req.userInfo.id === req.params.id || req.userInfo.isAdmin) {
        if(req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
            ).toString();
        }

        try {
            const updateUserInfo = await User.findByIdAndUpdate(
                req.params.id, 
                {
                    $set: req.body
                },
                {
                    new: true // returns the updated info to us. Otherwise it returns only the previous value eventhough its updated in mongoDB
                }
            );
            const { password, ...updatedUserInfoWithoutPassword } = updateUserInfo._doc;
            return res.status(StatusCodes.OK).json({msg: "User details updated" , ...updatedUserInfoWithoutPassword});
        } catch (error) {
            return next(createCustomError({msg: 'User details update failed', error}, StatusCodes.BAD_REQUEST));
        }

    } else {
        return next(createCustomError('You can update only your account', StatusCodes.FORBIDDEN));
    }
});

// Delete
const deleteUser = asyncWrapper(async (req, res, next) => {
    if(req.userInfo.id === req.params.id || req.userInfo.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            return res.status(StatusCodes.OK).json({msg: "User details deleted"});
        } catch (error) {
            return next(createCustomError({msg: 'User details deletion failed', error}, StatusCodes.BAD_REQUEST));
        }
    } else {
        return next(createCustomError('You can delete only your account', StatusCodes.FORBIDDEN));
    }
});
// Get
const getUser = asyncWrapper(async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, ...userWithoutPassword} = user._doc
        return res.status(StatusCodes.OK).json({msg: "User found", userWithoutPassword});
    } catch (error) {
        return next(createCustomError({msg: 'Invalid user id', error}, StatusCodes.BAD_REQUEST));
    }
});

// Get all
const getAllUsers = asyncWrapper(async (req, res, next) => {
    const query = req.query.new;
    if(req.userInfo.isAdmin) {
        //                          apparently .sort({ _id: -1 }) gives us in reverse order or order of which one is newer
        const users = query ? await User.find().sort({ _id: -1 }).limit(10) : await User.find();
        return res.status(StatusCodes.OK).json(users);
    } else {
        return next(createCustomError('You do not have access for this operation', StatusCodes.UNAUTHORIZED));
    }
});
// Get User Stats
const getStats = asyncWrapper(async (req, res, next) => {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1);

    const monthsArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    try {
        const data = await User.aggregate([
            {
                $project: {
                    month: {$month: "$createdAt"}
                }
            }, 
            {
                $group: {
                    _id: "$month", 
                    total: {$sum: 1}
                }
            }
        ]);
        return res.status(StatusCodes.OK).json(data);
    } catch(error) {
        return next(createCustomError(error, StatusCodes.INTERNAL_SERVER_ERROR));
    }
});

module.exports = { updateUser, deleteUser, getUser, getAllUsers, getStats };