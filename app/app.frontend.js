(function () {
    'use strict';
 
    angular
        .module('app', ['ui.router'])
        .config(config)
        .run(run);
 
    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");
 
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/home.html',
                controller: 'Home.HomeController',
                controllerAs: 'vm',
                data: { activeTab: 'home' }
            })
            .state('account', {
                url: '/account',
                templateUrl: 'account/account.html',
                controller: 'Account.AccountController',
                controllerAs: 'vm',
                data: { activeTab: 'account' }
            })
             .state('product', {
                url: '/product',
                templateUrl: 'product/product.html',
                controller: 'Product.ProductController',
                controllerAs: 'vm',
                data: { activeTab: 'product' }
            })
             .state('basket', {
                url: '/basket',
                templateUrl: 'product/basket.html',
                controller: 'Product.ProductController',
                controllerAs: 'vm',
                data: { activeTab: 'basket' }
            });
    }
 
    function run($http, $rootScope, $window) {
        // add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;
 
        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.activeTab = toState.data.activeTab;
        });
    }
 
    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/app/token', function (token) {
            window.jwtToken = token;
 
            angular.bootstrap(document, ['app']);
        });
    });
})();