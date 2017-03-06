var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('products');
db.bind('users');
 
var service = {};
 
service.getProducts = getProducts;
service.AddtoFavorite = AddtoFavorite;
service.showBasket=showBasket;
 
module.exports = service;
 
function getProducts() {
    var deferred = Q.defer();
    db.products.find().toArray(function (err, products) {
        if (err) deferred.reject(err);
        if (products) {
            // return user (without hashed password)
            console.log(products);
            deferred.resolve(products);
        } 
    });
 
    return deferred.promise;
}
 
 function AddtoFavorite(productid,userid) {
    var deferred = Q.defer();
    console.log("To here"+productid+userid); 
    var set = {favorite:productid};
    db.users.update(
            { _id: mongo.helper.toObjectID(userid)},{$push:{favorite:productid}},function (err, user) {
        console.log("Go far to here"+productid+userid);
        if (err) deferred.reject(err);
 
        if (user) {
            // return user (without hashed password)
        
            deferred.resolve(user);
        } 
    });
 
    return deferred.promise;
}

function showBasket(user) {
    var deferred = Q.defer();
    var list = [];
    db.users.findById(user, function (err, user) {
        if (err) deferred.reject(err);
        if (user) {

            var favorite = user.favorite;
            // This function works like async loop (Recusrsive function)
            function uploader(i) {
                if (i < favorite.length) {
                    db.products.findById(mongo.helper.toObjectID(favorite[i]), function (err, product) {

                        if (err) {
                            console.log(err);
                            deferred.reject(err)
                        };
                        if (product) {
                            list.push(product);
                            console.log(list);// list has value here    
                            uploader(i + 1)
                        }

                    })//end db.products.findById 
                }
                else {
                    console.log(list);// This will be final result                       
                    deferred.resolve(list);
                }
            }
            uploader(0)
        } //end of if

    });//end of db.users.findById

    return deferred.promise;
}
