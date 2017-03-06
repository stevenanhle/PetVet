
var productService = require('../../../services/product.backend');
var express = require('express');
var router = express.Router();



//router.post('/products/:_id', addProduct);

router.get('/', function (req, res) {
	console.log("Get products here");
    productService.getProducts()
        .then(function (products) {
            if (products) {
                res.send(products);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
});

router.post('/favorite/:_id/:user', function (req, res) {
	console.log("Add products to favorite here");
    var _id=req.params._id;
    var user= req.params.user;
    productService.AddtoFavorite(_id,user)
        .then(function (products) {
            if (products) {
                console.log("products"+product);
                res.send(products);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
});

router.get('/showbasket/:user', function (req, res) {

    var user= req.params.user;
    productService.showBasket(user)
        .then(function (list) {
            if (list) {
                console.log("send ve");
                console.log(list);
                res.send(list);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
});

module.exports = router;