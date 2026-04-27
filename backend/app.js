const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const phoneRoutes = require("./routers/phone.route")
const GlobalErrorHandler = require("./controllers/error.controller");
const mongoose = require('mongoose');
const app = express()

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get("/api/status", (req, res) => {
    res.status(200).send("Phones API is working!");
})

app.use("/api/phones", phoneRoutes);


app.use(GlobalErrorHandler)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        console.log("DB NAME:", mongoose.connection.name);


        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });