const express = require('express');
const path = require('path');

require("dotenv").config();

const connectDB = require('./connect');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authenticateUser = require('./middleware/verifyToken');
const cookieParser = require('cookie-parser');


const app = express();

const setUpRoutes = () => {

    // middlewares
    // app.use((req, res, next) => {
    //     res.header("Access-Control-Allow-Credentials", true);
    //     next();
    // });
    app.use(express.json());
    // app.use(cors({
    //     credentials: true,
    //     origin: "http://127.0.0.1:5173"
    // }));
    app.use(cookieParser());




    app.use("/api/auth", authRoutes);
    // verify token / authentication 
    app.use(authenticateUser);

    app.use('/api/users', userRoutes);

    // error handling should be last
    app.use(errorHandlerMiddleware);
}

const PORT = process.env.PORT || 8800;

const start = async () => {
    try {
        await connectDB(/*process.env.MONGO_URI*/);

        setUpRoutes();
        app.listen(PORT, () => {
            console.log("API working!");
        })
    } catch (error) {
        console.log(error);
    }
};


start();