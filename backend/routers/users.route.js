const express = require("express");
const authrouter = express.Router();
const { signup, verifyEmail, login, logout } = require("../controllers/auth.controller")

authrouter.post("/signup", signup)
authrouter.get("/verify-email/:code", verifyEmail)
authrouter.post("/login", login)
authrouter.get("/logout", logout)

module.exports = authrouter