const mongoose = require("mongoose");
const { config } = require("dotenv");

config();

const connectToDB = async() => {
    await mongoose.connect(process.env.NODE_ENV === "production" ? process.env.MONGODB_URI : process.env.MONGODB_URI_LOCAL)
    .then(() => console.log("Mongo DB connected successfully"))
    .catch((e) => console.log(e));
};

module.exports = connectToDB;