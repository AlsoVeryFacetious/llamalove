const models = require('../models');
const mongoose = require('mongoose');

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
    console.log(req.body)
    try{
        const user = await models.User.create(req.body);
        console.log('user saved :)');
        res.send(user);
    } catch(err){
        console.log(err);
    }
}

exports.getUsers = async (req, res) =>{
    const users = await models.User.find().lean();
    res.send(users);
}