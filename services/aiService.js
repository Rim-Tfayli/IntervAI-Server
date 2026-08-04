const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });

const QUESTION_COUNT = 10;

async function generateQuestions(role, about) {
    const prompt = `
        You are an experienced technical interviewer and hiring manager.

        Generate exactly ${QUESTION_COUNT} interview questions for a candidate applying as: ${role}.
        The interview should be about these topics: ${about}.
        Mix technical and behavioral questions naturally based on the role.

        Respond ONLY with a raw JSON array of ${QUESTION_COUNT} strings, no numbering, no markdown, no extra text.
        Example format: ["question one", "question two"]
    `;
    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    const cleaned = rawText.replace(/```json|```/g, "").trim();

    let questions;
    try{
        questions = JSON.parse(cleaned);
        console.log(questions);
    }
    catch(e){
        throw new Error("AI response was not valid JSON: " + rawText);
    }

    if(!Array.isArray(questions) || questions.length !== QUESTION_COUNT){
        throw new Error(`Expected ${QUESTION_COUNT} questions, got ${questions.length}`);
    }

    return questions;
}

async function evaluateAnswer( question, userAnswer ){
    const prompt = `
        You are a senior technical interviewer evaluating a candidate's interview answer.

        Question: ${question}
        Candidate's answer: ${userAnswer}

        Evaluate this answer and respond ONLY with raw JSON in this exact shape, no markdown, no extra text:
        {
        "score": <number from 0 to 10>,
        "feedback": "<2-3 sentences of constructive feedback>",
        "idealAnswer": "<a strong, complete sample answer to this question>"
        }
    `;
    const result = await model.generateContent(prompt);
    const rawText = result.response.text();
    console.log(rawText);

    const cleaned = rawText.replace(/```json|```/g, "").trim();
    console.log(cleaned);
    
    let evaluation;
    try{
        evaluation = JSON.parse(cleaned);
    }
    catch(e){
        throw new Error("AI response was not valid JSON: " + rawText);
    }
    if(
        typeof evaluation.score !== "number" ||
        typeof evaluation.feedback !== "string" ||
        typeof evaluation.idealAnswer !== "string"
    ){
        throw new Error("AI response was missing expected fields");
    }
    return evaluation;
    }
module.exports = { generateQuestions, evaluateAnswer };