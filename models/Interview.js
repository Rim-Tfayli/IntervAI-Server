const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            type: String,
            required: true,
            trim: true
        },
        about: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            enum: ["in_progress", "completed"],
            default: "in_progress"
        },
        overallScore: {
            type: Number,
            default: null
        }
    },
    { 
        timestamps: true
    }
);

module.exports = mongoose.model("Interview", InterviewSchema);