const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Interview = require("../models/Interview");
const Response = require("../models/Response");
const { generateQuestions } = require("../services/aiService");

async function startInterview(req, res) {
    try{
        const { role, about } = req.body;

        if(!role || !about){
            return res.status(400).json({ message: "role and about are required" });
        }

        const questions = await generateQuestions("Backend Developer", "Node.js, Express, MongoDB");

        const interview = await Interview.create({
            userId: req.user.id,
            role,
            about,
            status: "in_progress"
        });

        const responseDocs = questions.map( (questionText) => ({
            interviewId: interview._id,
            question: questionText
        }));

        const responses = await Response.insertMany(responseDocs);

        res.status(201).json({ interview });
    } 
    catch(err){
        res.status(500).json({ message: err.message });
    }
}
module.exports = { startInterview };