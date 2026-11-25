const Interview = require("../models/Interview");
const Response = require("../models/Response");

async function completeInterview( interviewId ){
    const responses = await Response.find({ interviewId });

    const unanswered = responses.some((r) =>  r.userAnswer === "" );
    if(unanswered){
        return;
    }
    const totalScore = responses.reduce((sum, r) => sum + r.score, 0);
    const avgScore = totalScore / responses.length;
    
    const interview = await Interview.findById(interviewId);

    interview.status = "completed";
    interview.overallScore = avgScore;

    await interview.save();
}

module.exports = { completeInterview }; 