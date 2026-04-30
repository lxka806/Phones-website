const mongoose = require("mongoose");
const validator =  require("validator");

const usersSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: [true, "Fullname is required"],
            lowercase: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, "Please provide email with valid form"]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
            maxLength: 12,
            trim: true
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"]
        },
        isActive: {
            type: Boolean,
            default: true
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        verificationCode: String
    },
    {
        timestamps: true
    }
);

const Users = mongoose.model("Users", usersSchema);

module.exports = Users