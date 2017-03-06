(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Product.ProductController', Controller);
    
    function Controller(ProductFactory, UserFactory, $scope) {

        $scope.products = null;
        $scope.currentuser =null;
        $scope.list =[];
        initController();
 
        function initController() {
            // get current user
            ProductFactory.GetProduct().then(function (products) {
                $scope.products = products;
            });
            UserFactory.GetCurrent().then(function (user) {
                 $scope.currentuser = user._id;
            });
        }

            
        $scope.AddtoFavorite= function(productid) {
            console.log(productid);
            ProductFactory.AddtoFavorite(productid,$scope.currentuser).then(function () {
               
            });
        }

        $scope.showFavorite= function() {
            console.log("list of favorites");
            ProductFactory.showFavorite($scope.currentuser).then(function (list) {
              $scope.list=list;
            });
        }
    }
 
})();