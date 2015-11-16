(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController)

	function RegisterController($scope, UserService, $rootScope, $location) {
        $scope.register = function(newuser) {
            UserService.createUser($scope.newuser).then(function(user) {
                $rootScope.user = user;
                console.log(user.id + user.username + user.password);
            })
            $location.url("/profile");
        }
    }
})();