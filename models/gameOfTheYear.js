const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const gameOfTheYearSchema = new mongoose.Schema(
    {
        
        year: {
            type: Number,
            required: true
        },
        gameId:{ 
            type: ObjectId,
            ref: "Game"
        }

      
    },
    {timestamps: true}
);

module.exports = mongoose.model("GameOfTheYear", gameOfTheYearSchema)