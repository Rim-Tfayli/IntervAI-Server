require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const app = express();
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);

app.get("/", (req, res) => {
    res.send("Hello, this is IntervAI: server-side");
});

const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err.message);
    });