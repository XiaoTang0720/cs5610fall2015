(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController)

	function RegisterController($scope, UserService, $rootScope, $location) {
        $scope.register = function(newuser) {
            UserService.createUser($scope.newuser, function(user) {
                $rootScope.user = user;
            })
            $location.url("/profile");
        }
    }
})();