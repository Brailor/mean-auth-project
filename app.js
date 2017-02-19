var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var mongoose = require('mongoose');
var config = require('./config/database');
var users = require('./routes/users');
//Csatlakozni az adatbázishoz
mongoose.connect(config.database);
//Sikeres csatlakozás estén
mongoose.connection.on('connected', function () {
    console.log('Connected to database ' + config.database);
});
//Sikertelen csatlakozás estén error
mongoose.connection.on('error', function (e) {
    console.log('Database error:  ' + e);
});
var app = express();
var port = 3000;
//CORS Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
//Body Parser Middleware
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.get('/', function (req, res) {
    res.send('Hibás végcél.');
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})
app.listen(port, function () {
    console.log('Server started on port ' + port);
});
