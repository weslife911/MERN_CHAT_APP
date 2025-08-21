const User = require("../models/User");
const genToken = require("../utils/genToken");
const { genSalt, hash, compare } = require('bcryptjs');
const cloudinary = require("../utils/cloudinary");

const registerController = async(req, res) => {
    try {

        const { full_name, email, password } = req.body;

        if(!full_name || !email || !password) return res.json({
            success: false,
            message: "All fields are required"
        });

        if(password.length < 8) return res.json({
            success: false,
            message: "Password must at least 8 characters"
        });

        const user = await User.findOne({ email });

        if(user) return res.json({
            success: false,
            message: "User with this email exists already. Please try again with different credentials."
        });

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        const newUser = await User({
            full_name,
            email,
            password : hashedPassword
        });

        if(!newUser) return res.json({
            success: false,
            message: "Error while creating user"
        });

        await newUser.save();

        const token = genToken(newUser._id);

        return res.json({
            success: true,
            message: "User created successfully.",
            token
        });

    } catch(e) {
        return res.json({
            success: false,
            message: e
        });
    }
};

const loginController = async(req, res) => {
    try {

        const { email, password } = req.body;

        if(!email || !password) return res.json({
            success: false,
            message: "All fields are required"
        });

        const user = await User.findOne({ email });

        if(!user) return res.json({
            success: false,
            message: "User with given email does not exist"
        });

        const comparePassword = await compare(password, user.password);

        if(!comparePassword) return res.json({
            success: false,
            message: "Incorrect Password"
        });

        const token = genToken(user._id);

        return res.json({
            success: true,
            message: "Logged in successfully",
            token
        });

    } catch(e) {
        return res.json({
            success: false,
            message: e
        });
    }
};

const checkAuth = async(req, res) => {
    return res.json(req.user);
};

const updateProfile = async(req, res) => {
    try {

        const { profilePic } = await req.body;

        const user_id = await req.user._id;

        if(!profilePic) return res.json({
            success: false,
            message: "Profile pic is required"
        });

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(user_id, { profilePic: uploadResponse.secure_url }, { new: true });

        if(!updatedUser) return res.json({
            success: false,
            message: "Error while updating user"
        });

        res.json({
            success: true,
            message: "User updated successfully"
        });

    } catch(e) {
        return res.json({
            success: false,
            message: e
        });
    }
};

const getUsers = async(req, res) => {
    try {

        const users = await User.find({});

        if(!users) return res.json({
            success: false,
            message: "Users not available"
        });

        return res.json(users);

    } catch(e) {
        return res.json({
            success: false,
            message: e
        });
    }
};

module.exports = {
    registerController,
    loginController,
    checkAuth,
    updateProfile,
    getUsers
};