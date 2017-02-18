const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


//Regisztráció
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    User.addUser(newUser, (e, user) => {
        if(e) res.json({succes: false, message: 'Nem sikerült regisztrálni a felhasználót.'});
        else res.json({succes: true , message: 'Sikeres volt a felhasználó regisztráció.'});
    });
});

//Authentikáció
router.post('/authenticate', (req, res, next) => {
    res.send('Authentikáció');
});

//Profil 
router.get('/profile', (req, res, next) => {
    res.send('Profil');
});



module.exports = router;