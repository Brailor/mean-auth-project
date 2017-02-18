const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
const UserSchema = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByID = function(id, callback){
    User.findById(id, callback);
};

module.exports.getUserByUserame = function(username, callback){
    const query = {username : username};
    User.findOne(query, callback);
};

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (e, salt) => {
        bcrypt.hash(newUser.password, salt, (e, hash) => {
            if(e) throw e;
            newUser.password = hash;
            newUser.save(callback);
        })
    });
}