(function () {
    'use strict';
 
    angular
        .module('app')
        .factory('ProductFactory', Service);
 
    function Service($http,$q) {
        var service = {};
        service.GetProduct = GetProduct;
        service.AddtoFavorite = AddtoFavorite;
        service.showFavorite=showFavorite;
        return service;
        function GetProduct() {
            console.log("Implementing GetProduct");
            return $http.get('/api/product').then(handleSuccess, handleError);
        }
        function AddtoFavorite(_id,user) {
            console.log("Implementing AddtoFavorite"+_id+user);
            return $http.post('/api/product/favorite/'+_id+'/'+user).then(handleSuccess, handleError);
        }
        function showFavorite(user) {
            console.log("Implementing showFavorite"+user);
            return $http.get('/api/product/showbasket/'+user).then(handleSuccess, handleError);
        }
        function handleSuccess(res) {
            return res.data;
        }
 
        function handleError(res) {
            return $q.reject(res.data);
        }
 
       
    }
 
})();