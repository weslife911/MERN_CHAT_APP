const jwt = require("jsonwebtoken");
const { config } = require("dotenv");

config();

const genToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

module.exports = genToken;