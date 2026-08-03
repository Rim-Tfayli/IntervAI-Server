const jwt = require("jsonwebtoken");

function auth(req, res, next){
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader && authHeader.split(' ')[1];
    
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decode.id };
        next();
    }
    catch(err){
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

module.exports = auth;