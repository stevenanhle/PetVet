var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../../../config.json');
 
router.get('/', function (req, res) {
    // log user out
    delete req.session.token;
 
    // move success message into local variable so it only appears once (single read)
    var viewData = { success: req.session.success };
    delete req.session.success;
 
    res.render('login', viewData);
});
 
router.post('/', function (req, res) {
    // authenticate using api to maintain clean separation between layers
    request.post({
        url: config.apiUrl + '/users/authenticate',//=>http://localhost:3000/api/users/authenticate
        form: req.body,//go to server.js file, we will see the route for this url
        json: true
    }, function (error, response, body) {
        if (error) {
            return res.render('login', { error: 'An error occurred' });
        }
 
        if (!body.token) {
            return res.render('login', { error: 'Username or password is incorrect', username: req.body.username });
        }
 
        // save JWT token in the session to make it available to the angular app
        req.session.token = body.token;
 
        // redirect to returnUrl
        // after authentication is successful, users will be redirected to "/"=>home.html page
        // or ????
        var returnUrl = req.query.returnUrl && decodeURIComponent(req.query.returnUrl) || '/';
        res.redirect(returnUrl);
    });
});
 
module.exports = router;