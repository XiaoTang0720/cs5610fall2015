(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController)

    function LoginController($scope, UserService, $rootScope, $location) {
        $scope.$location = $location;
        $scope.passwordNotCorrect = false;
        $scope.login = function(loginuser) {
            if ($scope.loginuser
                && $scope.loginuser.username
                && $scope.loginuser.password) {
                UserService.findUserByCredentials($scope.loginuser.username, $scope.loginuser.password).then(function(user) {
                    if (user != null) {
                        alert("Welcome to login in!");
                        $rootScope.user = user;
                        $rootScope.userName = user.username;
                        $location.url("/profile");
                    } else {
                        $scope.passwordNotCorrect = true;
                    }
                });
            }
        }
    }
})();