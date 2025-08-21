const express = require("express");
const { config } = require("dotenv");
const connectToDB = require("./database/db");
const authRoutes = require("./routes/AuthRoutes");
const messageRoutes = require("./routes/MessageRoutes");
const cors = require("cors");
const { app, server } = require("./utils/socket");
// const path = require("path");
const job = require("./utils/cron");

config();

// const dirname = path.resolve();

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);

app.get("/health", (req, res) => {
    res.status(200).json({ message: "Server is running" });
});

job.start();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(dirname, "../frontend", "dist", "index.html"));
//   });
// }

const PORT = Number(process.env.PORT) || 8080

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectToDB();
});