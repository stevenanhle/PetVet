(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Home.HomeController', Controller);
    
    function Controller(UserFactory) {
        var vm = this;
 
        vm.user = null;
 
        initController();
 
        function initController() {
            // get current user
            UserFactory.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }
    }
 
})();