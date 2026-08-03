const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Interview = require("../models/Interview");

async function startInterview(req, res) {
    try{
        const { role, about } = req.body;

        if(!role || !about){
            return res.status(400).json({ message: "role and about are required" });
        }

        const interview = await Interview.create({
            userId: req.user.id,
            role,
            about,
            status: "in_progress"
        });
        res.status(201).json({ interview });
    } 
    catch(err){
        res.status(500).json({ message: err.message });
    }
}
module.exports = { startInterview };