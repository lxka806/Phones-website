const express = require("express");
const router = express.Router();
const { signup, verifyEmail } = require("../controllers/auth.controller")

router.post("/signup", signup)
router.get("/verify-email/:code", verifyEmail)

module.exports = router