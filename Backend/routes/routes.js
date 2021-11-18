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
        await user.save();
        res.send(user);
        console.log('user saved :)');
    } catch(err){
        console.log(err);
    }
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

exports.getUsers = async (req, res) => {
    const users = await models.User.find({}).lean();
    res.send(users);
}