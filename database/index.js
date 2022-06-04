const mongoose = require("mongoose");

//Principio solid: responsability
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_CLOUD, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log("DB CONNECTED")
    } catch(err){
        console.log("DB CONECTION ERROR", err);
        process.exit(1)
    }
    
}


module.exports = connectDB;