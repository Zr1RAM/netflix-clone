const { StatusCodes } = require("http-status-codes");
const { createCustomError } = require("../errors/custom-error");
const { admin, db } = require("../firebase");
const asyncWrapper = require("../middleware/asyncWrapper");

// firebase
const setCustomClaims = asyncWrapper(async (req, res, next)=> {
    console.log("setCustomClaims is called");
    const { uid, isAdmin } = req.body;
    try {

        const userRecord = await admin.auth().getUser(uid);
        console.log('User Record: ', userRecord.toJSON());

        await admin.auth().setCustomUserClaims(uid, { isAdmin: isAdmin });
        res.status(StatusCodes.OK).json("Claims set successfully");
    } catch (error) {
        console.error(error);
        return next(createCustomError(error, StatusCodes.INTERNAL_SERVER_ERROR));
    }
});

const addUser = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        // const userRecord = await db.ref(`users/${uid}`).set({
        //     email,
        //     timestamp: Date.now(),
        // });

        const userRecord = await admin.auth().createUser({
            email: email,
            password: password,
            createdAt: Date.now(),
        });

        res.status(StatusCodes.CREATED).json(userRecord);
    } catch (error) {
        console.log(error);
        return next(createCustomError(error, StatusCodes.INTERNAL_SERVER_ERROR));
    }
});



module.exports = { setCustomClaims, addUser };