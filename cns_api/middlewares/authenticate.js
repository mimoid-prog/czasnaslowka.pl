const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = (req, res, next) => {
    const header = req.headers.authorization;
    let token;

    if(header) token = header.split(" ")[1];
    
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                res.status(401).json({ errors: err });
            } else {
                User.findOne({ email: decoded.email }).then(user => {
                    req.currentUser = user;
                    next();
                });
            } 
        });
    } else {
        res.status(401).json({ errors: { global: "No token" } });
    }
};