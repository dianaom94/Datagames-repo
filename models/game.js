const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const gameSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            text: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
        description: {
            type: String,
            required: true,
            maxlength: 2000,
            text: true,
        },
        category: {
            type: ObjectId,
            ref: "Category",
        },
        brand: {
            type: String,
            required: true,
        },
        plataform: {
            type: String,

        },
        gender: {
            type: String,
            required: true
        },
        maxplayers: {
            type: Number,
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "Inactive"],
          },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);