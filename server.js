//require('rootpath')();
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var logger = require('morgan');
//var mongoose = require('mongoose');

var config = require('./config.json');
 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));
 
// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));
 
// routes
app.use('/login', require('./backend/api/routes/login.backend'));
app.use('/register', require('./backend/api/routes/register.backend'));
app.use('/app', require('./backend/app.backend'));
app.use('/api/users', require('./backend/api/routes/users'));//go to users.controller
app.use('/api/product', require('./backend/api/routes/products'));//go to users.controller

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});
 
// start server
var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});