(function() {
    angular
        .module("MovieJourney")
        .controller("ProfileController", ProfileController)

	function ProfileController($scope, UserService, $rootScope, $location) {
        $scope.$location = $location;
        var curUser = $rootScope.user;
        if (!curUser) {
            $location.url("/login");
        }
        $scope.updateuser = curUser;
        $scope.update = function(updateuser) {
            UserService.updateUser(curUser._id, updateuser).then(function(user){
                $rootScope.user = user;
                $rootScope.userName = user.username;
                $scope.updateuser = user;
                alert("Update user profile successfully!");
                $location.url("/movie");
            })
        }
    }
})();