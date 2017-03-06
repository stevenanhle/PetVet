var config = require('../../config.json');
var express = require('express');
var router = express.Router();


var users = require('./routes/users');
var products = require('./routes/products');
app.use('/users',users);
app.use('/products', products);


 
 
module.exports = router;
 

