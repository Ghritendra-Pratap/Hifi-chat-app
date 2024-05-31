const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: 2, // Minimum length for fullname
        maxlength: 50, // Maximum length for fullname (adjust as needed)
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4, // Minimum length for username
        maxlength: 20, // Maximum length for username (adjust as needed)
        trim: true, // Remove leading and trailing whitespace
        lowercase: true, // Convert username to lowercase
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum length for password
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
    },
    profilepic: {
        type: String,
        default: "",
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
