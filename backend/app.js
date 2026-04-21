const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const phoneRoutes = require("./routers/phone.route")

const app = express()

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get("/api/status", (req, res, next) => {
    res.status(200).send("Phones API is working!");
    next()
})

app.use("api/phones", phoneRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})