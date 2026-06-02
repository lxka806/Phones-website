const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const phoneRouter = require("./routers/phone.route");
const authRouter = require("./routers/users.route");
const errorController = require("./controllers/error.controller");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Test endpoint
app.get("/api/status", (req, res) => res.status(200).send("Phones API is working!"));

// Routes - SAME ENDPOINTS
app.use("/api/phones", phoneRouter);
app.use("/api/v1/auth", authRouter);

// Error handling middleware
app.use(errorController);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        console.log("DB NAME:", mongoose.connection.name);
        app.listen(process.env.PORT || 5000, () => 
            console.log(`Server is running on port ${process.env.PORT || 5000}`)
        );
    })
    .catch(err => console.error("Error connecting to MongoDB:", err));