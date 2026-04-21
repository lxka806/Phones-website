const express = require('express');

const phoneRouter = express.Router();

// GET /api/phones
phoneRouter.route("/")
    .get()

module.exports = phoneRouter;