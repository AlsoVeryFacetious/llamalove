const mongoose = require('mongoose');
const internal = require('stream');

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String
});

const questionSchema = new mongoose.Schema({
    username: String,
    age: Number,
    gender: String,
    sexInterest: String,
    sign: String,
    degree: String,
    cohort: Number,
    musicGenre: String,
    gameGenre: String,
    tvGenre: String,
    hobbies: String,
    travelDestination: String
    
});

//doesnt work yet
userSchema.methods.getQuestionnaire = function(){
    const questionnaire = mongoose.model("Questionnaire").find({username: this.username});
    return questionnaire;
}

exports.User = mongoose.model("User", userSchema);
exports.Questionnaire = mongoose.model("Questionnaire", questionSchema);
