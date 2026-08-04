require("dotenv").config();
const model = require("./services/aiService");

async function run() {
    const result = await model.generateContent("Say Hello Rim");
    console.log(result.response.text());
}

run();