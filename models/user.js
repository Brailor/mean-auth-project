var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var config = require('../config/database');
//User Schema
var UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
var User = module.exports = mongoose.model('User', UserSchema);
module.exports.getUserByID = function (id, callback) {
    User.findById(id, callback);
};
module.exports.getUserByUserame = function (username, callback) {
    var query = { username: username };
    User.findOne(query, callback);
};
module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (e, salt) {
        bcrypt.hash(newUser.password, salt, function (e, hash) {
            if (e)
                throw e;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (e, isMatch) => {
        if(e) throw e;
        callback(null, isMatch);
    });
}
