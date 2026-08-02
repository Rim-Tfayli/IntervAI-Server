require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello, this is IntervAI: server-side");
});

const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err.message);
    });