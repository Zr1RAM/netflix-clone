const { createCustomError } = require("../errors/custom-error");
const asyncWrapper = require("../middleware/asyncWrapper");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const register = asyncWrapper(async (req, res, next) => {
    //const { username, email, password } = req.body;
    try {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
        const user = await User.create(req.body);
        const { password, ...userWithoutPassword } = user._doc;
        res.status(StatusCodes.CREATED).json({ msg: "new user registered", user: userWithoutPassword});
    } catch (error) {
        console.log(error);
        return next(createCustomError({msg: "Invalid username, password or email", error}, StatusCodes.BAD_REQUEST));
    }
    
});

const login = asyncWrapper(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(createCustomError('user not found', StatusCodes.NOT_FOUND))
    }

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    if (originalPassword === req.body.password) {
        const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin }, 
            process.env.SECRET_KEY,
            { expiresIn: "5d" }
        );
        const {password, ...info} = user._doc;
        return res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
        })
        .status(StatusCodes.OK)
        .json({ msg: "Login successful", userInfo:{ ...info, accessToken }});
    } else {
        return next(createCustomError('Incorrect username or password', StatusCodes.UNAUTHORIZED));
    }


});



module.exports = { register, login };