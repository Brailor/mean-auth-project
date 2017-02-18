var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var config = require('../config/database')
//Regisztráció
router.post('/register', function (req, res, next) {
    var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    User.addUser(newUser, function (e, user) {
        if (e)
            res.json({ succes: false, message: 'Nem sikerült regisztrálni a felhasználót.' });
        else
            res.json({ succes: true, message: 'Sikeres volt a felhasználó regisztráció.' });
    });
});
//Authentikáció
router.post('/authenticate', function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  User.getUserByUserame(username,(e, user) => {
      if(e) throw e;
      if(!user){
          return res.json({succes: false, message: 'Nincs ilyen user.'})
      }
      User.comparePassword(password, user.password, (e, isMatch) => {
          if(e) throw e;
          if(isMatch){
              const token = jwt.sign(user, config.secret, {
                  expiresIn: 3600 * 24 * 7 //egy hétig érvényes a token(másodpercben megadva)
              });

              res.json({
                  succes: true,
                  token: 'JWT ' + token,
                  user: {
                      id: user._id,
                      name: user.name,
                      username: user.username,
                      email: user.email
                  }
              })
          }
          else{
              return res.json({succes: false, message: 'Rossz jelszó.'})
          }
      })
  })
});
//Profil 
router.get('/profile',passport.authenticate('jwt', {session: false}), function (req, res, next) {
    res.json({user: req.user});
});
module.exports = router;
