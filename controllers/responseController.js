const Interview = require("../models/Interview");
const Response = require("../models/Response");
const { evaluateAnswer } = require("../services/aiService");
const { completeInterview } = require("../services/interviewService");

async function submitAnswer(req, res){
    try{
        const { responseId, userAnswer } = req.body;

        if(!responseId || !userAnswer){
            return res.status(400).json({ message: "responseId and userAnswer are required" });
        }

        const responseDocs = await Response.findById( responseId );
        
        if(!responseDocs){
            return res.status(404).json({ message: "Response not found" });
        }

        const evaluation = await evaluateAnswer( responseDocs.question, userAnswer );

        responseDocs.userAnswer = userAnswer;
        responseDocs.aiFeedback = evaluation.feedback;
        responseDocs.idealAnswer = evaluation.idealAnswer;
        responseDocs.score = evaluation.score;

        await responseDocs.save();

        await completeInterview( responseDocs.interviewId );

        res.status(201).json({ responseDocs });
    } 
    catch(err){
        next(err);
    }
}

async function toggleFavorite(req, res){
    try{
        const { id } = req.params;

        const response = await Response.findById(id);
        if (!response) {
            return res.status(404).json({ message: "Response not found" });
        }

        response.isFavorite = !response.isFavorite;
        await response.save();

        res.status(200).json({ response });
    } 
    catch(err){
        next(err);
    }
}
async function getFavorites(req, res){
    try{
        const userInterviews = await Interview.find({ userId: req.user.id });
        const interviewsIds = userInterviews.map( (interview) => interview._id );

        const favorites = await Response.find({ 
            isFavorite: true,
            interviewId: { $in: interviewsIds }
        });

        res.status(200).json({ favorites });
    } 
    catch(err){
        next(err);
    }
}
module.exports = { submitAnswer, toggleFavorite, getFavorites };