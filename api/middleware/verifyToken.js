const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    //console.log(req.cookies.accessToken);
    //console.log("verifying");
    //console.log(req.headers.accesstoken);
    //console.log(req.query.accessToken);

    let token; //= req.cookies.accessToken || req.headers.accessToken || req.query.accessToken;
    
    if(req.cookies.accessToken) {
        token = req.cookies.accessToken;
    } else if(req.headers.accesstoken) {
        // In the case that the accessToken is received via the headers
        // const authHeader = req.headers.accessToken;
        // if(authHeader) {
        // In the case the headers has the key value pair as {token: "Bearer asdasdasd9f8adof987asdfsdf897sdf(some token value)"}
        // we are removing the bearer part and getting only the token value using split.
        // const token = authHeader.split("")[1];
        // }
        token = req.headers.accesstoken.split(" ")[1];
    } else if(req.query.accessToken) {
        token = req.query.accessToken
    }
    //console.log(token);

    if(!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json('Not logged in!');
    }

    // This is how I am doing it 
    jwt.verify(token, process.env.SECRET_KEY, async (err, userInfo) => {
        if(err) {
            return res.status(StatusCodes.FORBIDDEN).json("Token is not valid");
        }
        const currentTimeStamp =  Math.floor(Date.now() / 1000);
        if(userInfo.exp < currentTimeStamp) {
            return res.status(StatusCodes.UNAUTHORIZED).json('Unauthorized: Token has expired');
        } 
        req.userInfo = userInfo;
        //console.log(userInfo);
        next();

    });
};


module.exports = authenticateUser;