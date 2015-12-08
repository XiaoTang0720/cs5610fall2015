(function() {
    angular
        .module("MovieJourney")
        .controller("LoginController", LoginController)

	function LoginController($scope, UserService, $rootScope, $location) {
        $scope.$location = $location;
        $scope.passwordNotCorrect = false;
        $rootScope.user = null;
        $rootScope.globalAdminLogin = false;
        $rootScope.userName = "Sign in";
        $scope.login = function(loginuser) {
            if ($scope.loginuser
                && $scope.loginuser.username
                && $scope.loginuser.password) {
                UserService.findUserByCredentials($scope.loginuser.username, $scope.loginuser.password).then(function(user) {
                    if (user != null) {
                        if (user.isAdmin) {
                            alert("Welcome to login in, administrator!");
                            $rootScope.globalAdminLogin = true;
                        } else {
                            alert("Welcome to login in, " + user.username);
                        }
                        $rootScope.user = user;
                        $rootScope.userName = user.username;
                        $location.url("/movie");
                    } else {
                        $scope.passwordNotCorrect = true;
                    }
                });
            }
        }
    }
})();