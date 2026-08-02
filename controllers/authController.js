const bcrypt = require("bcryptjs");
const User = require("../models/User");

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
        res.status(500).json({ message: err.message });
    }
}

module.exports = { register };