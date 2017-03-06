(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Account.AccountController', Controller);
 
        function Controller($window, UserFactory, FlashService) {
        var vm = this;
 
        vm.user = null;
        vm.saveUser = saveUser;
        vm.deleteUser = deleteUser;
 
        initController();
 
        function initController() {
            // get current user
            UserFactory.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }
            //save user's information after editing
        function saveUser() {
            UserFactory.Update(vm.user)
                .then(function () {
                    FlashService.Success('User updated');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
 
        function deleteUser() {
            UserFactory.Delete(vm.user._id)
                .then(function () {
                    // log user out
                    $window.location = '/login';
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }
 
})();