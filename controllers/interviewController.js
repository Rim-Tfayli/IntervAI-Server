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

async function getInterviews(req, res){
    try{
        const userInterviews = await Interview.find({ userId: req.user.id });
        res.status(200).json({ userInterviews });
    } 
    catch(err){
        res.status(500).json({ message: err.message });
    }
}
async function getInterviewById(req, res){
    try{
        const interviewId = req.params.id;
        const interview = await Interview.findById(interviewId);

        if(!interview){
            return res.status(404).json({ message: "Interview not found" });
        }
        if(interview.userId.toString() !== req.user.id){
            return res.status(403).json({ message: "Not authorized to view this interview" });
        }
        
        const responses = await Response.find({ interviewId: interview._id });

        res.status(200).json({ interview, responses });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

async function getDashboardStats(req, res){
    try{
        const completedInterviews = await Interview.find({
            userId: req.user.id,
            status: "completed"
        });

        const interviewCount = completedInterviews.length;

        let averageScore = 0;
        if(interviewCount > 0){
            const totalScore = completedInterviews.reduce((sum, interview) => sum + interview.overallScore, 0);
            averageScore = totalScore / interviewCount;
        }

        res.status(200).json({ interviewCount, averageScore });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

module.exports = { startInterview, getInterviews, getInterviewById, getDashboardStats };