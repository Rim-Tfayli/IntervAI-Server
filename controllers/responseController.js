const Response = require("../models/Response");
const { evaluateAnswer } = require("../services/aiService");

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

        res.status(201).json({ responseDocs });
    } 
    catch(err){
        res.status(500).json({ message: err.message });
    }
}
module.exports = { submitAnswer };