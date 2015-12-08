(function() {
    angular
        .module("MovieJourney")
        .controller("RegisterController", RegisterController)

	function RegisterController($scope, UserService, $rootScope, $location) {
        $scope.register = function(newuser) {
            $scope.userNameExisted = false;
            if (newuser && newuser.username && newuser.password) {
                UserService.findUserByUsername(newuser.username).then(function(user) {
                    if (!user) {
                        newuser.isAdmin = true;
                        UserService.createUser(newuser).then(function(createUser) {
                            $rootScope.user = createUser;
                            $location.url("/login");
                        });
                    } else {
                        $scope.userNameExisted = true;
                    }
                });
            }
        }
    }
})();