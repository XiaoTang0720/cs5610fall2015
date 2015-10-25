(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController)

	function LoginController($scope, UserService, $rootScope, $location) {
        $scope.$location = $location;
        $scope.login = function(loginuser) {
            UserService.findUserByUsernameAndPassWord($scope.loginuser.username, $scope.loginuser.password, function(user){
                if (user != null) {
                    alert("Welcome to login in!");
                    $rootScope.user = user;
                    $location.url("/profile");
                } else {
                    alert("Username or password is wrong.");
                }
            })
        }
    }
})();