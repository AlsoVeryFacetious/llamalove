const mongoose = require('mongoose');
const internal = require('stream');

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String
});

const questionSchema = new mongoose.Schema({
    
});

exports.User = mongoose.model("User", userSchema);