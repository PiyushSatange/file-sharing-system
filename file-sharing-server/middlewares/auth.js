const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        const result = jwt.verify(token, process.env.JWT_SECRET);
        if(result.role === "admin"){
            next();
        }
        else{
            return res.status(400).json({ message: "Not authorized" })
        }
    }
    else{
        res.status(400).json({msg:"token not found"});
    }
}

const basicAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        const result = jwt.verify(token, process.env.JWT_SECRET);
        if(result.role === "basic"){
            next();
        }
        else{
            return res.status(400).json({ message: "Not authorized" })
        }
    }
    else{
        res.status(400).json({msg:"token not found"});
    }
}

module.exports = {
    adminAuth,
    basicAuth
}