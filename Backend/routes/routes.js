const models = require('../models');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const expressSession = require('express-session');

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

    if(await models.User.findOne({username: req.body.username})){
        console.log("Username taken");
        res.status(400).send("Username taken");
        return;
    }
    const user = models.User(req.body);
    user.password = bcrypt.hashSync(user.password, salt);

    try{
        await user.save();
        await models.Love.create({username: user.username});

        console.log('user saved :)');

        req.session.user = {
            isAuthenticated: true,
            username: user.username
        }

        res.send(user);
    } catch(err){
        console.log(err);
    }
}

exports.createQuestionnaire = async (req, res) => {
    console.log(req.body);
    try{
        const question = await models.Questionnaire.create(req.body);
        console.log('questionnaire saved :)');
        req.session.user = {
            isAuthenticated: true,
            username: question.username
        }
        res.send()
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

    if (bcrypt.compareSync(password, user.password)){
        console.log("logged in :)");

        req.session.user = {
            isAuthenticated: true,
            username: user.username
        }
        
        console.log(req.session)
        const questionnaire = await user.getQuestionnaire(user.username);
        let data = {user, questionnaire}
        
        // console.log(data)
        res.send(data);
    }
}

exports.sendUser = async (req, res) => {
    console.log(req.session)
    var filter = { username: { $ne: req.session.user.username} };
    const user = await models.User.findOneRandom(filter, async function(err, user) {
        if (!err) {
            console.log(user); // 1 element
            questionnaire = await user.getQuestionnaire(user.username);
            // console.log(questionnaire);

            const userInfo = {user, questionnaire};
            res.json(userInfo);
        }
    })
    console.log('done')
}



exports.like = async (req, res) => {
    // set like username in frontend
    // check if match by comparing likes and see if match
    console.log(req.session)
    const curentUsername = req.session.user.username;
    const likedUsername = req.body.likedUser; // Set in frontend

    const userLoves = await models.Love.findOne({username: curentUsername});
    const likedUserLoves = await models.Love.findOne({username: likedUsername});

    if(likedUserLoves.likes.indexOf(curentUsername) !== -1){
        likedUserLoves.likes.splice(likedUserLoves.likes.indexOf(curentUsername), 1);
        userLoves.matches.push(likedUsername);
        likedUserLoves.matches.push(curentUsername);


        await userLoves.save()
        await likedUserLoves.save()
        console.log('match');
    } else{
        userLoves.likes.push(likedUsername);
        await userLoves.save();
        console.log('like');
    }
}

exports.getMatches = async (req, res) => {
    const userName = req.session.user.username;
    const loves = await models.Love.findOne({username: userName});

    res.json(loves.matches);
}