const mongoose = require('mongoose');
const internal = require('stream');

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String
});

const questionSchema = new mongoose.Schema({
    gender: String,
    age: Number,
    sexInterest: String,
    sign: String,
    degree: String,
    cohort: Number,
    musicGenre: String,
    gameGenre: String,
    tvGenre: String,
    hobbies: String,
    travelDestination: String,
    bio: String
});

exports.User = mongoose.model("User", userSchema);
exports.Questionnaire = mongoose.model("Questionnaire", questionSchema);