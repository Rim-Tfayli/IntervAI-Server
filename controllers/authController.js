const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

async function register(req, res) {
    try{
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({ user: { id: user._id, username: user.username, email: user.email } });
    } 
    catch(err){
        next(err);
    }
}

async function login(req, res) {
    try{
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });
    }
    catch(err){
        next(err);
    }
    
}

module.exports = { register, login };