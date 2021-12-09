const mongoose = require('mongoose');
const internal = require('stream');
var random = require('mongoose-simple-random');


const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String
});

const questionSchema = new mongoose.Schema({
    username: String,
    age: Number,
    pronouns: String,
    attracted: String,
    sign: String,
    degree: String,
    cohort: Number,
    musicGenre: String,
    gameGenre: String,
    tvGenre: String,
    hobbies: String,
    travelDestination: String,
    image:{
        data: Buffer,
        contentType: String,
        path: String
    }
});

const loveSchema = new mongoose.Schema({
    username: String,
    likes: Array,
    matches: Array
});

userSchema.methods.getQuestionnaire = async function(userName){
    return await mongoose.model("Questionnaire").findOne({username: userName});
}

userSchema.methods.getLove = async function(userName){
    return await mongoose.model("Love").findOne({username: userName});
}

userSchema.plugin(random);

exports.User = mongoose.model("User", userSchema);
exports.Questionnaire = mongoose.model("Questionnaire", questionSchema);
exports.Love = mongoose.model("Love", loveSchema);
