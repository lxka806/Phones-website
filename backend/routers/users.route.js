const express = require("express");
const authrouter = express.Router();
const { protect } = require('../middlewares/auth.middlewares')
const { signup, verifyEmail, login, logout } = require("../controllers/auth.controller")

authrouter.post("/signup", signup)
authrouter.get("/verify-email/:code", verifyEmail)
authrouter.post("/login", login)
authrouter.get("/logout", logout)
authrouter.post("/auto-login", protect, async(req, res, next) =>{
    res.status(200).json(req.user)
})

module.exports = authrouter