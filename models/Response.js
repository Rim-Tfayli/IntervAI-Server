const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema(
    {
        interviewId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Interview",
            required: true
        },
        question: {
            type: String,
            trim: true,
            default: ""
        },
        userAnswer: {
            type: String,
            trim: true,
            default: ""
        },
        idealAnswer: {
            type: String,
            trim: true,
            default: ""
        },
        aiFeedback: {
            type: String,
            trim: true,
            default: ""
        },
        score: {
            type: Number,
            default: null
        },
        isFavorite: {
            type: Boolean,
            default: false
        }
    },
    { 
        timestamps: true
    }
);

module.exports = mongoose.model("Response", ResponseSchema);