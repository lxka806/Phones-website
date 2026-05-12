const apperror = require("../utils/AppError")

const allowedTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new apperror("You do not have permission to perform this action", 403))
        }        
        
        next()
    }
}

module.exports = {
    allowedTo
}