require("dotenv").config();
const { generateQuestions } = require("./services/aiService");

async function run() {;
    const questions = await generateQuestions("Backend Developer", "Node.js, Express, MongoDB");
    console.log(questions);
}

run();