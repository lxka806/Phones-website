const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const User = require("../models/users.model")


const signup = catchAsync(async (req, res, next) => {
    const { fullname, email, password } = req.body
    
    const user = await User.create({ fullname, email, password })

    res.status(201).json({
        data: { user }
    })
})


module.exports = { signup }