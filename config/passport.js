"use strict";
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.getUserByID(jwt_payload._doc._id, (e, user) =>{
            if(e) return done(err, false);
            if (user){
                return done(null, user);
            }
            else{
                return done(null, false);
            }
        })
    }))
}