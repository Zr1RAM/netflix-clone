const mongoose = require("mongoose");

const connectDB = (/*url*/) => {
    //console.log(process.env.MONGO_URI);
    return mongoose.connect(/*url*/ process.env.MONGO_URI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        //useCreateIndex: true,
    }).then(()=> console.log("connected to mongoDB"))
    .catch((error)=>{
        console.log("error connecting to mongodb: "); 
        console.log(error)
        throw error;
    });
}

module.exports = connectDB;