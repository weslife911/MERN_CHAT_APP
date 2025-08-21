const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    full_name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address'],
        unique: true
    },
    role: {
        type: String,
        default: "user"
    },
    profilePic: {
      type: String,
      default: "",
    },
    password: {
        required: true,
        type: String,
        minlength: 8
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;