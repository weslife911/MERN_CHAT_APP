const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");

config();

const protectedRoute = async(req, res, next) => {
    try {

        const token = await req.header("Authorization").replace("Bearer ", "");

        if(!token) return res.json({
            success: false,
            message: "Token not provided!"
        });

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!decoded) return res.json({
            success: false,
            message: "Invalid secret/public key provided!"
        });

        const user = await User.findById(decoded.id).select("-password");

        if(!user) return res.json({
            success: false,
            message: "User with given ID does not exists"
        });

        req.user = user;

        next();

    } catch(e) {
        return res.json({
            success: false,
            message: e
        });
    }
};

module.exports = protectedRoute;