const models = require('../models');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const url = `mongodb+srv://zsalabye:xmasgift12@llamacluster.ug7af.mongodb.net/LlamaDB?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });

exports.createUser = async (req, res) => {
    let salt = bcrypt.genSaltSync(10);
    console.log(req.body)
    const user = models.User(req.body);
    user.password = bcrypt.hashSync(user.password, salt);
    try{
        const user = await models.User.create(req.body);
        console.log('user saved :)');
        res.send(user);
    } catch(err){
        console.log(err);
    }
}

exports.createQuestionnaire = async (req, res) => {
    console.log(req.body);
    const question = models.Questionnaire(req.body);
    try{
        const question = await models.Questionnaire.create(req.body);
        console.log('questionnaire saved :)');
        res.send(question);
    } catch(err){
        console.log(err);
    }
}

exports.getUsers = async (req, res) =>{
    const users = await models.User.find().lean();
}

exports.getQuestionnaire = async (req,res) => {
    const question = await models.Questionnaire.find().lean();
}

exports.login = async (req, res) => {
    const userName = req.body.username;
    const password = req.body.password;
    const user = await models.User.findOne({username: userName});
    console.log(user);
    if (bcrypt.compareSync(password, user.password)){
        console.log("logged in :)");
        res.send("logged in :)");
    }
}